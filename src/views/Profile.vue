<template>  
  <div>
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
            v-if="loggedInUserState.coverPhotoUrl"
            class="object-contain w-full"
            :src="loggedInUserState.coverPhotoUrl"
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
            v-if="loggedInUserState.profilePhotoUrl"
            class="object-contain w-full"
            :src="loggedInUserState.profilePhotoUrl"
          />
          <img
            v-else
            class="object-contain w-full"
            src="../assets/avatar.jpg"
            alt="Default Profile Photo"
          />
        </div>
          <div class="">
            <dl>
              <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt class="text-sm font-medium text-gray-500">Username</dt>
                <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{{loggedInUserState.Username}}</dd>
              </div>
              <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt class="text-sm font-medium text-gray-500">Gender</dt>
                <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{{loggedInUserState.Gender}}</dd>
              </div>
              <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt class="text-sm font-medium text-gray-500">Email Address</dt>
                <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {{loggedInUserState.Email}}
                </dd>
              </div>
              <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt class="text-sm font-medium text-gray-500">Phone Number</dt>
                <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{{loggedInUserState.Phone_Number}}</dd>
              </div>
              <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt class="text-sm font-medium text-gray-500">Role</dt>
                <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                 {{loggedInUserState.Role  }} 
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  </div>
  </div>
  
</template>

<script setup>
import navBar from "../components/navBar.vue";
import {  onMounted, } from "vue";
import "firebase/compat/auth";
import {useUserStore} from "../stores/user";

const userStore = useUserStore();
    // State for the logged-in user

const loggedInUserState = userStore.loggedInUserData

      onMounted(async () => {
        await userStore.initializeUser();
    });
</script>
