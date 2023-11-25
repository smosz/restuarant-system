// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore';
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";
// import { getDatabase, ref, onDisconnect } from "firebase/database";
const firebaseConfig = {
  apiKey: "AIzaSyAi8icuYtYEMqfxHJyDBGvySeWvxoTiP-Q",
  authDomain: "impress---pos.firebaseapp.com",
  projectId: "impress---pos",
  storageBucket: "impress---pos.appspot.com",
  messagingSenderId: "561877123322",
  appId: "1:561877123322:web:f10a1e4f1d93ba74c00943"
};
// Create a new Firebase project configuration for registration
const firebaseConfigForRegistration = {
  apiKey: "AIzaSyAi8icuYtYEMqfxHJyDBGvySeWvxoTiP-Q",
  authDomain: "impress---pos.firebaseapp.com",
  projectId: "impress---pos",
  storageBucket: "impress---pos.appspot.com",
  messagingSenderId: "561877123322",
  appId: "1:561877123322:web:f10a1e4f1d93ba74c00943"
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
const analytics = getAnalytics(firebaseApp);
export{
  firebaseApp,db,storage,firebaseAuthForRegistration,analytics
}