<template>
  <div class="iLogin grid grid-cols-2 h-screen">
    <!-- Left Column with Image Background -->
    <div
      class="bg-cover bg-no-repeat bg-center z-10"
      style="
        background-image: url('/b3.jpg');
        background-repeat: no-repeat;
        background-size: cover;
      "
    ></div>
    <!-- Right Column with Login Form -->
    <div
      class="flex flex-col items-center"
      style="
        background-image: url('/b2.jpg');
        background-repeat: no-repeat;
        background-size: cover;
      "
    >
      <div class="overlay"></div>
      <div class="flex justify-center mb-12 mt-36 z-10">
        <img class="w-1/2" src="/p.gif" />
      </div>
      <form
        @submit.prevent="onSubmit"
        class="w-full max-w-sm space-y-4 justify-center z-10"
      >
        <div>
          <label for="email" class="block text-[aqua]">Email</label>
          <input
            type="text"
            id="email"
            name="email"
            @keyup="btnColor"
            v-model="state.email"
            :class="{
              'border-red-500': v$.email.$error,
              'border-gray-300': !v$.email.$error,
            }"
            class="w-full py-2 px-3 border rounded focus:outline-none focus:ring focus:border-blue-500"
            placeholder="Enter your email"
          />
          <div v-if="v$.email.$error" class="text-red-500 mt-1">
            <Icon icon="mdi:warning-circle" class="text-red-500 inline-block" />
            {{ v$.email.$errors[0].$message }}
          </div>
        </div>
        <div>
          <label for="password" class="block text-[aqua]">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            @keyup="btnColor"
            v-model="state.password"
            class="w-full py-2 px-3 border rounded focus:outline-none focus:ring focus:border-blue-500"
            placeholder="Enter your password"
          />
        </div>
        <div>
          <button
            id="btn"
            @click="login"
            :disabled="!state.email || !state.password"
            class="form-button"
          >
            <Vue3Lottie v-if="loading" :animationData="load" :height="200" />
            <span v-if="loading"> Processing... </span>
            <span v-else>Login</span>
          </button>
        </div>
      </form>
      <p class="text-center text-[aqua] mt-4 z-10">
        Don't have an Account?
        <span class="text-red-500 cursor-pointer">Contact Admin</span>
      </p>
      <div v-if="state.error" class="text-red-500 mt-4 z-10">
        {{ state.errorMsg }}
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, reactive, computed, onBeforeUnmount } from "vue";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { useRouter } from "vue-router";
import load from "../assets/load.json";
import { useUserStore } from "../stores/user.js";
import useValidate from "@vuelidate/core";

<<<<<<< HEAD
=======

>>>>>>> 868b9b0e63871cce18fc0ae7d8bd79e63a7fd462
import { email, helpers } from "@vuelidate/validators";
const db = firebase.firestore();
const state = reactive({
  email: "",
  password: "",
  error: "",
  errorMsg: "",
});

const useUser = useUserStore();
const router = useRouter();
const loading = ref(false);
// const store = useStore();
const rules = computed(() => {
  return {
    email: {
      email: helpers.withMessage("Use a Vaild Email (you@sample.com)", email),
      $autoDirty: true,
    },
  };
});

const btnColor = () => {
  if ((state.email && state.password) !== "") {
    document.getElementById("btn").style.background = "#87CEEB";
    // document.styleSheets[0].insertRule( '#btn: hover{color:green}');
  } else {
    document.getElementById("btn").style.background = "none";
  }
};

const v$ = useValidate(rules, state);
<<<<<<< HEAD
=======

