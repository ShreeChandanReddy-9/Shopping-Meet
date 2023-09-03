import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMicrophone,
  faVideo,
  faDesktop,
  faVideoSlash,
  faMicrophoneSlash,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";
import ReactTooltip from "react-tooltip";
import "./MeetingFooter.css";
const MeetingFooter = (props) => {
  // streamState is initialized as an object with three properties: 'mic', 'video', and 'screen', each of which is assigned an initial boolean value.
  const [streamState, setStreamState] = useState({
    mic: true,
    video: false,
    screen: false,
  });
  //  When 'micClick' is called, it toggles the microphone state in the streamState object, ensuring that the microphone can be turned on and off within the React component by calling this function. The setStreamState function ensures that the component re-renders with the updated state, reflecting any changes in the UI.
  const micClick = () => {
    setStreamState((currentState) => {
      return {
        // the spread operator ({ ...currentState }) is used to create a shallow copy of the current state object. The spread operator is used to create a new object with the same properties as the currentState object. This is done to ensure that we don't directly mutate the state object, which is a best practice in React.
        ...currentState,
        mic: !currentState.mic,
      };
    });
  };

  // Similarly for 'onVideoClick'
  const onVideoClick = () => {
    setStreamState((currentState) => {
      return {
        ...currentState,
        video: !currentState.video,
      };
    });
  };

  // Related to enabling or disabling screen sharing
  const onScreenClick = () => {
    props.onScreenClick(setScreenState);
  };
  // 'setScreenState', it uses the 'setStreamState' function, which is a React state updater function (from useState). It updates the state by creating a new object using the spread syntax (...currentState) to copy(Shallow) the existing state and then overrides the screen property with the value of isEnabled.
  const setScreenState = (isEnabled) => {
    setStreamState((currentState) => {
      return {
        ...currentState,
        screen: isEnabled,
      };
    });
  };

  // monitoring changes in the 'streamState.mic' value, as indicated by the dependency array [streamState.mic]. When the 'streamState.mic' value changes (i.e., when the microphone state is toggled), this effect is triggered. It then calls 'props.onMicClick'.(streamState.mic)
  useEffect(() => {
    props.onMicClick(streamState.mic);
  }, [streamState.mic]);

  //  monitoring changes in the 'streamState.video' value, indicated by the [streamState.video] dependency array. When the 'streamState.video' value changes (i.e., when the video state is toggled), this effect is triggered. It then calls         'props.onVideoClick(streamState.video)'.
  useEffect(() => {
    props.onVideoClick(streamState.video);
  }, [streamState.video]);

  
  return (
    <div className="meeting-footer">
      <div
        className={"meeting-icons " + (!streamState.mic ? "active" : "")}
        data-tip={streamState.mic ? "Mute Audio" : "Unmute Audio"}
        onClick={micClick}
      >
        <FontAwesomeIcon
          icon={!streamState.mic ? faMicrophoneSlash : faMicrophone}
          title="Mute"
        />
      </div>
      <div
        className={"meeting-icons " + (!streamState.video ? "active" : "")}
        data-tip={streamState.video ? "Hide Video" : "Show Video"}
        onClick={onVideoClick}
      >
        <FontAwesomeIcon icon={!streamState.video ? faVideoSlash : faVideo} />
      </div>
      <div
        className="meeting-icons"
        data-tip="Share Screen"
        onClick={onScreenClick}
        disabled={streamState.screen}
      >
        <FontAwesomeIcon icon={faDesktop} />
      </div>
      <ReactTooltip />
    </div>
  );
};

export default MeetingFooter;