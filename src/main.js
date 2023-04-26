import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { Icon } from '@iconify/vue'
import Vue3Lottie from 'vue3-lottie'
import 'vue3-lottie/dist/style.css'
import 'maz-ui/css/main.css'
import MazInput from 'maz-ui/components/MazInput'
import MazPhoneNumberInput from 'maz-ui/components/MazPhoneNumberInput'
import './style.css'
// import store from "./store"
import firebase from "firebase/compat/app";
import "firebase/auth";
import "./firebase/firebaseInit";

let app;
firebase.auth().onAuthStateChanged((user) => {
    if (!app) {
        app = createApp(App).use(router).use(Vue3Lottie).component('Icon', Icon).component('MazInput', MazInput)
            .component('MazPhoneNumberInput', MazPhoneNumberInput).mount('#app')
    }
})
// .use(store)

