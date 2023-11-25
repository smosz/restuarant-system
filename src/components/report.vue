<template>
    <div class="p-4 w-full"  v-if="showReportSection" id="report">
      <div class="flex justify-between items-center no-print">
        <h2 class="text-2xl font-semibold mb-4">Stock Managment</h2>
        
      </div>
  
      <div class="bg-white shadow-md rounded-lg overflow-hidden tab">
<<<<<<< HEAD
        <div class="overflow-x-auto px-6">
=======
        <div class="px-6">
>>>>>>> 9156ac0f0df5aac935aeb34399cac8c28282e2f6
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
<<<<<<< HEAD
              <!-- <Icon
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
               
               
                <button
                  @click="filterProducts"
                  class=" px-3 py-2 bg-blue-500 text-white hover:bg-blue-700 rounded-md cursor-pointer"
                >
                  Filter
                </button>
              </div> -->
=======
>>>>>>> 9156ac0f0df5aac935aeb34399cac8c28282e2f6
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
                    <span> SKU</span>
                  </div>
                </th>

                <th class="pdtab">
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
                </th>
                
                <th class="pdtab">
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
                </th>
                <th class="pdtab">
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
                </th>
                <th class="pdtab">
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
                </th>
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

               
              </tr>
            </thead>
            <tbody>
              <tr v-for="product in paginatedProducts" :key="product.sku">
                <td class="pdd">
<<<<<<< HEAD
                  <div class="flex items-center justify-center flex-wrap">
=======
                  <div class="flex items-center justify-left flex-wrap">
>>>>>>> 9156ac0f0df5aac935aeb34399cac8c28282e2f6
                    <img
                      :src="product.productImage"
                      alt="Product Image"
                      class="w-10 h-10 mr-2"
                    />
                    <span>{{ product.name }}</span>
                  </div>
                </td>
               
                <td class="pdd">
                  {{ product.sku }}
                </td>

                <td class="pdd">
                  {{ product.InitialStockQuantity }}
                </td>
                
                <td class="pdd">
                  {{ product.damaged }}
                </td>
                <td class="pdd">
                  {{ product.testers}}
                </td>
                <td class="pdd">
    {{ product.sold }}
  </td>
  <td
<<<<<<< HEAD
             :class="{ 'pdd': product.stockQuantity > 20, 'text-red-500 pdd2 flex items-center py-4 pl-10 justify-center': product.stockQuantity <= 20 }"
              >
                <div> {{ product.stockQuantity }}</div>
                 
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
                  
=======
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
>>>>>>> 9156ac0f0df5aac935aeb34399cac8c28282e2f6
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
            class="bg-gray-200 p-4 rounded-lg shadow-lg flex  mt-4 justify-between"
          >
            
            <p class="text-2xl font-semibold text-gray-700">
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
            </p>
            <p class="text-2xl font-semibold text-gray-700">
  Total Qty Sold:
  <span class="ml-4 text-3xl font-semibold text-orange-500">{{ totalQtySold }}</span>
</p>
          </div>
        </div>
      </div>

    </div>
  </template>
  
  
    
    <script setup>
  import { ref, onMounted, computed, watch } from "vue";
  import firebase from "firebase/compat/app";
  import "firebase/compat/firestore";
  import low from "../assets/low.json";
import empty from "../assets/empty.json";
  import jsPDF from "jspdf";
  import "jspdf-autotable";
  import * as XLSX from "xlsx";
<<<<<<< HEAD
=======
  // import { getDatabase,ref as stRef, get,orderByChild,} from "firebase/database";
>>>>>>> 9156ac0f0df5aac935aeb34399cac8c28282e2f6
  // Define the Firestore database reference
  const db = firebase.firestore();

  // Define pagination state
  const currentPage = ref(1); // Current page
<<<<<<< HEAD
  const itemsPerPage = 5; // Number of items to display per page
=======
  const itemsPerPage = 20; // Number of items to display per page
