<template>
  <div>
    <dl>
      <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-2">
        <dt class="text-sm font-medium text-gray-500 w-[90px]">Cover Photo</dt>
        <CoverImage />
      </div>
      <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-2">
        <div class="text-sm font-medium text-gray-500 w-[90px]">Profile Picture</div>
        <ProfileImage />
      </div>
      <div class="bg-white py-5 sm:grid sm:grid-cols-[31%_41%] sm:px-6">
        <dt class="text-sm font-medium text-gray-500">Username</dt>
        <input
          v-model="state.username"
          :class="v$.username.$error === true ? 'text-fields-error' : 'input-fields'"
          id="username"
          type="text"
          placeholder="Enter your username"
        />
        <br />
        <span class="error-text" v-if="v$.username.$error">
          <Icon icon="mdi:warning-circle" class="text-red-600 inline-block" />
          {{ v$.username.$errors[0].$message }}</span
        >
      </div>
      <number  />
      <div class="bg-white flex justify-end ">
        <button
        @click="saveSettings"
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Save
        </button>
      </div>
    </dl>
  </div>
</template>
<script>
import ProfileImage from "../components/ProfileImage.vue";
import CoverImage from "../components/CoverImage.vue";
import { ref, computed, reactive } from "vue";
import number from "../components/number.vue";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import useValidate from "@vuelidate/core";
import {
  required,
  minLength,
  alpha,
  helpers,
} from "@vuelidate/validators";
export default {
  name: "bio",
  components: {
    CoverImage,
    ProfileImage,
    number
  },
  setup() {
  const user = ref(null);
  const state = reactive({
    username: "",
  });

  const rules = computed(() => {
    return {
      username: {
        required: helpers.withMessage("Username required", required),
        minLength: helpers.withMessage("Must be 3 or above letters long", minLength(3)),
        alpha: helpers.withMessage("Contains only alphabetical letters", alpha),
        $autoDirty: true,
      },
    };
  });
  const v$ = useValidate(rules, state);

  firebase.auth().onAuthStateChanged((firebaseUser) => {
    user.value = firebaseUser;
    if (user.value) {
      firebase
        .firestore()
        .collection("users")
        .doc(user.value.uid)
        .get()
        .then((doc) => {
          state.username = doc.data().Username;
        });
    }
  });

  const saveSettings = async () => {
    
    const userData = await v$.value.username.$validate();
    // Update the user's document in Firestore
    
    if (userData) {
      console.log('me')
      firebase
        .firestore()
        .collection("users")
        .doc(user.value.uid)
        .update({
          Username: state.username,
        })
        .then(() => {
          const alert = document.createElement("div");
          alert.textContent = "Settings saved successfully!";
          alert.classList.add(
            "bg-green-500",
            "text-white",
            "px-4",
            "py-2",
            "rounded",
            "flex",
            "w-[20%]",
            "relative",
            "bottom-[47px]",
            "left-[40%]",
            "justify-center"
          );
          // add alert to DOM
          const container = document.querySelector(".container");
          container.appendChild(alert);
          setTimeout(() => {
            alert.style.display = "none";
            location.reload();
          }, 2000);
        })
        .catch((error) => {
          alert("Error saving settings:", error);
        });
    }

    user.value.updateProfile({
      displayName: state.username,
    });
  };

  return {
    user,
    state,
    v$,
    saveSettings,
  };
}
};
</script>
