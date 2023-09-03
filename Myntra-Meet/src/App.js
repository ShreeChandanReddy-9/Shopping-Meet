import MainScreen from "./components/MainScreen/MainScreen.component";
import firepadRef, { db, userName } from "./server/firebase";
import "./App.css";
import React,{ useEffect } from "react";
import {
  setMainStream,
  addParticipant,
  setUser,
  removeParticipant,
  updateParticipant,
} from "./store/actioncreator";
import { connect } from "react-redux";

// App component initializes media streams, connects to Firebase, and manages participants' preferences and actions based on changes in user and stream availability. It also renders the main content of the application, the MainScreen component.
// 'props' as parameter, which will be used to access properties and dispatch actions.
function App(props) {
  // asynchronous function called getUserStream. It uses the navigator.mediaDevices.getUserMedia method to request access to the user's microphone and camera. It returns a localStream representing the user's audio and video stream.
  const getUserStream = async () => {
    const localStream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true,
    });

    return localStream;
  };
  // 'useEffect' hook that runs when the component mounts. 
  useEffect(async () => {
    // calls the getUserStream function to get the user's media stream and stores it in the stream variable.
    const stream = await getUserStream();
    // Disabling the user's video track initially by accessing the first video track in the stream and setting its enabled property to false.
    stream.getVideoTracks()[0].enabled = false;
    // props.setMainStream(stream);: Dispatches the setMainStream action with the stream as the payload to set the main stream in the Redux store.
    props.setMainStream(stream);

    //  It listens to changes in the Firebase '.info/connected' node to detect if the user is connected to the Firebase Realtime Database
    connectedRef.on("value", (snap) => {
      if (snap.val()) {
        //If the user is connected:
        //It defines a defaultPreference object for user preferences (audio on, video off, screen sharing off).
        const defaultPreference = {
          audio: true,
          video: false,
          screen: false,
        };
        // It pushes user information to the participantRef in Firebase, including their name and default preferences.
        const userStatusRef = participantRef.push({
          userName,
          preferences: defaultPreference,
        });
        props.setUser({
          [userStatusRef.key]: { name: userName, ...defaultPreference },
        });
        // It sets an "onDisconnect" callback to remove the user's data from Firebase when they disconnect.
        userStatusRef.onDisconnect().remove();
      }
    });
  }, []);
  // const connectedRef = db.database().ref(".info/connected");: Creates a reference to the Firebase Realtime Database node .info/connected, which is used to check the user's connection status.
  const connectedRef = db.database().ref(".info/connected");
  // const participantRef = firepadRef.child("participants");: Creates a reference to the Firebase database node where participant data is stored.
  const participantRef = firepadRef.child("participants");

  // if the 'user' property exists in the component's props and assigns true or false accordingly.
  const isUserSet = !!props.user;
  // if the stream property exists in the component's props and assigns true or false accordingly.
  const isStreamSet = !!props.stream;

  // useEffect hook that runs when either 'isStreamSet' or 'isUserSet' changes. 
  useEffect(() => {
    if (isStreamSet && isUserSet) {
      // participantRef.on("child_added", (snap) => { ... }): This event listener triggers when a new participant is added to the "participants" node in Firebase. It captures the participant's data snapshot as snap.
      participantRef.on("child_added", (snap) => {
        // It creates a reference 'preferenceUpdateEvent' to the "preferences" node for the current participant.
        const preferenceUpdateEvent = participantRef
          .child(snap.key)
          .child("preferences");
        // Listens for the "child_changed" event on the "preferences" node. When a preference changes, it dispatches the "updateParticipant" action with the updated preference.
        preferenceUpdateEvent.on("child_changed", (preferenceSnap) => {
          props.updateParticipant({
            [snap.key]: {
              [preferenceSnap.key]: preferenceSnap.val(),
            },
          });
        });
        // Extracting the participant's name and preferences from the data snapshot and assigns them to name and preferences.
        const { userName: name, preferences = {} } = snap.val();
        // dispatches the "addParticipant" action with an object containing the participant's ID as the key and their name and preferences as the value.
        props.addParticipant({
          [snap.key]: {
            name,
            ...preferences,
          },
        });
      });
      // the "child_removed" event listener dispatches the "removeParticipant" action with the removed participant's ID.
      participantRef.on("child_removed", (snap) => {
        props.removeParticipant(snap.key);
      });
    }
  }, [isStreamSet, isUserSet]);

  return (
    <div className="App">
      <MainScreen />
    </div>
  );
}

// Maps the state from the Redux store to the props of the connected component (App). It takes the state as its parameter, which represents the current state of the Redux store.
const mapStateToProps = (state) => {
  return {
    // Maps the 'mainStream' property from the Redux store's state to the stream prop of the App component. This allows the App component to access the user's video stream from the Redux store.
    stream: state.mainStream,
    // Maps the 'currentUser' property from the Redux store's state to the user prop of the App component. This provides the App component with information about the current user.
    user: state.currentUser,
  };
};

// Maps action creators to props, allowing the connected component to dispatch Redux actions. It takes dispatch as its parameter, which is a function used to dispatch actions to the Redux store.
const mapDispatchToProps = (dispatch) => {
  return {
    // Maps the 'setMainStream' action creator to the 'setMainStream' prop. This action is used to set the main video stream in the Redux store.
    setMainStream: (stream) => dispatch(setMainStream(stream)),
    //  Maps the 'addParticipant' action creator to the 'addParticipant' prop. This action is used to add a new participant to the Redux store.
    addParticipant: (user) => dispatch(addParticipant(user)),
    // Maps the 'setUser' action creator to the 'setUser' prop. This action is used to set user information in the Redux store.
    setUser: (user) => dispatch(setUser(user)),
    // Maps the 'removeParticipant' action creator to the 'removeParticipant' prop. This action is used to remove a participant from the Redux store.
    removeParticipant: (userId) => dispatch(removeParticipant(userId)),
    // Maps the 'updateParticipant' action creator to the 'updateParticipant' prop. This action is used to update participant information in the Redux store.
    updateParticipant: (user) => dispatch(updateParticipant(user)),
  };
};

// Connect is a higher-order function provided by the react-redux library. It takes two function calls as arguments: mapStateToProps and mapDispatchToProps. The first function, mapStateToProps, specifies how to map the state from the Redux store to the component's props. The second function, mapDispatchToProps, specifies how to map action creators to the component's props.When you call connect(mapStateToProps, mapDispatchToProps)(App), it returns a new component that is connected to the Redux store. This connected component receives the specified props and can dispatch actions.
export default connect(mapStateToProps, mapDispatchToProps)(App);

// The 'App' component to the Redux store, allowing it to access data from the store (via mapStateToProps) and dispatch actions (via mapDispatchToProps). This connection is established using the connect function from react-redux, making it easier to manage and update application state in response to user interactions and data changes.

