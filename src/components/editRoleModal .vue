<template>
  <div v-if="editingRole" class="fixed inset-0 flex items-center justify-center z-50">
    <div class="modal-overlay absolute w-full h-full bg-gray-800 opacity-50"></div>
    <div class="modal-container bg-white w-[30%] md:max-w-3xl mx-auto rounded shadow-lg z-50 overflow-y-auto">
      <div
        class="modal-close absolute top-0 right-0 cursor-pointer flex flex-col items-center mt-4 mr-4 text-white text-sm z-50">
        <span @click="closeEditModal" class="text-white">&times;</span>
      </div>

      <div class="modal-content py-4 text-left px-6">
        <div class="flex items-center justify-center mb-4">
          <h1 class="text-2xl font-medium">Edit Role</h1>
        </div>

        <!-- Display success or error message -->
        <div v-if="errorMessage" class="mt-4 text-center text-red-600">
          {{ message }}
        </div>
        <div v-else-if="message" class="mt-4 text-center text-green-600">
          {{ message }}
        </div>

        <!-- Edit form -->
        <form @submit.prevent="updateRole">
          <!-- Roles Name -->
          <div class="mb-4">
            <label for="name" class="block text-gray-700 font-medium">Role Name:</label>
            <input v-model="editingRole.name" type="text" id="name"
              class="appearance-none uppercase bg-transparent focus-visible:border-blue-500 border-b border-teal-500 w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
              required />
          </div>

          <!-- Roles description -->
          <div class="mb-4">
            <label for="Roles-description" class="block text-gray-700 font-medium">Role Description:</label>
            <textarea id="Roles-description" v-model="editingRole.description" rows="4"
              class="border border-gray-300 px-2 py-1 rounded-sm w-full" />
          </div>

          <!-- Save Button -->
          <div class="text-center">
            <button type="submit" class="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
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
import "firebase/compat/firestore";
// Define a prop to pass the editing product data
const props = defineProps({
  editingRole: Object,
});
// Define the Firestore database reference
const db = firebase.firestore();
// Emit a custom event to close the modal
const emit = defineEmits(["close"]);
const updating = ref(false);

const closeEditModal = () => {
  // Add this line to log the closure
  emit("close");
};

// Define message variables
const message = ref("");
const errorMessage = ref("");
// Function to update the product
const updateRole = async () => {
  try {
    updating.value = true;
    props.editingRole.name = props.editingRole.name.toUpperCase();
    if (!props.editingRole.name) {
      updating.value = false;
      errorMessage.value = true;
      message.value = "Role name is required.";
    } else if (props.editingRole.name === "TECH") {
      updating.value = false;
      errorMessage.value = true;
      message.value = "You can't update to 'TECH'.";
    } else {
        await db.collection("roles").doc(props.editingRole.id).update({
          name: props.editingRole.name,
          description: props.editingRole.description,
        });
        updating.value = false;
        errorMessage.value = false;
        message.value = "Role updated successfully";

        // Clear the success message after 5 seconds
        setTimeout(() => {
          errorMessage.value = false;
          message.value = "";
        }, 5000);
      } 
  } catch (error) {
    updating.value = false;
    errorMessage.value = true;
    message.value = "Role update failed";
    console.error("Error updating role:", error);
  }
};

</script>
    