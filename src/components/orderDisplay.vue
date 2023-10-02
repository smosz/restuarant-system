<template>
    <div class="inset-0 flex flex-wrap items-center  max-h-[437px] overflow-y-auto  justify-center z-50 ml-10 mt-10" id="mainContainer" >
      <div class="p-[1.05rem] rounded-lg shadow-lg relative" style="
    background-image: url('../../src/assets/hot.jpg');
    background-size: cover; /* Adjust to 'contain' or custom dimensions if needed */
    background-position: center; /* Adjust if needed */
    background-repeat: no-repeat;
  ">
<div class="text-center">
   <!-- receipt logo  -->
   <img
    src="../assets/imp.png" 
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
          <div class="text-center">
   <!-- receipt logo  -->
   <img
    src="../assets/ord.png" 
    alt="Receipt Logo"
    class=" h-24 mx-auto" 
  />
</div>
          <p class="text-sm text-[#0d0814] italic text-right">Served by: {{ userStore.username }}</p>
        </div>
        
      <!-- Contact Information -->
      <div class="mt-4 text-center text-[#0d0814]">
        

        <!-- Address -->
        
        <div class="flex space-x-2 justify-center">
            <Icon icon="mdi:address-marker" color="red" />
            <h1 class="!mt-[-14px] !ml-[0]">Ntinda Shopping Centre, 1st Floor, Shop B17</h1>
          </div>
          <!-- Phone Numbers -->
        <div class="my-2 flex justify-center space-x-2">
          <div class="flex items-center space-x-2 justify-center">
            <Icon icon="logos:whatsapp-icon" />
            <span class="!mt-[-14px] ]">+256 70 614 1880</span> 
          </div>
          <div class="flex items-center space-x-2 justify-center">
            <Icon icon="logos:whatsapp-icon"   />
            <span class="!mt-[-14px] ">+256 77 276 7895</span> 
          </div>
        </div>
        <!-- Social Media Handles -->
        <div class="flex justify-center items-center space-x-2 mt-2">
          <a href="https://www.facebook.com" target="_blank">
            <Icon icon="logos:facebook" />
          </a>
          <a href="https://www.instagram.com" target="_blank">
            <Icon icon="skill-icons:instagram" />
          </a>
        </div>
      </div>
      <img
    src="../assets/see.png" 
    alt="Receipt Logo"
    class=" h-24 mx-auto mt-4" 
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
  emit("close");
};

const exportToPDF = async () => {
//   const accountSid = 'ACb48230c87344edfe722e881f4d9d550a';
// const authToken = '01b18153ae408cb17b34a7f2228f18e5';

// const client = require('twilio')(accountSid, authToken);
//   client.messages
//   .create({
//     mediaUrl: [
//       'https://images.unsplash.com/photo-1545093149-618ce3bcf49d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80',
//     ],
//     from: 'whatsapp:+14155238886',
//     to: 'whatsapp:+256764667439',
//   })
//   .then((message) => console.log('WhatsApp message sent:', message.sid))
//   .catch((error) =>window.alert('Error sending WhatsApp message:', error));
  //  Select the HTML element to be converted to PDF
  const element = document.getElementById('mainContainer');
// Remove the buttons container
const buttonsContainer = document.getElementById('buttonsContainer');
  if (buttonsContainer) {
    buttonsContainer.remove();
  }
  // Remove the max height and overflow styles
  if (element) {
    element.classList.remove('max-h-[437px]')
    element.classList.remove('overflow-y-auto');
    }
  try {
    const pdfOptions = {
      margin: 0,
    filename: 'receipt.pdf',
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait', pageHeight: 'auto' },
    };
    html2pdf().from(element).set(pdfOptions).save();
    // Generate the PDF using html2pdf
    const data = await html2pdf().from(element).toPdf().output('blob')
    const pdfFileName = `${customerName.value}_Impress_receipt.pdf`;
    
    const metadata = {
      contentDisposition: `attachment; filename="${pdfFileName}"`,
    };

    // Upload the PDF to Firebase Storage
    const storageRef = firebase.storage().ref(`${customerId.value}/${pdfFileName}`);
    const uploadTask = storageRef.put(data, metadata);

    // Listen for the upload completion
    uploadTask.on('state_changed', (snapshot) => {
      // You can track the upload progress here if needed
    }, (error) => {
      // Handle errors during upload
     window.alert('Error uploading PDF');
    }, async () => {
      // Get the download URL of the uploaded PDF
      const downloadURL = await uploadTask.snapshot.ref.getDownloadURL();

      // Store the download URL in Firestore
      const userRef = firebase.firestore().collection("customers").doc(customerId.value);
      await userRef.update({
        orderReceipt: downloadURL,
      });

      // Set the pdfData.value to the download URL
      pdfData.value = downloadURL;
  
    });
  } catch (error) {
   window.alert('PDF generation error');
  }
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
    return cartItem.product.price * cartItem.quantity;
    
  };
  
  </script>
  