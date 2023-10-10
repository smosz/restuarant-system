// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore';
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";

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

const firebaseApp = firebase.initializeApp(firebaseConfig)
const db = firebase.firestore();
const storage = getStorage(firebaseApp);
const analytics = getAnalytics(firebaseApp);
export{
  firebaseApp,db,storage,firebaseAuthForRegistration,analytics
}