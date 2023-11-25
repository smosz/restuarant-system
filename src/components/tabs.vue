<template>
  <div class=" bg-gray-100">
    <div class="py-8">
      <div class="mx-auto max-w-3xl px-4">
        <div>
          <div class="border-b border-gray-200">
            <div class="-mb-px flex justify-center">
              <button
                :class="
                  tab === 1
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                "
                class="whitespace-nowrap px-12 border-b-2 font-medium focus:outline-none transition-all"
                @click="currentTab(1)"
              >
                <span class="bio">
                  <Vue3Lottie :animationData="info" :width="50" />
                  <h1>Bio-Info</h1>
                </span>
              </button>
              <button
<<<<<<< HEAD
              v-if="userStore.loggedInUserData.Role === 'ADMIN' || userStore.loggedInUserData.Role === 'Tech'"
=======
              v-if="userStore.loggedInUserData.Role === 'Admin' || userStore.loggedInUserData.Role === 'Tech'"
>>>>>>> 868b9b0e63871cce18fc0ae7d8bd79e63a7fd462
                :class="
                  tab === 2
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                "
                class="whitespace-nowrap px-12 border-b-2 font-medium text-sm focus:outline-none transition-all"
                @click="currentTab(2)"
              >
              <span class="bio">
                <Vue3Lottie :animationData="email" :width="50" />
                <h1>Email-Setup</h1>
              </span>
              </button>
              <button
<<<<<<< HEAD
             v-if="userStore.loggedInUserData.Role === 'ADMIN' || userStore.loggedInUserData.Role === 'Tech'"
=======
             v-if="userStore.loggedInUserData.Role === 'Admin' || userStore.loggedInUserData.Role === 'Tech'"
>>>>>>> 868b9b0e63871cce18fc0ae7d8bd79e63a7fd462
                :class="
                  tab === 3
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                "
                class="whitespace-nowrap px-12 border-b-2 font-medium text-sm focus:outline-none transition-all"
                @click="currentTab(3)"
              >
              <span class="bio">
                <Vue3Lottie :animationData="password" :width="50" />
                <h1>Password-Setup</h1>
              </span>
              </button>
            </div>
          </div>
          <div class="mt-4">
            <div v-if="tab === 1">
              <bio/>
            </div>
            <div v-if="tab === 2 ">
<<<<<<< HEAD
             <emailTab v-if="userStore.loggedInUserData.Role === 'ADMIN' || userStore.loggedInUserData.Role === 'Tech'"/>
            </div>
            <div v-if="tab === 3 ">
              <passwordTab v-if="userStore.loggedInUserData.Role === 'ADMIN' || userStore.loggedInUserData.Role === 'Tech'"/>
=======
             <emailTab v-if="userStore.loggedInUserData.Role === 'Admin' || userStore.loggedInUserData.Role === 'Tech'"/>
            </div>
            <div v-if="tab === 3 ">
              <passwordTab v-if="userStore.loggedInUserData.Role === 'Admin' || userStore.loggedInUserData.Role === 'Tech'"/>
>>>>>>> 868b9b0e63871cce18fc0ae7d8bd79e63a7fd462
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import info from "../assets/info.json";
import email from "../assets/email.json";
import password from "../assets/password.json";
import { ref } from "vue";
import bio from "./bio.vue";
import emailTab from "./emailTab.vue";
import passwordTab from "./passwordTab.vue";
import { useUserStore } from "../stores/user";

    const tab = ref(1);
    const currentTab = (tabNumber) => (tab.value = tabNumber);
    const userStore = useUserStore();
 
</script>
