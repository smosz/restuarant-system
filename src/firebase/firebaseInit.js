// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getStorage } from "firebase/storage";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCiZ7xUAM0ZJ21cRklz6_gjHDchdI5dAME",
  authDomain: "test-7f571.firebaseapp.com",
  projectId: "test-7f571",
  storageBucket: "test-7f571.appspot.com",
  messagingSenderId: "205250354337",
  appId: "1:205250354337:web:9f2e966a7372624388a4e0"
};
// Initialize Firebase
// const app = initializeApp(firebaseConfig);
// Initialize Cloud Firestore and get a reference to the service
// const db = getFirestore(app);
// export default{
//     db
// } 

const firebaseApp = firebase.initializeApp(firebaseConfig)
const db = firebase.firestore();

const authInstance = getAuth(firebaseApp);
const storage = getStorage(firebaseApp);
onAuthStateChanged(authInstance, user => console.log(user));

export{
  firebaseApp,db,storage
}