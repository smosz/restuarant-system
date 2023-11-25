<template>
    <div class="inset-0 flex flex-wrap items-center  max-h-[437px] overflow-y-auto  justify-center z-50 ml-10 mt-10" id="mainContainer" >
      <div class="p-[1.05rem] rounded-lg shadow-lg relative bg-white" >
<div class="text-center">
   <!-- receipt logo  -->
   <img
    src="/imp.png" 
    alt="Receipt Logo"
    class=" h-24 mx-auto mb-4" 
  />
</div>

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
              <td class="p-2 text-right ">
  <span v-if="cartItem.product.customPrice > 0">
    {{ cartItem.product.customPrice.toLocaleString() }}
  </span>
  <span v-else>
    {{ cartItem.product.price.toLocaleString() }}
  </span>
</td>

              <td class="p-2 text-right ">{{ calculateTotalPrice(cartItem).toLocaleString() }}</td>
            </tr>
          </tbody>
        </table>
  
        <!-- Order Summary -->
        <div class="mt-4">
          <p class="text-lg font-bold">Order Summary</p>
          <p>Total Items: <span  class=" font-bold">{{ totalItems }}</span> </p>
          <p>Total Amount: <span class=" font-bold"> UGX {{ totalPrice.toLocaleString() }}</span></p>
          <!-- Show the discount percentage and amount fields only if there is a discount -->
  <div class="mt-4" v-if="discount>0 ">
    <p>Discount: <span class="font-bold">{{ discount }}%</span></p>
    <p>Discount Amount: <span class="font-bold">UGX {{ discountAmount.toLocaleString() }}</span></p>
  </div>
        </div>
  
        <!-- Payment and Confirmation Information -->
        <div class="mt-4">
          <p class="text-lg text-[#0d0814] font-bold">Payment</p>
          <p >Cash Received: <span class="text-lg text-[#0d0814] font-bold">UGX {{ cashGiven.toLocaleString() }}</span> </p>
          <p >Change: <span class="text-lg text-[#0d0814] font-bold">UGX {{ change.toLocaleString()}}</span> </p>
          
        </div>
  
        <!-- Order Confirmation Message -->
        <div>
        
          <p class="text-sm text-[#0d0814] italic text-right">Served by: {{ userStore.loggedInUserData.Username }}</p>
        </div>
        
     
      <img
    src="/art3.png" 
    alt="Receipt Logo"
    class="mx-auto mt-4" 
  />
         
            
          
          
        
        <div class="flex space-x-2 no-print justify-between" id="buttonsContainer">
  <!-- Close button -->
  <button @click="closeReceipt" class="mt-4 p-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none">
        Close Receipt
      </button>
      <button  @click="exportToPDF" class="mt-4 p-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none">
        print
      </button>
        </div>
      
      </div>
    </div>
  </template>
  
  
  
  <script setup>

  import { useOrdersStore } from "../stores/orders.js";
  import "firebase/compat/storage";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
// import {client} from '../bundled-twilio.js'
  import { onMounted,ref,defineEmits } from "vue";
  import { useUserStore } from '../stores/user.js';
  import html2pdf from 'html2pdf.js';
  import html2canvas from 'html2canvas'
  const orderStore = useOrdersStore();
  const orderReceiptNumber = ref("");
  const date = ref("");
  const customerId = ref("");
  const customerName = ref("");
  const customerNumber = ref("");
  const totalItems = ref("");
  const totalPrice = ref("");
  const discount = ref('')
  const discountAmount = ref("")
  const cashGiven = ref("");
  const change = ref("");
  const time = ref("");
  
  const cartItems=ref([])
  const pdfData = ref(""); // Store PDF data here
const userStore = useUserStore();
    const emit = defineEmits(["close"]);

const closeReceipt = () => {
  // Add this line to log the closure
  emit("close")
};

