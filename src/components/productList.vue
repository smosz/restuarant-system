<template>
  <div class="p-4 w-full" v-if="showListSection" id="List">
    <div class="flex justify-between items-center no-print">
      <h2 class="text-2xl font-semibold mb-4">Product List</h2>
      <router-link to="/add-product">
        <button
          class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          <div class="flex items-center">
            <Icon icon="majesticons:plus-line" />
            <span class="pl-2">Register Product</span>
          </div>
        </button>
      </router-link>
    </div>

    <div class="bg-white shadow-md rounded-lg overflow-hidden tab">
      <div class="overflow-x-auto px-6">
        <div
          class="mt-2 mb-4 flex items-center font-['monospace'] space-x-2 justify-between no-print"
        >
          <div class="flex items-center">
            <!-- Search input field -->
            <input
              v-model="searchQuery"
              type="text"
              class="search-input"
              @keyup.enter="searchProducts"
              placeholder="Search products..."
            />
            <Icon
              icon="mi:filter"
              class="mx-2 cursor-pointer"
              :height="30"
              @click="toggleFilter"
              v-if="filterclose"
            />
            <Icon
              icon="mdi:close-box"
              color="red"
              class="mx-2 cursor-pointer"
              :height="30"
              @click="toggleFilter"
              v-if="filterShow"
            />
            <div v-if="filterShow" class="flex items-center">
              <!-- Stock Quantity Filter Range -->
              <div class="mt-2">
                <h1 class="ml-2">Filter by Quantity</h1>
                <div class="flex">
                  <input
                    v-model="minStock"
                    type="number"
                    class="num"
                    placeholder="Min Qty"
                  />
                  <h1 class="ml-2">-</h1>
                  <input
                    v-model="maxStock"
                    type="number"
                    class="num"
                    placeholder="Max Qty"
                  />
                </div>
              </div>
              <!-- Price Filter Range -->
              <div class="mt-2 ml-10">
                <h1 class="ml-2">Filter by Price</h1>
                <div class="flex">
                  <input
                    v-model="minPrice"
                    type="number"
                    class="num"
                    placeholder="Min Price"
                  />
                  <h1 class="ml-2">-</h1>
                  <input
                    v-model="maxPrice"
                    type="number"
                    class="num"
                    placeholder="Max Price"
                  />
                </div>
              </div>
              <!-- Category Filter -->
              <div class="mt-2 ml-10">
                <div>
                  <h1 class="ml-2">Filter by Category</h1>
                  <select
                    v-model="selectedCategory"
                    class="search-input ml-2 !overflow-y-auto w-[50%]"
                  >
                    <option value="">All Categories</option>
                    <option
                      v-for="category in availableCategories"
                      :key="category"
                      :value="category"
                      class="p-2 border-b"
                    >
                      {{ category }}
                    </option>
                  </select>
                </div>
              </div>
              <button
                @click="filterProducts"
                class="px-3 py-2 bg-blue-500 text-white hover:bg-blue-700 rounded-md cursor-pointer"
              >
                Filter
              </button>
            </div>
          </div>

          <div class="flex ml-auto">
            <Icon
              icon="vscode-icons:file-type-pdf2"
              @click="exportToPDF"
              class="mx-2 cursor-pointer"
              :height="30"
            />
            <Icon
              icon="vscode-icons:file-type-excel2"
              @click="exportToExcel"
              class="mx-2 cursor-pointer"
              :height="30"
            />
            <Icon
              icon="flat-color-icons:print"
              @click="printTable"
              class="mx-2 cursor-pointer"
              :height="30"
            />
          </div>
        </div>
        <table
          class="min-w-full border-collapse border border-gray-300"
          id="product-table"
        >
          <!-- Table header  -->
          <thead>
            <tr>
              <th class="pdtab">
                <div class="flex items-center justify-center">
                  <span> Name</span>
                </div>
              </th>
              <th class="pdtab">
                <div class="flex items-center justify-center">
                  <span> Description</span>
                </div>
              </th>
              <th class="pdtab">
                <div class="flex items-center justify-center">
                  <span> SKU</span>
                </div>
              </th>
              <th class="pdtab w-[15rem]">
                <div class="flex items-center justify-center">
                  <span> Category</span>
                </div>
              </th>
              <th class="pdtab">
                <div class="flex items-center justify-center">
                  <span>Price</span>
                  <span class="ml-2 no-print">
                    <Icon
                      icon="fa6-solid:sort-up"
                      class="mx-1 mb-[-8px] w-5 text-lg hover:text-blue-500 cursor-pointer"
                      @click="sortColumn('price', 'asc')"
                    />
                    <Icon
                      icon="fa6-solid:sort-down"
                      class="mx-1 mb-0 w-5 text-lg hover:text-blue-500 cursor-pointer"
                      @click="sortColumn('price', 'desc')"
                    />
                  </span>
                </div>
              </th>
              <!-- <th class="pdtab">
                <div class="flex items-center justify-center">
                  <span>Init Qty</span>
                  <span class="ml-2 no-print">
                    <Icon
                      icon="fa6-solid:sort-up"
                      class="mx-1 mb-[-8px] w-5 text-lg hover:text-blue-500 cursor-pointer"
                      @click="sortColumn('InitialStockQuantity', 'asc')"
                    />
                    <Icon
                      icon="fa6-solid:sort-down"
                      class="mx-1 mb-0 w-5 text-lg hover:text-blue-500 cursor-pointer"
                      @click="sortColumn('InitialStockQuantity', 'desc')"
                    />
                  </span>
                </div>
              </th> -->

              <!-- <th class="pdtab">
                <div class="flex items-center justify-center">
                  <span>Dam Qty</span>
                  <span class="ml-2 no-print">
                    <Icon
                      icon="fa6-solid:sort-up"
                      class="mx-1 mb-[-8px] w-5 text-lg hover:text-blue-500 cursor-pointer"
                      @click="sortColumn('damaged', 'asc')"
                    />
                    <Icon
                      icon="fa6-solid:sort-down"
                      class="mx-1 mb-0 w-5 text-lg hover:text-blue-500 cursor-pointer"
                      @click="sortColumn('damaged', 'desc')"
                    />
                  </span>
                </div>
              </th> -->
              <!-- <th class="pdtab">
                <div class="flex items-center justify-center">
                  <span>Testers</span>
                  <span class="ml-2 no-print">
                    <Icon
                      icon="fa6-solid:sort-up"
                      class="mx-1 mb-[-8px] w-5 text-lg hover:text-blue-500 cursor-pointer"
                      @click="sortColumn('testers', 'asc')"
                    />
                    <Icon
                      icon="fa6-solid:sort-down"
                      class="mx-1 mb-0 w-5 text-lg hover:text-blue-500 cursor-pointer"
                      @click="sortColumn('testers', 'desc')"
                    />
                  </span>
                </div>
              </th> -->
              <th class="pdtab">
                <div class="flex items-center justify-center">
                  <span>Rem Qty</span>
                  <span class="ml-2 no-print">
                    <Icon
                      icon="fa6-solid:sort-up"
                      class="mx-1 mb-[-8px] w-5 text-lg hover:text-blue-500 cursor-pointer"
                      @click="sortColumn('stockQuantity', 'asc')"
                    />
                    <Icon
                      icon="fa6-solid:sort-down"
                      class="mx-1 mb-0 w-5 text-lg hover:text-blue-500 cursor-pointer"
                      @click="sortColumn('stockQuantity', 'desc')"
                    />
                  </span>
                </div>
              </th>
              <th class="pdtab">
                <div class="flex items-center justify-center">
                  <span>Amount</span>
                  <span class="ml-2 no-print">
                    <Icon
                      icon="fa6-solid:sort-up"
                      class="mx-1 mb-[-8px] w-5 text-lg hover:text-blue-500 cursor-pointer"
                      @click="sortColumn('amount', 'asc')"
                    />
                    <Icon
                      icon="fa6-solid:sort-down"
                      class="mx-1 mb-0 w-5 text-lg hover:text-blue-500 cursor-pointer"
                      @click="sortColumn('amount', 'desc')"
                    />
                  </span>
                </div>
              </th>
              <!-- <th class="pdtab">
                <div class="flex items-center justify-center">
                  <span>Qty Sold</span>
                  <span class="ml-2 no-print">
                    <Icon
                      icon="fa6-solid:sort-up"
                      class="mx-1 mb-[-8px] w-5 text-lg hover:text-blue-500 cursor-pointer"
                      @click="sortColumn('QtySold', 'asc')"
                    />
                    <Icon
                      icon="fa6-solid:sort-down"
                      class="mx-1 mb-0 w-5 text-lg hover:text-blue-500 cursor-pointer"
                      @click="sortColumn('QtySold', 'desc')"
                    />
                  </span>
                </div>
              </th> -->
              <th class="pdtab">Action</th>
            </tr>
          </thead>
          <tbody v-loading="loading">
            <tr >
    <td :colspan="numberOfColumns" class="text-center" v-if="paginatedProducts.length === 0 ">
      <!-- Center the el-empty component -->
      <el-empty :image-size="200"></el-empty>
    </td>
  </tr>
            
            <tr v-for="product in paginatedProducts" :key="product.sku" >
              <td class="pdd">
                <div class="flex items-center justify-left flex-wrap p-2">
                  <img
                    :src="product.productImage"
                    alt="Product Image"
                    class="w-10 h-10 mr-2"
                  />
                  <span>{{ product.name }}</span>
                </div>
              </td>
              <td class="pdd">
                {{ product.description }}
              </td>
              <td class="pdd">
                {{ product.sku }}
              </td>
              <td class="pdd" style="text-align: -webkit-center">
                <!-- Display Categories as Pills -->
                <div
                  class="flex justify-center px-2 rounded-full bg-blue-200 w-max"
                >
                  <div
                    class="text-blue-800"
                  >
                    {{ product.category }}
                  </div>
                </div>
              </td>
              <td class="pdd">
                
                  <span v-if="product.price > 0">
                    {{ product.price.toLocaleString() }}
                  </span>
                  <span v-else>
                    {{ product.price }}
                  </span>
                
              </td>

              <td
                :class="{
                  pdd: product.stockQuantity > 20,
                  'text-red-500 pdd2 border-b border-gray-300 flex items-center py-[2rem] pl-10 justify-center':
                    product.stockQuantity <= 20,
                }"
              >
                <div>{{ product.stockQuantity }}</div>

                <Vue3Lottie
                  v-if="
                    product.stockQuantity <= 20 && product.stockQuantity > 0
                  "
                  :animationData="low"
                  :height="47"
                />
                <Vue3Lottie
                  v-if="product.stockQuantity === 0"
                  :animationData="empty"
                  :height="47"
                />
              </td>
              <td class="pdd">
                
                  <span v-if="product.amount > 0">
                    {{ product.amount.toLocaleString() }}
                  </span>
                  <span v-else>
                    {{ product.amount }}
                  </span>
                
              </td>
              <!-- <td v-for="(product, index) in products" :key="index"  class="pdd">
  {{ calculatedQtySold[index] }}
