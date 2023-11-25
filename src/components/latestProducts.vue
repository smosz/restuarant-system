<template>
<<<<<<< HEAD
=======
<<<<<<< HEAD
    <div class="flex justify-between">
      <div class="w-full max-w-md p-4 bg-white bproduct bproduct-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:bproduct-gray-700">
        <div class="flex items-center justify-between mb-4">
          <h5 class="text-xl font-bold leading-none text-gray-900 dark:text-white">Top Selling Products</h5>
          <router-link :to="{ name: 'Allproducts' }" class="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500">View All</router-link>
        </div>
        <div class="flow-root">
          <ul role="list" class="divide-y divide-gray-200 dark:divide-gray-700">
            <li class="py-3 sm:py-4" v-for="product in topProducts" :key="product.id">
              <div class="flex items-center space-x-4 justify-between">
                <div class="flex-shrink-0 text-gray-600 font-semibold">
                  <img :src="product.productImage" alt="Product Image" class="w-10 h-10 mr-2">
                </div>
                <div class="flex-shrink-0 text-gray-600 font-semibold">
                  <p class="text-white">{{ product.name }}</p>
=======
>>>>>>> 868b9b0e63871cce18fc0ae7d8bd79e63a7fd462
  <div class="flex justify-between">
    <div
      class="w-full max-w-md p-4 bg-white bproduct bproduct-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:bproduct-gray-700"
    >
      <div class="flex items-center justify-between mb-4">
        <h5
          class="text-xl font-bold leading-none text-gray-900 dark:text-white"
        >
          Top Selling Products
        </h5>
        <router-link
          :to="{ name: 'Allproducts' }"
          class="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500"
          >View All</router-link
        >
      </div>
      <div class="flow-root">
        <!-- <ul role="list" class="divide-y divide-gray-200 dark:divide-gray-700">
            <li class="py-3 sm:py-4" v-for="product in topProducts" :key="product.id">
              <div class="grid grid-cols-4 gap-2">
                <div class="flex items-center justify-left  p-2 text-gray-600 font-semibold">
                  <img
                    :src="product.productImage"
                    alt="Product Image"
                    class="w-10 h-10 mr-2"
                  />
                  <span>{{ product.name }}</span>
                </div>
                <div class="flex-shrink-0 text-gray-600 font-semibold">
                  <p class="text-white"></p>
<<<<<<< HEAD
=======
>>>>>>> 9156ac0f0df5aac935aeb34399cac8c28282e2f6
>>>>>>> 868b9b0e63871cce18fc0ae7d8bd79e63a7fd462
                  <p>{{ product.sku }}</p>
                </div>
                <div class="min-w-0 text-white font-bold">UGX {{ product.price.toLocaleString() }}</div>
                <div class="!m-0 items-center text-base font-semibold text-gray-900 dark:text-white flex">
<<<<<<< HEAD
                 
=======
<<<<<<< HEAD
                  <!-- Show increasing or decreasing icon based on the change in rank -->
=======
                 
>>>>>>> 9156ac0f0df5aac935aeb34399cac8c28282e2f6
>>>>>>> 868b9b0e63871cce18fc0ae7d8bd79e63a7fd462
                  <svg v-if="product.rankChange === 'down'" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 50 50" width="30" height="30">
                    <path fill="url(#a)" d="M26.5625 33.7276L32.2285 28.0616C32.8387 27.4515 33.828 27.4515 34.4382 28.0616C35.0484 28.6718 35.0484 29.6612 34.4382 30.2714L26.1049 38.6047C25.4947 39.2149 24.5054 39.2149 23.8952 38.6047L15.5618 30.2714C14.9516 29.6612 14.9516 28.6718 15.5618 28.0617C16.172 27.4515 17.1613 27.4515 17.7715 28.0617L23.4375 33.7276L23.4375 13.5415C23.4375 12.6786 24.1371 11.979 25 11.979C25.863 11.979 26.5625 12.6786 26.5625 13.5415L26.5625 33.7276Z"></path>
                    <defs>
                      <linearGradient id="a" x1="25" x2="25" y1="11.979" y2="39.062" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#fa0808" class="stopColor834D9B svgShape"></stop>
                        <stop offset="1" stop-color="#d64e4e" class="stopColorD04ED6 svgShape"></stop>
                      </linearGradient>
                    </defs>
                  </svg>
                  <svg v-if="product.rankChange === 'up' " xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" width="30" height="30">
                    <path fill="#2aff00" d="M83.3 48.5 62.9 19.2c-1.4-2-4.4-2-5.8 0L36.7 48.5c-2.1 3 1.2 6.8 4.5 5.2L54 47.4 56.5 99c.1 1.9 1.6 3.4 3.5 3.4s3.4-1.5 3.5-3.4L66 47.4l12.8 6.3c3.3 1.6 6.5-2.2 4.5-5.2z" class="colorff8aae svgShape"></path>
                  </svg>
                  {{ product.sold }}
                </div>
              </div>
<<<<<<< HEAD
=======
<<<<<<< HEAD
            </li>
          </ul>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
=======
>>>>>>> 868b9b0e63871cce18fc0ae7d8bd79e63a7fd462



            </li>
          </ul> -->
        <table class="min-w-full">
<<<<<<< HEAD
          <tbody v-loading="loading">
            <tr>
            <td :colspan="numberOfColumns" class="text-center" v-if="topProducts.length === 0 ">
      <!-- Center the el-empty component -->
      <el-empty :image-size="200"></el-empty>
    </td>
  </tr>
=======
          <tbody>
