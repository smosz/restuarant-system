<!-- DeleteConfirmationModal.vue -->

<template>
  <div class="fixed inset-0 flex items-center justify-center z-50">
    <div class="modal-overlay absolute w-full h-full bg-gray-800 opacity-50"></div>
    <div class="modal-container bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto">
      <div class="modal-content py-4 text-left px-6">
        <h1 class="text-2xl font-medium mb-4">Confirm Deletion</h1>
        <p class="mb-4">Are you sure you want to Delete?</p>
        <div class="flex justify-end">
          <button @click="confirmDelete" class="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 mr-2">Delete</button>
          <button @click="cancelDelete" class="bg-gray-300 text-gray-700 py-2 px-4 rounded hover:bg-gray-400">Cancel</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";

const props = defineProps({
  visible: Boolean,
});

const emit = defineEmits(["confirm", "cancel"]);

const confirmDelete = () => {
  emit("confirm");
};

const cancelDelete = () => {
  emit("cancel");
};
</script>
