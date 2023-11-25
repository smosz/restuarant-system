<template>
  <div class="flex justify-center items-center min-h-screen bg-gray-100">
    <div class="w-full max-w-4xl">
      <div class="bg-white rounded-lg p-6 shadow-md mt-6">
        <h2 class="text-2xl font-semibold mb-4">Product Registration</h2>
        <form class="grid grid-cols-2 gap-6" @submit.prevent="registerProduct">
          <!-- Left Column -->
          <div class="col-span-1">
            <!-- Product Name -->
            <div class="flex flex-col">
              <label for="product-name" class="text-sm">Product Name</label>
              <input type="text" id="product-name" v-model="product.name"
                class="border uppercase border-gray-300 px-2 py-1 rounded-sm" required />
            </div>

            <!-- Product Description -->
            <div class="flex flex-col">
              <label for="product-description" class="text-sm">Product Description</label>
              <textarea id="product-description" v-model="product.description" rows="4"
                class="border border-gray-300 px-2 py-1 rounded-sm"></textarea>
            </div>

            <!-- Product SKU -->
            <div class="flex flex-col mt-4">
              <label for="product-sku" class="text-sm">Product SKU</label>
              <input type="text" id="product-sku" v-model="product.sku"
                class="border uppercase border-gray-300 px-2 py-1 rounded-sm" required />
            </div>
            <!-- Product Price -->
            <div class="flex flex-col mt-4">
              <label for="product-price" class="text-sm">Product Price</label>
              <input type="number" min="0" id="product-price" v-model="product.price"
                class="border border-gray-300 px-2 py-1 rounded-sm" required />
            </div>
           
            <div class="col-span-2 mt-4">
              <div class="flex flex-col">
                <label for="damaged" class="text-sm">Damaged Quantity</label>
                <input type="number" id="damaged" v-model="product.damaged" min="0" :max="product.InitialStockQuantity"
                  @input="updateStockQuantity()" class="border border-gray-300 px-2 py-1 rounded-sm" required
                  :disabled="product.InitialStockQuantity <= 0" />
              </div>
            </div>
            <div class="col-span-2 mt-4">
              <div class="flex flex-col">
                <label for="testers" class="text-sm">Testers</label>
                <input
                  type="number"
                  id="testers"
                  min="0"
                  v-model="product.testers"
                  :max="product.InitialStockQuantity"
                  @input="updateStockQuantity()"
                  class="border border-gray-300 px-2 py-1 rounded-sm"
                  required
                  :disabled="product.InitialStockQuantity <= 0"
                />
              </div>
            </div>
          </div>


          <!-- Right Column -->
          <div class="col-span-1">
            <!-- Product Categories (Checkboxes) -->
            <div class="flex flex-col">
              <label class="text-sm">Product Categories</label>
              <div class="max-h-40 overflow-y-auto border border-gray-300 rounded-lg p-2 grid grid-cols-3 gap-2">
                <!-- Scrollable card -->
                <div v-for="category in availableCategories" :key="category">
                  <label class="flex items-center">
                    <input type="radio" :value="category" v-model="selectedCategory"
                      @change="toggleCategory(category)" class="mr-2" />
                    {{ category }}
                  </label>
                </div>
              </div>
            </div>

            <!-- Product Category (Autocomplete Input) -->
            <div class="flex flex-col mt-4">
              <label for="product-category" class="text-sm">Search or Add Category</label>
              <input type="text" id="product-category" v-model="newCategory"
                class="border border-gray-300 px-2 py-1 rounded-sm" @input="suggestCategories"
                @keydown.enter.prevent="registerNewCategory" />
              <!-- Auto-suggested categories dropdown -->
              <ul v-if="showSuggestions" class="border border-gray-300 mt-1 rounded-b-md">
                <li v-for="suggestion in categorySuggestions" :key="suggestion" @click="selectSuggestion(suggestion)"
                  class="cursor-pointer px-2 py-1 hover:bg-gray-200">
                  {{ suggestion }}
                </li>
              </ul>
            </div>
          
            <!-- Stock Quantity -->
            <div class="col-span-2 mt-4">
              <div class="flex flex-col">
                <label for="InitialstockQuantity" class="text-sm">Initial Stock Quantity</label>
                <input type="number" min="0" id="InitialstockQuantity" v-model="product.InitialStockQuantity"
                  @input="update()" class="border border-gray-300 px-2 py-1 rounded-sm" required />
              </div>
            </div>
            <div class="col-span-2 mt-4">
              <div class="flex flex-col">
                <label for="stockQuantity" class="text-sm">Remaining Stock Quantity</label>
                <input type="number" id="stockQuantity" v-model="product.stockQuantity"
                  class="border border-gray-300 px-2 py-1 rounded-sm" required disabled />
              </div>
            </div>
            <!-- Amount -->
            <div class="col-span-2 mt-4">
              <div class="flex flex-col">
                <label for="amount" class="text-sm">Amount</label>
                <input type="text" id="amount" :value="amount" class="border border-gray-300 px-2 py-1 rounded-sm"
                  disabled />
              </div>
            </div>

          </div>

          <!-- Product Image -->
          <div class="col-span-2">
            <div class="flex flex-col">
              <label for="product-image" class="text-sm">Product Image</label>
              <!-- Clickable upload area -->
              <div class="flex self-center text-center" :class="{
                'border-green-700 bg-pink-200': isDragging,
                'border-gray-700': !isDragging,
                'bg-blue-200 p-[100px] border border-dashed border-gray-700':
                  !product.productImage,
              }" @dragover.prevent="handleDragOver" @dragleave.prevent="handleDragLeave" @drop.prevent="handleDrop">
                <!-- Custom message when file is dragged over -->
                <label for="product-image" class="cursor-pointer">
                  <div v-if="!product.productImage">
                    <div class="mb-2 text-3xl flex justify-center items-center">
                      <Icon icon="material-symbols:cloud-upload" />
                    </div>
                    <p class="text-gray-600">
                      {{
                        isDragging
                        ? "Release to Upload"
                        : "Click to select or Drag & Drop Your Image Here"
                      }}
                    </p>
                  </div>

                  <div v-else>
                    <img :src="product.productImage" alt="Product Image Preview" class="max-w-full h-auto" />
                  </div>

                  <input type="file" id="product-image" accept="image/*" @change="previewProductImage"
                    style="display: none" />
                </label>
              </div>
            </div>
          </div>

          <!-- Success Message -->
          <div v-if="message" class="mt-4 col-span-2 text-center text-green-600">
            {{ message }}
          </div>
          <div v-if="errorMessage" class="mt-4 col-span-2 text-center text-red-600">
            {{ errorMessage }}
          </div>
          <div v-if="imageSizeError" class="mt-4 col-span-2 text-center text-red-600">
            {{ imageSizeError }}
          </div>
          <!-- Submit Button -->
          <div class="col-span-2 flex justify-center">
            <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
              Register Product
            </button>
          </div>
          <div v-if="updating" class="spinner-overlay">
            <div class="spinner"></div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

  
