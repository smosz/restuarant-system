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


let app;

firebase.auth().onAuthStateChanged((user) => {
  if (!app) {
    app = createApp(App)
      .use(router)
      .use(Vue3Lottie)
      .use(ElementPlus)
      .use(createPinia())
      .component('Icon', Icon)
      .mount('#app');

  }
});
