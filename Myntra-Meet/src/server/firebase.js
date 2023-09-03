import firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";

// object contains configuration settings for connecting to Firebase
// {more details below}
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
// Initializes the Firebase SDK with the configuration settings specified in the firebaseConfig object. It tells Firebase how to connect to your Firebase project, including which project to use and the associated authentication credentials.
firebase.initializeApp(firebaseConfig);
// exports the Firebase Authentication service. Firebase Authentication allows you to manage user authentication and provides features like sign-up, sign-in, password reset, and user management. By exporting 'auth', you can use it to handle user authentication within your application.
export const auth = firebase.auth();
// exports the entire Firebase SDK instance. It means you can use db to access various Firebase services, including the Realtime Database, Cloud Firestore, and more. It provides a convenient way to access Firebase services without having to import them individually.
export const db = firebase;
// exports the Firebase Cloud Storage service. Firebase Cloud Storage is used to store and retrieve files and media assets in the cloud. By exporting storage, you can interact with Firebase Cloud Storage to upload, download, and manage files within your app.
export const storage = firebase.storage();
// initializes a reference to the Firebase Realtime Database. The 'firebase.database().ref()' method returns a reference to the root of the database. This reference is stored in the firepadRef variable and can be used to interact with the database.
var firepadRef = firebase.database().ref();

let username = " ";

// Prompt dialog that asks the user for their name using prompt(). If the user provides an empty name (including whitespace characters) or clicks Cancel, the function will call itself recursively until a valid name is provided.
function requiredPrompt() {
        username = prompt("What's your name?");
        if(username==null||username.replace(/\s/g,"") === ""){
          requiredPrompt();
        }
    }
requiredPrompt();

// removes any whitespace characters from the 'username' string. It uses a regular expression (regex) to find and replace all whitespace characters globally (the g flag) with an empty string.
username=username.replace(/\s/g,"");

//  'username' variable as a constant named 'userName'. It makes the userName value available for use in other parts of your application by importing it.
export const userName = username;
// creates a new 'URLSearchParams' object based on the current URL's query parameters. It allows you to easily access and manipulate the query parameters in the URL.
const urlparams = new URLSearchParams(window.location.search);
// extracts the value of the "id" query parameter from the URL and stores it in the roomId variable, which can be useful for identifying specific rooms or resources.
const roomId = urlparams.get("id");

if (roomId) {
  // if roomId already exists then to move our reference pointer (firepadRef) to a specific location in the database identified by roomId.
  firepadRef = firepadRef.child(roomId);
} else {
  // If roomId is falsy (likely indicating that the user is creating a new room), this line generates a new unique child reference using Firebase's push() method. This creates a new node in the database with a unique key, effectively creating a new room or document.
  firepadRef = firepadRef.push();
  // 'window.history.replaceState(null, "Meet", "?id=" + firepadRef.key);': This line updates the browser's URL using the HTML5 History API. It replaces the current URL state with a new URL that includes the id parameter, set to the key of the newly generated child reference. This step ensures that users can share the URL with others, allowing them to access the same collaborative document or room.
  window.history.replaceState(null, "Meet", "?id=" + firepadRef.key);
}
//  exports the 'firepadRef' variable, which now points to either an existing room's Firebase reference or a newly created one.
export default firepadRef;









// ******** Firebase configuration settings ********* //
/*

databaseURL: This property specifies the URL of the Firebase Realtime Database that your application will use. In this case, it's set to "https://myntra-meet-default-rtdb.firebaseio.com/". The Realtime Database is a NoSQL, cloud-hosted database that allows you to store and sync data in real-time across clients.

apiKey: This property stores an API key that is used for authenticating requests to Firebase services from your web application. It's important to keep this API key secure, as it grants access to your Firebase project.

authDomain: This property specifies the domain associated with Firebase Authentication. It's used for configuring user authentication and sign-in.

projectId: The Firebase project ID uniquely identifies your Firebase project. This ID is associated with various Firebase services, such as the Realtime Database and Cloud Storage.

storageBucket: If you use Firebase Cloud Storage to store and serve user-generated content, this property specifies the storage bucket associated with your project.

messagingSenderId: This property is used for Firebase Cloud Messaging (FCM) and push notifications. It identifies the sender of messages to devices.

appId: The Firebase project's unique application ID. This identifier is associated with your specific application within the Firebase project.

*/