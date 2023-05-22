<template>
  <div
    class="min-h-screen py-40"
    style="background-image: linear-gradient(115deg, #9f7aea, #fee2fe)"
  >
    <div class="container mx-auto">
      <div
        class="flex flex-col lg:flex-row w-10/12 lg:w-8/12 bg-white rounded-xl mx-auto shadow-lg overflow-hidden"
      >
        <div
          class="w-full lg:w-1/2 flex flex-col items-center justify-center p-32 bg-cover"
          style="background-image: url('src/assets/photo.jpg')"
        ></div>
        <div class="w-full lg:w-1/2 py-16 px-12">
          <h1 class="text-blue-900 font-bold uppercase text-center text-3xl mb-3">
            Welcome
          </h1>
          <h2 class="text-center text-3xl mb-4">Register For A Meal</h2>
          <p class="mb-4">Create your account. It’s free and only takes a second</p>
          <form>
            <div class="mt-5">
              <input
                :class="
                  v$.username.$error === true ? 'text-fields-error' : 'input-fields'
                "
                type="text"
                name="Username"
                placeholder="Username"
                v-model="state.username"
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
                  v-model="state.gender"
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
                  v-model="state.gender"
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
                v-model="state.email"
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
                v-model="state.number"
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
                v-model="state.password"
                :class="
                  v$.password.$error === true ? 'text-fields-error' : 'input-fields'
                "
              />
            </div>
            <span class="error-text" v-if="v$.password.$error">
              <Icon icon="mdi:warning-circle" class="text-red-600 inline-block" />
              {{ v$.password.$errors[0].$message }}</span
            >
            <foodtypes :foods="state.foods" />
            
            <div class="checkbox-wrapper-4">
              <input class="inp-cbx" id="term" v-model="state.terms" type="checkbox" />
              <label class="cbx" for="term">
                <span>
                  <svg class="mt-0">
                    <use xlink:href="#check-4"></use></svg></span
              ></label>
              <span class="relative !bottom-2.5">
                I accept the
                <a href="#" class="text-purple-500 font-semibold">Terms of Use</a> &
                <a href="#" class="text-purple-500 font-semibold">Privacy Policy</a>
              </span>
              <svg class="inline-svg">
                <symbol id="check-4" viewbox="0 0 12 10">
                  <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
                </symbol>
              </svg>
            </div>
            
            <div class="mt-5">
              <button @click.prevent="register" class="btn-reg">
                <Vue3Lottie v-if="loading" :animationData="load" :height="200" />
                <span v-if="loading"> Registering... </span
                ><span v-else> Register Now </span>
              </button>
            </div>
            <p class="text-blue-900">
              Already Registered?
              <router-link to="/" class="text-blue-500 font-bold underline cursor-pointer"
                >Login</router-link
              >
            </p>
            <div v-if="error" class="error-text">{{ errorMsg }}</div>
    
          </form>
          <br />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, computed, ref } from "vue";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import foodtypes from "../components/foodtypes.vue";
import { db } from "../firebase/firebaseInit";
import { useRouter } from "vue-router";
import load from "../assets/load.json";
import useValidate from "@vuelidate/core";
import {
  required,
  email,
  minLength,
  numeric,
  maxLength,

  alpha,
  helpers,
} from "@vuelidate/validators";
export default {
  name: "Signup",
components:{
  foodtypes
},
  setup() {
    const loading = ref(false);
    const state = reactive({
      username: "",
      email: "",
      number: "",
      password: "",
      terms: false,
      gender: "",
      foods:[]
    });
    const error = ref(false);
    const errorMsg = ref("");
    const router = useRouter();
    const formatPhoneNumber = () => {
      const Regex = /07[0-9]/;
      const num = state.number;
      if (Regex.test(num)) {
        return true;
      } else {
        return false;
      }
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
      };
    });
    const v$ = useValidate(rules, state);
    const register = async () => {
      const userData = await v$.value.$validate();
      if (userData && state.terms) {
        loading.value = true;
        try {
          const firebaseAuth = await firebase.auth();
          await firebaseAuth.createUserWithEmailAndPassword(state.email, state.password);

          // Update the user's display name
          const user = firebase.auth().currentUser;
          await user.updateProfile({
            displayName: state.username,
          });

          // Create a new document for the user in Firestore
          const db = firebase.firestore();
          const userRef = db.collection("users").doc(user.uid);
          await userRef.set({
            Username: state.username,
            Gender: state.gender,
            Email: state.email,
            Phone_Number: state.number,
            Password: state.password,
            Terms: state.terms,
            Food_Types: state.foods,
          });
          router.replace({ name: "Modal" });
          setTimeout(() => {
            router.replace({ name: "Dashboard" });
          }, 3000);
          return;
        } catch (err) {
          loading.value = false;
          error.value = true;
          errorMsg.value = err;

          switch (err.code) {
            case "auth/email-already-in-use":
              errorMsg.value = "Email is already in use by an existing user.";
              break;
            case "auth/admin-restricted-operation":
              errorMsg.value = "Admins only";
              break;
            case "auth/internal-error":
              errorMsg.value = "An unexpected error while trying to process the request";
              break;
            case "auth/invalid-password":
              errorMsg.value =
                "Invalid Password. It must be a string with at least six characters.";
              break;
          }
        }
      } else if (!userData ) {
        alert("Please fill in to proceed");
      } else if(!state.terms){
        alert("Please Check terms to proceed");
      }
      else{
        alert("Invalid form")
      }
    };
    return {
      register,
      formatPhoneNumber,
      state,
      load,
      loading,
      errorMsg,
      error,
      v$,
    };
  },
};
</script>
