<template>
    
  <div
 
  class="fixed inset-0 flex items-center justify-center z-50"
>
  <div
    class="modal-overlay absolute w-full h-full opacity-50" 
    style="background-image: linear-gradient(115deg, #9f7aea, #fee2fe)"
  ></div>
  <div
    class="modal-container w-11/12 md:max-w-3xl mx-auto  z-50 overflow-y-auto"
  >
    <div
      class="modal-close absolute top-0 right-0 cursor-pointer flex flex-col items-center mt-4 mr-4 text-white text-sm z-50"
    >
      <span @click="closeUserModal" class="text-white">&times;</span>
    </div>
    
    <div class="container mx-auto">
      <div
        class="flex flex-col lg:flex-row bg-white rounded-xl mx-auto shadow-lg overflow-hidden"
      >
        <div
          class="w-full lg:w-1/2 flex flex-col items-center justify-center p-32 bg-cover bg-center"
          style="background-image: url('src/assets/49.jpg')"
        ></div>
        <div class="w-full lg:w-1/2 py-16 px-12">
          <h1 class="text-blue-900 font-bold uppercase text-center text-3xl mb-3">
            Welcome
          </h1>
          <h2 class="text-center text-3xl mb-4">Register User</h2>
          <form>
            <div class="mt-5">
              <input
                :class="
                  v$.username.$error === true ? 'text-fields-error' : 'input-fields'
                "
                type="text"
                name="Username"
                placeholder="Username"
                v-model="NewState.username"
              />
            </div>
            <span class="error-text" v-if="v$.username.$error">
              <Icon icon="mdi:warning-circle" class="text-red-600 inline-block" />
              {{ v$.username.$errors[0].$message }}</span
            >
            <div class="flex mt-5">
              <div class="flex items-center mr-4">
                <input
                  id="radio-male"
                  type="radio"
                  value="Male"
                  v-model="NewState.gender"
                  name="inline-radio-group"
                  class="w-4 h-4 text-blue-600"
                />
                <label for="radio-male" class="ml-2 text-sm font-medium text-gray-900"
                  >Male</label
                >
              </div>
              <div class="flex items-center mr-4">
                <input
                  id="radio-female"
                  type="radio"
                  value="Female"
                  v-model="NewState.gender"
                  name="inline-radio-group"
                  class="w-4 h-4 text-blue-600"
                />
                <label for="radio-female" class="ml-2 text-sm font-medium text-gray-900"
                  >Female</label
                >
              </div>
            </div>
            <span class="error-text" v-if="v$.gender.$error">
              <Icon icon="mdi:warning-circle" class="text-red-600 inline-block" />
              {{ v$.gender.$errors[0].$message }}</span
            >

            <div class="mt-5">
              <input
                type="email"
                name="email"
                placeholder="Email"
                v-model="NewState.email"
                :class="v$.email.$error === true ? 'text-fields-error' : 'input-fields'"
              />
            </div>
            <span class="error-text" v-if="v$.email.$error">
              <Icon icon="mdi:warning-circle" class="text-red-600 inline-block" />
              {{ v$.email.$errors[0].$message }}</span
            >

            <div class="mt-5">
              <input
                type="tel"
                name="number"
                placeholder="Phone Number (E.g.07XXXXXXXX)"
                v-model="NewState.number"
                :class="v$.number.$error === true ? 'text-fields-error' : 'input-fields'"
              />
            </div>

            <span class="error-text" v-if="v$.number.$error">
              <Icon icon="mdi:warning-circle" class="text-red-600 inline-block" />
              {{ v$.number.$errors[0].$message }}</span
            >
            <div class="mt-5">
              <input
                type="password"
                name="Password"
                placeholder="Password"
                v-model="NewState.password"
                :class="
                  v$.password.$error === true ? 'text-fields-error' : 'input-fields'
                "
              />
            </div>
            <span class="error-text" v-if="v$.password.$error">
              <Icon icon="mdi:warning-circle" class="text-red-600 inline-block" />
              {{ v$.password.$errors[0].$message }}</span
            >
            
            <div class="mt-5">
    <select
      id="role"
      v-model="NewState.role"
      :class="v$.role.$error === true ? 'text-fields-error' : 'input-fields'"
    >
      <!-- Populate options from the roles array -->
      <option value="" disabled>Select a role</option>
      <option v-for="role in userRoles.availableRoles" :key="role" :value="role">{{ role }}</option>
    </select>
    <span class="error-text" v-if="v$.role.$error">
              <Icon icon="mdi:warning-circle" class="text-red-600 inline-block" />
              {{ v$.role.$errors[0].$message }}</span
            >
  </div>

            <div class="mt-5">
              <button @click.prevent="register" class="btn-reg">
                <Vue3Lottie v-if="loading" :animationData="load" :height="200" />
                <span v-if="loading"> Registering... </span
                ><span v-else> Register Now </span>
              </button>
            </div>
            <div v-if="error" class="error-text">{{ errorMsg }}</div>
    
          </form>
          <br />
        </div>
      </div>
    </div>
  
    
  </div>
