import {
  SET_MAIN_STREAM,
  ADD_PARTICIPANT,
  SET_USER,
  REMOVE_PARTICIPANT,
  UPDATE_USER,
  UPDATE_PARTICIPANT,
  SET_MESSAGES,
} from "./actiontypes";

// export const setMainStream = (stream) => { ... }: This line exports a function called 'setMainStream'. It's a named export, which means you can import and use this function in other parts of your code.
export const setMainStream = (stream) => {
  return {
    // action object
    // 'type: SET_MAIN_STREAM': This specifies the type of action you are performing. In this case, it's set to 'SET_MAIN_STREAM', which corresponds to the action type you defined earlier in your 'actionTypes.js' file.
    type: SET_MAIN_STREAM,
    //  The payload property of the action object typically contains data associated with the action. Here, you're passing the 'stream' as the 'mainStream' property within the payload. This allows you to update the main video stream in your Redux store with the provided 'stream'.
    payload: {
      mainStream: stream,
    },
  };
};

export const setUser = (user) => {
  return {
    type: SET_USER,
    payload: {
      currentUser: user,
    },
  };
};

export const addParticipant = (user) => {
  return {
    type: ADD_PARTICIPANT,
    payload: {
      newUser: user,
    },
  };
};

export const updateUser = (user) => {
  return {
    type: UPDATE_USER,
    payload: {
      currentUser: user,
    },
  };
};

export const updateParticipant = (user) => {
  return {
    type: UPDATE_PARTICIPANT,
    payload: {
      newUser: user,
    },
  };
};

export const removeParticipant = (userId) => {
  return {
    type: REMOVE_PARTICIPANT,
    payload: {
      id: userId,
    },
  };
};

export const setMessages = (messages) => {
  return {
    type: SET_MESSAGES,
    payload:{
      message:messages,
    }
  };
};

