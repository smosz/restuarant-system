<template>
  <div class="bg-white pb-5 sm:grid sm:grid-cols-[31%_41%] sm:px-6">
    <dt class="text-sm font-medium text-gray-500">Phone Number</dt>
    <div class="flex">
      <div class="relative flex items-stretch w-full">
        <input
          v-model="state.number"
          class="input-field"
          id="phone"
          type="tel"
          placeholder="Enter your phone number"
          disabled
        />
        <div
          v-if="isPhoneVerified.value"
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
        class="ml-2 rounded font-bold py-2 px-4 focus:outline-none focus:shadow-outline bg-blue-500 text-white hover:bg-blue-700"
        @click="verifynumber"
        v-if="isverifyMode && !isPhoneVerified.value && !isretryMode"
        :disabled="isVerifyButtonDisabled"
      >
        {{ verifyButtonText }}
      </button>
      <button
        class="ml-2 rounded font-bold py-2 px-4 focus:outline-none focus:shadow-outline bg-blue-500 text-white hover:bg-blue-700"
        @click="retryVerification"
        v-if="isretryMode"
      >
        Retry
      </button>
      <button
        class="ml-2 rounded font-bold py-2 px-4 focus:outline-none focus:shadow-outline bg-blue-500 text-white hover:bg-blue-700"
        @click="changeNumber"
        :disabled="isChangeButtonDisabled"
      >
        Change
      </button>
    </div>
    <br />
    <span v-if="isretryMode" class="w-max">
      <h1 class="font-bold text-red-500">
        <Icon icon="mdi:warning-circle" class="text-red-600 inline-block" />
        Invalid verification code. Please try again.
      </h1>
    </span>
    <div
      class="text-sm font-medium text-gray-500"
      v-if="countdown > 0 && iscountDown"
    >
      Retry verification in {{ countdown }} seconds
    </div>
    <div v-if="isChangeNumberMode" class="flex mt-2">
      <input
        v-model="state.newNumber"
        :class="
          v$.newNumber.$error === true ? 'text-field-error' : 'input-field'
        "
        id="newNumberInput"
        type="tel"
        placeholder="Enter new number"
      />
      <button
        class="ml-2 rounded font-bold py-2 px-4 focus:outline-none focus:shadow-outline bg-blue-500 text-white hover:bg-blue-700"
        @click="verifynewNumber"
        :disabled="isVerifyNewButtonDisabled"
      >
        Verify
      </button>
    </div>

    <br v-if="isconfirmationModenumber && !isChangeNumberMode" />
    <span v-if="isconfirmationModenumber && !isChangeNumberMode">
      <div class="flex mt-2">
        <input
          v-model="state.confirmationCode"
          :class="
            v$.confirmationCode.$error === true
              ? 'text-field-error'
              : 'input-field'
          "
          id="confirmation-code"
          type="tel"
          placeholder="Enter confirmation code"
        />
        <button
          class="ml-2 rounded font-bold py-2 px-4 focus:outline-none focus:shadow-outline bg-blue-500 text-white hover:bg-blue-700"
          @click="verifyCodenumber"
        >
          Confirm
        </button>
      </div>
      <span  v-if=" !v$.confirmationCode.$error"
        ><p class="font-bold w-max">A 6-Digit Code has been sent to</p>
        <h1 class="font-bold text-red-500">{{ state.number }}</h1></span
      >
      <span
        class="error-text"
        v-if="isconfirmationModenumber && v$.confirmationCode.$error"
      >
        <Icon icon="mdi:warning-circle" class="text-red-600 inline-block" />
        {{ v$.confirmationCode.$errors[0].$message }}
      </span>
    </span>

    <br v-if="isconfirmationModenewNumber" />
    <span v-if="isconfirmationModenewNumber">
      <div class="flex mt-2">
        <input
          v-model="state.confirmationCode"
          :class="
            v$.confirmationCode.$error === true
              ? 'text-field-error'
              : 'input-field'
          "
          id="confirmation-code"
          type="tel"
          placeholder="Enter confirmation code"
        />
        <button
          class="ml-2 rounded font-bold py-2 px-4 focus:outline-none focus:shadow-outline bg-blue-500 text-white hover:bg-blue-700"
          @click="verifyCodenewNumber"
        >
          Confirm
        </button>
      </div>
      <span class="w-max"  v-if=" !v$.confirmationCode.$error"
        ><p class="font-bold">A 6-Digit Code has been sent to <h1 class="font-bold text-red-500">{{ state.newNumber }}</h1></p>
        </span
      >
      <span
      class="error-text"
      v-if="isconfirmationModenewNumber && v$.confirmationCode.$error"
    >
      <Icon icon="mdi:warning-circle" class="text-red-600 inline-block" />
      {{ v$.confirmationCode.$errors[0].$message }}
      </span>
    </span>

    <br v-if="v$.newNumber.$error && !isPhoneVerified" />
    <span class="error-text" v-if="v$.newNumber.$error && !isPhoneVerified">
      <Icon icon="mdi:warning-circle" class="text-red-600 inline-block" />
      {{ v$.newNumber.$errors[0].$message }}
    </span>

    
    
  </div>
