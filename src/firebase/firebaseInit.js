// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore';
import { getStorage } from "firebase/storage";
<<<<<<< HEAD




// import { getDatabase, ref, onDisconnect } from "firebase/database";zz
=======
import { getAnalytics } from "firebase/analytics";
// import { getDatabase, ref, onDisconnect } from "firebase/database";
>>>>>>> 868b9b0e63871cce18fc0ae7d8bd79e63a7fd462
const firebaseConfig = {
  apiKey: "AIzaSyDZ-5OjKQlrNMqqLik-_SQNoXSwcy4YFHU",
authDomain: "poss-f59bf.firebaseapp.com",
projectId: "poss-f59bf",
storageBucket: "poss-f59bf.appspot.com",
messagingSenderId: "656641009076",
appId: "1:656641009076:web:aef697b7a592c80bfb3ee1"
};
// Create a new Firebase project configuration for registration
const firebaseConfigForRegistration = {
  apiKey: "AIzaSyDZ-5OjKQlrNMqqLik-_SQNoXSwcy4YFHU",
authDomain: "poss-f59bf.firebaseapp.com",
projectId: "poss-f59bf",
storageBucket: "poss-f59bf.appspot.com",
messagingSenderId: "656641009076",
appId: "1:656641009076:web:aef697b7a592c80bfb3ee1"
  // Add other Firebase config options
};

// Initialize a separate Firebase Authentication instance
const firebaseAuthForRegistration = firebase.initializeApp(
  firebaseConfigForRegistration,
  "registration"
).auth();
// // Initialize the Firebase Realtime Database
// const dbs = getDatabase();

// // Define a reference to the location in the database where you want to write the disconnect message
// const presenceRef = ref(dbs, "disconnectmessage");

// // Write a string when this client loses connection
// onDisconnect(presenceRef).set("I disconnected!");


const firebaseApp = firebase.initializeApp(firebaseConfig)
const db = firebase.firestore();
const storage = getStorage(firebaseApp);

export{
  firebaseApp,db,storage,firebaseAuthForRegistration
}