import React, { useRef, useEffect } from "react";
import MeetingFooter from "../MeetingFooter/MeetingFooter.component";
import Participants from "../Participants/Participants.component";
import "./MainScreen.css";
import { connect } from "react-redux";
import { setMainStream, updateUser } from "../../store/actioncreator";

//  Functional component named 'MainScreen' that takes props as its parameter.
const MainScreen = (props) => {
  // Creates a ref called participantRef initialized with the props.participants value. This ref will be used to store a reference to the participants.
  const participantRef = useRef(props.participants);

  // 'onMicClick' function that toggles the microphone's audio on or off based on the micEnabled parameter.
  const onMicClick = (micEnabled) => {
    // props.stream is an object containing the user's audio and video stream for a video call.
    if (props.stream) {
      // Accessing the first element ([0]) of the audio tracks is a common practice when dealing with audio and video tracks in WebRTC, because we just targeting the audio stream coming from the user's microphone, not any other audio sources like the screen, etc.
      props.stream.getAudioTracks()[0].enabled = micEnabled;
      props.updateUser({ audio: micEnabled });
    }
  };
  //  'onVideoClick' function that toggles the user's video on or off based on the videoEnabled parameter.
  const onVideoClick = (videoEnabled) => {
    if (props.stream) {
      // We access the first element [0] of this array because typically, in a video call scenario, there is only one video track, representing the user's camera feed. By accessing the first element, we are effectively targeting the user's camera feed.
      props.stream.getVideoTracks()[0].enabled = videoEnabled;
      props.updateUser({ video: videoEnabled });
    }
  };
// 'useEffect' hook to update the participantRef.current whenever the props.participants change.
  useEffect(() => {
    participantRef.current = props.participants;
  }, [props.participants]);

  const updateStream = (stream) => {
    // Loop through each participant in `participantRef.current`
    for (let key in participantRef.current) {
    // Get the sender object for the current participant
      const sender = participantRef.current[key];
    // Check if the current participant is the currentUser, and if so, skip to the next participant
      if (sender.currentUser) continue;
    // Get the peerConnection object for the current participant and find the sender associated with video tracks
      const peerConnection = sender.peerConnection
        .getSenders()
        .find((s) => (s.track ? s.track.kind === "video" : false));
      //finds the sender that is associated with video tracks It then replaces the video track in the sender with the video track from the stream parameter. This effectively updates the video being sent by that participant with the latest video track from the 'stream'. Camera will be in on-status but when the user toggles the camera to on then only we send the video stream.

      // ******** SCOPE OF IMPROVEMENT == Only on camera when user toggels camera to on ******* //
      peerConnection.replaceTrack(stream.getVideoTracks()[0]);
    }
    // Set the main video stream to the `stream` parameter
    props.setMainStream(stream);
  };
  //Handle ending a screen sharing session.
  /*It stops the user's screen sharing video stream and restores their camera video stream based on the value in props.currentUser.
It then updates the video stream that is being sent to other participants (likely using the updateStream function).
Finally, it updates the user's status to indicate that screen sharing is no longer active.*/
  const onScreenShareEnd = async () => {
    // 'navigator.mediaDevices.getUserMedia' method to request access to the user's media devices, specifically audio and video.
    // 'localStream' that represents the user's audio and video stream, which will be used when screen sharing ends.
    const localStream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true,
    });

    localStream.getVideoTracks()[0].enabled = Object.values(
      props.currentUser
    )[0].video;
    localStream.getAudioTracks()[0].enabled = Object.values(
      props.currentUser
    )[0].audio;
    updateStream(localStream);
    // to update the user's status,indicating that the screen sharing session has ended.
    props.updateUser({ screen: false });
  };
  // Start a screen sharing session
  /* It checks for compatibility with different screen sharing methods.
    It obtains the user's screen sharing media stream.
    It sets an event handler to detect when the screen sharing session ends.
    It updates the video stream that is being sent to others or updates the user's own video feed.
    It updates the user's status to indicate that they are screen sharing. */
  const onScreenClick = async () => {
    // 'mediaStream'  will store the user's screen sharing media stream.
    let mediaStream;
    // ***Screen Sharing Method Selection***
    //The code checks for different methods of obtaining a screen sharing stream, depending on the browser's compatibility.
    // Which ever method is available that is used for sharing screen.
    // Depending on the method available, the code awaits the user's permission to access the screen sharing media stream.
    if (navigator.getDisplayMedia) {
      mediaStream = await navigator.getDisplayMedia({ video: true });
    } else if (navigator.mediaDevices.getDisplayMedia) {
      mediaStream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
      });
    } else {
      mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { mediaSource: "screen" },
      });
    }
    //  Set an event handler for the 'onended' event of the first video track in the mediaStream. This event handler is set to a function called 'onScreenShareEnd'. It's used to detect when the screen sharing session ends.
    mediaStream.getVideoTracks()[0].onended = onScreenShareEnd;
    //  Updates the video stream that is being sent to other participants or updates the user's own video feed with the screen sharing stream.
    updateStream(mediaStream);
    //  Used to update the user's status to indicate that they are currently screen sharing.
    props.updateUser({ screen: true });
  };
  return (
    <div className="wrapper">
      <div className="mainScreen">
        <Participants />
      </div>

      <div className="footer">
        <MeetingFooter
          onScreenClick={onScreenClick}
          onMicClick={onMicClick}
          onVideoClick={onVideoClick}
        />
      </div>
      <div class="main__right">
      <div class="main__chat_window">
          <div class="messages">

          </div>
      </div>
    </div>
    </div>
  );
};
// This function is used to map specific parts of the Redux state to the props of a React component i.e 'mapStateToProps' is used when connecting a React component to the Redux store and you're specifying which parts of the store's state should be accessible to your component as props. This makes it easy for your component to access and display the data it needs from the Redux store.
// 'state' represents the Redux state object.
const mapStateToProps = (state) => {
  return {
    // Ihe mainStream property from the Redux state available as a prop named stream in your component. So, your component can access this data as this.props.stream.
    stream: state.mainStream,
    participants: state.participants,
    currentUser: state.currentUser,
  };
};
// This allows the connected component to access the 'mainStream','participants','currentUser' property from the Redux store.


