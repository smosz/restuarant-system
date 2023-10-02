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
        <span @click="closeRoleModal" class="text-white">&times;</span>
      </div>
      
      <div class="flex justify-center">
        <div class="bg-white rounded-lg p-6 shadow-md w-96 mt-6">
          <h2 class="text-2xl font-semibold mb-4">Role Registration</h2>
          <form class="space-y-4" @submit.prevent="createRole ">
            <!-- role Name -->
            <div class="flex flex-col">
              <label for="role-name" class="text-sm">Role Name</label>
              <input
                type="text"
                id="role-name"
                v-model="role.name"
                class="border border-gray-300 px-2 py-1 rounded-sm"
                required
              />
            </div>
  
            <!-- role Description -->
            <div class="flex flex-col">
              <label for="role-description" class="text-sm"
                >Role Description</label
              >
              <textarea
                id="role-description"
                v-model="role.description"
                rows="4"
                class="border border-gray-300 px-2 py-1 rounded-sm"
                required
              ></textarea>
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
                Register role
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
  import { ref,defineEmits } from "vue";
  import "firebase/compat/storage";
  import firebase from "firebase/compat/app";
  import "firebase/compat/auth";
  import "firebase/compat/firestore";
  
  const message = ref("");
   // Define the Firestore database reference
   const db = firebase.firestore();
   // Generate a unique ID for the role document
   const roleId = db.collection("roles").doc().id;
  
   const updating = ref(false);
  const role = ref({
    id:roleId,
    name: "",
    description: "",
  });
  // Set the generated ID as the document ID for the role
  // role.value.uid = roleId;
  // Emit a custom event to close the modal
  const emit = defineEmits(["close"]);
  const closeRoleModal = () => {
  // Add this line to log the closure
  emit("close");
  };
  
  const createRole  = async () => {
    try {
      updating.value = true;
  // Add the role data to Firestore
  await db.collection("roles").doc(roleId).set(role.value);
  updating.value = false;
      // Show a success message
      message.value = "role registered successfully";
  
      // Clear the form fields after successful submission
      role.value = {
        
        name: "",
    description: "",
      };
      // Automatically clear the success message after 5 seconds (5000 milliseconds)
      setTimeout(() => {
        message.value = "";
        location.reload();
      }, 2000);
    } catch (error) {
      updating.value = false;
       message.value = "role registration failed";
       window.alert("Error registering product");
    }
  }
  
  </script>
    