>>>>>>> 9156ac0f0df5aac935aeb34399cac8c28282e2f6
  const searchQuery = ref("");
  const filterShow = ref(false);
  const filterclose = ref(true);
  
  const sortColumnRef = ref(null);
  const sortDirection = ref("asc"); // Default sorting direction

  const minStock = ref(null);
  const maxStock = ref(null);
  const minPrice = ref(null);
  const maxPrice = ref(null);
  const { props } = defineProps(["showReportSection"]);
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

        "Product Price",
        "Stock Quantity",
      ],
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


  const totalQtySold = computed(() => {
<<<<<<< HEAD
    return products.value.reduce((total, product) => total + product.sold, 0);;
});


=======
    const num = products.value.reduce((total, product) => {
        const sold = product.sold;
        if (isNaN(sold)) {
            console.log(`Invalid sold value for product:`, product);
        }
        return total + (isNaN(sold) ? 0 : sold);
    }, 0);
    console.log(num);
    return num;
});



>>>>>>> 9156ac0f0df5aac935aeb34399cac8c28282e2f6
  const totalTesters = computed(() => {
    return products.value.reduce((total, product) => total + product.testers, 0);
  });
  const totalDamaged = computed(() => {
    return products.value.reduce((total, product) => total + product.damaged, 0);
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
        return productName.includes(query) || productSku.includes(query);
      });
    }
  };
  const filterProducts = () => {
    try {
      // Filter products based on search query, stock quantity range, and price range
      products.value = sortedProducts.value.filter((product) => {
        const productStockQuantity = product.stockQuantity;
        const productPrice = product.price;
        const productCategory = product.category;
        // Check both stock quantity and price criteria
        const stockQuantityFilter =
          (minStock.value === null || productStockQuantity >= minStock.value) &&
          (maxStock.value === null || productStockQuantity <= maxStock.value);
  
        const priceFilter =
          (minPrice.value === null || productPrice >= minPrice.value) &&
          (maxPrice.value === null || productPrice <= maxPrice.value);
  
        const categoryFilter =
          selectedCategory.value === "" ||
          productCategory.includes(selectedCategory.value);
  
        return stockQuantityFilter && priceFilter && categoryFilter; // Include the product in the filtered list if both criteria are met
      });
    } catch (error) {
      window.alert("Error during filtering");
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
  // Function to fetch and populate the products list
  const fetchProducts = async () => {
    try {
      const productsSnapshot = await db.collection("products").orderBy('ranking','asc').get();
      products.value = productsSnapshot.docs.map((doc) => doc.data());
    } catch (error) {
      window.alert("Error fetching products");
    }
  };
<<<<<<< HEAD
  
=======
//   const fetchProducts = async () => {
//   try {
//     const db = getDatabase();
//     const productsDataRef = stRef(db, "/products");
//         const prod =await get(productsDataRef)
//     if (prod.val() !== null) {

//       const productsArray= Object.values(prod.val()).map((product) => {
//             return {
//               ...product,
//             };});
//       // Sort the products by ranking in ascending order
//       productsArray.sort((a, b) => a.ranking - b.ranking);

//       // Set the products value
//       products.value = productsArray;
//     } else {
//       // Handle the case where there are no products in the database
//       products.value = [];
//     }
//   } catch (error) {
//     window.alert("Error fetching products: " + error);
//   }
// };

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
    [minStock, maxStock, minPrice, maxPrice,  searchQuery],
    () => {
      if (
        ((minStock.value === null || minStock.value === "") &&
          (maxStock.value === null || maxStock.value === "")) ||
        ((minPrice.value === null || minPrice.value === "") &&
          (maxPrice.value === null || maxPrice.value === "")) ||
        searchQuery.value === ""
      ) {
        fetchProducts();
      }
    }
  );
  
  // Fetch products and available categories when the component is mounted
  onMounted(async () => {
    await fetchProducts();
  });
  </script>
  