</td> -->
              <td class="pdd">
                <div class="flex space-x-2 justify-center">
                  <button
                    @click="openEditModal(product)"
                    class="text-blue-500 hover:text-blue-700 px-3 py-1 underline"
                  >
                    Edit
                  </button>
                  <button
                    @click="deleteProduct(product)"
                    class="text-red-500 hover:text-red-700 px-3 py-1"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <!-- Pagination controls -->
        <div class="mt-4 button-pagination no-print">
          <button
            @click="previousPage"
            :disabled="currentPage === 1"
            class="px-3 py-[10px] mr-[25px] bg-blue-500 text-white hover:bg-blue-700 rounded-md cursor-pointer"
          >
            Previous
          </button>
          <!-- Display page numbers -->
          <div class="flex justify-center space-x-2 no-print">
            <span v-for="pageNumber in totalPages" :key="pageNumber">
              <button
                @click="goToPage(pageNumber)"
                :class="{
                  'bg-blue-500 text-white hover:bg-blue-700 rounded-md cursor-pointer':
                    currentPage === pageNumber,
                  'bg-gray-200 text-gray-500 hover:bg-gray-300 rounded-md cursor-pointer':
                    currentPage !== pageNumber,
                }"
                class="px-3 py-2 transition duration-300 ease-in-out"
              >
                {{ pageNumber }}
              </button>
            </span>
          </div>

          <button
            @click="nextPage"
            :disabled="currentPage * itemsPerPage >= sortedProducts.length"
            class="no-print px-3 py-[10px] ml-[25px] bg-blue-500 text-white hover:bg-blue-700 rounded-md cursor-pointer"
          >
            Next
          </button>
        </div>
        <div
        v-if="paginatedProducts.length > 0"
          class="bg-gray-200 p-4 rounded-lg shadow-lg flex mt-4 justify-between"
        >
          <p class="text-2xl font-semibold text-gray-700">
            Total Products:<span
              class="ml-4 text-3xl font-semibold text-orange-500"
              >{{ sortedProducts.length }}</span
            >
          </p>
          <!-- <p class="text-2xl font-semibold text-gray-700">
            Total Testers:<span
              class="ml-4 text-3xl font-semibold text-orange-500"
              >{{ totalTesters }}</span
            >
          </p>
          <p class="text-2xl font-semibold text-gray-700">
            Total Damaged:<span
              class="ml-4 text-3xl font-semibold text-orange-500"
              >{{ totalDamaged }}</span
            >
          </p> -->
          <p class="ml-4 text-3xl font-semibold text-black">
            Total Stock:<span
              class="ml-4 text-3xl font-semibold text-orange-500"
            >
              {{ totalStockQuantity }}</span
            >
          </p>
          <p class="ml-4 text-2xl font-semibold text-black">
            Total Amount:
            <span class="ml-4 text-3xl font-semibold text-orange-500">
              <span v-if="totalAmount > 0">
                UGX {{ totalAmount.toLocaleString() }}
              </span>
              <span v-else> UGX {{ totalAmount }} </span>
            </span>
          </p>
        </div>
      </div>
    </div>

    <!-- Use the EditProductModal component with a prop -->
    <editProductModal
      :editingProduct="editingProduct"
      @close="closeEditModal"
    />
    <!-- Use the DeleteConfirmationModal component -->
    <deleteConfirmationModal
      v-if="showDeleteConfirmation"
      @confirm="deleteConfirmed"
      @cancel="cancelDelete"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from "vue";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import editProductModal from "../components/editProductModal.vue";
