<template>
  <nav class="bg-gray-800">
    <div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
      <div class="relative flex h-16 items-center justify-between">
        <div
          class="nav-item"
        >
          <div class="flex flex-shrink-0 items-center">
            <img class="block h-8 w-auto" src="../assets/res.png" alt="Your Company" />
          </div>
          <div class="hidden sm:ml-6 sm:block">
            <div class="flex space-x-4">
              <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" -->
              <router-link
              :to="{ name: 'Dashboard' }"
                class=" text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                >Dashboard</router-link
              >

              <a
                href="#"
                class="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                >Team</a
              >

              <a
                href="#"
                class="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                >Projects</a
              >

              <a
                href="#"
                class="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                >Calendar</a
              >
            </div>
          </div>
        </div>
        <div
          class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0"
        >
          <button
            type="button"
            class="rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
          >
            <span class="sr-only">View notifications</span>
            <svg
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
              />
            </svg>
          </button>

          <!-- Profile dropdown -->
          <div class="relative ml-3">
            <div @click="toggle = !toggle">
              <button type="button" class="drp-btn" id="user-menu-button">
                <span class="sr-only">Open user menu</span>
                <!-- <img
                  class="h-8 rounded-full object-contain w-full"
                  :src="state.profilePhotoUrl"
                  alt=""
                /> -->
                <img
            v-if="state.profilePhotoUrl"
            class="h-8 rounded-full object-contain w-fulll"
            :src="state.profilePhotoUrl"
          />
          <img
            v-else
            class="h-8 rounded-full object-contain w-full"
            src="../assets/avatar.jpg"
            alt="Default Cover Photo"
          />
              </button>
            </div>
            <div
              id="drp"
              class="dropdown"
              role="menu"
              v-if="toggle"
              aria-orientation="vertical"
              aria-labelledby="user-menu-button"
              tabindex="-1"
            >
              <!-- Active: "bg-gray-100", Not Active: "" -->
              <router-link
                id="user-menu-item-0"
                class="drp-item"
                role="menuitem"
                tabindex="-1"
                :to="{ name: 'Profile' }"
                ><Icon
                  icon="carbon:user-avatar-filled"
                  class="inline-block mx-1 mb-0 w-5 text-lg"
                />Your Profile</router-link
              >
              <router-link
                id="user-menu-item-1"
                class="drp-item"
                role="menuitem"
                tabindex="-1"
                :to="{ name: 'Settings' }"
                ><Icon
                  icon="icon-park-solid:setting"
                  class="inline-block mx-1 mb-0 w-5 text-lg"
                />Settings</router-link
              >
              <a
                @click.prevent="signOut"
                id="user-menu-item-2"
                class="drp-item"
                role="menuitem"
                tabindex="-1"
                ><Icon icon="mdi:logout" class="inline-block mx-1 mb-1 w-5 text-lg" />Sign
                out</a
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import { useRouter } from "vue-router";
import { ref, computed, reactive } from "vue";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { firebaseApp } from "../firebase/firebaseInit";
export default {
  name: "navBar",
  setup() {
    const user = ref(null);
  const state = reactive({
    profilePhotoUrl:''
  });

    const router = useRouter();
    const toggle = ref(false);
    firebase.auth().onAuthStateChanged((firebaseUser) => {
    user.value = firebaseUser;
    if (user.value) {
      firebase
        .firestore()
        .collection("users")
        .doc(user.value.uid)
        .get()
        .then((doc) => {
          state.profilePhotoUrl =  doc.data().profilePhotoUrl
        });
    }
  });
    const signOut = async () => {
      firebaseApp.auth().signOut();
      router.push("/");
    };

    return { signOut, toggle,user,
    state, };
  },
};
</script>
