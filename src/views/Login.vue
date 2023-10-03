<template>

  <div class="grid grid-cols-2 h-screen">
    <!-- Left Column with Image Background -->
    <div
      class="bg-cover bg-no-repeat bg-center"
      :style="'background-image: url(' + imageUrls[currentImageIndex] + ');'"
    ></div>
    <!-- Right Column with Login Form -->
    <div class="flex flex-col justify-center items-center" style="background: linear-gradient(to right, hotpink, pink);">
      <div class="flex justify-center mb-12 mt-12">
        <img class="w-1/2" src="../../src/assets/imp.png" />
      </div>
      <form @submit.prevent="onSubmit" class="w-full max-w-sm space-y-4">
        <div>
          <label for="email" class="block text-gray-700">Email</label>
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
          <label for="password" class="block text-gray-700">Password</label>
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
            @click="loginIn"
            :disabled="!state.email || !state.password"
            class="form-button"
          >
            <Vue3Lottie v-if="loading" :animationData="load" :height="200" />
            <span v-if="loading"> Processing... </span>
            <span v-else>Login</span>
          </button>
        </div>
      </form>
      <p class="text-center text-gray-600 mt-4">
        Don't have an Account?
        <span class="text-red-500 cursor-pointer">Contact Admin</span>
      </p>
      <div v-if="state.error" class="text-red-500 mt-4">{{ state.errorMsg }}</div>
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
import { email, helpers } from "@vuelidate/validators";
const db = firebase.firestore();
const state = reactive({
  email: "",
  password: "",
  error: "",
  errorMsg: "",
});

const imageUrls = ref([
  "../../src/assets/48.jpg",
  "../../src/assets/41.jpg",
  "../../src/assets/38.jpg",
  "../../src/assets/46.jpg",
  "../../src/assets/21.jpg",
  "../../src/assets/15.jpg",
  "../../src/assets/45.jpg",
  "../../src/assets/27.jpg",
  "../../src/assets/18.jpg",
  "../../src/assets/13.jpg",
  "../../src/assets/14.jpg",
  "../../src/assets/7.jpg",
  "../../src/assets/10.jpg",
  "../../src/assets/1.jpg",
  "../../src/assets/2.jpg",
  "../../src/assets/4.jpg",
  "../../src/assets/8.jpg",
  "../../src/assets/3.jpg",
  "../../src/assets/9.jpg",
  "../../src/assets/11.jpg",
  
  // Add more image URLs as needed
]);
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
const loginIn = async () => {
  const userData = await v$.value.$validate();
  if (userData) {
    loading.value = true;
    try {
      await firebase
        .auth()
        .signInWithEmailAndPassword(state.email, state.password);
      useUser.user = firebase.auth().currentUser;
      router.replace({ name: "Pos" });
    } catch (err) {
      loading.value = false;
      state.error = true;
      state.errorMsg = err;
      switch (err.code) {
        case "auth/invalid-email":
          state.errorMsg = "Invalid email";
          break;
        case "auth/user-not-found":
          state.errorMsg = "User doesn't exist";
          break;
        case "auth/wrong-password":
          state.errorMsg = "Incorrect password";
          break;
        default:
          state.errorMsg = "Connection to Server cut down";
          break;
      }
    }
  } else {
    alert("form invaild");
  }
};
const currentImageIndex = ref(0);

const startSlideshow = () => {
  // Set an interval to switch images automatically
  const slideshowInterval = setInterval(() => {
    nextImage();
  }, 5000); // Change images every 5 seconds (adjust as needed)
  // Return the interval reference to be cleared later
  return slideshowInterval;
};
const slideshowInterval = startSlideshow(); // Initialize slideshowInterval

const stopSlideshow = (interval) => {
  // Clear the interval to stop the slideshow
  clearInterval(interval);
};

const nextImage = () => {
  // Increment the current image index and loop back to the first image
  currentImageIndex.value =
    (currentImageIndex.value + 1) % imageUrls.value.length;
};

// Clear the interval when the component is unmounted to prevent memory leaks
onBeforeUnmount(() => {
  stopSlideshow(slideshowInterval);

});

</script>