import deleteConfirmationModal from "../components/deleteConfirmationModal.vue";
import low from "../assets/low.json";
import empty from "../assets/empty.json";
import jsPDF from "jspdf";
import "jspdf-autotable";
import * as XLSX from "xlsx";
// import { API, graphqlOperation } from 'aws-amplify';
// import { listProducts } from '../graphql/queries';
import { getDatabase, ref as stRef, get,remove,limitToLast,query } from "firebase/database";
// Define the Firestore database reference
const db = firebase.firestore();
// Define a ref to control the visibility of the delete confirmation modal
const showDeleteConfirmation = ref(false);
// Define a ref to store the product being deleted
const deletingProduct = ref(null);
// Define pagination state
const currentPage = ref(1); // Current page
const itemsPerPage = 20; // Number of items to display per page
const searchQuery = ref("");
const filterShow = ref(false);
const filterclose = ref(true);

const sortColumnRef = ref(null);
const sortDirection = ref("asc"); // Default sorting direction
// Define a ref to track the product being edited
const editingProduct = ref(null);
const loading = ref(true);
const selectedCategory = ref("");
const availableCategories = ref([]);
const minStock = ref(null);
const maxStock = ref(null);
const minPrice = ref(null);
const maxPrice = ref(null);
const numberOfColumns = ref(8)
const cachedProducts = ref([]);

