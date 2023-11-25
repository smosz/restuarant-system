<template>
  <div
    v-if="editingProduct"
    v-loading="loading"
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
            <div class="mb-1">
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
            <div class="mb-2">
              <label for="testers" class="block text-gray-700 font-medium"
                >Testers:</label
              >
              <input
                v-model="originalTesters"
                type="number"
                id="testers"
                class="appearance-none bg-transparent border-b border-teal-500 focus-visible:border-blue-500 w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                required
                :max= "editingProduct.InitialStockQuantity"
                min="0"
              />
            </div>
            <div class="mb-4">
              <label for="damaged" class="block text-gray-700 font-medium"
                >Damaged Quantity:</label
              >
              <input
                v-model="originalDamaged"
                type="number"
                id="damaged"
                class="appearance-none bg-transparent border-b border-teal-500 focus-visible:border-blue-500 w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                required
                :max= "editingProduct.InitialStockQuantity"
                min="0"
              />
            </div>
            <div class="mb-4">
              <label for="sold" class="block text-gray-700 font-medium"
                >sold Quantity:</label
              >
              <input
                v-model="originalSoldStock"
                type="number"
                id="sold"
                class="appearance-none bg-gray-200 border-b border-teal-500 focus-visible:border-blue-500 w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
<<<<<<< HEAD
               disabled
=======
               
>>>>>>> 9156ac0f0df5aac935aeb34399cac8c28282e2f6
              />
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
            <div class="mb-4">
              <label for="InitialStockQuantity" class="block text-gray-700 font-medium"
                >Initial Quantity:</label
              >
              <input
              v-model="editingProduct.InitialStockQuantity "
                type="number"
                id="InitialStockQuantity"
                class="appearance-none bg-gray-200 border-b border-teal-500 focus-visible:border-blue-500 w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                required
<<<<<<< HEAD
                disabled
=======
                
>>>>>>> 9156ac0f0df5aac935aeb34399cac8c28282e2f6
                min="0"
              />
            </div>
            <!-- Stock Quantity -->
            <div class="mb-4">
              <label for="stockQuantity" class="block text-gray-700 font-medium"
                >Remaining Quantity:</label
              >
              <input
              v-model="editingProduct.stockQuantity"
                type="number"
                id="stockQuantity"
                class="appearance-none bg-gray-200 border-b border-teal-500 focus-visible:border-blue-500 w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                required
                disabled
                
                
              />
            </div>
            <!-- Amount -->
          <div class="mb-4">
            <label for="amount" class="block text-gray-700 font-medium"
              >Amount:</label
            >
            <input
              v-model="amount"
              type="text"
              id="amount"
              class="bg-gray-200 px-2 py-1 rounded-sm w-full text-gray-700 mr-3leading-tight focus:outline-none"
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
                class="appearance-none bg-gray-200 focus-visible:border-blue-500 border-b border-teal-500 w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                required
                disabled
              />
            </div>
            <!-- Category Selection Section -->
            <div class="col-span-3">
                <!-- Product Category (Autocomplete Input) -->
            <div class="flex flex-col mb-4">
              <label for="product-category" class="block text-gray-700 font-medium">Search & Edit Category</label>
              <input type="text" id="product-category" v-model="newCategory"
              class="appearance-none focus-visible:border-blue-500 border-b border-teal-500 w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" @input="suggestCategories"
                />
              <!-- Auto-suggested categories dropdown -->
              <ul v-if="showSuggestions" class="border border-gray-300 mt-1 rounded-b-md">
                <li v-for="suggestion in categorySuggestions" :key="suggestion" @click="selectSuggestion(suggestion)"
                  class="cursor-pointer px-2 py-1 hover:bg-gray-200">
                  {{ suggestion }}
                </li>
              </ul>
            </div>
            </div>
            <div class="mb-4">
              <label for="newQuantity" class="block text-gray-700 font-medium"
                >Add New Quantity:</label
              >
              <input
                v-model="newQuantity"
                type="number"
                id="newQuantity"
                class="appearance-none bg-transparent border-b border-teal-500 focus-visible:border-blue-500 w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
