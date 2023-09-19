<template>
    <div
      v-if="editingCustomer"
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
            <h1 class="text-2xl font-medium">Edit Customer</h1>
          </div>
  
          <!-- Display success or error message -->
          <div v-if="successMessage && !errorMessage" class="text-green-600 mb-4">
            {{ successMessage }}
          </div>
          <div v-if="errorMessage && !successMessage" class="text-red-600 mb-4">
            {{ errorMessage }}
          </div>
  
          <!-- Edit form -->
          <form @submit.prevent="updateCustomer">
            <!-- Customer Name -->
            <div class="mb-4">
              <label for="name" class="block text-gray-700 font-medium">Name:</label>
              <input
                v-model="editingCustomer.name"
                type="text"
                id="name"
                class="appearance-none bg-transparent focus-visible:border-blue-500 border-b border-teal-500 w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                required
              />
            </div>
  
            <!-- Customer Number -->
            <div class="mb-4">
              <label for="Customer-number" class="block text-gray-700 font-medium">Customer Mumber:</label>
              <input
                id="Customer-number"
                v-model="editingCustomer.number"
                type="number"
                class="border border-gray-300 px-2 py-1 rounded-sm w-full"
                required
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
  import { ref, defineProps, defineEmits } from "vue";
  import firebase from "firebase/compat/app";
  import "firebase/compat/auth";
  // Define a prop to pass the editing product data
  const props = defineProps({
    editingCustomer: Object,
  });
  // Emit a custom event to close the modal
  const emit = defineEmits(["close"]);
  const updating = ref(false);
  
  const closeEditModal = () => {
    // Add this line to log the closure
    emit("close");
  };
  
  // Define message variables
  const successMessage = ref("");
  const errorMessage = ref("");
  // Function to update the product
  const updateCustomer = async () => {
    try {
      updating.value = true;
      if (props.editingCustomer) {
        const { id, ...updatedCustomerData } = props.editingCustomer;
        await firebase
          .firestore()
          .collection("customers")
          .doc(id)
          .update(updatedCustomerData);
          updating.value = false;
        // Set a success message
        successMessage.value = "Customer updated successfully";
        setTimeout(() => {
          if (props.editingCustomer) {
            // Reload the page
            location.reload();
          }
        }, 5000);
      }
    } catch (error) {
      updating.value = false;
      // Set an error message
      errorMessage.value = "Failed to update Customer. Please try again later.";
    }
  };
  </script>
    