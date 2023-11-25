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
      <div class="bg-white py-5 sm:grid sm:grid-cols-[31%_41%] sm:px-6" v-if="userStore.loggedInUserData.Role === 'ADMIN'">
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
      <div class="bg-white py-5 sm:grid sm:grid-cols-[31%_41%] sm:px-6" v-if="userStore.loggedInUserData.Role === 'ADMIN'">
        <dt class="text-sm font-medium text-gray-500">Role</dt>
        
        <select
      id="role"
      v-model="state.role"
     
      :class="v$.role.$error === true ? 'text-fields-error' : 'input-fields'"
    >
      <!-- Populate options from the roles array -->
      <option value = '' selected>Select a role</option>
      <option v-for="role in userRoles.availableRoles" :key="role" :value="role">{{ role }}</option>
    </select>
        <br />
  <span class="error-text" v-if="v$.role.$error">
    <Icon icon="mdi:warning-circle" class="text-red-600 inline-block" />
    {{ v$.role.$errors[0].$message }}</span>
      </div>
      <number v-if="userStore.loggedInUserData.Role === 'ADMIN'" />
      <div class="bg-white flex justify-end " v-if="userStore.loggedInUserData.Role === 'ADMIN'">
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
<script setup>
import ProfileImage from "../components/ProfileImage.vue";
import CoverImage from "../components/CoverImage.vue";
import { ref, computed, reactive,onMounted } from "vue";
import number from "../components/number.vue";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import useValidate from "@vuelidate/core";
import {useRoleStore} from "../stores/roles.js";
import { useUserStore } from "../stores/user";
import {
  required,
  minLength,
  alpha,
  helpers,
} from "@vuelidate/validators";
const userRoles = useRoleStore();
  const userStore = useUserStore();
  const state = reactive({
    username: '',
    role:'',
  });

const userInfo = ref(null)
  const rules = computed(() => {
    return {
      username: {
        required: helpers.withMessage("Username required", required),
        minLength: helpers.withMessage("Must be 3 or above letters long", minLength(3)),
        alpha: helpers.withMessage("Contains only alphabetical letters", alpha),
        $autoDirty: true,
      },
      role: {
      required: helpers.withMessage("Role required", required),
      $autoDirty: true,
    },
    };
  });
  const v$ = useValidate(rules, state);

  const saveSettings = async () => {
    
    const userData = await v$.value.username.$validate();
    const userDataRole = await v$.value.role.$validate();
    // Update the user's document in Firestore
    
    if (userData && userDataRole) {
      firebase
        .firestore()
        .collection("users")
        .doc(userStore.loggedInUserData.id)
        .update({
          Username: state.username,
          Role: state.role
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
 

  

   
  onMounted(async() => {
    const user = firebase.auth().currentUser;
  if (user) {
try {
    const db = firebase.firestore();
        
    const userDoc = await db.collection("users").doc(user.uid).get();
        if (userDoc.exists) {
          const userData = userDoc.data();
          state.username = userData.Username
          state.role = userData.Role
        } else {
          userInfo.value = null;
        }
      } catch (error) {
        // Handle any errors that occur during the fetch
        window.alert('Error fetching logged-in user data');
        throw error;
      }
  }
 
    await userRoles.fetchAvailableRoles();
});



</script>
