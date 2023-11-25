<template>
  <nav class="bg-orange-200 no-print shadow-md">
    <div class="mx-auto flex items-center px-2 sm:px-6 lg:px-8">
      
        <div class="nav-item col-span-2">
          <div class="flex flex-shrink-0 items-center log">
            <img class="block h-16 w-auto" src="/imp.png" alt="Company" />
          </div>
          <div class="flex men">
            <router-link
              :to="{ name: 'Dashboard' }"
              class="hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
              >Dashboard</router-link
            >
            <div
            v-if="userStore.loggedInUserData.Role === 'Admin' || userStore.loggedInUserData.Role === 'Tech'"
              :class="{
                'active-products': isAllProductsActive,
                'active-add-product': isAddProductActive,
                'active-categories': isCategoriesActive,
                'active-add-category': isAddCategoryActive,
              }"
              class="crelative group hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
              @mouseover="isHovered = true"
              @mouseleave="isHovered = false"
            >
              <a class="flex cursor-pointer"
                ><span>Products</span>
                <!-- SVG dropdown icon -->
                <svg
                  class="w-4 h-4 ml-1 mt-[3px] transition-transform transform rotate-0 group-hover:rotate-180"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 9l-7 7-7-7"
                  ></path></svg></a>

              <!-- Dropdown menu -->
              <div
                id="drp"
                class="dropdown2"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="user-menu-button"
                tabindex="-1"
              >
                <ul
                  class="py-2 text-sm text-gray-700 dark:text-gray-200"
                  aria-labelledby="productsDropdownButton"
                >
                  <!-- Menu items -->
                  <li class="mb-4">
                    <router-link
                      :to="{ name: 'Allproducts' }"
                      class="hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                      >All Products</router-link
                    >
                  </li>
                  <li class="mb-4">
                    <router-link
                      :to="{ name: 'Addproduct' }"
                      class="hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                      >Add Product</router-link
                    >
                  </li>
               
                  <li class="mb-4">
                    <router-link
                      :to="{ name: 'Categories' }"
                      class="hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                      >Categories</router-link
                    >
                  </li>
                  <!-- <li class="mb-4">
                      <router-link
                        :to="{ name: 'Addcategory' }"
                        class=" hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                        >Add Category</router-link
                      >
                    </li> -->
                </ul>
              </div>
            </div>

            <router-link
            
              :to="{ name: 'Customers' }"
              class="hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
              >Customers</router-link
            >
            <router-link

              :to="{ name: 'Pos' }"
              class="hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
              >Pos</router-link
            >
            <router-link
            v-if="userStore.loggedInUserData.Role === 'Admin' || userStore.loggedInUserData.Role === 'Tech'"
              :to="{ name: 'Orders' }"
              class="hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
              >Orders</router-link
            >
            <router-link

:to="{ name: 'Expenses' }"
class="hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
>Expenses</router-link
>
            <router-link
            v-if="userStore.loggedInUserData.Role === 'Admin' || userStore.loggedInUserData.Role === 'Tech'"
              :to="{ name: 'Roles' }"
              class="hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
              >Roles</router-link
            >
            <router-link
            v-if="userStore.loggedInUserData.Role === 'Admin' || userStore.loggedInUserData.Role === 'Tech'"
              :to="{ name: 'Users' }"
              class="hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
              >Users</router-link
            >
          </div>
        </div>
       
          <!-- Profile dropdown -->

          <div @click="toggle = !toggle">
            <button>
              <img
                v-if="userStore.loggedInUserData.profilePhotoUrl"
                class="h-8 rounded-full object-contain w-fulll"
                :src="userStore.loggedInUserData.profilePhotoUrl"
              />
              <img
                v-else
                class="h-8 rounded-full object-contain w-full"
                src="/avatar.jpg"
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
              @click.prevent="userStore.signOut()"
              id="user-menu-item-2"
              class="drp-item"
              role="menuitem"
              tabindex="-1"
              ><Icon
                icon="mdi:logout"
                class="inline-block mx-1 mb-1 w-5 text-lg"
              />Sign out</a
            >
          </div>
      
      
    </div>
  </nav>
  
</template>

<script setup>
import { useRouter } from "vue-router";
import { ref, onMounted } from "vue";

import "firebase/compat/auth";
import { firebaseApp } from "../firebase/firebaseInit";
import { useUserStore } from "../stores/user";

const userStore = useUserStore();
// State for the logged-in user


const router = useRouter();
const toggle = ref(false);
const isHovered = ref(false);
const isAllProductsActive = ref(false);
const isAddProductActive = ref(false);
const isCategoriesActive = ref(false);
const isAddCategoryActive = ref(false);

onMounted(async () => {

  await  userStore.initializeUser();
  const currentRouteName = router.currentRoute.value.name;

  // Check if the current route matches each route
  isAllProductsActive.value = currentRouteName === "Allproducts";
  isAddProductActive.value = currentRouteName === "Addproduct";
  isCategoriesActive.value = currentRouteName === "Categories";
  isAddCategoryActive.value = currentRouteName === "Addcategory";
});
</script>
