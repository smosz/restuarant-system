<template>
    <div class="flex flex-col justify-center mb-4 mr-8">
      <div
        class="w-full flex justify-between "
      >
        <div class="relative group w-[20%]">
          <div
            class="absolute w-full -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg blur opacity-25 !left-[37px] group-hover:opacity-100 transition duration-1000 group-hover:duration-200"
          ></div>
          <div
            class="relative bg-white ring-1 ring-gray-900/5 rounded-lg chng  left-[33px] flex"
          >
            
              <div
                class="h-[90px] w-[90px] bg-[antiquewhite] flex justify-center items-center ml-[-38px] chng rounded-full bg-lightPrimary dark:bg-navy-700 shadow-inner"
              >
                <div
                  class="h-[90px] w-[90px] flex justify-center items-center"
                >
                <Vue3Lottie  :animationData="sold" :height="200" class=" lottiep"/>
                </div>
              </div>
            
  
            <div class="flex w-auto flex-col justify-center ml-4">
              <p class=" text-[1rem] font-bold text-black">STOCK SOLD</p>
              <h4 class="text-xl font-bold text-navy-700 text-purple-500">
               {{ totalQtySold }}
              </h4>
            </div>
          </div>
        </div>
        <div class="relative group w-[20%] ">
          <div
            class="absolute w-full -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg blur opacity-25 !left-[37px] group-hover:opacity-100 transition duration-1000 group-hover:duration-200"
          ></div>
          <div
            class="relative bg-white ring-1 ring-gray-900/5 rounded-lg chng  left-[33px] flex"
          >
            
              <div
                class="h-[90px] w-[90px] bg-[antiquewhite] flex justify-center items-center ml-[-38px] chng rounded-full bg-lightPrimary dark:bg-navy-700 shadow-inner"
              >
                <div
                  class="h-[90px] w-[90px] flex justify-center items-center"
                >
                <Vue3Lottie  :animationData="lowStock" :height="200" />
                </div>
              </div>
            
  
            <div class="flex w-auto flex-col justify-center ml-4">
              <p class=" text-[1rem] font-bold text-black">LOW STOCK</p>
              <h4 class="text-xl font-bold text-navy-700 text-purple-500">
              {{ totalLowStockProducts }}
              </h4>
            </div>
          </div>
        </div>
        <div class="relative group w-[20%]">
          <div
            class="absolute w-full -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg blur opacity-25 !left-[37px] group-hover:opacity-100 transition duration-1000 group-hover:duration-200"
          ></div>
          <div
            class="relative bg-white ring-1 ring-gray-900/5 rounded-lg chng  left-[33px] flex"
          >
            
              <div
                class="h-[90px] w-[90px] bg-[antiquewhite] flex justify-center items-center ml-[-38px] chng rounded-full bg-lightPrimary dark:bg-navy-700 shadow-inner"
              >
                <div
                  class="h-[90px] w-[90px] flex justify-center items-center"
                >
                <Vue3Lottie  :animationData="emptyStock" :height="200" class="!mt-[-30px] lottiep"/>
                </div>
              </div>
            
  
            <div class="flex w-auto flex-col justify-center ml-4">
              <p class=" text-[1rem] font-bold text-black">OUT OF STOCK</p>
              <h4 class="text-xl font-bold text-navy-700 text-purple-500">
                {{ totalOutOfStockProducts }}
              </h4>
            </div>
          </div>
        </div>
        <div class="relative group w-[20%]">
          <div
            class="absolute w-full -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg blur opacity-25 !left-[37px] group-hover:opacity-100 transition duration-1000 group-hover:duration-200"
          ></div>
          <div
            class="relative bg-white ring-1 ring-gray-900/5 rounded-lg chng  left-[33px] flex"
          >
            
              <div
                class="h-[90px] w-[90px] bg-[antiquewhite] flex justify-center items-center ml-[-38px] chng rounded-full bg-lightPrimary dark:bg-navy-700 shadow-inner"
              >
                <div
                  class="h-[90px] w-[90px] flex justify-center items-center"
                >
                <Vue3Lottie  :animationData="prod" :height="200" class="lottie !ml-[-32px] !mt-[-47px]"/>
                </div>
              </div>
            
  
            <div class="flex w-auto flex-col justify-center ml-4">
              <p class=" text-[1rem] font-bold text-black">CURRENT STOCK</p>
              <h4 class="text-xl font-bold text-navy-700 text-purple-500">
                {{totalStockQuantity}}
              </h4>
            </div>
          </div>
        </div>
        
        
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted,computed } from "vue";
  import firebase from "firebase/compat/app";
  import emptyStock from "../assets/emptyStock.json";
  import sold from "../assets/sold.json";
  import axios from "axios";
  import prod from "../assets/prod.json";
  import lowStock from "../assets/lowStock.json";



  const products=ref([]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:8080/products"); // Replace with your API endpoint
          products.value = response.data.map((product) => {
            return {
              ...product,
            };
          });
    } catch (error) {
      window.alert("Error fetching products");
    }
  };

  const totalStockQuantity = computed(() => {
  return products.value.reduce(
    (total, product) => total + product.stockQuantity,
    0
  );
});
const totalQtySold = computed(() => {
    return products.value.reduce((total, product) => total + product.sold, 0);;
});
// Computed property for the total number of low stock products (stockQuantity < 20)
const totalLowStockProducts = computed(() => {
    return products.value.filter((product) => product.stockQuantity <= 20).length;
  });

  // Computed property for the total number of out of stock products (stockQuantity = 0)
  const totalOutOfStockProducts = computed(() => {
    return products.value.filter((product) => product.stockQuantity === 0).length;
  });
  // Fetch the latest 5 orders when the component is mounted
  onMounted(() => {
    fetchProducts();

  });
  
  </script>
  