</template>
<script>
import { ref, computed, reactive } from "vue";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import useValidate from "@vuelidate/core";
import {
  required,
  minLength,
  numeric,
  sameAs,
  maxLength,
  helpers,
} from "@vuelidate/validators";
import { getMultiFactorResolver } from 'firebase/auth';

export default {
  name: "number",
  setup() {
    const user = ref(null);
    const state = reactive({
      number: "",
      newNumber: "",
      confirmationCode: "",
    });

    const isChangeNumberMode = ref(false);
    const isconfirmationModenumber = ref(false);
    const isconfirmationModenewNumber = ref(false);
    const isverifyMode = ref(true);
    const isChangeButtonDisabled = ref(false);
    const isVerifyButtonDisabled = ref(false);
    const isVerifyNewButtonDisabled = ref(false);
    const iscountDown = ref(true);
    const isretryMode = ref(false);
    const issame = ref(true);
    const isPhoneVerified = reactive({
      value: false,
    });

    const formatPhoneNumber = () => {
      const Regex = /07[0-9]/;
      const num = state.number;
      if (Regex.test(num)) {
        return true;
      } else {
        return false;
      }
    };
    const sameAsDisabledNumber = () => {
      if (state.newNumber === state.number) {
        return false; // Return false to indicate validation error
      }
      return true; // Return true to indicate validation success
    };

    const rules = computed(() => {
      return {
        newNumber: {
          required: helpers.withMessage("Phone number required", required),
          numeric: helpers.withMessage("Must be numeric", numeric),
          maxLength: helpers.withMessage(
            "Must be 10 digits long",
            maxLength(10)
          ),
          formatPhoneNumber: helpers.withMessage(
            "Invalid Format",
            formatPhoneNumber
          ),
          sameAsDisabledNumber: helpers.withMessage(
            "Number already exists! Try another one",
            sameAsDisabledNumber
          ),
          minLength: helpers.withMessage(
            "Must be 10 digits long",
            minLength(10)
          ),
          $autoDirty: true,
        },
        confirmationCode: {
          required: helpers.withMessage("Code is required", required),
          numeric: helpers.withMessage("Must be numeric", numeric),
          maxLength: helpers.withMessage("Must be 6 digits long", maxLength(6)),
          minLength: helpers.withMessage("Must be 6 digits long", minLength(6)),
          $autoDirty: true,
        },
        newNumberInput: {
          sameAsNumber: sameAs("state.number"),
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
            state.number = doc.data().Phone_Number;
            isPhoneVerified.value = doc.data().isPhoneVerified || false;
          });
      }
    });

    const verifyButtonText = computed(() => {
      if (isVerifyButtonDisabled.value) {
        return "Verifying...";
      } else if (isPhoneVerified.value) {
        return "Verified!";
      } else {
        return "Verify";
      }
    });

    const countdown = ref(0);
    const countdownInterval = 60;
    let isRecaptchaRendered = false;
    let appVerifier = null;

    const renderRecaptcha = () => {
  if (!isRecaptchaRendered) {
    appVerifier =
      appVerifier ||
      new firebase.auth.RecaptchaVerifier("recaptcha-container", {
        size: "invisible",
      });
    appVerifier.render().then(() => {
      isRecaptchaRendered = true;
    }).catch((error) => {
      console.log("Error rendering reCAPTCHA:", error);
    });
  }
};

    const startCountdownnumber = () => {
      countdown.value = countdownInterval;
      const countdownTimer = setInterval(() => {
        countdown.value--;
        if (countdown.value === 0) {
          clearInterval(countdownTimer);
          isRecaptchaRendered = false;
          isVerifyButtonDisabled.value = false;
          isconfirmationModenumber.value = false;
        }
      }, 1000);
    };
    const startCountdownNewNumber = () => {
      isChangeNumberMode.value = false;
      iscountDown.value = true;
      countdown.value = countdownInterval;
      const countdownTimer = setInterval(() => {
        countdown.value--;

        if (countdown.value === 0) {
          clearInterval(countdownTimer);
          isRecaptchaRendered = false;
          isVerifyButtonDisabled.value = false;
          isChangeButtonDisabled.value = false;
          isconfirmationModenewNumber.value = false;
        }
      }, 1000);
    };
    const stopCountdownAndHideRecaptchanumber = () => {
      countdown.value = 0;
      isconfirmationModenumber.value = false;
      isRecaptchaRendered = false;
      iscountDown.value = false; // Countdown is hidden
      const recaptchaContainer = document.getElementById("recaptcha-container");
      if (recaptchaContainer) {
        recaptchaContainer.style.display = "none";
      }
    };
    const stopCountdownAndHideRecaptchanew = () => {
      countdown.value = 0;
      isconfirmationModenewNumber.value = false;
      isRecaptchaRendered = false;
      iscountDown.value = false; // Countdown is hidden
      const recaptchaContainer = document.getElementById("recaptcha-container");
      if (recaptchaContainer) {
        recaptchaContainer.style.display = "none";
      }
    };
    const sentCode = ref(""); // add new variable to store sent code
   const sentCodenew = ref("");
    const cancelVerificationCode = () => {
      stopCountdownAndHideRecaptchanumber();
      if (sentCode.value) {
        const confirmationResult = firebase.auth.PhoneAuthProvider.credential(
          null,
          sentCode.value
        );
        confirmationResult
          .confirm()
          .then(() => {
            sentCode.value = null;
          })
          .catch((error) => {
            console.log(error);
          });
      }
    };
    const verifynumber = async () => {
      isconfirmationModenumber.value = true;
      try {
        startCountdownnumber();
        isVerifyButtonDisabled.value = true;
        const phoneNumber = `+256${state.number}`;
        renderRecaptcha();
        const confirmationResult = await firebase
          .auth()
          .signInWithPhoneNumber(phoneNumber, appVerifier);
        sentCode.value = confirmationResult.verificationId; // store sent code
        isChangeNumberMode.value = false;
        console.log(sentCode.value)
      } catch (error) {
        if (error.code === "auth/too-many-requests") {
          console.log(
            "Too many verification requests. Please try again later."
          );
        } else {
          console.log(error);
        }
      }
    };

    const verifyCodenumber = async () => {
      const userData = await v$.value.confirmationCode.$validate();
      if (userData) {
        stopCountdownAndHideRecaptchanumber();
        const credential = firebase.auth.PhoneAuthProvider.credential(
          sentCode.value,
          state.confirmationCode
        );
        try {
          await firebase.auth().currentUser.updatePhoneNumber(credential);
          const userRef = firebase
            .firestore()
            .collection("users")
            .doc(user.value.uid);
          await userRef.update({
            Phone_Number: state.number,
            isPhoneVerified: true,
          });
          isPhoneVerified.value = true;
          isverifyMode.value = false;
        } catch (error) {
          if (error.code === "auth/invalid-verification-code") {
            console.log("Invalid verification code. Please try again.");
            stopCountdownAndHideRecaptchanumber();
            isconfirmationModenumber.value = false;
            isPhoneVerified.value = false;
            isretryMode.value = true; // Enable retry mode
            retryCount.value += 1;
            if (retryCount.value > maxRetryCount) {
              console.log(
                "Exceeded maximum retry count. Please try again later."
              );
              isretryMode.value = false;
            }
          } else {
            console.log(error);
          }
        }
      }
    };

    const retryVerification = () => {
      verifynumber();
      state.confirmationCode = "";
      isretryMode.value = false; // Reset retry mode
      isconfirmationModenumber.value = true; // Enable confirmation mode
    };
    const changeNumber = () => {
      state.newNumber = "";
      isVerifyButtonDisabled.value = true;
      isVerifyNewButtonDisabled.value = false;
      isChangeNumberMode.value = true;
      isconfirmationModenumber.value = false;
      isconfirmationModenewNumber.value = false;
      isChangeButtonDisabled.value = true;
    };
    const verifynewNumber = async () => {
      state.confirmationCode = ''
      const userData = await v$.value.newNumber.$validate();
      if (userData) {
        try {
          startCountdownNewNumber();
          const newNumberInput = document.getElementById("newNumberInput");
          if (newNumberInput) {
            newNumberInput.disabled = true; // Disable the input field
          }
          isVerifyNewButtonDisabled.value = true;
          isconfirmationModenewNumber.value = true;

              const phoneNumbernew = `+256${state.newNumber}`;
              renderRecaptcha();
              console.log(phoneNumbernew)
              const confirmationResultnew = await firebase
                .auth()
                .signInWithPhoneNumber(phoneNumbernew, appVerifier);
              sentCodenew.value = confirmationResultnew.verificationId;
          
        } catch (error) {
          if (error.code === "auth/too-many-requests") {
            console.log(
              "Too many verification requests. Please try again later."
            );
          } else {
            console.log(error);
          }
        }
      }
    };
    const verifyCodenewNumber = async () => {
      const userData = await v$.value.confirmationCode.$validate();
      if (userData) {
        stopCountdownAndHideRecaptchanew();
        const credential = firebase.auth.PhoneAuthProvider.credential(
          sentCodenew.value,
          state.confirmationCode
        );
        try {
          await firebase.auth().currentUser.updatePhoneNumber(credential);
          const userRef = firebase
            .firestore()
            .collection("users")
            .doc(user.value.uid);
          await userRef.update({
            Phone_Number: state.newNumber,
            isPhoneVerified: true,
          });
          isPhoneVerified.value = true;
          isChangeNumberMode.value = false;
          isChangeButtonDisabled.value = false
          isverifyMode.value = false;
          state.number = state.newNumber
        } catch (error) {
          if (error.code === "auth/invalid-verification-code") {
            console.log("Invalid verification code. Please try again.");
            stopCountdownAndHideRecaptchanew();
            isconfirmationModenewNumber.value = false;
            isPhoneVerified.value = false;
          } else {
            console.log(error);
          }
        }
      }
    };

    return {
      user,
      state,
      v$,
      isPhoneVerified,
      isretryMode,
      retryVerification,
      formatPhoneNumber,
      isconfirmationModenumber,
      isconfirmationModenewNumber,
      isChangeNumberMode,
      changeNumber,
      isverifyMode,
      isChangeButtonDisabled,
      isVerifyButtonDisabled,
      cancelVerificationCode,
      verifynewNumber,
      verifynumber,
      verifyCodenewNumber,
      isVerifyNewButtonDisabled,
      verifyCodenumber,
      countdown,
      verifyButtonText,
      iscountDown,
      issame,
    };
  },
};
</script>