min="0"
              />
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
import { ref, defineProps, onMounted, computed,watch } from "vue";
import "firebase/compat/storage";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
// import { getDatabase,ref as stRef, set,push} from "firebase/database";
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
const selectedCategory = ref('');
const newCategory = ref("");
const categorySuggestions = ref([]);
const showSuggestions = ref(false);
// Define message variables
const successMessage = ref("");
const errorMessage = ref("");
const updating = ref(false);
<<<<<<< HEAD
=======
const loading = ref(false);
>>>>>>> 9156ac0f0df5aac935aeb34399cac8c28282e2f6
const newQuantity=ref(0);

const suggestCategories = () => {
  if (newCategory.value) {
    // Filter available categories for suggestions
    categorySuggestions.value = availableCategories.value.filter((category) =>
      category.toLowerCase().includes(newCategory.value.toLowerCase())
    );
    showSuggestions.value = true;
  } else {
    categorySuggestions.value = [];
    showSuggestions.value = false;
  }
};

const selectSuggestion = (suggestion) => {
  // Add the selected suggestion to selectedCategories
  props.editingProduct.category = suggestion;

  newCategory.value = ''; // Clear the input
  categorySuggestions.value = []; // Clear suggestions
  showSuggestions.value = false; // Hide suggestions
};

<<<<<<< HEAD
// Function to update the product
const updateProduct = async () => {
  try {
    if (props.editingProduct) {
      updating.value = true;

      // Get the current date and time
      const currentDateTime = new Date();
      const formattedDate = `${currentDateTime.getDate()}-${currentDateTime.getMonth() + 1}-${currentDateTime.getFullYear()}`;
      const hours = currentDateTime.getHours();
      const minutes = currentDateTime.getMinutes();
      const amOrPm = hours >= 12 ? "PM" : "AM";
      const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
      const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
      const formattedTime = `${formattedHours}:${formattedMinutes} ${amOrPm}`;

      const documentId = props.editingProduct.id;

      const newQuantityChange = {
        quantityAdded: newQuantity.value,
        date: formattedDate,
        time: formattedTime,
      };

      const { ...updatedProductData } = props.editingProduct;

      // Only include the quantityChanges field if newQuantity is greater than zero
      if (newQuantity.value > 0) {
        await firebase
          .firestore()
          .collection("products")
          .doc(documentId)
          .update({
            ...updatedProductData,
            category: props.editingProduct.category,
            amount: amount.value,
            testers: originalTesters.value,
            damaged: originalDamaged.value,
            newQuantity: newQuantity.value,
            quantityChanges: firebase.firestore.FieldValue.arrayUnion(newQuantityChange),
          });
      } else {
        // If newQuantity is zero or negative, update the product data without quantityChanges
        await firebase
          .firestore()
          .collection("products")
          .doc(documentId)
          .update({
            ...updatedProductData,
            category: props.editingProduct.category,
            amount: amount.value,
            testers: originalTesters.value,
            damaged: originalDamaged.value,
            newQuantity: newQuantity.value,
          });
      }

      updating.value = false;
      successMessage.value = "Product updated successfully";
      setTimeout(() => {
        location.reload();
      }, 1000);
    }
  } catch (error) {
    updating.value = false;
    console.error("Firestore Error:", error);
    errorMessage.value = "Failed to update product. Please try again later.";
  }
};

=======
const getCurrentDateTime = () => {
  const currentDateTime = new Date();
  const formattedDate = `${currentDateTime.getDate()}-${currentDateTime.getMonth() + 1}-${currentDateTime.getFullYear()}`;
  const hours = currentDateTime.getHours();
  const minutes = currentDateTime.getMinutes();
  const amOrPm = hours >= 12 ? "PM" : "AM";
  const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
  const formattedTime = `${formattedHours}:${formattedMinutes} ${amOrPm}`;
  return { formattedDate, formattedTime };
};

const addNewQuantityChange = (updatedProductData, newQuantityValue, newQuantityChange) => {
  updatedProductData.quantityChanges = updatedProductData.quantityChanges || [];
  updatedProductData.quantityChanges.push(newQuantityChange);
  return updatedProductData;
};

const updateProductInFirestore = async (documentId, updatedProductData) => {
  await firebase.firestore()
    .collection("products")
    .doc(documentId)
    .update(updatedProductData);
};

