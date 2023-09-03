import firepadRef from "./firebase";
import { store } from "../index";

// 'const participantRef = firepadRef.child("participants");': Here, a new constant participantRef is created by navigating to a specific location in the Firebase Realtime Database using 'firepadRef'. It goes to the "participants" node, which is a child node of the location pointed to by 'firepadRef'. 'participantRef' is now a reference to the "participants" node in the database.
const participantRef = firepadRef.child("participants");

export const updatePreference = (userId, preference) => {
  // creates a new reference 'currentParticipantRef'. It starts from the 'participantRef' and then goes to a specific participant node indicated by 'userId'. From there, it goes further to the "preferences" node. So, 'currentParticipantRef' points to a specific user's preferences in the database.
  const currentParticipantRef = participantRef
    .child(userId)
    .child("preferences");
  // schedules an update to the user's preferences in the database. The 'setTimeout' function is used here, but it doesn't introduce any significant delay. It's often used to ensure that the update happens asynchronously and doesn't block the main thread. Once the timeout is reached (which happens almost immediately), the '.update(preference)' method is called on 'currentParticipantRef' to update the user's preferences with the provided preference data.
  setTimeout(() => {
    currentParticipantRef.update(preference);
  });
};

// Responsible for creating and sending an offer for a peer-to-peer connection.

// Define and export a function named 'createOffer'. It takes three parameters: 'peerConnection' (an instance of a WebRTC peer connection), 'receiverId' (the ID of the receiver), and 'createdID' ( the ID of the user creating the offer).
export const createOffer = async (peerConnection, receiverId, createdID) => {
  // It gets a reference (currentParticipantRef) to a specific participant (receiver) in the Firebase Realtime Database using 'participantRef'.
  const currentParticipantRef = participantRef.child(receiverId);
  // seting up an event handler for the 'onicecandidate' event of the peerConnection. When an ICE candidate is generated during the connection negotiation process, this event handler is called.
  peerConnection.onicecandidate = (event) => {
  // event.candidate && ...: It checks if there is an ICE candidate in the event. ICE candidates are pieces of information used for establishing a connection. If an ICE candidate exists, the code proceeds.
  // currentParticipantRef.child("offerCandidates").push({ ... }): It pushes the ICE candidate data (converted to JSON format) along with the userId (the ID of the user creating the offer) to a location in the Firebase Realtime Database under the "offerCandidates" node for the receiver. This allows the receiver to collect and use the ICE candidates to establish a connection.
    event.candidate &&
      currentParticipantRef
        .child("offerCandidates")
        .push({ ...event.candidate.toJSON(), userId: createdID });
  };

  // creating an offer description using the 'createOffer' method of the peerConnection. Offers are part of the WebRTC negotiation process and contain information about the user's media capabilities and preferences.
  const offerDescription = await peerConnection.createOffer();
  // setting the locally generated offer description as the local description of the peerConnection. This local description will be used during the negotiation process.
  await peerConnection.setLocalDescription(offerDescription);
  // An object 'offer' that contains information about the offer, including the SDP (Session Description Protocol) data and the type of the offer is created.
  const offer = {
    sdp: offerDescription.sdp,
    type: offerDescription.type,
    userId: createdID,
  };
  // Pushing the offer data to the Firebase Realtime Database under the "offers" node for the receiver. This allows the receiver to retrieve the offer and initiate the connection negotiation process.
  await currentParticipantRef.child("offers").push().set({ offer });
};


