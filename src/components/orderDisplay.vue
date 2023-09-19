<template>
    <div class="inset-0 flex items-center justify-center z-50 ml-10 mt-10">
      <div class="bg-white p-[1.05rem] rounded-lg shadow-lg">
        <!-- Header -->
        <div class="text-center">
          <h2 class="text-2xl font-semibold">Order Receipt #000{{ orderReceiptNumber }}</h2>
          <p class="text-lg">{{ date }} {{ time }}</p>
        </div>
  
        <!-- Customer Info -->
        <div class="mt-4">
          <p class="text-lg">
            Customer Name: {{ customerName }}<br />
            Phone Number: {{ customerNumber }}
          </p>
        </div>
  
        <!-- Order Items -->
        <table class="w-full mt-4 ">
          <thead>
            <tr>
              <th class="p-2 text-left">Product</th>
              <th class="p-2 text-left ">SKU</th>
              <th class="p-2 text-center ">Qty</th>
              <th class="p-2 text-right ">price</th>
              <th class="p-2 text-right ">Total</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(cartItem, index) in cartItems" :key="index">
              <td class="p-2 text-left ">{{ cartItem.product.name }}</td>
              <td class="p-2 text-left ">{{ cartItem.product.sku }}</td>
              <td class="p-2 text-center ">{{ cartItem.quantity }}</td>
              <td class="p-2 text-right "> {{ cartItem.product.price.toLocaleString() }}</td>
              <td class="p-2 text-right ">{{ calculateTotalPrice(cartItem).toLocaleString() }}</td>
            </tr>
          </tbody>
        </table>
  
        <!-- Order Summary -->
        <div class="mt-4">
          <p class="text-lg font-bold">Order Summary</p>
          <p>Total Items: <span  class=" font-bold">{{ totalItems }}</span> </p>
          <p>Total Amount: <span class=" font-bold"> UGX {{ totalPrice }}</span></p>
        </div>
  
        <!-- Payment and Confirmation Information -->
        <div class="mt-4">
          <p class="text-lg text-[#0d0814] font-bold">Payment</p>
          <p >Cash Received: <span class="text-lg text-[#0d0814] font-bold">UGX {{ cashGiven.toLocaleString() }}</span> </p>
          <p >Change: <span class="text-lg text-[#0d0814] font-bold">UGX {{ change }}</span> </p>
        </div>
  
        <!-- Order Confirmation Message -->
        <div class="mt-4">
          <p class="text-lg">Order Confirmed</p>
          <p>Thank you for your purchase!</p>
          <p class="text-sm text-[#0d0814] italic text-right">Served by: {{ userStore.username }}</p>
        </div>
        <!-- Close button -->
      <button @click="closeReceipt" class="mt-4 p-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none">
        Close Receipt
      </button>
      </div>
    </div>
  </template>
  
  
  
  <script setup>
  import { useOrdersStore } from "../stores/orders.js";
  import { onMounted,ref,defineEmits } from "vue";
  import { useUserStore } from '../stores/user.js';


  const orderStore = useOrdersStore();
  const orderReceiptNumber = ref("");
  const date = ref("");
  const customerName = ref("");
  const customerNumber = ref("");
  const totalItems = ref("");
  const totalPrice = ref("");
  const cashGiven = ref("");
  const change = ref("");
  const time = ref("");
  const cartItems=ref([])

const userStore = useUserStore();
    const emit = defineEmits(["close"]);

const closeReceipt = () => {
  // Add this line to log the closure
  emit("close");
};
  // Fetch orders and set the current order on component mount
  onMounted(async () => {

    await orderStore.fetchOrders();
    userStore.initializeUser();

  // Set the current order (replace '0' with the index of the order you want to display)
  const initialOrderIndex = 0; // Replace with the desired index
  orderStore.setCurrentOrder(orderStore.orders[initialOrderIndex]);
  
  // Set other order details here
  cartItems.value=orderStore.orders[initialOrderIndex].cart
  orderReceiptNumber.value = orderStore.orders[initialOrderIndex].orderReceiptNumber;
  date.value = orderStore.orders[initialOrderIndex].date;
  time.value = orderStore.orders[initialOrderIndex].time;
  customerName.value = orderStore.orders[initialOrderIndex].customer.name;
  customerNumber.value = orderStore.orders[initialOrderIndex].customer.number;
  totalItems.value = orderStore.orders[initialOrderIndex].totalItems;
  totalPrice.value = orderStore.orders[initialOrderIndex].totalAmount;
  cashGiven.value = orderStore.orders[initialOrderIndex].cashGiven;
  change.value = orderStore.orders[initialOrderIndex].change;
console.log(cartItems.value.product)
  });
  const calculateTotalPrice = (cartItem) => {
    return cartItem.product.price * cartItem.quantity;
    
  };
  
  </script>
  