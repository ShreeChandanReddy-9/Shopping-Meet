// Reducer manages the application's state for video conferencing, including adding and removing participants, handling user preferences, and establishing WebRTC connections for real-time communication.
import {
  SET_MAIN_STREAM,
  ADD_PARTICIPANT,
  SET_USER,
  REMOVE_PARTICIPANT,
  UPDATE_USER,
  UPDATE_PARTICIPANT,
} from "./actiontypes";

import {
  createOffer,
  initializeListensers,
  updatePreference,
} from "../server/peerConnection";

/* 
defaultUserState is an object that represents the initial or default state of your application. It includes three main properties:
  mainStream: This property is initially set to null, indicating that there is no main video stream defined when the application starts.
  participants: This property is an empty object ({}), indicating that there are no participants in the video conference initially.
  currentUser: This property is initially set to null, indicating that there is no current user defined when the application starts.
*/
let defaultUserState = {
  mainStream: null,
  participants: {},
  currentUser: null,
};

// 'servers' is an object that contains configuration settings for ICE (Interactive Connectivity Establishment) servers. ICE servers are used in WebRTC (Web Real-Time Communication) to establish peer-to-peer connections between users for real-time communication.
const servers = {
  // iceServers: This property is an array of server configurations. In this case, it specifies a list of STUN (Session Traversal Utilities for NAT) servers provided by Google and Mozilla. STUN servers are used to discover a client's public IP address and port when it is located behind a NAT (Network Address Translation) firewall.
  iceServers: [
    {
      urls: [
        "stun:stun.l.google.com:19302",
        "stun:global.stun.twilio.com:3478",
        "stun:stun1.l.google.com:19302",
        "stun:stun2.l.google.com:19302",
        "stun:stun.l.google.com:19302",
        "stun:stun3.l.google.com:19302",
        "stun:stun4.l.google.com:19302",
        "stun:stun.services.mozilla.com",
      ],
    },
  ],
  // iceCandidatePoolSize: This property sets the maximum number of ICE candidates that can be stored. ICE candidates are network endpoints used in the connection process.
  iceCandidatePoolSize: 10,
  // The iceCandidatePoolSize property helps manage the number of potential network paths (ICE candidates) between two users during the WebRTC connection setup. During the WebRTC connection setup process, ICE candidates are generated. These candidates represent different network paths that can be used for communication. However, generating and managing a large number of candidates can consume memory and resources.
};

// 'generateColor' generates a random color code in the format #RRGGBB, where RR, GG, and BB are two-digit hexadecimal values representing the red, green, and blue components of the color, respectively. This function is commonly used to assign random colors to elements in a UI, like avatars or user interface elements, for visual distinction.
const generateColor = () =>
  "#" + Math.floor(Math.random() * 16777215).toString(16);


