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

  import prod from "../assets/prod.json";
  import lowStock from "../assets/lowStock.json";
  import "firebase/compat/firestore";
<<<<<<< HEAD
  
=======
  import { getDatabase, ref as stRef, get,remove } from "firebase/database";
>>>>>>> 9156ac0f0df5aac935aeb34399cac8c28282e2f6
  const orders = ref([]);

  const db = firebase.firestore();
  const products=ref([]);
  // Function to fetch and populate the latest 5 orders
  const fetchLatestOrders = async () => {
    try {
      const latestOrdersSnapshot = await db
        .collection("orders")
        .get();
  
      orders.value = latestOrdersSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

    } catch (error) {
      window.alert("Error fetching the latest orders");
    }
  };
  const fetchProducts = async () => {
    try {
      const productsSnapshot = await db.collection("products").get();
      products.value = productsSnapshot.docs.map((doc) => doc.data());
    } catch (error) {
      window.alert("Error fetching products");
    }
  };
<<<<<<< HEAD

=======
//   const fetchProducts = async () => {
//   try {
//     // Get a reference to the Firebase Realtime Database
//     const db = getDatabase();

//     // Reference the "products" node in the database
//     const productsRef = stRef(db, "/products");

//     // Retrieve the data from the "products" node
//     const productsSnapshot = await get(productsRef);

//     if (productsSnapshot.val() !== null) {
//       // Convert the data to an array of products
//       const productsList = [];
//       for (const sku in productsSnapshot.val()) {
//         const productData = productsSnapshot.val()[sku];
//         productsList.push({
//           id: sku, // Use the SKU as the ID
//           ...productData,
//         });
//       }

//       // Set the sorted products in your Vue variable
//       products.value = productsList;
//     } else {
//       console.log("No products found in the database.");
//     }
//   } catch (error) {
//     console.error("Error fetching products:", error);
//   }
// };
>>>>>>> 9156ac0f0df5aac935aeb34399cac8c28282e2f6
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
    fetchLatestOrders();
    fetchProducts();

  });
  
  </script>
  