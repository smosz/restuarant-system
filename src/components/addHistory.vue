<template>
  <div class="p-4 w-full" v-if="showAddsection" id="addHistory">
    <div class="flex justify-between items-center no-print">
      <h2 class="text-2xl font-semibold mb-4">Product Addition History</h2>
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
        <table class="min-w-full border-collapse border border-gray-300" id="product-table">
  <!-- Table header -->
  <thead>
    <tr>
      <th class="pdtab">
        <div class="flex items-center justify-center">
          <span>Name</span>
        </div>
      </th>
      <th class="pdtab">
        <div class="flex items-center justify-center">
          <span>SKU</span>
        </div>
      </th>
      <th class="pdtab">
        <div class="flex items-center justify-center">
          <span>Quantity Changes</span>
        </div>
      </th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="product in paginatedProducts" :key="product.sku">
      <td class="pdd">
        <div class="flex items-center justify-center flex-wrap">
          <img :src="product.productImage" alt="Product Image" class="w-10 h-10 mr-2" />
          <span>{{ product.name }}</span>
        </div>
      </td>
      <td class="pdd">
        {{ product.sku }}
      </td>
      <td class="pdd">
        <!-- Iterate through quantityChanges for the current product -->
        <table class="w-full">
          <thead>
            <tr>
              <th class="pdtab2">Date</th>
              <th class="pdtab2">Time</th>
              <th class="pdtab2">Quantity Added</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="change in product.quantityChanges" :key="change.date + change.time">
              <td class="pdd3">{{ change.date }}</td>
              <td class="pdd3">{{ change.time }}</td>
              <td class="pdd3">{{ change.quantityAdded }}</td>
            </tr>
          </tbody>
        </table>
      </td>
    </tr>
  </tbody>
</table>

        <!-- Pagination controls -->
        <div class="my-4 button-pagination no-print">
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
        
      </div>
    </div>
  </div>
</template>
  
  
    
    <script setup>
import { ref, onMounted, computed, watch } from "vue";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import jsPDF from "jspdf";
import "jspdf-autotable";
<<<<<<< HEAD
=======
// import { getDatabase,ref as stRef, get,orderByChild,} from "firebase/database";
>>>>>>> 9156ac0f0df5aac935aeb34399cac8c28282e2f6
import * as XLSX from "xlsx";
// Define the Firestore database reference
const db = firebase.firestore();

// Define pagination state
const currentPage = ref(1); // Current page
const itemsPerPage = 5; // Number of items to display per page
const searchQuery = ref("");
const filterShow = ref(false);
const filterclose = ref(true);

const sortColumnRef = ref(null);
const sortDirection = ref("asc"); // Default sorting direction

const { props } = defineProps(["showAddsection"]);

// Method to export the table content to PDF
const exportToPDF = () => {
  // Create a new jsPDF instance
  const pdf = new jsPDF();

  // Define columns for the table
  const columns = [
    "Product SKU",
    "Product Name",
    "Product Price",
    "Stock Quantity",
  ];

  // Define the rows of the table by mapping over your product data
  const rows = products.value.map((product) => [
    product.sku,
    product.name,

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
const productsAddHistory = ref([]);
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
    ["Product SKU", "Product Name", "Product Price", "Stock Quantity"],
    // Map your product data to rows here
    ...products.value.map((product) => [
      product.sku,
      product.name,

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

//Create a computed property that returns the products to display on the current page:
const paginatedProducts = computed(() => {
  sortProducts(); // Apply sorting to the entire list
  const startIndex = (currentPage.value - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  return sortedProducts.value.slice(startIndex, endIndex);
});

// Computed property for calculating Qty Sold

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
      return productName.includes(query) || productSku.includes(query);
    });
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
const fetchProducts = async () => {
  try {
    const productsSnapshot = await db.collection("products").get();
<<<<<<< HEAD
    const allProducts = productsSnapshot.docs.map((doc) => doc.data());
    
    // Filter products with the `quantityChanges` field
    products.value = allProducts.filter((product) => product.quantityChanges !== undefined);
    
    // Get the `quantityChanges` for the filtered products
    productsAddHistory.value = products.value.map((product) => product.quantityChanges);
  } catch (error) {
    window.alert("Error fetching products");
=======
    const productsArray = productsSnapshot.docs.map((doc) => doc.data());
    // const db = getDatabase();
    // const productsDataRef = stRef(db, "/products");
    // const productsSnapshot = await get(productsDataRef);

    // if (productsSnapshot.val() !== null) {
    //   // Convert the data to an array of products
    //   const productsArray = Object.values(productsSnapshot.val()).map((product) => {
    //     return {
    //       ...product,
    //     };
    //   });

      // Filter products with the `quantityChanges` field
      const filteredProducts = productsArray.filter((product) => product.quantityChanges !== undefined);

      // Set the `products.value` with the filtered products
      products.value = filteredProducts;

      // Get the `quantityChanges` for the filtered products
      productsAddHistory.value = filteredProducts.map((product) => product.quantityChanges);
  } catch (error) {
    window.alert("Error fetching products: " + error);
>>>>>>> 9156ac0f0df5aac935aeb34399cac8c28282e2f6
  }
};



<<<<<<< HEAD
=======

>>>>>>> 9156ac0f0df5aac935aeb34399cac8c28282e2f6
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


// Fetch products and available categories when the component is mounted
onMounted(async () => {
  await fetchProducts();
});
</script>
  