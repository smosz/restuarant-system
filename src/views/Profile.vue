<template>
  <navBar />
  <div
    class="profile"
  >
    <div class="container mx-auto">
      <div
        class="flex flex-col lg:flex-row w-10/12 lg:w-8/12 bg-white rounded-xl mx-auto shadow-lg overflow-hidden"
      >
        <div class="w-full">
          <div class="rounded-t-lg h-32 overflow-hidden">
            <img
            v-if="state.coverPhotoUrl"
            class="object-contain w-full"
            :src="state.coverPhotoUrl"
          />
          <img
            v-else
            class="object-contain w-full"
            src="../assets/2.jpg"
            alt="Default Cover Photo"
          />
        </div>
        <div class="mx-auto w-32 h-32 relative -mt-16 border-4 border-white rounded-full overflow-hidden">
          <img
            v-if="state.profilePhotoUrl"
            class="object-contain w-full"
            :src="state.profilePhotoUrl"
          />
          <img
            v-else
            class="object-contain w-full"
            src="../assets/avatar.jpg"
            alt="Default Cover Photo"
          />
        </div>
          <div class="">
            <dl>
              <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt class="text-sm font-medium text-gray-500">Username</dt>
                <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{{state.username}}</dd>
              </div>
              <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt class="text-sm font-medium text-gray-500">Gender</dt>
                <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{{state.gender}}</dd>
              </div>
              <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt class="text-sm font-medium text-gray-500">Email Address</dt>
                <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {{state.email}}
                </dd>
              </div>
              <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt class="text-sm font-medium text-gray-500">Phone Number</dt>
                <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{{state.phoneNumber}}</dd>
              </div>
              <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt class="text-sm font-medium text-gray-500">Favourite Food Types</dt>
                <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                 {{state.foodTypes  }} 
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import navBar from "../components/navBar.vue";
import { ref, computed, reactive } from "vue";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
export default {
  components: { navBar },
  setup() {
    const user = ref(null);
  const state = reactive({
    username: "",
    foodTypes:'',
    phoneNumber:'',
    email:'',
    gender:'',
    coverPhotoUrl:'',
    profilePhotoUrl:''
  });
  firebase.auth().onAuthStateChanged((firebaseUser) => {
    user.value = firebaseUser;
    if (user.value) {
      firebase
        .firestore()
        .collection("users")
        .doc(user.value.uid)
        .get()
        .then((doc) => {
          state.coverPhotoUrl =  doc.data().coverPhotoUrl
          state.profilePhotoUrl =  doc.data().profilePhotoUrl
          state.username = doc.data().Username;
          if(doc.data().Food_Types==''){
            state.foodTypes = ''
          }else{
            state.foodTypes = doc.data().Food_Types
          }
          state.phoneNumber = doc.data().Phone_Number;
          state.email = doc.data().Email;
          state.gender = doc.data().Gender;
        });
    }
  });
  return {
    user,
    state,
  };
  }
  
};
</script>