<script setup>
import { ref, computed, onMounted, watch } from "vue";
import "firebase/compat/storage";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { useRouter } from "vue-router";
// import { API, graphqlOperation } from 'aws-amplify';
// import { createProduct } from '../graphql/mutations'; // Import the specific mutation
// import { getDatabase,ref as stRef, set,push,} from "firebase/database";


// Define the Firestore database reference
const db = firebase.firestore();

// Track whether a file is being dragged over the drop area
const isDragging = ref(false);
const message = ref("");
const errorMessage = ref("");
const imageSizeError = ref("");
const imgSize = ref(null)
const updating = ref(false);
const availableCategories = ref([]);
const router = useRouter();
// Handle input and category suggestions
const newCategory = ref("");
const categorySuggestions = ref([]);
const showSuggestions = ref(false);

// Create a computed property for displaying the formatted amount
const selectedCategory = ref("");
const rawAmount = computed(() => {
  return product.value.price * product.value.stockQuantity;
});
// Create a computed property for displaying the formatted amount with "UGX" prefix
const amount = computed(() => {
  const currencySymbol = "UGX"; // Currency symbol
  const formattedValue = rawAmount.value.toLocaleString(); // Add comma for thousand separators
  return `${currencySymbol} ${formattedValue}`;
});

const product = ref({
  name: "",
  description: "",
  sku: "",
  price: 0,
  category: "",
  stockQuantity: 0,
  productImage: "",
  amount: rawAmount,
  testers: 0,
  damaged: 0,
  InitialStockQuantity: 0,
  sold: 0,
});
const updateStockQuantity = () => {
  if (product.value.testers >= 0 && product.value.damaged === 0) {
    // Update stockQuantity as testers are added
    const pt = product.value.InitialStockQuantity - product.value.testers;
    product.value.stockQuantity = pt;
  } else if (product.value.damaged >= 0 && product.value.testers >= 0) {
    const plus = product.value.testers + product.value.damaged;
    const ptl = product.value.InitialStockQuantity - plus;
    product.value.stockQuantity = ptl;
  } else if (product.value.testers === 0 && product.value.damaged >= 0) {
    const pts = product.value.InitialStockQuantity - product.value.damaged;
    product.value.stockQuantity = pts;
  }
  else {
    return;
  }
};
const update = () => {
  if (product.value.testers === 0 || product.value.InitialStockQuantity === 0 || product.value.damaged === 0) {
    product.value.stockQuantity = product.value.InitialStockQuantity;
  } else {
    // Handle negative testers value if needed
  }
};

