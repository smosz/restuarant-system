// import { createStore } from 'vuex'
// import firebase from "firebase/compat/app";
// import "firebase/compat/auth";
// const store = createStore({
//     // state: {
//     //     user: {
//     //         loggedIn: false,
//     // data: null
//     //     }
//     // },
//     // getters: {
//     //     user(state) {
//     //         return state.user
//     //     }
//     // },
//     // mutations: {
//     //     SET_LOGGED_IN(state, value) {
//     //         state.user.loggedIn = value;
//     //     },
//     //     SET_USER(state, data) {
//     //         state.user.data = data;
//     //     }
//     // },
//     // actions: {
//     //     async signUp(context, { email, password, username }) {
//     //         const firebaseAuth = await firebase.auth();
//     //         const response = await firebaseAuth.createUserWithEmailAndPassword(
//     //             email,
//     //             password
//     //         )
//     //         if (response) {
//     //             context.commit('SET_USER', response.user)
//     //             response.user.updateProfile({ Username: username });

//     //         } else {
//     //             throw new Error('Unable to register user')
//     //         }
//     //     },

//     //     async logIn(context, { email, password }) {
//     //         const response = await firebase
//     //             .auth()
//     //             .signInWithEmailAndPassword(email, password)
//     //         if (response) {
//     //             context.commit('SET_USER', response.user)
//     //         } else {
//     //             throw new Error('login failed')
//     //         }
//     //     },

//     //     async logOut(context) {
//     //         await firebase
//     //             .auth().signOut()
//     //         context.commit('SET_USER', null)
//     //     },

//     //     async fetchUser(context, user) {
//     //         context.commit("SET_LOGGED_IN", user !== null);
//     //         if (user) {
//     //             const dataBase = await db.collection('users').doc(firebase.auth().currentUser.uid)
//     //             const dbResults = await dataBase.get()
//     //             context.commit("SET_USER", dbResults);
//     //         } else {
//     //             context.commit("SET_USER", null);
//     //         }
//     //     },
//     // }
//     state: {
//         // user: null,
//         // profileEmail: null,
//         // profileUsername: null,
//         // profileId: null,
//         // profileInitials: null,
//         user: {
//             loggedIn: false,
//             data: {
//                 profileEmail: null,
//                 profileUsername: null,
//             }
//         }
//     },
//     getters: {
//         user(state) {
//             return state.user
//         }
//     },
//     mutations: {
//         // setProfileInfo(state, payload) {
//         //     // state.profileId = payload.id
//         //     state.profileEmail = payload.data().email
//         //     state.profileUsername = payload.username
//         // },
//         // updateUser(state, payload) {
//         //     state.user = payload
//         // },
//         SET_LOGGED_IN(state, value) {
//             state.user.loggedIn = value;
//         },
//         SET_USER(state, doc) {
            
//             state.user.data.profileEmail = doc;
//             state.user.data.profileUsername = doc;
//         }
//         // setProfileInitials(state) {
//         //     state.profileInitials = state.profileUsername.match(/(\b\S)?/g).join("")

//         // }
//     },

//     actions: {
//         async getCurrentUser({ commit }) {
//             const db = firebase.firestore();
//             const dataBase = await db.collection('users').get()

//             commit("SET_USER", dataBase)
//         },
//         async logOut(context) {
//             await firebase
//                 .auth().signOut()
//             context.commit('SET_USER', null)
//         },
//     }
// })
// export default store