<<<<<<< HEAD
const exportToPDF = () => {
    const element = document.getElementById('mainContainer');
    const buttonsContainer = document.getElementById('buttonsContainer');

=======
<<<<<<< HEAD
const exportToPDsF = async () => {

  //  Select the HTML element to be converted to PDF
  const element = document.getElementById('mainContainer');
// Remove the buttons container
const buttonsContainer = document.getElementById('buttonsContainer');
  if (buttonsContainer) {
    buttonsContainer.remove();
  }
  // Remove the max height and overflow styles
  if (element) {
=======
const exportToPDF = () => {
    const element = document.getElementById('mainContainer');
    const buttonsContainer = document.getElementById('buttonsContainer');

>>>>>>> 868b9b0e63871cce18fc0ae7d8bd79e63a7fd462
    if (buttonsContainer) {
      buttonsContainer.style.display = 'none';
    }
    if (element) {
<<<<<<< HEAD
=======
>>>>>>> 9156ac0f0df5aac935aeb34399cac8c28282e2f6
>>>>>>> 868b9b0e63871cce18fc0ae7d8bd79e63a7fd462
    element.classList.remove('max-h-[437px]')
    element.classList.remove('overflow-y-auto');
    }
    html2canvas(element, {
      scale: 2, // You can adjust the scale as needed
    }).then((canvas) => {
      // Create an image from the canvas
      const imgData = canvas.toDataURL('image/png');

      // Create a download link for the image
      const a = document.createElement('a');
      a.href = imgData;
      a.download = `${customerName.value} receipt.png`;
      a.click();

      if (buttonsContainer) {
        buttonsContainer.style.display = 'flex';
      }
    });
<<<<<<< HEAD
=======
<<<<<<< HEAD
  } catch (error) {
   window.alert('PDF generation error');
  }
};
const exportToPDF = () => {
    const element = document.getElementById('mainContainer');
    const buttonsContainer = document.getElementById('buttonsContainer');

    if (buttonsContainer) {
      buttonsContainer.style.display = 'none';
    }
    if (element) {
    element.classList.remove('max-h-[437px]')
    element.classList.remove('overflow-y-auto');
    }
    html2canvas(element, {
      scale: 2, // You can adjust the scale as needed
    }).then((canvas) => {
      // Create an image from the canvas
      const imgData = canvas.toDataURL('image/png');

      // Create a download link for the image
      const a = document.createElement('a');
      a.href = imgData;
      a.download = `${customerName.value} receipt.png`;
      a.click();

      if (buttonsContainer) {
        buttonsContainer.style.display = 'flex';
      }
    });
=======
>>>>>>> 9156ac0f0df5aac935aeb34399cac8c28282e2f6
>>>>>>> 868b9b0e63871cce18fc0ae7d8bd79e63a7fd462
  };
  // Fetch orders and set the current order on component mount
  onMounted(async () => {
  
    await orderStore.fetchOrders();
<<<<<<< HEAD
    userStore.initializeUser()
=======
<<<<<<< HEAD
    userStore.initializeUser();
=======
    userStore.initializeUser()
>>>>>>> 9156ac0f0df5aac935aeb34399cac8c28282e2f6
>>>>>>> 868b9b0e63871cce18fc0ae7d8bd79e63a7fd462

  // Set the current order (replace '0' with the index of the order you want to display)
  const initialOrderIndex = 0; // Replace with the desired index
  orderStore.setCurrentOrder(orderStore.orders[initialOrderIndex]);
  // Set other order details here
  cartItems.value=orderStore.orders[initialOrderIndex].cart
  orderReceiptNumber.value = orderStore.orders[initialOrderIndex].orderReceiptNumber;
  date.value = orderStore.orders[initialOrderIndex].date;
  time.value = orderStore.orders[initialOrderIndex].time;
  customerId.value = orderStore.orders[initialOrderIndex].customer.id;
  customerName.value = orderStore.orders[initialOrderIndex].customer.name;
  customerNumber.value = orderStore.orders[initialOrderIndex].customer.number;
  totalItems.value = orderStore.orders[initialOrderIndex].totalItems;
  totalPrice.value = orderStore.orders[initialOrderIndex].totalAmount;
  discount.value = orderStore.orders[initialOrderIndex].discount;
  discountAmount.value = orderStore.orders[initialOrderIndex].discountAmount;
  cashGiven.value = orderStore.orders[initialOrderIndex].cashGiven;
  change.value = orderStore.orders[initialOrderIndex].change;
  });
  const calculateTotalPrice = (cartItem) => {
  if (cartItem.product.customPrice > 0) {
    return cartItem.product.customPrice * cartItem.quantity;
  } else {
    return cartItem.product.price * cartItem.quantity;
  }
};

  
  </script>
  