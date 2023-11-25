<template>
  <div class="flex flex-col justify-center mb-4 mr-8">
    <div class="w-full grid grid-cols-4 ovr ">
      <div class="relative group md:w-[81%] w-full">
        <div
          class="absolute w-full -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg blur opacity-25 !left-[37px] group-hover:opacity-100 transition duration-1000 group-hover:duration-200">
        </div>
        <div class="relative bg-white ring-1 ring-gray-900/5 rounded-lg chng  left-[33px] flex">
          <div
            class="h-[90px] w-[90px] bg-[antiquewhite] flex justify-center items-center ml-[-38px] chng rounded-full bg-lightPrimary dark:bg-navy-700 shadow-inner">
            <div class="h-[90px] w-[90px] flex justify-center items-center">
              <Vue3Lottie :animationData="an" :height="200" class="pl-2" />
            </div>
          </div>
          <div class="flex w-auto flex-col justify-center ml-4">
            <p class=" text-[1rem] font-bold text-black">TOTAL SALES</p>
            <h4 class="text-xl font-bold text-navy-700 text-purple-500">
              UGX {{ totalOrdersPrice }}
            </h4>
          </div>
        </div>
      </div>
      <div class="relative group md:w-[81%] w-full">
        <div
          class="absolute w-full -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg blur opacity-25 !left-[37px] group-hover:opacity-100 transition duration-1000 group-hover:duration-200">
        </div>
        <div class="relative bg-white ring-1 ring-gray-900/5 rounded-lg chng  left-[33px] flex">
          <div
            class="h-[90px] w-[90px] bg-[antiquewhite] flex justify-center items-center ml-[-38px] chng rounded-full bg-lightPrimary dark:bg-navy-700 shadow-inner">
            <div class="h-[90px] w-[90px] flex justify-center items-center">
              <Vue3Lottie :animationData="wallet" :height="200" />
            </div>
          </div>
          <div class="flex w-auto flex-col justify-center ml-4">
            <p class=" text-[1rem] font-bold text-black">TOTAL EXPENSES</p>
            <h4 class="text-xl font-bold text-navy-700 text-purple-500">
              UGX {{ totalAmount }}
            </h4>
          </div>
        </div>
      </div>
      <div class="relative group md:w-[81%] w-full">
        <div
          class="absolute w-full -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg blur opacity-25 !left-[37px] group-hover:opacity-100 transition duration-1000 group-hover:duration-200">
        </div>
        <div class="relative bg-white ring-1 ring-gray-900/5 rounded-lg chng  left-[33px] flex">
          <div
            class="h-[90px] w-[90px] bg-[antiquewhite] flex justify-center items-center ml-[-38px] chng rounded-full bg-lightPrimary dark:bg-navy-700 shadow-inner">
            <div class="h-[90px] w-[90px] flex justify-center items-center">
              <Vue3Lottie :animationData="pro" :height="200" />
            </div>
          </div>
          <div class="flex w-auto flex-col justify-center ml-4">
            <p class=" text-[1rem] font-bold text-black">HIGHEST SALE</p>
            <h4 class="text-xl font-bold text-navy-700 text-purple-500">
              UGX {{ highestAmount }}
            </h4>
          </div>
        </div>
      </div>
      
      <div class="relative group md:w-[81%] w-full ovr4">
        <div
          class="absolute w-full -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg blur opacity-25 !left-[37px] group-hover:opacity-100 transition duration-1000 group-hover:duration-200">
        </div>
        <div class="relative bg-white ring-1 ring-gray-900/5 rounded-lg chng  left-[33px] flex">
          <div
            class="h-[90px] w-[90px] bg-[antiquewhite] flex justify-center items-center ml-[-38px] chng rounded-full bg-lightPrimary dark:bg-navy-700 shadow-inner">
            <div class="h-[90px] w-[90px] flex justify-center items-center">
              <Vue3Lottie :animationData="prod" :height="200" class="lottie !ml-[-32px] !mt-[-47px]" />
            </div>
          </div>
          <div class="flex w-auto flex-col justify-center ml-4">
            <p class=" text-[1rem] font-bold text-black">PRODUCTS IN STOCK</p>
            <h4 class="text-xl font-bold text-navy-700 text-purple-500">
              UGX {{ totalAmountProd }}
            </h4>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import firebase from "firebase/compat/app";
import pro from "../assets/pro.json";
import an from "../assets/an.json";
import wallet from "../assets/wallet.json";
import prod from "../assets/prod.json";
import "firebase/compat/firestore";

const orders = ref([]);
const totalPrices = ref([])
const rawTotalPrices = ref([])
const expenses = ref([])
const expenseMoney = ref([])
const db = firebase.firestore();
const products = ref([]);
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
    rawTotalPrices.value = latestOrdersSnapshot.docs.map((doc) => {
      const orderData = doc.data();
      return orderData.discountAmount > 0
        ? orderData.discountAmount
        : orderData.totalAmount;
    });
    totalPrices.value = rawTotalPrices.value.map((item) => {
      if (typeof item === "string") {
        // Remove any commas and convert to a number
        return parseFloat(item.replace(/,/g, ""));
      } else if (typeof item === "number") {
        // If it's already a number, no need to convert
        return item;
      } else {
        // Handle other data types or invalid data here
        return null; // or some default value
      }
    });
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
const fetchExpenses = async () => {
  try {
    const expensesSnapshot = await db.collection("expenses").get();
    expenses.value = expensesSnapshot.docs.map((doc) => doc.data());
    // Filter out undefined or missing 'money' values
    expenseMoney.value = expensesSnapshot.docs
      .map((doc) => doc.data().money)
      .filter((money) => money !== undefined);


  } catch (error) {
    console.log(error)
    window.alert("Error fetching expenses");
  }
};
const totalAmount = computed(() => {
  const total = expenses.value.reduce((total, expense) => total + expense.totalAmount, 0);
  if (total > 0) {
    return total.toLocaleString();
  } else {
    return "0";
  }
});
const totalAmountProd = computed(() => {
  const total = products.value.reduce((total, product) => total + product.amount, 0);
  if (total > 0) {
    return total.toLocaleString();
  } else {
    return "0";
  }
});
const highestAmount = computed(() => {
  const total = Math.max(...totalPrices.value);
  if (total > 0) {
    return total.toLocaleString();
  } else {
    return "0";
  }
});
const totalOrdersPrice = computed(() => {
  const total = totalPrices.value.reduce((total, amount) => total + amount, 0);
  if (total > 0) {
    return total.toLocaleString();
  } else {
    return "0";
  }
});

// Fetch the latest 5 orders when the component is mounted
onMounted(() => {
  fetchLatestOrders();
  fetchProducts();
  fetchExpenses();
});

</script>

