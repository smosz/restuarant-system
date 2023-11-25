import { defineStore } from 'pinia';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

// Define the Firestore database reference
const db = firebase.firestore();

export const useUserStore = defineStore('user', {
  state: () => ({
    user: '', // You can store the currently logged-in user here
    username: '',
    emailVerified : false,
    isPhoneVerified: false,
    users: [],
    loggedInUserData: [], // Add an array to store user data when logged in
  }),
  getters: {
    isAuthenticated: (state) => !!state.user,
  },
  actions: {
    async initializeUser() {
      // Set up the Firebase Authentication state change listener
      firebase.auth().onAuthStateChanged(async (firebaseUser) => {
        if (firebaseUser) {
          this.username = firebaseUser.displayName;
          this.emailVerified = firebaseUser.emailVerified;
          this.isPhoneVerified = firebaseUser.phoneVerified;

          // Fetch and store user data when logged in
          await this.fetchLoggedInUserData(firebaseUser.uid);
        } else {
          // Clear user data when no user is authenticated
          this.username = '';
          this.loggedInUserData = [];
        }
      });
    },

    async fetchUsers() {
      try {
        const usersSnapshot = await db.collection("users").get();
        this.users = usersSnapshot.docs.map((doc) => doc.data());
      } catch (error) {
        // Handle any errors that occur during the fetch
        window.alert('Error fetching users');
        throw error; // Optionally rethrow the error for the component to handle
      }
    },

    // Function to delete the User
    async deleteUser() {
      try {
        // Use Firebase to delete the User from Firestore
        await db.collection("users").doc().delete();
        // Show a success message or perform any other actions if needed
        window.alert("User deleted successfully");
      } catch (error) {
        // Handle the error
        window.alert("Error deleting User");
      }
    },

    // Function to fetch and store logged-in user data
    async fetchLoggedInUserData(userId) {
      try {
        const userDoc = await db.collection("users").doc(userId).get();
        if (userDoc.exists) {
          const userData = userDoc.data();
          this.loggedInUserData = userData;
        } else {
          this.loggedInUserData = [];
        }
      } catch (error) {
        // Handle any errors that occur during the fetch
        window.alert('Error fetching logged-in user data');
        throw error;
      }
    },
    async signOut() {
      try {
         // Get the current date and time
  const currentDateTime = new Date();

// Format the date as "dd-mm-yyyy"
const formattedDate = `${currentDateTime.getDate()}-${
  currentDateTime.getMonth() + 1
}-${currentDateTime.getFullYear()}`;

// Format the time in 12-hour clock format
const hours = currentDateTime.getHours();
const minutes = currentDateTime.getMinutes();
const amOrPm = hours >= 12 ? "PM" : "AM";
const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
const formattedTime = `${formattedHours}:${formattedMinutes} ${amOrPm}`;
       const user= firebase.auth().currentUser;
       await firebase.firestore().collection("users").doc(user.uid).update({
        lastSignOutDate: formattedDate ,
        lastSignOutTime: formattedTime
      });
        console.log(user)
        await firebase.auth().signOut(); // Sign out the user using Firebase Authentication
    //      // Update the lastLogin field in Firestore
    //      console.log(this.user)
    
        // this.user = null; // Clear the user data in the store
        this.loggedInUserData = {}; // Clear the logged-in user data
        window.location.href = '/';
      } catch (error) {
        // Handle any errors that occur during sign-out
        window.alert('Error signing out');
        throw error;
      }
    },
    async login(email, password) {
      try {
        await firebase.auth().signInWithEmailAndPassword(email, password);
        // Only update user state upon successful login
        this.user = firebase.auth().currentUser;
        window.location.href = '/';
      } catch (error) {
        window.alert('Login error');
        throw error;
      }
    },
  },
});
