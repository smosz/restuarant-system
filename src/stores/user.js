import { defineStore } from 'pinia';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null,
    username: '',
  }),
  getters: {
    isAuthenticated: (state) => !!state.user,
  },
  actions: {
    async initializeUser() {
      // Set up the Firebase Authentication state change listener
      firebase.auth().onAuthStateChanged(async (firebaseUser) => {
        if (firebaseUser) {
          // User is signed in
          this.user = firebaseUser;
          const userDoc = await firebase
            .firestore()
            .collection('users')
            .doc(firebaseUser.uid)
            .get();

          if (userDoc.exists) {
            this.username = userDoc.data().Username;
          } else {
            // Handle the case where user data doesn't exist
          }
        } else {
          // User is signed out
          this.user = null;
          this.username = '';
        }
      });
    },
  },
});