// To handle the exchange of WebRTC offers, answers, and ICE candidates between participants
export const initializeListensers = async (userId) => {

  // geting a reference (currentUserRef) to the current user's data in the Firebase Realtime Database using the userId.
  const currentUserRef = participantRef.child(userId);
  // sets up an event listener for the "child_added" event on the "offers" node under the current user's data in the database. When a new child (offer) is added to this node, the provided callback function is executed.
  currentUserRef.child("offers").on("child_added", async (snapshot) => {
    // extracting the data from the added child (offer).
    const data = snapshot.val();
    // if the data contains an "offer" 
    if (data?.offer) {
      // It retrieves the peerConnection object associated with the user who sent the offer from the Redux store.
      const pc = store.getState().participants[data.offer.userId].peerConnection;
      // 'await pc.setRemoteDescription(new RTCSessionDescription(data.offer));': It sets the remote description of the peerConnection using the offer data. This is an important step in the WebRTC connection establishment process.
      await pc.setRemoteDescription(new RTCSessionDescription(data.offer));
      // await createAnswer(data.offer.userId, userId);: It calls the createAnswer function to create an answer for the received offer. The data.offer.userId represents the ID of the user who sent the offer, and userId represents the current user's ID.
      await createAnswer(data.offer.userId, userId);
    }
  });

  // Listens for incoming ICE candidates from other users, identifies the intended recipient (based on the "userId" property), and adds the candidate to the appropriate user's WebRTC peer connection.
  // seting up a Firebase Realtime Database event listener that listens for new child nodes being added to the "offerCandidates" node under the current user's reference (currentUserRef).
  currentUserRef.child("offerCandidates").on("child_added", (snapshot) => {
    //  It retrieves the data stored in the newly added child node using the snapshot.val() method. This data typically represents an ICE candidate
    const data = snapshot.val();
    //If the retrieved data contains a "userId" property. This property is used to identify which user the ICE candidate is intended for.
    if (data.userId) {
      // If the "userId" property is present in the data, it retrieves the peerConnection object associated with the user who sent this ICE candidate. It does this by accessing the Redux store's 'getState()' method to obtain the current state, then navigating through the "participants" object to find the relevant user's 'peerConnection'.
      const pc = store.getState().participants[data.userId].peerConnection;
      // Adding the ICE candidate (represented by the data object) to the user's peer connection (pc) using the addIceCandidate method. This step is crucial for establishing a WebRTC connection, as ICE candidates contain network information necessary for peers to find and communicate with each other.
      pc.addIceCandidate(new RTCIceCandidate(data));
    }
  });

  // Listens for incoming answers from other users, extracts the answer data, identifies the intended recipient (based on the "userId" property), and sets the remote description of the user's WebRTC peer connection to establish a bidirectional communication channel. 
  // seting up a Firebase Realtime Database event listener that listens for new child nodes being added to the "answers" node under the current user's reference (currentUserRef).
  currentUserRef.child("answers").on("child_added", (snapshot) => {
    // Retrieving the data stored in the newly added child node using the snapshot.val() method. This data typically represents an answer to a WebRTC offer.
    const data = snapshot.val();
    // It checks if the retrieved data contains an "answer" property. This property is used to identify that this child node contains answer data.
    if (data?.answer) {
    // If the "answer" property is present in the data, it retrieves the peerConnection object associated with the user who sent this answer. It does this by accessing the Redux store's getState() method to obtain the current state, then navigating through the "participants" object to find the relevant user's peerConnection. The "userId" property of the answer data is used to identify the user.
      const pc = store.getState().participants[data.answer.userId].peerConnection;
      // Creating a new RTCSessionDescription object based on the answer data received from the database. This object represents the remote description of the peer connection, which includes the session description protocol (SDP) information.
      const answerDescription = new RTCSessionDescription(data.answer);
      // setting the remote description of the user's peer connection (pc) to the answer description using the setRemoteDescription method. This step is crucial in the WebRTC connection setup process because it informs the peer's connection about the parameters and configuration of the remote stream.
      pc.setRemoteDescription(answerDescription);
    }
  });

  // Listens for incoming ICE candidates from other users, extracts the candidate data, identifies the intended recipient (based on the "userId" property), and adds the ICE candidate to the user's WebRTC peer connection. 
  // setting up a Firebase Realtime Database event listener that listens for new child nodes being added to the "answerCandidates" node under the current user's reference (currentUserRef).
  currentUserRef.child("answerCandidates").on("child_added", (snapshot) => {
    //  retrieves the data stored in the newly added child node using the snapshot.val() method. This data typically represents an ICE candidate used for establishing a WebRTC connection.
    const data = snapshot.val();
    // If the retrieved data contains a "userId" property. This property is used to identify which user the ICE candidate is intended for.
    if (data.userId) {
    // If the "userId" property is present in the data, it retrieves the peerConnection object associated with the user who is supposed to receive this ICE candidate. It does this by accessing the Redux store's getState() method to obtain the current state, then navigating through the "participants" object to find the relevant user's 'peerConnection'.
      const pc = store.getState().participants[data.userId].peerConnection;
    // Adding the ICE candidate to the user's peer connection (pc) using the 'addIceCandidate' method. ICE candidates are crucial for establishing direct communication between peers in a WebRTC connection. They contain network information necessary for the peer-to-peer connection setup.
      pc.addIceCandidate(new RTCIceCandidate(data));
    }
  });
};