const toggleCategory = (category) => {
  selectedCategory.value = category;
  product.value.category = category;
  console.log(product.value)
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

const previewProductImage = (event) => {
  const file = event.target.files[0];
  if (file) {

    imgSize.value = file.size
 // Check the image size before uploading
 if (imgSize.value > 1048487) {
      imageSizeError.value = "Image is too large. Please upload a another image.";
      return;
    }else{
      imageSizeError.value = "";
      // Read the selected image file as a Data URL
    const reader = new FileReader();
    reader.onload = () => {
      // Update the productImage ref with the Data URL
      product.value.productImage = reader.result;
    };
    reader.readAsDataURL(file);
    }
    
  }
};

// Handle the drag-and-drop events
const handleDragOver = (event) => {
  isDragging.value = true;
  product.value.productImage = "";
  event.preventDefault();
  // Add styles to indicate the drag-and-drop area
  event.target.classList.add("border-blue-500");
};

const handleDragLeave = (event) => {
  isDragging.value = false;
  event.preventDefault();
  // Remove styles when the user leaves the drag-and-drop area
  event.target.classList.remove("border-blue-500");
};

const handleDrop = (event) => {
  isDragging.value = false;
  event.preventDefault();
  // Remove styles when the user drops the file
  event.target.classList.remove("border-blue-500");

  // Handle the dropped file
  const files = event.dataTransfer.files;
  if (files.length > 0) {
    // Preview and process the dropped image
    previewProductImage({ target: { files: [files[0]] } });
  }
};

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
  selectedCategory.value = suggestion;
  product.value.category = suggestion;
  newCategory.value = suggestion; // Clear the input
  categorySuggestions.value = []; // Clear suggestions
  showSuggestions.value = false; // Hide suggestions
};
const registerNewCategory = () => {
  if (newCategory.value) {
    // Add the new category to Firestore
    const newCategoryId = db.collection("categories").doc().id;
    const newCategoryData = {
      id: newCategoryId,
      name: newCategory.value,
      description: "",
      count: 0,
    };

    db.collection("categories")
      .doc(newCategoryId)
      .set(newCategoryData)
      .then(() => {
        // Add the new category to the availableCategories
        availableCategories.value.push(newCategory.value);
        // Add the new category to the selectedCategories
        selectedCategory.value = newCategory.value;
      
      })
      .catch((error) => {
        window.alert("Error registering new category");
      });
  }
};



const registerProduct = async () => {


  try {
    updating.value = true;
    product.value.name = product.value.name.toUpperCase();
    product.value.sku = product.value.sku.toUpperCase();
<<<<<<< HEAD
=======
    
    const dbs = firebase.firestore();
>>>>>>> 9156ac0f0df5aac935aeb34399cac8c28282e2f6
    // Generate a unique ID
    const sku = dbs.collection("products").doc().id;
    
    // Add the product data to Firestore with SKU as the document ID
    const productDataWithId = {
      ...product.value,
id:sku,
    };
<<<<<<< HEAD
console.log(productDataWithId)
    await db.collection("products").doc(sku).set(productDataWithId);
=======


    await dbs.collection("products").doc(sku).set(productDataWithId);

>>>>>>> 9156ac0f0df5aac935aeb34399cac8c28282e2f6
    updating.value = false;

    // Show a success message
    message.value = "Product registered successfully";

    // Clear the form fields after successful submission
    product.value = {
      name: "",
      description: "",
      sku: "",
      price: 0,
      category: '',
      stockQuantity: 0,
      productImage: "",
      testers: 0,
      damaged: 0,
      InitialStockQuantity: 0,
    };
    selectedCategory.value = null
<<<<<<< HEAD
=======
    newCategory.value=''
>>>>>>> 9156ac0f0df5aac935aeb34399cac8c28282e2f6
    // Automatically clear the success message after 5 seconds (5000 milliseconds)
    setTimeout(() => {
  message.value = "";
  location.reload();
}, 2000);

  } catch (error) {
    updating.value = false;
    errorMessage.value = "Product registration failed. Try again.";
    console.error(error)
  }
};

onMounted(async () => {
  availableCategories.value = await fetchCategoryNames();
});
watch(
  () => product.value.testers,
  (newValue) => {
    if (newValue <= 0) {
      updateStockQuantity();
      update();
    }
  }
);
</script>
  