</div>
</template>
  
<script setup>
import { reactive, computed, ref,defineEmits,onMounted } from "vue";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import load from "../assets/load.json";
import { firebaseAuthForRegistration } from "../firebase/firebaseInit"
import useValidate from "@vuelidate/core";
import { useRouter } from "vue-router";
import {
  required,
  email,
  minLength,
  numeric,
  maxLength,

  alpha,
  helpers,
} from "@vuelidate/validators";
import {useRoleStore} from "../stores/roles.js";
    const loading = ref(false);
    const NewState = reactive({
      username: "",
      email: "",
      number: "",
      password: "",
      gender: "",
      role:""
    });
    const userRoles = useRoleStore();
    const error = ref(false);
    const errorMsg = ref("");
    const router = useRouter();
    const formatPhoneNumber = () => {
      const Regex = /07[0-9]/;
      const num = NewState.number;
      if (Regex.test(num)) {
        return true;
      } else {
        return false;
      }
    };
    // Emit a custom event to close the modal
const emit = defineEmits(["close"]);
const closeUserModal = () => {
// Add this line to log the closure
emit("close");
};
    const rules = computed(() => {
      return {
        username: {
          required: helpers.withMessage("Username required", required),
          minLength: helpers.withMessage(
            "Username must be 3 or above letters long",
            minLength(3)
          ),
          alpha: helpers.withMessage(
            "Username contains only alphabetical letters",
            alpha
          ),
          $autoDirty: true,
        },
        email: {
          required: helpers.withMessage("Email required", required),
          email: helpers.withMessage("Use a Vaild Email (you@sample.com)", email),
          $autoDirty: true,
        },
        number: {
          required: helpers.withMessage("Phone number required", required),
          numeric: helpers.withMessage("Phone number must be numeric", numeric),
          maxLength: helpers.withMessage(
            "Phone number must be 10 digits long",
            maxLength(10)
          ),
          formatPhoneNumber: helpers.withMessage("Invalid Format", formatPhoneNumber),
          minLength: helpers.withMessage(
            "Phone number must be 10 digits long",
            minLength(10)
          ),
          $autoDirty: true,
        },
        password: {
          required: helpers.withMessage("Password required", required),
          $autoDirty: true,
          minLength: helpers.withMessage(
            "Password should be at least 6 characters long",
            minLength(6)
          ),
        },
        gender: {
          required: helpers.withMessage("Gender required", required),
          $autoDirty: true,
        },
        role: {
          required: helpers.withMessage("Role required", required),
          $autoDirty: true,
        },
      };
    });
    const v$ = useValidate(rules, NewState);
    const register = async () => {
  const userData = await v$.value.$validate();
  if (userData) {
    loading.value = true;
    try {
      // Register the user with email and password using the separate instance
const userCredential = await firebaseAuthForRegistration.createUserWithEmailAndPassword(
  NewState.email,
  NewState.password
);

      // Get the user's unique ID
      const userId = userCredential.user.uid;

      // Create a reference to the Firestore collection for users
      const usersCollection = firebase.firestore().collection('users');

      // Create a new document in the 'users' collection with user data
      await usersCollection.doc(userId).set({
        Username: NewState.username,
        Email: NewState.email,
        Password: NewState.password,
        Phone_Number: NewState.number,
        Gender: NewState.gender,
        Role: NewState.role,
        // Add other user data fields as needed
      });

      // Redirect to another route after registration (e.g., Users)
      window.location.href = '/users';
    } catch (err) {
      loading.value = false;
      error.value = true;
      errorMsg.value = err.message;
    }
  } else {
    alert("Please fill in the form to proceed");
  }
};

    onMounted(() => {
      userRoles.fetchAvailableRoles();
});
</script>