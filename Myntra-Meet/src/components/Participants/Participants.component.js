import React, { useEffect, useRef } from "react";
import "./Participants.css";
import { connect } from "react-redux";
import { Participant } from "./Participant/Participant.component";

const Participants = (props) => {
  // Create a reference for the video element
  const videoRef = useRef(null);
  // Get an array of participant keys from the Redux store
  let participantKey = Object.keys(props.participants);
  // To update the video element when currentUser or stream changes
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.srcObject = props.stream;
      videoRef.current.muted = true;
    }
  }, [props.currentUser, props.stream]);
  // Extract the currentUser object from props
  const currentUser = props.currentUser
    ? Object.values(props.currentUser)[0]
    : null;
  // Determine the grid layout based on the number of participants
  let gridCol =
    participantKey.length === 1 ? 1 : participantKey.length <= 4 ? 2 : 4;
  const gridColSize = participantKey.length <= 4 ? 1 : 2;
  let gridRowSize =
    participantKey.length <= 4
      ? participantKey.length
      : Math.ceil(participantKey.length / 2);

  // Check if there's a participant presenting their screen
  const screenPresenter = participantKey.find((element) => {
    const currentParticipant = props.participants[element];
    return currentParticipant.screen;
  });

  // Adjust grid layout if there's a screen presenter
  if (screenPresenter) {
    gridCol = 1;
    gridRowSize = 2;
  }

  // Map participant data to Participant components
  // Maps through each participant in participantKey and creates a Participant component for each one. It also checks if the participant is the current user and returns null in that case to skip rendering their own video.
  // 'element' represents the current element (or value) in the array participantKey 
  // 'index' represents the index of the current element within the participantKey array as the map function iterates through it. It starts at 0 for the first element, 1 for the second element, and so on.
  // It creates an array of participants by mapping over the participantKey array. For each element in participantKey, it generates a <Participant /> component with specific props.
  const participants = participantKey.map((element, index) => {
    const currentParticipant = props.participants[element];
    const isCurrentUser = currentParticipant.currentUser;
    if (isCurrentUser) {
      return null;
    }
    // Create a new MediaStream for each remote participant
    // For each remote participant, this code sets up a peerConnection object (pc) and creates a new MediaStream called remoteStream.
    // The 'peerConnection' object is essential in WebRTC-based applications like video conferencing. It handles the communication and exchange of media streams (video, audio) between participants. In this case, it's used to receive and display the video and audio from the remote participant.
    const pc = currentParticipant.peerConnection;
    // 'remoteStream' will hold the remote participant's audio and video.
    const remoteStream = new MediaStream();  
    // 'curentIndex' to keep track of the index of the current participant.
    let curentIndex = index;


    // Add remote tracks to the remoteStream
    // It registers an ontrack event handler for the peer connection. When remote tracks (audio or video) are received, they are added to the remoteStream.
    // It then updates the video element (with the ID "participantVideoX") to display the remote stream.

    // checking if there's a peerConnection object (pc) for the current remote participant.
    // "current remote participant" refers to the participant currently being processed in the loop that iterates over the list of participants. The loop goes through each participant in the participantKey array, and currentParticipant represents the details and state of the participant being processed during each iteration.
    if (pc) {
      // set up an ontrack event handler for the peerConnection. This event handler is triggered when the remote participant's audio or video tracks are received.
      /* 
      When tracks arrive, the code does the following:
      It iterates through each track received (audio or video).
      For each track, it adds the track to the remoteStream, so the stream now contains both audio and video tracks from the remote participant. */
      pc.ontrack = (event) => {
        event.streams[0].getTracks().forEach((track) => {
          remoteStream.addTrack(track);
        });
        // Update the video element with the remote stream
        // Retrieves the HTML video element associated with the current remote participant, using the currentIndex.
        const videElement = document.getElementById(
          `participantVideo${curentIndex}`
        );
        // If the 'videElement' exists, it sets the 'srcObject' property of the video element to the 'remoteStream'. In simpler terms, it tells the video element to display the video content provided by the 'remoteStream'(contains the video and audio tracks received from a remote participant).
        if (videElement) videElement.srcObject = remoteStream;
      };
    }


    // Render the Participant component with specific prop
    return (
      <Participant
        key={curentIndex}
        currentParticipant={currentParticipant}
        curentIndex={curentIndex}
        hideVideo={screenPresenter && screenPresenter !== element}
        showAvatar={
          !currentParticipant.video &&
          !currentParticipant.screen &&
          currentParticipant.name
        }
      />
    );
  });


  // Render the container for all Participant components
  return (
    <div
      style={{
        "--grid-size": gridCol,
        "--grid-col-size": gridColSize,
        "--grid-row-size": gridRowSize,
      }}
      className={`participants`}
    >
      {participants}
      <Participant
        currentParticipant={currentUser}
        curentIndex={participantKey.length}
        hideVideo={screenPresenter && !currentUser.screen}
        videoRef={videoRef}
        showAvatar={currentUser && !currentUser.video && !currentUser.screen}
        currentUser={true}
      />
    </div>
  );
};

// 'mapStateToProps' function is used in a React-Redux application to map the state from the Redux store to props that can be used within a component.
// 'state' is the parameter representing the current state of the Redux store.
// mapStateToProps function allows the connected component to access specific pieces of data (participants, currentUser, and stream) from the Redux store's state by mapping them to corresponding props. These props can then be used within the component to access and display this data as needed.
const mapStateToProps = (state) => {
  return {
    // Ihe 'participants' property from the Redux state available as a prop named 'participants' in your component. So, your component can access this data as this.props.participants.
    participants: state.participants,
    currentUser: state.currentUser,
    stream: state.mainStream,
  };
};

// 'export default connect(mapStateToProps)(Participants);' is using the connect function provided by the react-redux library to connect a React component, in this case, Participants, to the Redux store.
export default connect(mapStateToProps)(Participants);
// Basically it connects your 'Participants' component to a magical storage (Redux store) where your app keeps important data. It also provides a way for 'Participants' to send requests fetch(no change as we have no dispact) that data.