const login = async () => {
 

<<<<<<< HEAD
=======
  try {
    
>>>>>>> 9156ac0f0df5aac935aeb34399cac8c28282e2f6
  const userData = await v$.value.$validate();
  
  if (!userData) {
    alert("Form is invalid");
    return;
  }
>>>>>>> 868b9b0e63871cce18fc0ae7d8bd79e63a7fd462

const login = async () => {
  try {
    const userData = await v$.value.$validate();

    if (!userData) {
      alert("Form is invalid");
      return;
    }

    loading.value = true;
    // Sign in with Firebase Authentication
    const userCredential = await firebase
      .auth()
      .signInWithEmailAndPassword(state.email, state.password);

    const user = userCredential.user;
    // Check if the user is disabled in Firestore
    const userDoc = await firebase
      .firestore()
      .collection("users")
      .doc(user.uid)
      .get();

<<<<<<< HEAD
    if (userDoc.exists) {
      const userData = userDoc.data();
      if (userData.status === "disabled") {
        // User is disabled, prevent login
        loading.value = false;
        alert("Your account is disabled. Contact support for assistance.");
        return;
      }
    }
=======
if (userDoc.exists) {
  const userData = userDoc.data();
  if (userData.status === 'disabled') {
    // User is disabled, prevent login
    loading.value = false;
    alert("Your account is disabled. Contact support for assistance.");
    return;
  }
}
>>>>>>> 868b9b0e63871cce18fc0ae7d8bd79e63a7fd462
    // Get the current date and time
    const currentDateTime = new Date();

<<<<<<< HEAD
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
    // Update the lastLogin field in Firestore
    await firebase.firestore().collection("users").doc(user.uid).update({
      lastLoginDate: formattedDate,
      lastLoginTime: formattedTime,
=======
// Format the date as "dd-mm-yyyy"
const formattedDate = `${currentDateTime.getDate()}-${
  currentDateTime.getMonth() + 1
}-${currentDateTime.getFullYear()}`

// Format the time in 12-hour clock format
const hours = currentDateTime.getHours();
const minutes = currentDateTime.getMinutes();
const amOrPm = hours >= 12 ? "PM" : "AM";
const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
const formattedTime = `${formattedHours}:${formattedMinutes} ${amOrPm}`;
     // Update the lastLogin field in Firestore
     await firebase.firestore().collection("users").doc(user.uid).update({
      
      lastLoginDate: formattedDate ,
        lastLoginTime: formattedTime
>>>>>>> 868b9b0e63871cce18fc0ae7d8bd79e63a7fd462
    });
    router.replace({ name: "Dashboard" });
  } catch (err) {
    loading.value = false;
    state.error = true;
    state.errorMsg = err.message;
    switch (err.code) {
      case "auth/invalid-email":
        state.errorMsg = "Invalid email. Try again or Contact Admin";
        break;
      case "auth/user-not-found":
        state.errorMsg = "User doesn't exist";
        break;
      case "auth/wrong-password":
        state.errorMsg = "Incorrect password. Try again or Contact Admin";
        break;
      case "auth/invalid-login-credentials":
        state.errorMsg = "Invalid Credentials. Try again or Contact Admin";
<<<<<<< HEAD
=======
        break;
      case "auth/invalid-login-credentials":
        state.errorMsg = "Invalid Credentials";
>>>>>>> 868b9b0e63871cce18fc0ae7d8bd79e63a7fd462
        break;
      default:
        state.errorMsg = "Connection to Server cut down";
        break;
    }
  }
};

// const currentImageIndex = ref(0);

// const startSlideshow = () => {
//   // Set an interval to switch images automatically
//   const slideshowInterval = setInterval(() => {
//     nextImage();
//   }, 5000); // Change images every 5 seconds (adjust as needed)
//   // Return the interval reference to be cleared later
//   return slideshowInterval;
// };
// const slideshowInterval = startSlideshow(); // Initialize slideshowInterval

// const stopSlideshow = (interval) => {
//   // Clear the interval to stop the slideshow
//   clearInterval(interval);
// };

// const nextImage = () => {
//   // Increment the current image index and loop back to the first image
//   currentImageIndex.value =
//     (currentImageIndex.value + 1) % imageUrls.value.length;
// };

// // Clear the interval when the component is unmounted to prevent memory leaks
// onBeforeUnmount(() => {
//   stopSlideshow(slideshowInterval);
// });
</script>
