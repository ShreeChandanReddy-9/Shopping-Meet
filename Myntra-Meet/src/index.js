import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { userReducer } from "./store/reducer";

// Create a Redux Store: The code creates a Redux store using the createStore function from Redux. It passes the userReducer to the store, which will handle state updates based on various actions.
export const store = createStore(userReducer);
/*
ReactDOM.render(): This function is used to render the React application into the HTML DOM. It takes the following parameters:

-> <React.StrictMode>: This is a wrapper component used for highlighting potential problems in the application during development. It doesn't affect the production build.
-> <Provider store={store}>: This is a higher-order component provided by React Redux. It wraps the entire application and provides access to the Redux store to all components within the application. The store prop is set to the Redux store we created earlier.
-> <App />: This is the main component of the application, and it represents the root of the React component tree.
-> document.getElementById("root"): This specifies the DOM element where the React application should be rendered. In this case, it looks for an element with the ID "root" in the HTML file.
*/
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
// reportWebVitals(): This is a function that reports various web vitals metrics for performance monitoring. It's provided by Create React App and helps developers identify performance issues.
reportWebVitals();