const { props } = defineProps(["showListSection"]);
const toggleFilter = () => {
  filterShow.value = !filterShow.value;
  filterclose.value = !filterclose.value;
  fetchProducts();
};
// Method to export the table content to PDF
const exportToPDF = () => {
  // Create a new jsPDF instance
  const pdf = new jsPDF();

  // Define columns for the table
  const columns = [
    "Product SKU",
    "Product Name",
    "Product Category",
    "Product Price",
    "Stock Quantity",
  ];

  // Define the rows of the table by mapping over your product data
  const rows = products.value.map((product) => [
    product.sku,
    product.name,
    product.category,
    product.price,
    product.stockQuantity,
  ]);

  // Set the title for the PDF
  pdf.setFontSize(16);
  pdf.text("Product List", 10, 10);

  // Define a callback function to customize cell styling
  const didParseCell = function (data) {
    // Check if the current column is for the "Stock Quantity"
    if (data.column.index == 4) {
      // Convert the cell text to a number
      const cellValue = Number(data.cell.text);

      // Check if the cell value is less than or equal to 20
      if (cellValue <= 20) {
        // Apply red color to text
        data.cell.styles.textColor = "#FF0000";
      }
    }
  };

  // AutoTable is a jsPDF plugin for creating tables
  pdf.autoTable({
    head: [columns],
    body: rows,
    didParseCell: didParseCell, // Apply custom styling
  });

  // Save the PDF with a filename
  pdf.save("product-list.pdf");
};
// Define a ref to store the list of products
const products = ref([]);
const exportToExcel = () => {
  // Check if 'products' is an array
  if (!Array.isArray(products.value)) {
    window.alert("Products is not an array.");
    return;
  }

  // Create a new workbook
  const workbook = XLSX.utils.book_new();

  // Create a worksheet and add data to it
  const worksheet = XLSX.utils.aoa_to_sheet([
    [
      "Product SKU",
      "Product Name",
      "Product Category",
      "Product Price",
      "Stock Quantity",
    ],
    // Map your product data to rows here
    ...products.value.map((product) => [
      product.sku,
      product.name,
      product.category,
      product.price,
      product.stockQuantity,
    ]),
  ]);

  // Add the worksheet to the workbook
  XLSX.utils.book_append_sheet(workbook, worksheet, "Product List");
  const workbookOutput = XLSX.write(workbook, {
    bookType: "xlsx",
    type: "array",
  });
  const blob = new Blob([workbookOutput], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });

  // Create a download link and trigger the download
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "product-list.xlsx";
  a.click();

  // Clean up the URL.createObjectURL
  window.URL.revokeObjectURL(url);
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
// Function to fetch and populate the available categories
const fetchAvailableCategories = async () => {
  try {
    const categoryNames = await fetchCategoryNames();
    const sortedCategoryNames = categoryNames.sort(); // Sort the category names alphabetically
    availableCategories.value = sortedCategoryNames;
  } catch (error) {
    window.alert("Error fetching available categories");
  }
};

