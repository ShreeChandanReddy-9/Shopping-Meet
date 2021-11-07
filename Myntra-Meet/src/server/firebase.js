import firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";
var firebaseConfig = {
  databaseURL:"https://myntra-meet-default-rtdb.firebaseio.com/", // Add databaseURL,
  apiKey: "AIzaSyCG2MzwPgvcgy5qkGKLy4k-7nXrUtHnd2E",
  authDomain: "myntra-meet.firebaseapp.com",
  projectId: "myntra-meet",
  storageBucket: "myntra-meet.appspot.com",
  messagingSenderId: "314285805616",
  appId: "1:314285805616:web:fbf5377129894c35549df5"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const db = firebase;
export const storage = firebase.storage();

var firepadRef = firebase.database().ref();

let username = " ";
function requiredPrompt() {
        username = prompt("What's your name?");
        if(username==null||username.replace(/\s/g,"") === ""){
          requiredPrompt();
        }
    }
requiredPrompt();
username=username.replace(/\s/g,"");
export const userName = username;
const urlparams = new URLSearchParams(window.location.search);
const roomId = urlparams.get("id");

if (roomId) {
  firepadRef = firepadRef.child(roomId);
} else {
  firepadRef = firepadRef.push();
  window.history.replaceState(null, "Meet", "?id=" + firepadRef.key);
}

export default firepadRef;
