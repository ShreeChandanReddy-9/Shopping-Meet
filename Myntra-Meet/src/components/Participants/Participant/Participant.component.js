import React from "react";
import Card from "../../card/Card.component";
import { faMicrophoneSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Participant.css";

export const Participant = (props) => {

  const {
    curentIndex,
    currentParticipant,
    hideVideo,
    videoRef,
    showAvatar,
    currentUser,
  } = props;
  // If there is no currentParticipant (possibly when a participant leaves the meeting), the component returns an empty fragment (<></>), effectively rendering nothing.
  if (!currentParticipant) return <></>;
  return (
    <div className={`participant ${hideVideo ? "hide" : ""}`}>
      <Card>
        <video
        //The 'ref' attribute in React is used to create a reference to a DOM (Document Object Model) element, such as an HTML element like a video element in this case.
          ref={videoRef}  //'ref={videoRef}': reference to the <video> element using the 'videoRef' prop passed to the Participant component. This allows you to access and manipulate the properties and methods of this specific video element elsewhere in your code.
          className="video"
          id={`participantVideo${curentIndex}`} // Set the unique HTML id attribute of the video element
          autoPlay
          playsInline
        ></video>

        {/* Display a muted microphone icon if 'currentParticipant.audio' is false */}
        {!currentParticipant.audio && (
          <FontAwesomeIcon
            className="muted"
            icon={faMicrophoneSlash}
            title="Muted"
          />
        )}
        {showAvatar && (
          <div
            style={{ background: currentParticipant.avatarColor }} //Set the background color based on participant's avatarColor which is generated in store>reducer.js
            className="avatar"
          >
            {currentParticipant.name[0]} 
            {/* // Display the first character of the participant's name as the avatar. */}
          </div>
        )}
        <div className="name">         
        {/* // Display the participant's name */}
          {currentParticipant.name}
          {currentUser ? "(You)" : ""} 
          {/* // If currentUser is true, display "(You)" next to the name */}
        </div>
      </Card>
    </div>
  );
};