//Create a computed property that returns the products to display on the current page:
const paginatedProducts = computed(() => {
  sortProducts(); // Apply sorting to the entire list
  const startIndex = (currentPage.value - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  return sortedProducts.value.slice(startIndex, endIndex);
});
const totalStockQuantity = computed(() => {
  return products.value.reduce(
    (total, product) => total + product.stockQuantity,
    0
  );
});

const totalAmount = computed(() => {
  return products.value.reduce((total, product) => total + product.amount, 0);
});
const searchProducts = () => {
  if (searchQuery.value.trim() === "") {
    // Reset the product list if the search query is empty
    fetchProducts();
  } else {
    // Filter products based on the search query
    const query = searchQuery.value.toLowerCase().trim();
    products.value = sortedProducts.value.filter((product) => {
      const productName = product.name.toLowerCase();
      const productSku = product.sku.toLowerCase();
      const result = productName.includes(query) || productSku.includes(query);
      return result;
    });
  }
};

const filterProducts = () => {
  try {
    // Filter products based on search query, stock quantity range, and price range
    products.value = sortedProducts.value.filter((product) => {
      const productStockQuantity = product.stockQuantity;
      const productPrice = product.price;

      let productCategory = product.category; // Initialize with the product's category

      // Check the type of category and convert it to a string if necessary
      if (Array.isArray(productCategory)) {
        productCategory = productCategory.join(" "); // Convert array to a space-separated string
      } else if (typeof productCategory !== "string") {
        // Handle other types of category, e.g., if it's an object or something else
        productCategory = "";
      }

      // Check both stock quantity and price criteria
      const stockQuantityFilter =
        (minStock.value === null || productStockQuantity >= minStock.value) &&
        (maxStock.value === null || productStockQuantity <= maxStock.value);

      const priceFilter =
        (minPrice.value === null || productPrice >= minPrice.value) &&
        (maxPrice.value === null || productPrice <= maxPrice.value);

      const categoryFilter =
        selectedCategory.value === "" ||
        productCategory === selectedCategory.value.trim();

      console.log(productCategory);
      console.log(selectedCategory.value);

      return stockQuantityFilter && priceFilter && categoryFilter; // Include the product in the filtered list if both criteria are met
    });
  } catch (error) {
    console.error("Error during filtering", error);
  }
};

const printTable = () => {
  // Trigger the browser's print dialog
  window.print();
};
// Function to go to the previous page
const previousPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
};
const totalPages = computed(() => {
  return Math.ceil(sortedProducts.value.length / itemsPerPage);
});
const goToPage = (pageNumber) => {
  currentPage.value = pageNumber;
};

