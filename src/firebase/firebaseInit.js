// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore';
import { getStorage } from "firebase/storage";




// import { getDatabase, ref, onDisconnect } from "firebase/database";zz
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


const firebaseApp = firebase.initializeApp(firebaseConfig)
const db = firebase.firestore();
const storage = getStorage(firebaseApp);

export{
  firebaseApp,db,storage,firebaseAuthForRegistration
}