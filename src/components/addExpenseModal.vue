<template>
    
    <div
   
    class="fixed inset-0 flex items-center justify-center z-50"
  >
    <div
      class="modal-overlay absolute w-full h-full bg-gray-800 opacity-50"
    ></div>
    <div
      class="modal-container w-11/12 md:max-w-3xl mx-auto  z-50 overflow-y-auto"
    >
      <div
        class="modal-close absolute top-0 right-0 cursor-pointer flex flex-col items-center mt-4 mr-4 text-white text-sm z-50"
      >
        <span @click="closeExpenseModal" class="text-white">&times;</span>
      </div>
      
      <div class="flex justify-center overflow-y-auto">
        <div class="bg-white rounded-lg p-6 shadow-md w-96 mt-6">
          <h2 class="text-2xl font-semibold mb-4">Expense Registration</h2>
          <form class="space-y-4" @submit.prevent="createExpense ">
            <!-- expense Name -->
            <div class="flex flex-col">
              <label for="expense-name" class="text-sm">Expense Name</label>
              <input
                type="text"
                id="expense-name"
                v-model="expense.name"
                class="border border-gray-300 px-2 py-1 rounded-sm"
                required
              />
            </div>
            <div class="flex flex-col">
              <label for="expense-description" class="text-sm">Expense Description</label>
              
              <textarea
                id="expense-description"
                v-model="expense.description"
                rows="4"
                class="border border-gray-300 px-2 py-1 rounded-sm w-full"
                required
              ></textarea>
            </div>
            <div class="flex flex-col">
              <label for="expense-money" class="text-sm">Expense Money (UGX)</label>
              <input
                type="number"
                id="expense-money"
                v-model="expense.money"
                class="border border-gray-300 px-2 py-1 rounded-sm"
                required
              />
            </div>
            <div class="flex flex-col">
              <label for="expense-quantity" class="text-sm">Expense Quantity</label>
              <input
                type="number"
                id="expense-quantity"
                v-model="expense.quantity"
                class="border border-gray-300 px-2 py-1 rounded-sm"
                required
              />
            </div>
            <div class="flex flex-col">
              <label for="expense-amount" class="text-sm">Expense Amount (UGX)</label>
              <input
                type="number"
                id="expense-amount"
                v-model="expense.amount"
                class="border border-gray-300 px-2 py-1 rounded-sm"
                required
              />
            </div>
            <div class="flex flex-col">
              <label for="expense-totalAmount" class="text-sm">Expense Total Amount (UGX)</label>
              <input
                type="number"
                id="expense-totalAmount"
                v-model="totalAmount"
                class="border border-gray-300 px-2 py-1 rounded-sm"
                required
                disabled
              />
            </div>
            <!-- Success Message -->
            <div v-if="message" class="mt-4 text-center text-green-600">
              {{ message }}
            </div>
            <!-- Submit Button -->
            <div class="flex justify-center">
              <button
                type="submit"
                class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
              >
                Register expense
              </button>
            </div>
            <div v-if="updating" class="spinner-overlay">
    <div class="spinner"></div>
  </div>
          </form>
        </div>
      </div>
    
      
    </div>
  </div>
  </template>
    
    <script setup>
  import { ref,computed } from "vue";
  import "firebase/compat/storage";
  import firebase from "firebase/compat/app";
  import "firebase/compat/auth";
  import "firebase/compat/firestore";

  const message = ref("");
   // Define the Firestore database reference
   const db = firebase.firestore();
   // Generate a unique ID for the expense document
   const expenseId = db.collection("expenses").doc().id;
  // Get the current date and time
  const currentDateTime = new Date();

// Format the date as "dd-mm-yyyy"
const formattedDate = `${currentDateTime.getDate()}-${
  currentDateTime.getMonth() + 1
}-${currentDateTime.getFullYear()}`;

// Format the time in 12-hour clock format
const hours = currentDateTime.getHours();
const minutes = currentDateTime.getMinutes();
const amOrPm = hours >= 12 ? "PM" : "AM";
const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
const formattedTime = `${formattedHours}:${formattedMinutes} ${amOrPm}`;
   const updating = ref(false);
  const expense = ref({
    id:expenseId,
    name:  "",
    description: "",
    amount:0,
    quantity:0,
    date:formattedDate,
    time:formattedTime,
    totalAmount:0,
    money:0
  });
  // Set the generated ID as the document ID for the expense
// expense.value.uid = expenseId;
  // Emit a custom event to close the modal
const emit = defineEmits(["close"]);
const closeExpenseModal = () => {
  // Add this line to log the closure
  emit("close");
};
  // Create a computed property for the total amount
  const totalAmount = computed(() => {
    return expense.value.quantity * expense.value.amount;
  });
  const createExpense  = async () => {
    try {
      updating.value = true;
      expense.value.totalAmount = totalAmount.value;
// Add the expense data to Firestore
await db.collection("expenses").doc(expenseId).set(expense.value);
updating.value = false;
      // Show a success message
      message.value = "expense registered successfully";
  
      // Clear the form fields after successful submission
      expense.value = {
        
        name: "",
        description: "",
        quantity:0,
    amount:0
    
      };
      // Automatically clear the success message after 5 seconds (5000 milliseconds)
      setTimeout(() => {
        message.value = "";
        location.reload();
      }, 2000);
    } catch (error) {
      updating.value = false;
       message.value = "expense registered failed";
       window.alert("Error registering expense");
    }
  }
  
  </script>
    