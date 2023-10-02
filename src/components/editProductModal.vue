<template>
  <div
    v-if="editingProduct"
    class="fixed inset-0 flex items-center justify-center z-50"
  >
    <div
      class="modal-overlay absolute w-full h-full bg-gray-800 opacity-50"
    ></div>
    <div
      class="modal-container h-[100%] bg-white w-11/12 md:max-w-3xl mx-auto rounded shadow-lg z-50 overflow-y-auto"
    >
      <div
        class="modal-close absolute top-0 right-0 cursor-pointer flex flex-col items-center mt-4 mr-4 text-white text-sm z-50"
      >
        <span @click="closeEditModal" class="text-white">&times;</span>
      </div>

      <div class="modal-content py-4 text-left px-6">
        <div class="flex items-center">
          <h1 class="text-2xl font-medium mb-4">Edit Product</h1>
          <!-- Display success or error message -->
          <div v-if="successMessage" class="text-green-600 pl-4">
            {{ successMessage }}
          </div>
          <div v-if="errorMessage" class="text-red-600">{{ errorMessage }}</div>
        </div>

        <!-- Edit form goes here -->
        <form @submit.prevent="updateProduct" class="grid grid-cols-3 gap-6">
          <!-- Column 1 -->
          <div class="col-span-1">
            <!-- Product Name -->
            <div class="mb-4">
              <label for="name" class="block text-gray-700 font-medium"
                >Name:</label
              >
              <input
                v-model="editingProduct.name"
                type="text"
                id="name"
                class="appearance-none bg-transparent focus-visible:border-blue-500 border-b border-teal-500 w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                required
              />
            </div>

            <!-- Product Description -->
            <div class="mb-4">
              <label
                for="product-description"
                class="block text-gray-700 font-medium"
                >Product Description:</label
              >
              <textarea
                id="product-description"
                v-model="editingProduct.description"
                rows="4"
                class="border border-gray-300 px-2 py-1 rounded-sm w-full"
                required
              ></textarea>
            </div>
            
          </div>
          
          <!-- Column 2 -->
          <div class="col-span-1">
            <!-- Product SKU -->
            <div class="mb-4">
              <label for="product-sku" class="block text-gray-700 font-medium"
                >Product SKU:</label
              >
              <input
                v-model="editingProduct.sku"
                type="text"
                id="product-sku"
                class="appearance-none bg-transparent focus-visible:border-blue-500 border-b border-teal-500 w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                required
              />
            </div>

            <!-- Product Price -->
            <div class="mb-4">
              <label for="product-price" class="block text-gray-700 font-medium"
                >Product Price:</label
              >
              <input
                v-model="editingProduct.price"
                type="number"
                id="product-price"
                class="appearance-none bg-transparent focus-visible:border-blue-500 border-b border-teal-500 w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                required
                
              />
            </div>
            <!-- Stock Quantity -->
            <div class="mb-4">
              <label for="stockQuantity" class="block text-gray-700 font-medium"
                >Stock Quantity:</label
              >
              <input
                v-model="editingProduct.stockQuantity"
                type="number"
                id="stockQuantity"
                class="appearance-none bg-transparent border-b border-teal-500 focus-visible:border-blue-500 w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                required
                
              />
            </div>
            <!-- Amount -->
          <div class="mb-4">
            <label for="amount" class="block text-gray-700 font-medium"
              >Amount:</label
            >
            <input
              v-model="editingProduct.amount"
              type="text"
              id="amount"
              class="bg-gray-200 px-2 py-1 rounded-sm w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
              readonly
            />
          </div>
          </div>

          <!-- Column 3 -->
          <div class="col-span-1">
            <!-- Product Category -->
            <div class="mb-4">
              <label
                for="product-category"
                class="block text-gray-700 font-medium"
                >Product Category:</label
              >
              <input
                v-model="editingProduct.category"
                type="text"
                id="product-category"
                class="appearance-none bg-transparent focus-visible:border-blue-500 border-b border-teal-500 w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                required
              />
            </div>
            <!-- Category Selection Section -->
            <div class="col-span-3">
              <div class="mb-4">
                <label class="block text-gray-700 font-medium"
                  >Product Categories:</label
                >
                <div class="grid grid-cols-1 gap-4">
                  <!-- Display available categories as checkboxes -->
                  <div
                    class="max-h-40 overflow-y-auto border border-gray-300 rounded-lg p-2 grid grid-cols-2 gap-2"
                  >
                    <!-- Scrollable card -->
                    <div
                      v-for="category in availableCategories"
                      :key="category"
                    >
                      <label class="flex items-center">
                        <input
                          type="checkbox"
                          :value="category"
                          :checked="
                            selectedCategories.includes(category) ||
                            editingProduct.category.includes(category)
                          "
                          @change="toggleCategory(category)"
                          class="mr-2"
                        />
                        {{ category }}
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-span-1"></div>

          <!-- Add input fields for other product properties (description, SKU, price, category, stockQuantity) -->

          <div
            class="flex flex-col items-left justify-center w-full col-span-2 mt-[-30px]"
          >
            <label for="product-image" class="block text-gray-700 font-medium"
              >Product Image</label
            >
            <!-- Clickable upload area -->
            <div
              :class="{
                'bg-update-image': editingProduct.productImage,
                'bg-update': !editingProduct.productImage,
              }"
              @dragover.prevent="handleDragOver"
              @dragleave.prevent="handleDragLeave"
              @drop.prevent="handleDrop"
            >
              <label for="product-image" class="cursor-pointer">
                <div
                  class="flex flex-col items-center justify-center pt-5 pb-6"
                  v-if="!editingProduct.productImage"
                >
                  <svg
                    class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 16"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                    />
                  </svg>
                  <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
                    <span class="font-semibold">Click to upload</span> or drag
                    and drop
                  </p>
                  <p class="text-xs text-gray-500 dark:text-gray-400">
                    SVG, PNG, JPG (MAX. 800x400px)
                  </p>
                </div>
                <div v-else>
                  <img
                    :src="editingProduct.productImage"
                    alt="Product Image Preview"
                    class="w-[256px] border-solid border-[1px] border-green-500"
                  />
                </div>
                <input
                  id="product-image"
                  accept="image/*"
                  type="file"
                  class="hidden"
                  @change="displayImagePreview"
                />
              </label>
            </div>
          </div>

          <div class="col-span-3 mt-6">
            <div class="flex items-center">
              <button
                type="submit"
                class="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
              >
                Save Changes
              </button>
              <!-- Display success or error message -->
              <div v-if="successMessage" class="text-green-600 pl-4">
                {{ successMessage }}
              </div>
              <div v-if="errorMessage" class="text-red-600">
                {{ errorMessage }}
              </div>
            </div>
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
import { ref, defineProps, defineEmits, onMounted, computed,watch } from "vue";
import "firebase/compat/storage";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
// Define the Firestore database reference
const db = firebase.firestore();
// Define a prop to pass the editing product data
const props = defineProps({
  editingProduct: Object,
});
// Emit a custom event to close the modal
const emit = defineEmits(["close"]);