// The 'mapDispatchToProps' function is used in a Redux-connected component to specify what actions should be available as props in that component.
// 'dispatch'  parameter is a function provided by Redux that allows you to dispatch actions to update the state in the Redux store.
// The function's return value is an object that you define. Each property in this object corresponds to a prop that you want to make available to your React component, and the property's value is a function that dispatches a specific action.
const mapDispatchToProps = (dispatch) => {
  return {
    // Creates a prop named 'setMainStream' in your component. When you call 'this.props.setMainStream(stream)' in your component, it dispatches the setMainStream action with the stream argument. This action typically updates the mainStream property in the Redux store.
    setMainStream: (stream) => dispatch(setMainStream(stream)),
    // When you call this.props.updateUser(user) in your component, it dispatches the updateUser action with the user argument. This action is used to update the user-related data in the Redux store.
    updateUser: (user) => dispatch(updateUser(user)),
  };
};
// mapDispatchToProps, you're allowing your React component to dispatch specific actions that can update the Redux store. This is crucial for managing and maintaining the application's state in a centralized manner.



// connecting 'MainScreen' React component to a Redux store, allowing it to access data from the store's state and dispatch actions to update that state.
// 'connect(mapStateToProps, mapDispatchToProps)' is a function provided by the react-redux library that connects your React component to the Redux store. It takes two functions as arguments: 'mapStateToProps' specifies which data from the store's state should be available as props in MainScreen and 'mapDispatchToProps' specifies which actions can be triggered from MainScreen to update the store.
// Then pass your 'MainScreen' component as an argument to connect. By this we "wrap" your component with Redux functionality
export default connect(mapStateToProps, mapDispatchToProps)(MainScreen);

// Basically it connects your MainScreen component to a magical storage (Redux store) where your app keeps important data. It also provides a way for MainScreen to send requests to change or fetch that data.

// 'mapStateToProps' is primarily for reading data from the store, and if you want to dispatch actions to change the store, you would need to use 'mapDispatchToProps'.