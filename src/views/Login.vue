<template>
  <div
    class="overflow-hidden h-screen flex flex-col justify-center"
    style="background-image: linear-gradient(115deg, #9f7aea, #fee2fe)"
  >
    <div class="container mx-auto">
      <div
        class="flex flex-col lg:flex-row w-10/12 lg:w-8/12 bg-white rounded-xl mx-auto shadow-lg overflow-hidden"
      >
        <div
          class="w-full lg:w-1/2 flex flex-col items-center justify-center p-32 bg-no-repeat bg-cover"
          style="background-image: url('src/assets/serve.jpg ')"
        ></div>
        <div class="w-full lg:w-1/2 py-16 px-12">
          <h1 class="text-blue-900 font-bold uppercase text-center text-3xl mb-3">
            Welcome
          </h1>
          <h2 class="text-center text-3xl mb-4">Login For A Meal</h2>
          <form @submit.prevent="onSubmit">
            <div class="mt-5">
              <input
                type="text"
                name="email"
                @keyup="btnColor"
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
                type="password"
                name="Password"
                @keyup="btnColor"
                placeholder="Password"
                v-model="state.password"
                class="input-fields"
              />
            </div>
            <div class="mt-5">
              <button
                id="btn"
                @click="loginIn"
                :disabled="!state.email || !state.password"
                class="form-button"
              >
                <Vue3Lottie v-if="loading" :animationData="load" :height="200" />
                <span v-if="loading"> Processing... </span>
                <span v-else> Login </span>
              </button>
            </div>
            <p class="text-blue-900">
              Don't have an Account?
              <router-link
                to="/signup"
                class="text-blue-500 font-bold underline cursor-pointer"
                >Signup</router-link
              >
            </p>
            <!-- <div v-show="state.error" class="error-text">{{ state.errorMsg }}</div> -->
            <div v-if="state.error" class="error-text">{{ state.errorMsg }}</div>
          </form>
        </div>
      </div>
    </div>
  </div>
  <!-- <keep-alive>
    <Modal @close="toggleModal" :modalActive="modalActive">
      <Vue3Lottie :animationData="thank" :height="200" />
    </Modal>
  </keep-alive> -->
</template>

<script>
import { ref, reactive, computed } from "vue";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { useRouter } from "vue-router";
// import Modal from "../components/Modal.vue";
// import thank from "../assets/thank.json";
import load from "../assets/load.json";
// import { useStore } from "vuex";
import useValidate from "@vuelidate/core";
import { email, helpers } from "@vuelidate/validators";
export default {
  name: "Login",
  // components: { Modal },
  setup() {
    const state = reactive({
      email: "",
      password: "",
      error: "",
      errorMsg: "",
    });
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
    // const modalActive = ref(true);
    // const toggleModal = () => {
    //   modalActive.value = !modalActive.value;
    // };
    const v$ = useValidate(rules, state);

    // const loginIn = async () => {

    //   const userData = await v$.value.$validate();
    //   if (userData) {
    //     loading.value =true
    //     try {
    //       await store.dispatch("logIn", {
    //         email: state.email,
    //         password: state.password,
    //       });

    //       router.push({ name: "Dashboard" });
    //       alert('hello')

    //     } catch (err) {
    //       loading.value=false
    //       state.error = true;
    //       state.errorMsg = err;
    //       switch (err.code) {
    //         case "auth/invalid-email":
    //           state.errorMsg = "Invalid email";
    //           break;
    //         case "auth/user-not-found":
    //           state.errorMsg = "No account with that email was found";
    //           break;
    //         case "auth/wrong-password":
    //           state.errorMsg = "Incorrect password";
    //           break;
    //         default:
    //           state.errorMsg = "Connection to Server cut down";
    //           break;
    //       }
    //     }
    //   } else {
    //     if (state.terms === false) {
    //       alert("Cant proceed without agreeing on Terms");
    //     } else {
    //       alert("form invaild");
    //     }
    //   }
    // };
    const loginIn = async () => {
      const userData = await v$.value.$validate();
      if (userData) {
        loading.value = true;
        try {
          await firebase.auth().signInWithEmailAndPassword(state.email, state.password);
          router.push({ name: "Dashboard" });
          console.log(firebase.auth().currentUser.uid);
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

    return {
      state,
      v$,
      // modalActive,
      loading,
      // thank,
      load,
      // toggleModal,
      btnColor,
      loginIn,
    };
  },
};
</script>