const closeEditModal = () => {
  // Add this line to log the closure
  emit("close");
};
const availableCategories = ref([]);
// Handle checkbox selection
const selectedCategories = ref([]);
// Define message variables
const successMessage = ref("");
const errorMessage = ref("");
const updating = ref(false);
const toggleCategory = (category) => {
  const index = selectedCategories.value.indexOf(category);
  if (index === -1) {
    selectedCategories.value.push(category);
  } else {
    selectedCategories.value.splice(index, 1);
  }
  if (props.editingProduct.category === "" || !props.editingProduct.category) {
    props.editingProduct.category = selectedCategories.value;
  } else if (props.editingProduct.category) {
    props.editingProduct.category = selectedCategories.value;
  }
};
// Function to update the product
const updateProduct = async () => {
  try {

    if (props.editingProduct) {
      updating.value = true;
      const { sku, ...updatedProductData } = props.editingProduct;
      await firebase
        .firestore()
        .collection("products")
        .doc(sku)
        .update({
          ...updatedProductData,
          category: props.editingProduct.category, // Update with selected categories
          amount: props.editingProduct.amount
        });
      updating.value = false;
      // Set a success message
      successMessage.value = "Product updated successfully";
      setTimeout(() => {
        // Reload the page
        location.reload();
      }, 1000);
    }
  } catch (error) {
    // Set an error message
    updating.value = false;
    errorMessage.value = "Failed to update product. Please try again later.";
  }
};
const fetchCategoryNames = async () => {
  try {
    const categoriesSnapshot = await db.collection("categories").get();
    const categoryNames = categoriesSnapshot.docs.map((doc) => doc.data().name);
    return categoryNames;
  } catch (error) {
    window.alert("Error fetching category names");
    return [];
  }
};
// Helper function to check if a file is an image
const isImageFile = (file) => {
  const isImage = file.type.startsWith("image/");
  return isImage;
};
const displayImagePreview = (event) => {
  // Define a ref for editingProduct with a productImage property
  const file = event.target.files[0];
  if (file) {
    // Check if it's a valid image file
    if (isImageFile(file)) {
      const reader = new FileReader();
      reader.onload = () => {
        // Update the productImage ref with the Data URL
        props.editingProduct.productImage = reader.result;
      };
      reader.readAsDataURL(file);
    } else {
      window.alert("Please select a valid image file (SVG, PNG, JPG).");
    }
  }
};
const handleDragOver = (event) => {
  if (props.editingProduct) {
    // Clear the product image
    props.editingProduct.productImage = "";
  }
  event.preventDefault();
};

const handleDragLeave = (event) => {
  event.preventDefault();
};
const handleDrop = (event) => {
  event.preventDefault();

  // Handle the dropped file
  const files = event.dataTransfer.files;
  if (files.length > 0) {
    // Preview and process the dropped image
    displayImagePreview({ target: { files: [files[0]] } });
  }
};


onMounted(async () => {
  availableCategories.value = await fetchCategoryNames();
  // Preselect checkboxes only if editingProduct.category is not empty
  if (
    props.editingProduct &&
    props.editingProduct.category &&
    props.editingProduct.category.length > 0
  ) {
    selectedCategories.value = props.editingProduct.category;
  }
});
// Computed property for the updated amount
const updatedAmount = computed(() => {
  if (props.editingProduct) {
    const price = props.editingProduct.price || 0;
    const stockQuantity = props.editingProduct.stockQuantity || 0;
    return (price * stockQuantity);
  }
  return 0; // or any default value you prefer when editingProduct is null
});

// Watch for changes in price or stockQuantity
watch(
  () => [props.editingProduct?.price, props.editingProduct?.stockQuantity],
  () => {
    if (props.editingProduct) {
      props.editingProduct.amount = updatedAmount.value;
    }
  }
);

</script>