// Function to go to the next page
const nextPage = () => {
  const totalPages = Math.ceil(sortedProducts.value.length / itemsPerPage);
  if (currentPage.value < totalPages) {
    currentPage.value++;
  }
};
// Function to open the edit modal and populate it with the selected product's data
const openEditModal = (product) => {
  editingProduct.value = { ...product };
};
// Function to close the delete confirmation modal
const cancelDelete = () => {
  deletingProduct.value = null;
  showDeleteConfirmation.value = false;
};
// Function to close the edit modal
const closeEditModal = () => {
  editingProduct.value = null;
};
// Function to open the delete confirmation modal
const deleteProduct = (product) => {
  // Set the product to be deleted
  deletingProduct.value = product;
  // Open the delete confirmation modal
  showDeleteConfirmation.value = true;
};

const deleteConfirmed = async () => {
  if (deletingProduct.value) {
    const { id } = deletingProduct.value;

    try {
      // const dbs = getDatabase();

      // // Use Firebase Realtime Database to delete the product
      // await remove(stRef(dbs, 'products/' + id));
      await db.collection("products").doc(id).delete();
      // Show a success message or perform any other actions if needed
      window.alert("Product deleted successfully");
    } catch (error) {
      // Handle the error
      window.alert("Error deleting product");
    } finally {
      // Close the delete confirmation modal
      showDeleteConfirmation.value = false;
      // Fetch the updated list of products (if needed)
      fetchProducts();
    }
  }
};

const fetchProducts = async () => {
  try {
        if (cachedProducts.value.length === 0) {
          // Only fetch products if the cache is empty
          const productsSnapshot = await db.collection("products").get();
          const productsList  = productsSnapshot.docs.map((doc) => doc.data());
// Sort the products by name alphabetically
productsList.sort((a, b) => {
        const nameA = a.name.toLowerCase();
        const nameB = b.name.toLowerCase();
        if (nameA < nameB) return -1;
        if (nameA > nameB) return 1;
        return 0;
      });
      loading.value = false;
          // Cache the fetched products
          products.value = productsList;
          cachedProducts.value = products.value.slice();
        } else {
          // Use the cached products
          products.value = cachedProducts.value.slice();
        }
      } catch (error) {
        loading.value = false;
        window.alert("Error fetching products");
      }
};


const sortProducts = () => {
  if (sortColumnRef.value && sortDirection.value) {
    products.value.sort((a, b) => {
      let aValue = a[sortColumnRef.value];
      let bValue = b[sortColumnRef.value];

      // Convert values to numbers for sorting the "Total Items" column
      if (sortColumnRef.value === "amount" || sortColumnRef.value === "price") {
        aValue = parseFloat(aValue);
        bValue = parseFloat(bValue);
      }

      if (sortDirection.value === "asc") {
        return aValue - bValue; // Sort in ascending order
      } else {
        return bValue - aValue; // Sort in descending order
      }
    });
  }
};

const sortedProducts = computed(() => {
  sortProducts();
  // return products.value;
  // Clone the original products array to avoid sorting the original data
  const clonedProducts = [...products.value];
  sortProducts(clonedProducts); // Apply sorting to the cloned array
  return clonedProducts;
});

const sortColumn = (column, direction) => {
  sortColumnRef.value = column;
  sortDirection.value = direction;
};
// Watch for changes in minStock and set it to null if it's an empty string
watch(minStock, (newMin) => {
  if (newMin === "") {
    minStock.value = null;
  }
});
watch(minPrice, (newMin) => {
  if (newMin === "") {
    minPrice.value = null;
  }
});
// Watch for changes in maxStock and set it to null if it's an empty string
watch(maxStock, (newMax) => {
  if (newMax === "") {
    maxStock.value = null;
  }
});
watch(maxPrice, (newMax) => {
  if (newMax === "") {
    maxPrice.value = null;
  }
});
// Watch for changes in stockFilter and fetch products when both min and max are null or empty strings
watch(
  [minStock, maxStock, minPrice, maxPrice, selectedCategory, searchQuery],
  () => {
    if (
      ((minStock.value === null || minStock.value === "") &&
        (maxStock.value === null || maxStock.value === "")) ||
      ((minPrice.value === null || minPrice.value === "") &&
        (maxPrice.value === null || maxPrice.value === "")) ||
      selectedCategory.value === "" ||
      searchQuery.value === ""
    ) {
      fetchProducts();
    }
  }
);

// Fetch products and available categories when the component is mounted
onMounted(async () => {
  await fetchProducts();
  await fetchAvailableCategories();
});
</script>