>>>>>>> 868b9b0e63871cce18fc0ae7d8bd79e63a7fd462
            <tr v-for="product in topProducts" :key="product.id">
              <td class="pb-4">
                <img
                  :src="product.productImage"
                  alt="Product Image"
                  class="w-10 h-10 mr-2"
                />
              </td >
              <td class="pb-4">
                <div class="text-gray-600 font-semibold">
                  {{ product.name }}
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-600 font-semibold">{{
                    product.sku
                  }}</span>

                  <span class="pr-[40px] text-gray-600 font-semibold"
                    >UGX {{ product.price.toLocaleString() }}</span
                  >
                </div>
              </td >
              <td class="pb-4">
                <div
                  class="!m-0 items-center text-base font-semibold text-gray-900 dark:text-white flex"
                >
<<<<<<< HEAD

                  <!-- Show increasing or decreasing icon based on the change in rank -->
                  <svg v-if="product.rankChange === 'equal'" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M12 10a2 2 0 0 0-2 2a2 2 0 0 0 2 2c1.11 0 2-.89 2-2a2 2 0 0 0-2-2Z"/></svg>
=======
                  <!-- Show increasing or decreasing icon based on the change in rank -->
>>>>>>> 868b9b0e63871cce18fc0ae7d8bd79e63a7fd462
                  <svg
                    v-if="product.rankChange === 'down'"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 50 50"
                    width="30"
                    height="30"
                  >
                    <path
                      fill="url(#a)"
                      d="M26.5625 33.7276L32.2285 28.0616C32.8387 27.4515 33.828 27.4515 34.4382 28.0616C35.0484 28.6718 35.0484 29.6612 34.4382 30.2714L26.1049 38.6047C25.4947 39.2149 24.5054 39.2149 23.8952 38.6047L15.5618 30.2714C14.9516 29.6612 14.9516 28.6718 15.5618 28.0617C16.172 27.4515 17.1613 27.4515 17.7715 28.0617L23.4375 33.7276L23.4375 13.5415C23.4375 12.6786 24.1371 11.979 25 11.979C25.863 11.979 26.5625 12.6786 26.5625 13.5415L26.5625 33.7276Z"
                    ></path>
                    <defs>
                      <linearGradient
                        id="a"
                        x1="25"
                        x2="25"
                        y1="11.979"
                        y2="39.062"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop
                          stop-color="#fa0808"
                          class="stopColor834D9B svgShape"
                        ></stop>
                        <stop
                          offset="1"
                          stop-color="#d64e4e"
                          class="stopColorD04ED6 svgShape"
                        ></stop>
                      </linearGradient>
                    </defs>
                  </svg>
                  <svg
                    v-if="product.rankChange === 'up'"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 120 120"
                    width="30"
                    height="30"
                  >
                    <path
                      fill="#2aff00"
                      d="M83.3 48.5 62.9 19.2c-1.4-2-4.4-2-5.8 0L36.7 48.5c-2.1 3 1.2 6.8 4.5 5.2L54 47.4 56.5 99c.1 1.9 1.6 3.4 3.5 3.4s3.4-1.5 3.5-3.4L66 47.4l12.8 6.3c3.3 1.6 6.5-2.2 4.5-5.2z"
                      class="colorff8aae svgShape"
                    ></path>
                  </svg>
                  {{ product.sold }}
                </div>
              </td >
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
<<<<<<< HEAD
import { ref, onMounted, computed, watch } from "vue";


import axios from "axios";
const loading = ref(true);
const products = ref([]);

const numberOfColumns = ref(5)
// Function to fetch and populate all products
const fetchAllProducts = async () => {
  try {
    const response = await axios.get('http://localhost:8080/products');
    const productsList = response.data;

    // Assuming your server response contains products in the same structure as Firestore
    loading.value = false;
    products.value = productsList
  .map((product) => ({
    id: product.id,
    ...product,
  }))
  .sort((a, b) => a.ranking - b.ranking) // Sort by ranking
  .slice(0, 5); // Limit to the first 5 products

  } catch (error) {
    loading.value = false;
    console.error('Error fetching all products', error);
    window.alert('Error fetching all products');
  }
};


=======
>>>>>>> 9156ac0f0df5aac935aeb34399cac8c28282e2f6
import { ref, onMounted, computed, watch } from "vue";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

const products = ref([]);
const db = firebase.firestore();

// Function to fetch and populate all products
const fetchAllProducts = async () => {
  try {
<<<<<<< HEAD
    const productsSnapshot = await db.collection("products").orderBy("ranking", "asc").limit(5).get();
=======
    const productsSnapshot = await db
      .collection("products")
      .orderBy("ranking", "asc")
      .limit(5)
      .get();
>>>>>>> 9156ac0f0df5aac935aeb34399cac8c28282e2f6
    products.value = productsSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    window.alert("Error fetching all products");
  }
};

>>>>>>> 868b9b0e63871cce18fc0ae7d8bd79e63a7fd462
// Fetch all products when the component is mounted
onMounted(() => {
  fetchAllProducts();
});

// Calculate the ranking change for each product
const calculateRankingChange = (product) => {
  if (product.ranking === product.initialRank) {
    return "equal";
<<<<<<< HEAD
  } else if (product.ranking < product.initialRank || product.initialRank===0 && product.ranking>0) {
    return "up";
  }  {
=======
  } else if (product.ranking < product.initialRank) {
    return "up";
  } else {
>>>>>>> 868b9b0e63871cce18fc0ae7d8bd79e63a7fd462
    return "down";
  }
};

const topProducts = computed(() => {
<<<<<<< HEAD
  const chng= products.value.map((product) => ({
    ...product,
    rankChange: calculateRankingChange(product),
   
  }));
  console.log(chng)
  return chng
=======
  return products.value.map((product) => ({
    ...product,
    rankChange: calculateRankingChange(product),
  }));
>>>>>>> 868b9b0e63871cce18fc0ae7d8bd79e63a7fd462
});
</script>
