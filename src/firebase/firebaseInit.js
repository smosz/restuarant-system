// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore';
import { getStorage } from "firebase/storage";
import { getMessaging,getToken,onMessage } from "firebase/messaging";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCiZ7xUAM0ZJ21cRklz6_gjHDchdI5dAME",
  authDomain: "test-7f571.firebaseapp.com",
  projectId: "test-7f571",
  storageBucket: "test-7f571.appspot.com",
  messagingSenderId: "205250354337",
  appId: "1:205250354337:web:9f2e966a7372624388a4e0"
};

// Create a new Firebase project configuration for registration
const firebaseConfigForRegistration = {
  apiKey: "AIzaSyCiZ7xUAM0ZJ21cRklz6_gjHDchdI5dAME",
  authDomain: "test-7f571.firebaseapp.com",
  projectId: "test-7f571",
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