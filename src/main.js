import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { Icon } from '@iconify/vue';
import Vue3Lottie from 'vue3-lottie';
import 'vue3-lottie/dist/style.css';
import ElementPlus from 'element-plus';
import './style.css';
import { createPinia } from 'pinia';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import './firebase/firebaseInit';


const pinia = createPinia(); // Create the Pinia instance

let app;
firebase.auth().onAuthStateChanged(() => {
  if (!app) {
  
    app = createApp(App)
      .use(router)
      .use(pinia)
      .use(Vue3Lottie)
      .use(ElementPlus)
      .component('Icon', Icon)
      .mount('#app');
  }
});

export { pinia }; // Export the Pinia instance
