<template>
    <div
      v-if="editingExpense"
      class="fixed inset-0 flex items-center justify-center z-50"
    >
      <div
        class="modal-overlay absolute w-full h-full bg-gray-800 opacity-50"
      ></div>
      <div
        class="modal-container bg-white w-[30%] md:max-w-3xl mx-auto rounded shadow-lg z-50 overflow-y-auto"
      >
        <div
          class="modal-close absolute top-0 right-0 cursor-pointer flex flex-col items-center mt-4 mr-4 text-white text-sm z-50"
        >
          <span @click="closeEditModal" class="text-white">&times;</span>
        </div>
  
        <div class="modal-content py-4 text-left px-6">
          <div class="flex items-center justify-center mb-4">
            <h1 class="text-2xl font-medium">Edit Expense</h1>
          </div>
  
          <!-- Display success or error message -->
          <div v-if="successMessage && !errorMessage" class="text-green-600 mb-4">
            {{ successMessage }}
          </div>
          <div v-if="errorMessage && !successMessage" class="text-red-600 mb-4">
            {{ errorMessage }}
          </div>
  
          <!-- Edit form -->
          <form @submit.prevent="updateExpense">
            <!-- Expense Name -->
            <div class="mb-4">
              <label for="name" class="block text-gray-700 font-medium">Name:</label>
              <input
                v-model="editingExpense.name"
                type="text"
                id="name"
                class="appearance-none bg-transparent focus-visible:border-blue-500 border-b border-teal-500 w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                required
              />
            </div>
            <div class="mb-4">
              <label for="description" class="block text-gray-700 font-medium">Description:</label>
             
              <textarea
                id="description"
                v-model="editingExpense.description"
                rows="4"
                class="border border-gray-300 px-2 py-1 rounded-sm w-full"
                required
              ></textarea>
            </div>
            <div class="flex flex-col">
              <label for="expense-quantity" class="block text-gray-700 font-medium">Expense Quantity</label>
              <input
                type="number"
                id="expense-quantity"
                v-model="editingExpense.quantity"
                class="appearance-none bg-transparent focus-visible:border-blue-500 border-b border-teal-500 w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                required
              />
            </div>
            <div class="mb-4">
              <label for="amount" class="block text-gray-700 font-medium">Amount (UGX):</label>
              <input
                v-model="editingExpense.amount"
                type="number"
                id="amount"
                class="appearance-none bg-transparent focus-visible:border-blue-500 border-b border-teal-500 w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                required
              />
            </div>
            <div v-if="editingExpense" class="flex flex-col mb-2">
              <label for="expense-totalAmount" class="block text-gray-700 font-medium">Expense Total Amount (UGX)</label>
              <input
                type="number"
                id="expense-totalAmount"
                v-model="editingExpense.totalAmount"
                class="appearance-none bg-transparent focus-visible:border-blue-500 border-b border-teal-500 w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                required
                disabled
              />
            </div>
  
            <!-- Save Button -->
            <div class="text-center">
              <button
                type="submit"
                class="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
              >
                Save Changes
              </button>
              <div v-if="updating" class="spinner-overlay">
      <div class="spinner"></div>
    </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </template>
  
      
    
    <script setup>
  import { ref, defineProps,computed,watch } from "vue";
  import firebase from "firebase/compat/app";
  import "firebase/compat/auth";
  // Define a prop to pass the editing product data
  const props = defineProps({
    editingExpense: Object,
  });
  // Emit a custom event to close the modal
  const emit = defineEmits(["close"]);
  const updating = ref(false);
  
  const closeEditModal = () => {
    // Add this line to log the closure
    emit("close");
  };
  // Create a computed property for the total amount
const totalAmount = computed(() => {
  return props.editingExpense.quantity * props.editingExpense.amount;
});

  // Define message variables
  const successMessage = ref("");
  const errorMessage = ref("");
  // Function to update the product
  const updateExpense = async () => {
    try {
      updating.value = true;
      if (props.editingExpense) {
        const { id, ...updatedExpenseData } = props.editingExpense;
        await firebase
          .firestore()
          .collection("expenses")
          .doc(id)
          .update(updatedExpenseData);
          updating.value = false;
        // Set a success message
        successMessage.value = "Expense updated successfully";
        setTimeout(() => {
          if (props.editingExpense) {
            // Reload the page
            location.reload();
          }
        }, 5000);
      }
    } catch (error) {
      updating.value = false;
      // Set an error message
      errorMessage.value = "Failed to update Expense. Please try again later.";
    }
  };
  watch([() => props.editingExpense?.quantity, () => props.editingExpense?.amount], ([newQuantity, newAmount], [oldQuantity, oldAmount]) => {
    // Check if editingExpense is defined
    if (props.editingExpense) {
      // Update the totalAmount when either quantity or amount changes
      if (newQuantity !== oldQuantity || newAmount !== oldAmount) {
        props.editingExpense.totalAmount = newQuantity * newAmount;
      }
    }
  });
  </script>
    