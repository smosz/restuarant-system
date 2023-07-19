<template>
  <div class="bg-white p-5 sm:grid sm:grid-cols-[31%_41%] sm:px-6">
    <dt class="text-sm font-medium pt-[10px] text-gray-500">Password</dt>
    <div class="flex">
      <div class="relative flex items-stretch w-full">
        <input
          v-model="state.password"
          class="input-field"
          id="password"
          type="password"
          placeholder="Enter your Password"
          disabled
        />
      </div>
      <button
      @click="updateButton"
      v-if="isupdateButton"
        class="ml-2 rounded font-bold py-2 px-4 focus:outline-none focus:shadow-outline bg-blue-500 text-white hover:bg-blue-700"
      >
        Update
      </button>
    </div>
    <br>

      <div v-if="currentPasswordInput" class="pt-[15px]">
        <input
          v-model="state.currentPassword"
          class="input-field-email"
          id="currentPassword"
          type="password"
          placeholder="Enter Current Password"
          :disabled = 'newPasswordInput'
        />

        <button
        v-if="isproceedButton"
          @click="proceedButton"
          class="ml-2 rounded font-bold py-2 px-2 focus:outline-none focus:shadow-outline bg-blue-500 text-white hover:bg-blue-700"
        >
          Proceed
        </button>
        <span class="error-text" v-if="v$.currentPassword.$error">
          <Icon icon="mdi:warning-circle" class="text-red-600 inline-block" />
          {{ v$.currentPassword.$errors[0].$message }}
        </span>
      </div>
      <br>
      <div v-if="newPasswordInput" class="pt-[15px]">
        <input
          v-model="state.newPassword"
          class="input-field-email"
          id="newPassword"
          :type="state.inputFieldType"
          placeholder="Enter New Password"
          :disabled = 'state.isUpdating'
        />
        <Icon v-if="invisible" @click="passwordVisible" icon="ic:sharp-visibility-off" class="text-black-600 inline-block ml-[-28px] mr-[12px]" />
        <Icon v-if="visible" @click="passwordInvisible" icon="dashicons:visibility" class="text-blue-600 inline-block ml-[-28px] mr-[12px]" />
        <button
        v-if="!state.isUpdating && isConfirm"
        @click="updatePassword"
        class="ml-2 rounded font-bold py-2 px-2 focus:outline-none focus:shadow-outline bg-blue-500 text-white hover:bg-blue-700"
      >
          Confirm
        </button>
        <div v-if="state.isUpdating" class="pt-[15px]">
          <p>Updating password...</p>
        </div>
        <div v-if="state.updateMessage" class="pt-[15px]">
          <p>{{ state.updateMessage }}</p>
        </div>
        <span class="error-text" v-if="v$.newPassword.$error">
          <Icon icon="mdi:warning-circle" class="text-red-600 inline-block" />
          {{ v$.newPassword.$errors[0].$message }}
        </span>
      </div>

      
  </div>
</template>


<script>
import { ref, reactive,computed} from "vue";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import useValidate from "@vuelidate/core";
import { required, helpers, minLength } from "@vuelidate/validators";

export default {
  name: "passwordTab",
  setup() {
    const user = ref(null);
    const state = reactive({
      password: "",
      currentPassword: '',
      newPassword: '',
      isUpdating: false,
      updateMessage: "",
      inputFieldType: "password"
    });
 const currentPasswordInput = ref(false)
 const newPasswordInput =ref(false)
 const isupdateButton = ref(true)
 const isproceedButton = ref(true)
 const isConfirm = ref(true)
 const visible = ref(false)
 const invisible = ref(true)
 
 const sameAsDefaultPassword = () => {
      if (state.currentPassword === state.password) {
        return true; 
      }
      return false; 
    };
    const rules = computed(() => {
      return {
        currentPassword: {
          required: helpers.withMessage("Password required", required),
          sameAsDefaultPassword: helpers.withMessage(
            "Invalid Password!",
            sameAsDefaultPassword
          ),
        },
        newPassword: {
          required: helpers.withMessage("Password required", required),
          $autoDirty: true,
          minLength: helpers.withMessage(
            "Password should be at least 6 characters long",
            minLength(6)
          ), 
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
            state.password = doc.data().Password;
          });
      }
    });
    const updateButton = ()=>{
      currentPasswordInput.value = true
      isupdateButton.value = false
    }
    const passwordVisible = ()=>{
     invisible.value = false
     visible.value = true
     state.inputFieldType = 'text';
    }
    const passwordInvisible = ()=>{
     invisible.value = true
     visible.value = false
     state.inputFieldType = 'password';
    }
    
    const proceedButton =async()=>{
      const userData = await v$.value.currentPassword.$validate();
      if (userData) {
        isproceedButton.value = false
        newPasswordInput.value = true
      }
    }
    const updatePassword = async () => {
      const userData = await v$.value.newPassword.$validate();
      if (userData) 
      {
        passwordInvisible()
  try {
    state.isUpdating = true;
    const user = firebase.auth().currentUser;
    const credential = firebase.auth.EmailAuthProvider.credential(user.email, state.currentPassword);

    await user.reauthenticateWithCredential(credential);
    await user.updatePassword(state.newPassword);
    const userRef = firebase
            .firestore()
            .collection("users")
            .doc(user.uid);
          await userRef.update({
            Password: state.newPassword,
          });
          
          state.updateMessage = "Password updated successfully.";
    console.log("Password updated successfully.");
    setTimeout(() => {
            location.reload();
          }, 500);
    
  } catch (error) {
    console.error("Error updating password:", error);
  }finally {
          state.isUpdating = false;
        }
      }
  
};
    return {
      state,
      user,
      v$,
      currentPasswordInput,
      updateButton,
      isupdateButton,
      proceedButton,
      updatePassword,
      isproceedButton,
      newPasswordInput,
      isConfirm,
      visible,
      invisible,
      passwordVisible,
      passwordInvisible
    };
  },
};
</script>