// 'userReducer' is Redux reducer which is responsible for managing the state related to users and video conference participants. It handles various actions dispatched by the application to update this state.
// 'userReducer' function listens for specific action types and updates the user-related state accordingly. It uses the payload from actions to make these updates. This reducer handles actions related to managing participants, the current user, and the main video stream in a video conference application.
// The 'userReducer' function, which takes two parameters: state (the current state, initialized with defaultUserState) and action (the action object dispatched to update the state).
export const userReducer = (state = defaultUserState, action) => {
  //  If the action.type is equal to SET_MAIN_STREAM. It is the action type used to set the main video stream in the application.
  if (action.type === SET_MAIN_STREAM) {
  // extracting the 'payload' object from the action. The payload typically contains data to be used when updating the state.
    let payload = action.payload;
  // creating a new state object by spreading the properties of the current state (...state) and then spreading the properties of the payload object (...payload). This is a way to merge the changes from the payload into the current state.
    state = { ...state, ...payload };
  // returning the updated state after setting the main video stream.
    return state;
  } 
  //  when the action type is ADD_PARTICIPANT. It's responsible for adding a new participant to the video conference.
  else if (action.type === ADD_PARTICIPANT) {
    // The payload object from the action is extracted and assigned to the payload variable. This payload typically contains data related to the new participant being added.
    let payload = action.payload;
    //  Extracting the current user's ID from the state.currentUser object. This ID is used to identify the user who is currently using the application.
    const currentUserId = Object.keys(state.currentUser)[0];
    // extracts the new participant's ID from the payload.newUser object. It identifies the new participant being added
    const newUserId = Object.keys(payload.newUser)[0];

    // state.mainStream: It checks if there is a main video stream available in the state. If there is no main stream, it means that the video conference hasn't started yet, so there's no need to establish a connection. 
    // currentUserId !== newUserId: It checks if the new participant being added is not the same as the current user. If they are the same, there's no need to establish a connection because the user is already in the conference.
    if (state.mainStream && currentUserId !== newUserId) {
      // If both conditions in the if statement are met, it calls the addConnection function to establish a connection between the new participant and the main video stream. This connection setup is necessary for video conferencing.
      payload.newUser = addConnection(
        payload.newUser,
        state.currentUser,
        state.mainStream
      );
    }

    // This conditional statement checks if the new participant being added is the same as the current user. If they are the same, it means the current user is joining the video conference, so the code does the following:
    // payload.newUser[newUserId].currentUser = true;: It sets the currentUser property of the new user in the payload to true, indicating that this user is the current user.
    if (currentUserId === newUserId)
      payload.newUser[newUserId].currentUser = true;
    // Assigning an avatar color to the new user. Each user in the video conference is assigned a unique avatar color. The generateColor function is used to generate a random color, which is then assigned to the new user.
    payload.newUser[newUserId].avatarColor = generateColor();
    //  A new object named participants is created by combining the existing state.participants with the new user data from the payload. This ensures that the new user is included in the list of participants.
    let participants = { ...state.participants, ...payload.newUser };
    //  The state is updated by spreading the existing state properties and including the updated participants object.
    state = { ...state, participants };
    return state;
  } 
  // Handles the process of setting the current user in the application's state. It extracts user information from the payload, assigns an avatar color, initializes listeners, and updates the state accordingly.
  else if (action.type === SET_USER) {
    // A reference to the action's payload is stored in a variable named payload
    let payload = action.payload;
    // A copy of the existing state.participants object is made and stored in a variable named participants. This ensures that we are working with a copy of the current participants.
    let participants = { ...state.participants };
    // Extracting the user ID from the payload's currentUser object.
    const userId = Object.keys(payload.currentUser)[0];
    // Assigning an avatar color to the current user using the generateColor function. This color is unique to each user.
    payload.currentUser[userId].avatarColor = generateColor();
    // The purpose of the initializeListensers function is to set up event listeners related to WebRTC (Web Real-Time Communication) communication for a specific user identified by their userId.
    /* 
      Inside the initializeListensers function, there are event listeners set up for various types of events related to WebRTC communication. These events include:
        Listening for incoming offers from other users.
        Listening for incoming offer candidates.
        Listening for incoming answers from other users.
        Listening for incoming answer candidates.
      These event listeners are crucial for establishing and maintaining real-time audio and video communication between users in a video conferencing application.
      When these events occur (e.g., when an offer is received from another user), the event handlers associated with these listeners will execute specific actions.
      For example, when an offer is received, the code may create an answer and set up a peer connection to establish a video call.
      The initializeListensers function plays a key role in managing the WebRTC communication flow for a user. It ensures that the user can receive and respond to offers, candidates, answers, and other signaling messages required for real-time communication.
    */
    initializeListensers(userId);
    // The state is updated to include the current user and their avatar color.
    // currentUser: { ...payload.currentUser }: This sets the currentUser property in the state to the data provided in the payload, including the newly assigned avatar color.
    // participants: The participants object is updated with the new current user data.
    state = { ...state, currentUser: { ...payload.currentUser }, participants };
    return state;
  } 
  //  Handles the removal of a participant from the application's state when a REMOVE_PARTICIPANT action is dispatched. It ensures that the state remains immutable, and the desired participant is removed from the participants object.
  else if (action.type === REMOVE_PARTICIPANT) {
    // Extracting the payload object from the action. The payload typically contains data or information necessary for the action. In this case, it may contain the id of the participant to be removed.
    let payload = action.payload;
    //  Createing a shallow copy of the participants object from the current state. This copy ensures that the original state remains unchanged while modifications are made.
    let participants = { ...state.participants };
    //  Removing a participant from the participants object using the id provided in the payload. It essentially deletes the participant's data from the state.
    delete participants[payload.id];
    // Here, a new state object is created by spreading the existing state (...state) and updating the participants property with the modified participants object. This follows the immutability principle in Redux, where state updates should produce a new state object.
    state = { ...state, participants };
    //  The updated state is returned from the reducer. Redux stores this updated state for further use.
    return state;
  } 
  // Handles the updating of the current user's data within the application's state when an UPDATE_USER action is dispatched. It ensures that the state remains immutable, and the user's data is updated as specified in the payload.
  else if (action.type === UPDATE_USER) {
    // Extracting the payload object from the action. The payload typically contains data or information necessary for the action. In this case, it may contain updates to the current user's data.
    let payload = action.payload;
    // Extracting the ID of the current user from the currentUser object in the state. In Redux, the current user's data is often stored under the currentUser property.
    const userId = Object.keys(state.currentUser)[0];
    // updatePreference(userId, payload.currentUser);: Invokes the updatePreference function, passing the userId and the currentUser object from the payload as arguments. It's responsible for updating the user's preferences, possibly related to audio, video, or other settings.
    updatePreference(userId, payload.currentUser);
    // state.currentUser[userId] = { ...state.currentUser[userId], ...payload.currentUser };: It updates the current user's data within the state. This update involves spreading the existing user data (...state.currentUser[userId]) and merging it with the data from the payload (...payload.currentUser). This ensures that the user's data is updated without mutating the state directly.
    state.currentUser[userId] = {
      ...state.currentUser[userId],
      ...payload.currentUser,
    };
    // state = { ...state, currentUser: { ...state.currentUser } };: Creates a new state object that spreads the existing state (...state) and ensures that the currentUser property is also copied. This step follows the immutability principle in Redux, where state updates should produce a new state object.
    state = {
      ...state,
      currentUser: { ...state.currentUser },
    };
    // The updated state is returned from the reducer. Redux stores this updated state for further use.
    return state;
  } 
  // Handles the updating of participant data within the application's state when an UPDATE_PARTICIPANT action is dispatched. It ensures that the state remains immutable, and the participant's data is updated as specified in the payload.
  else if (action.type === UPDATE_PARTICIPANT) {
    // Extracting the payload object from the action. The payload typically contains data or information necessary for the action. In this case, it may contain updates to a participant's data
    let payload = action.payload;
    // Extracting the ID of the new participant from the newUser object in the payload. This ID is used to identify the participant being updated.
    const newUserId = Object.keys(payload.newUser)[0];
    // Updating the data of the participant with the ID newUserId. It spreads the existing participant data (...state.participants[newUserId]) and merges it with the data from the payload (...payload.newUser[newUserId]). This ensures that the participant's data is updated without mutating the state directly.
    payload.newUser[newUserId] = {
      ...state.participants[newUserId],
      ...payload.newUser[newUserId],
    };
    // Creating a new participants object that spreads the existing participants (...state.participants) and merges it with the data from the payload (...payload.newUser). This step combines the updated participant data with the existing participants in the state.
    let participants = { ...state.participants, ...payload.newUser };
    // Creating a new state object that spreads the existing state (...state) and updates the participants property with the newly combined participants object. This step follows the immutability principle in Redux, where state updates should produce a new state object.
    state = { ...state, participants };
    //  The updated state is returned from the reducer. Redux stores this updated state for further use.
    return state;
  }
  // If none of the conditions match (else block), the original state is returned.
  return state;
};

