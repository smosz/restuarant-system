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
            <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt class="text-sm font-medium text-gray-500">Username</dt>
              <input
                v-model="usernameInput"
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="username"
                type="text"
                placeholder="Enter your username"
              />
            </div>
            <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt class="text-sm font-medium text-gray-500">Phone Number</dt>
              <input
                v-model="phoneInput"
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="phone"
                type="tel"
                placeholder="Enter your phone number"
              />
            </div>
            <!-- <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt class="text-sm font-medium text-gray-500">Food Types</dt>
                  <input
                    v-model="foodInput"
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="food"
                    type="text"
                    placeholder="Enter your phone number"
                  />
                </div> -->
            <div class="bg-white text-end " @click="saveSettings">
              <button
                class="bg-blue-500   hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
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
import { ref, onMounted } from "vue";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { db } from "../firebase/firebaseInit";
export default {
  name: "bio",
  components: {
    CoverImage,
    ProfileImage,
  },
  setup() {
    const user = ref(null);
    const usernameInput = ref("");
    const phoneInput = ref("");

    firebase.auth().onAuthStateChanged((firebaseUser) => {
      user.value = firebaseUser;
      if (user.value) {
        firebase
          .firestore()
          .collection("users")
          .doc(user.value.uid)
          .get()
          .then((doc) => {
            usernameInput.value = doc.data().Username;
            phoneInput.value = doc.data().Phone_Number;
          });
      }
    });

    const saveSettings = () => {
      // Update the user's document in Firestore
      if (user.value) {
        firebase
          .firestore()
          .collection("users")
          .doc(user.value.uid)
          .update({
            Username: usernameInput.value,
            Phone_Number: phoneInput.value,
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
            displayName: usernameInput.value,
          });
    };
    return {
      user,
      usernameInput,
      phoneInput,
      saveSettings,
    };
  },
};
</script>
