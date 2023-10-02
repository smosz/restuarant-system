<template>
  <div class="bg-white p-5 sm:grid sm:grid-cols-[31%_41%] sm:px-6">
    <dt class="text-sm font-medium pt-[10px] text-gray-500">Email</dt>
    <div class="flex">
      <div class="relative flex items-stretch w-full">
        <input
          v-model="state.email"
          class="input-field !w-[auto]"
          id="email"
          type="email"
          placeholder="Enter your email"
          disabled
        />
        <div
          v-if="isEmailVerified"
          class="flex items-center ml-2 text-green-500"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
      </div>
      <button
        v-if="!isEmailVerified && verifyEmailButton"
        @click="sendVerificationCode"
        class="ml-2 rounded font-bold py-2 px-4 focus:outline-none focus:shadow-outline bg-blue-500 text-white hover:bg-blue-700"
      >
        Verify
      </button>
      <button
        v-if="updateButton"
        @click="showNewEmailInput"
        class="ml-2 rounded font-bold py-2 px-4 focus:outline-none focus:shadow-outline bg-blue-500 text-white hover:bg-blue-700"
      >
        Update
      </button>
    </div>
    <br />
    <span v-if="linkSent"
      ><p class="font-bold w-max">A Validation link has been sent to</p>
      <h1 class="font-bold text-red-500">{{ state.email }}</h1></span
    >
    <span v-if="linkSent2"
      ><p class="font-bold w-max">A Validation link has been sent to</p>
      <h1 class="font-bold text-red-500">{{ state.newEmail }}</h1></span
    >
    <div v-if="newEmailInputAndPasswordInput">
      <div v-if="newEmailInput" class="pt-[15px]">
        <input
          v-model="state.newEmail"
          class="input-field-email"
          id="newEmail"
          type="email"
          placeholder="Enter your New Email"
          :disabled="isVerify"
        />
        <button
          v-if="isSave"
          @click="saveButton"
          class="ml-2 rounded font-bold py-2 px-4 focus:outline-none focus:shadow-outline bg-blue-500 text-white hover:bg-blue-700"
        >
          save
        </button>
      </div>
      <span class="error-text" v-if="v$.newEmail.$error">
        <Icon icon="mdi:warning-circle" class="text-red-600 inline-block" />
        {{ v$.newEmail.$errors[0].$message }}
      </span>
      <div v-if="isVerify" class="pt-[15px]">
        <input
          v-model="state.password"
          class="input-field-email"
          id="password"
          type="password"
          placeholder="Enter Current Password"
        />
        <button
          @click="sendVerificationCode2"
          class="ml-2 rounded font-bold py-2 px-4 focus:outline-none focus:shadow-outline bg-blue-500 text-white hover:bg-blue-700"
        >
          Verify
        </button>
      </div>
      <span class="error-text" v-if="v$.password.$error">
        <Icon icon="mdi:warning-circle" class="text-red-600 inline-block" />
        {{ v$.password.$errors[0].$message }}
      </span>
    </div>

    <p v-if="errorMessage" class="text-red-500 mt-2">{{ errorMessage }}</p>
  </div>
</template>


<script setup>
import { ref, computed, reactive, onMounted } from "vue";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import useValidate from "@vuelidate/core";
import { required, email, helpers } from "@vuelidate/validators";
import { useUserStore } from "../stores/user";

const userStore = useUserStore();
const loggedInUserEmail = userStore.loggedInUserData;
const state = reactive({
  email: loggedInUserEmail.Email,
  newEmail: "",
  password: "",
});
const linkSent = ref(false);
const linkSent2 = ref(false);
const isVerifyEmail = ref(true);
const isEmailVerified = ref(false);
const errorMessage = ref("");
const newEmailInput = ref(false);
const isVerify = ref(false);
const isSave = ref(true);
const updateButton = ref(true);
const verifyEmailButton = ref(true);
const newEmailInputAndPasswordInput = ref(false);
// const password = ref(false);
const sameAsDefaultEmail = () => {
  if (state.newEmail === state.email) {
    return false; // Return false to indicate validation error
  }
  return true; // Return true to indicate validation success
};
const rules = computed(() => {
  return {
    newEmail: {
      required: helpers.withMessage("Email required", required),
      email: helpers.withMessage("Must be a valid email", email),
      $autoDirty: true,
      sameAsDefaultEmail: helpers.withMessage(
        "Email already Registered! Try another one",
        sameAsDefaultEmail
      ),
    },
    password: {
      required: helpers.withMessage("Password required", required),
    },
  };
});

const v$ = useValidate(rules, state);

const sendVerificationCode = async () => {
  if (user.value) {
    newEmailInputAndPasswordInput.value = false;
    updateButton.value = true;
    verifyEmailButton.value = false;
    linkSent.value = true;
    isVerifyEmail.value = false;
    firebase
      .auth()
      .currentUser.sendEmailVerification()
      .then(() => {
        window.alert("Verification code sent to the user's email.");
      })
      .catch((error) => {
        window.alert("Error sending verification code:", error);
      });
  }
};
const sendVerificationCode2 = async () => {
  const userData = await v$.value.password.$validate();
  if (userData) {
    const user = firebase.auth().currentUser;
    newEmailInputAndPasswordInput.value = false;
    updateButton.value = false;
    linkSent2.value = true;
    isVerifyEmail.value = false;

    const userRef = firebase.firestore().collection("users").doc(user.uid);
    await userRef.update({
      Email: state.newEmail,
    });

    const credential = firebase.auth.EmailAuthProvider.credential(
      user.email,
      state.password
    );
    user
      .reauthenticateWithCredential(credential)
      .then(async () => {
        user
          .updateEmail(state.newEmail)
          .then(() => {
            user.sendEmailVerification();
            window.alert("Email updated successfully");
          })
          .catch((error) => {
            window.alert("Error updating email:", error);
          });
      })

      .catch((error) => {
        window.alert("Error re-authenticating user:", error);
      });
  }
};

const showNewEmailInput = () => {
  newEmailInputAndPasswordInput.value = true;
  newEmailInput.value = true;
  // password.value = true;
  updateButton.value = false;
  linkSent.value = false;
};
const saveButton = async () => {
  const userData = await v$.value.newEmail.$validate();
  if (userData) {
    isVerify.value = true;
    isSave.value = false;
  }
};
onMounted(async () => {
  await userStore.initializeUser();
  isEmailVerified.value = userStore.emailVerified;
});
</script>