// const updateProductInRealtimeDB = async (productRef, updatedProductData) => {
//   await set(productRef, updatedProductData);
// };

const updateProduct = async () => {
  try {
    if (props.editingProduct) {
      loading.value = true;
      // const dbs = getDatabase();
      const documentId = props.editingProduct.id;
      // const productRef = stRef(dbs, 'products/' + documentId);
      const { ...updatedProduct } = props.editingProduct;

      // Create an object with the updated product data
      let updatedProductData = {
        ...updatedProduct,
        category: props.editingProduct.category,
        amount: amount.value,
        testers: originalTesters.value,
        damaged: originalDamaged.value,
        newQuantity: newQuantity.value,
        sold: originalSoldStock.value,
      };

      const { formattedDate, formattedTime } = getCurrentDateTime();

      if (newQuantity.value > 0) {
        // Add quantity change only when newQuantity is greater than zero
        const newQuantityChange = {
          quantityAdded: newQuantity.value,
          date: formattedDate,
          time: formattedTime,
        };
        updatedProductData = addNewQuantityChange(updatedProductData, newQuantity.value, newQuantityChange);
      }

      await updateProductInFirestore(documentId, updatedProductData);
      // await updateProductInRealtimeDB(productRef, updatedProductData);

      loading.value = false;
      successMessage.value = "Product updated successfully";
      // setTimeout(() => {
      //   location.reload();
      // }, 1000);
    }
  } catch (error) {
    loading.value = false;
    console.error(error)
    errorMessage.value = "Failed to update the product. Please try again later.";
  }
};



>>>>>>> 9156ac0f0df5aac935aeb34399cac8c28282e2f6
const fetchCategoryNames = async () => {
  try {
    const categoriesSnapshot = await db.collection("categories").get();
    const categoryNames = categoriesSnapshot.docs.map((doc) => doc.data().name);
    return categoryNames;
  } catch (error) {
    console.error("Error fetching category names",error);
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



// Watch for changes in testers, dam, and newQuantity


const originalInitialStock = ref(0)
const originalRemainingStock = ref(0)
const originalTesters=ref(0)
const originalSoldStock=ref(0)
const originalDamaged=ref(0)

<<<<<<< HEAD
=======

>>>>>>> 9156ac0f0df5aac935aeb34399cac8c28282e2f6
// Watch for changes in the editingProduct prop

watch(
  () => props.editingProduct,
  (newEditingProduct) => {
    if (newEditingProduct) {
      // Handle the case where editingProduct is not null or undefined
      // You can initialize or reset any related data here
      // For example:
      originalInitialStock.value = newEditingProduct.InitialStockQuantity;
      originalRemainingStock.value = newEditingProduct.stockQuantity;
      originalTesters.value = newEditingProduct.testers;
      originalDamaged.value = newEditingProduct.damaged;
      originalSoldStock.value = newEditingProduct.sold;
    }
  }
);

// Define a watcher to update stockQuantity based on various factors
watch(
  [newQuantity, originalTesters, originalDamaged],
  () => {
    if (props.editingProduct) {
      if (newQuantity.value > 0) { 
        props.editingProduct.InitialStockQuantity = originalInitialStock.value + newQuantity.value;
        props.editingProduct.stockQuantity = originalRemainingStock.value + newQuantity.value;
      } else if (newQuantity.value === 0) {
        props.editingProduct.InitialStockQuantity = originalInitialStock.value;
        props.editingProduct.stockQuantity = originalRemainingStock.value;
      }
    }
  }
);

// Watch for changes in originalTesters and originalDamaged
watch(
  [originalTesters, originalDamaged],
  () => {
    if (props.editingProduct) {
      if (originalTesters.value >= 0 && originalDamaged.value >= 0 && newQuantity.value >= 0) {
        props.editingProduct.stockQuantity = originalInitialStock.value + newQuantity.value - originalTesters.value - originalDamaged.value - originalSoldStock.value;
      }
    }
  }
);

const amount = computed(() => {
  if (props.editingProduct) {
    return props.editingProduct.stockQuantity * props.editingProduct.price;
  }
  // Handle other cases if necessary
  return 0; // Default value if any of the values are negative
});



onMounted(async () => {
  availableCategories.value = await fetchCategoryNames();

 
});




</script>