// Responsible for setting up a new WebRTC peer connection for a participant (the new user) and adding their audio and video tracks to it. It also determines the roles of offerer and answerer based on user IDs and, if needed, initiates the offer creation process. The updated participant data is returned as an object.
const addConnection = (newUser, currentUser, stream) => {
  // Creating a new WebRTC peer connection (RTCPeerConnection) using the configuration defined in the servers object. This connection is used for real-time communication with other participants in the video conference.
  const peerConnection = new RTCPeerConnection(servers);
  // Iterating through all tracks in the stream object (which typically represents the user's audio and video streams) and adds each track to the peerConnection. This step establishes the media streams for communication.
  stream.getTracks().forEach((track) => {
    peerConnection.addTrack(track, stream);
  });

  // Extracting the user IDs of the new user and the current user. They also sort the IDs to determine the order of creating offers and answers. The user with the lower ID becomes the offerer, and the other becomes the answerer.
  const newUserId = Object.keys(newUser)[0];
  const currentUserId = Object.keys(currentUser)[0];

  const offerIds = [newUserId, currentUserId].sort((a, b) =>
    a.localeCompare(b)
  );

  // Setting the peerConnection property for the new user within the newUser object. This property holds the reference to the WebRTC peer connection created for the new user.
  newUser[newUserId].peerConnection = peerConnection;
  // If the new user is the offerer (determined by the order of their user IDs), this block calls the createOffer function to create and send an offer to the other participant (the answerer). This offer is a critical step in the WebRTC handshake process.
  if (offerIds[0] !== currentUserId)
    createOffer(peerConnection, offerIds[0], offerIds[1]);
  // returning the updated newUser object, which now includes the peerConnection property and may have initiated the offer creation process.
  return newUser;
};
