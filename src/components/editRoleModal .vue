<template>
    <div
      v-if="editingRole"
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
            <h1 class="text-2xl font-medium">Edit Role</h1>
          </div>
  
          <!-- Display success or error message -->
          <div v-if="successMessage && !errorMessage" class="text-green-600 mb-4">
            {{ successMessage }}
          </div>
          <div v-if="errorMessage && !successMessage" class="text-red-600 mb-4">
            {{ errorMessage }}
          </div>
  
          <!-- Edit form -->
          <form @submit.prevent="updateRole">
            <!-- Roles Name -->
            <div class="mb-4">
              <label for="name" class="block text-gray-700 font-medium">Role Name:</label>
              <input
                v-model="editingRole.name"
                type="text"
                id="name"
                class="appearance-none bg-transparent focus-visible:border-blue-500 border-b border-teal-500 w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                required
              />
            </div>
  
            <!-- Roles description -->
            <div class="mb-4">
              <label for="Roles-description" class="block text-gray-700 font-medium">Role Description:</label>
              <input
                id="Roles-description"
                v-model="editingRole.description"
                type="description"
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
    editingRole: Object,
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
  const updateRole = async () => {
    try {
      updating.value = true;
      if (props.editingRole) {
        const { id, ...updatedRoleData } = props.editingRole;
        await firebase
          .firestore()
          .collection("Roless")
          .doc(id)
          .update(updatedRoleData);
          updating.value = false;
        // Set a success message
        successMessage.value = "Roles updated successfully";
        setTimeout(() => {
          if (props.editingRole) {
            // Reload the page
            location.reload();
          }
        }, 5000);
      }
    } catch (error) {
      updating.value = false;
      // Set an error message
      errorMessage.value = "Failed to update Roles. Please try again later.";
    }
  };
  </script>
    