// 'createAnswer' is responsible for creating an answer in response to an offer from another user. It sets up ICE candidate handling, generates the answer, stores it in the Firebase Realtime Database, and prepares the local description for the WebRTC connection. This process is crucial for establishing bidirectional communication in a WebRTC application.
// It takes two parameters: otherUserId (the ID of the user for whom we are creating an answer) and userId (the ID of the current user).
const createAnswer = async (otherUserId, userId) => {
  // It retrieves the peerConnection object associated with the other user (the user who sent the offer) from the Redux store's state. This peerConnection is essential for creating the answer.
  const pc = store.getState().participants[otherUserId].peerConnection;
  // It gets a reference to the Firebase Realtime Database location specific to the other user (the user who sent the offer). This reference will be used to store answer-related information.
  const participantRef1 = participantRef.child(otherUserId);
  // Setting up an event listener on the peerConnection for ICE candidate events. When an ICE candidate event occurs (indicating the availability of an ICE candidate), it executes the provided callback function
  pc.onicecandidate = (event) => {
    // Inside the callback function, it checks if the event object contains a valid ICE candidate (event.candidate). If a valid candidate exists, it proceeds to the next step. It pushes the ICE candidate data (converted to JSON) into the "answerCandidates" location under the other user's reference in the Firebase Realtime Database. This allows the other user to access and use this ICE candidate for establishing the WebRTC connection.
    event.candidate &&
      participantRef1
        .child("answerCandidates")
        .push({ ...event.candidate.toJSON(), userId: userId });
  };

  // It sets the locally generated answer description as the local description of the peerConnection. This step is necessary to prepare the answer for transmission.
  const answerDescription = await pc.createAnswer();
  await pc.setLocalDescription(answerDescription);
  // It constructs an answer object containing the answer's type, SDP, and the userId of the current user.
  const answer = {
    type: answerDescription.type,
    sdp: answerDescription.sdp,
    userId: userId,
  };

  // It pushes the answer object into the "answers" location under the other user's reference in the Firebase Realtime Database. It pushes the answer object into the "answers" location under the other user's reference in the Firebase Realtime Database.
  await participantRef1.child("answers").push().set({ answer });
};






/* 
                                              *********** Summary *********** 

Firebase Database Structure:

- root
  - conference_1
    - participants
      - userId_1
        - preferences
        - offers
        - offerCandidates
        - answers
        - answerCandidates
      - userId_2
        - preferences
        - offers
        - offerCandidates
        - answers
        - answerCandidates
      ...
  - conference_2
    - participants
      - userId_3
        - preferences
        - offers
        - offerCandidates
        - answers
        - answerCandidates
      - userId_4
        - preferences
        - offers
        - offerCandidates
        - answers
        - answerCandidates
      ...
  ...
-> The root represents the root of the Firebase Realtime Database.
-> firepadRef is a reference to a specific location in the database, and it serves as the root for all video conference-related data.
-> participants is a node under firepadRef where information about conference participants is stored. Each participant is identified by their unique userId.
-> For each participant (userId_x), the following sub-nodes are present:
      preferences: Stores participant preferences.
      offers: Stores offers sent by the participant.
      offerCandidates: Stores ICE candidates related to the participant's offer.
      answers: Stores answers received by the participant.
      answerCandidates: Stores ICE candidates related to the participant's answer.
-> These nodes are used to manage and exchange WebRTC-related data, including offers, answers, ICE candidates, and participant preferences during a video conference. Firebase Realtime Database provides a structured and real-time data synchronization mechanism for this purpose.



-> Peer Connection Setup: A new RTCPeerConnection object called peerConnection is created to represent the connection between the local user and a remote user.

-> ICE Candidate Handling: Event listeners for ICE candidates are set up. These ICE candidates are crucial for the negotiation of network routes between the local and remote users. When ICE candidates are generated during the connection process, event handlers are ready to manage them.

-> Adding Local Stream: The local user's audio and video streams, represented by the localStream object, are added to the peerConnection. This step allows the local user's audio and video data to be transmitted to the remote user.

-> Offer Creation and Sending: An offer, containing session description protocol (SDP) information, is created locally. This offer describes the local user's audio and video capabilities and preferences. The local user sets this offer as its local description.

-> Signaling Mechanism: The local user sends this offer to the remote peer through a signaling mechanism. This mechanism can be a server, a messaging system, or any method for transmitting data between the two users.

-> Offer Reception and Remote Description Set: On the remote side, the offer is received and processed. A remote session description is created based on the offer's SDP information. This remote description is set as the remote peer's description.

-> Handling ICE Candidates from Remote Peer: Additionally, ICE candidates received from the remote peer are handled. These candidates help establish direct network connections and are added to the peerConnection.

-> Remote Answer Generation and Sending: After receiving the offer, the remote peer generates an answer. This answer describes the remote user's audio and video capabilities and preferences. The remote peer sends this answer back to the local user.

-> Remote Answer Processing: The local user receives the remote answer and sets it as the remote description in its peerConnection.

-> Connection Established: With both local and remote descriptions set, the WebRTC connection is established, allowing real-time audio and video communication between the local and remote users.

* In summary, this systematic approach ensures that both users in the call exchange session descriptions (offer and answer) and ICE candidates to establish a direct and efficient communication channel for audio and video data, enabling a seamless video call experience.




*/
