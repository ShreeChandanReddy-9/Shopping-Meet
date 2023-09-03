// action types are typically used in Redux to specify the type of action that should be performed when you dispatch an action.
// These action types are used in your Redux actions to specify the type of action you want to perform. When you dispatch an action with one of these types, your Redux reducers will respond to these actions and update the state in your Redux store accordingly.
export const SET_MAIN_STREAM = "SET_MAIN_STREAM";
export const ADD_PARTICIPANT = "ADD_PARTICIPANT";
export const REMOVE_PARTICIPANT = "REMOVE_PARTICIPANT";
export const SET_USER = "SET_USER";
export const UPDATE_USER = "UPDATE_USER";
export const UPDATE_PARTICIPANT = "UPDATE_PARTICIPANT";
export const SET_MESSAGES = "SET_MESSAGES"