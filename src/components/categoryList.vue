<template>
  <div class="bgColor">
    <div class="max-w-screen-lg mx-auto py-6">
      <div class="bg-white rounded-lg shadow-lg p-6 tab">
        <div class="flex justify-between items-center mb-4 no-print">
          <h2 class="text-2xl font-semibold">Categories List</h2>
          <button
            @click="openCategoryRegistrationModal"
            class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            <div class="flex items-center">
              <Icon icon="majesticons:plus-line" />
              <span class="pl-2">Register Category</span>
            </div>
          </button>
        </div>
       
        <div class="mt-2 mb-4 flex items-center font-['monospace'] space-x-2 justify-between no-print">
          <div class="flex items-center">
             <!-- Search input field -->
            <input
              v-model="searchQuery"
              type="text"
              class="search-input"
              @keyup.enter="searchCategories"
              placeholder="Search categories..."
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
              <!-- Product Count Filter Range -->
              <div class="mt-2">
                <h1 class="ml-2">Filter by Product Count</h1>
                <div class="flex">
                  <input
                    v-model="minCount"
                    type="number"
                    class="num"
                    placeholder="Min Count"
                  />
                  <h1 class="ml-2">-</h1>
                  <input
                    v-model="maxCount"
                    type="number"
                    class="num"
                    placeholder="Max Count"
                  />
                </div>
              </div>
              <button
                @click="filterProductCount"
                class="ml-10 px-3 py-2 bg-blue-500 text-white hover:bg-blue-700 rounded-md cursor-pointer"
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


        <table id="category-table" class="min-w-full border-collapse border border-gray-300">
          <!-- Table header -->
          <thead>
            <tr>
              <th
                class="px-6 py-3 bg-gray-200 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                <div class="flex items-center justify-center">
                  <span>Category Name</span>
                  <span class="ml-2 no-print">
                    <Icon
                      icon="fa6-solid:sort-up"
                      class="mx-1 mb-[-8px] w-5 text-lg hover:text-blue-500 cursor-pointer"
                      @click="sortColumn('name', 'asc')"
                    />
                    <Icon
                      icon="fa6-solid:sort-down"
                      class="mx-1 mb-0 w-5 text-lg hover:text-blue-500 cursor-pointer"
                      @click="sortColumn('name', 'desc')"
                    />
                  </span>
                </div>
              </th>
              <th
                class="px-6 py-3 bg-gray-200 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Category Description
              </th>
              <th
                class="px-6 py-3 bg-gray-200 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                <div class="flex items-center justify-center">
                  <span>Product Count</span>
                  <span class="ml-2 no-print">
                    <Icon
                      icon="fa6-solid:sort-up"
                      class="mx-1 mb-[-8px] w-5 text-lg hover:text-blue-500 cursor-pointer"
                      @click="sortColumn('productCount', 'asc')"
                    />
                    <Icon
                      icon="fa6-solid:sort-down"
                      class="mx-1 mb-0 w-5 text-lg hover:text-blue-500 cursor-pointer"
                      @click="sortColumn('productCount', 'desc')"
                    />
                  </span>
                </div>
              </th>
              <th
                class=" no-print px-6 py-3 bg-gray-200 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="category in paginatedCategories" :key="category.uid">
              <td class="px-6 py-4 border border-gray-300">
                {{ category.name }}
              </td>
              <td class="px-6 py-4 border border-gray-300">
                {{ category.description }}
              </td>
              <td class="px-6 py-4 border border-gray-300">
                {{ category.productCount }}
              </td>
              <td class="no-print py-4 border border-gray-300">
                <div class="flex space-x-2 justify-center">
                  <button
                    @click="openEditModal(category)"
                    class="text-blue-500 hover:text-blue-700 px-3 py-1 underline"
                  >
                    Edit
                  </button>
                  <button
                    @click="deleteCategory(category)"
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
            :disabled="currentPage * itemsPerPage >= sortedCategories.length"
            class="px-3 py-[10px] ml-[25px] bg-blue-500 no-print text-white hover:bg-blue-700 rounded-md cursor-pointer"
          >
            Next
          </button>
        </div>
        <div class="mt-2 text-center no-print">
          Total Categories: {{ sortedCategories.length }}
        </div>
      </div>
    </div>

    <CategoryForm v-if="showCategoryModal" @close="closecategoryModal" />
    <!-- Use the EditProductModal component with a prop -->
    <categoryEditModal
      :editingCategory="editingCategory"
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
import { ref, onMounted, watch, computed } from "vue";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import CategoryForm from "./CategoryForm.vue";
import jsPDF from "jspdf";
import "jspdf-autotable";
import * as XLSX from "xlsx";
import deleteConfirmationModal from "../components/deleteConfirmationModal.vue";
import categoryEditModal from "../components/categoryEditModal.vue";
// Control the visibility of the category registration modal
const showCategoryModal = ref(false);
// Define a ref to store the list of categories
const categories = ref([]);
const filterShow = ref(false);
const filterclose = ref(true);
// Define a ref to control the visibility of the delete confirmation modal
const showDeleteConfirmation = ref(false);
const sortColumnRef = ref(null);
const sortDirection = ref("asc"); // Default sorting direction
// Define a ref to store the category being deleted
const deletingCategory = ref(null);
// Define the Firestore database reference
const db = firebase.firestore();
// Define pagination state
const currentPage = ref(1); // Current page
const itemsPerPage = 20 // Number of items to display per page
const searchQuery = ref("");
const minCount = ref(null);
const maxCount = ref(null);
// Define a ref to track the category being edited
const editingCategory = ref(null);
// Method to export the table content to PDF
const exportToPDF = () => {
  // Create a new jsPDF instance
  const pdf = new jsPDF();

  // Define columns for the table
  const columns = [

    "Category Name",
    "Category Description",
    "Product Count",
    
  ];

  // Define the rows of the table by mapping over your product data
  const rows = categories.value.map((category) => [

    category.name,
    category.description,
    category.productCount,

  ]);

  // Set the title for the PDF
  pdf.setFontSize(16);
  pdf.text("Category List", 10, 10);

  // AutoTable is a jsPDF plugin for creating tables
  pdf.autoTable({
    head: [columns],
    body: rows,
  });

  // Save the PDF with a filename
  pdf.save("category-list.pdf");
  // const jsonData = JSON.stringify(categories.value, null, 2); // Convert your data to JSON format

  // // Create a Blob with the JSON data
  // const blob = new Blob([jsonData], { type: 'application/json' });

  // // Create a download link and trigger a click event to download the JSON file
  // const a = document.createElement('a');
  // a.href = URL.createObjectURL(blob);
  // a.download = 'category-list.json';
  // a.click();
};

const exportToExcel = () => {
  // Check if 'products' is an array
  if (!Array.isArray(categories.value)) {
    window.alert("categories is not an array.");
    return;
  }

  // Create a new workbook
  const workbook = XLSX.utils.book_new();

  // Create a worksheet and add data to it
  const worksheet = XLSX.utils.aoa_to_sheet([
    [
     
    "Category Name",
    "Category Description",
    "Product Count",
    ],
    // Map your product data to rows here
    ...categories.value.map((category) => [
    category.name,
    category.description,
    category.productCount,
    ]),
  ]);

  // Add the worksheet to the workbook
  XLSX.utils.book_append_sheet(workbook, worksheet, "Category List");
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
  a.download = "category-list.xlsx";
  a.click();

  // Clean up the URL.createObjectURL
  window.URL.revokeObjectURL(url);
};
const printTable = () => {
  // Trigger the browser's print dialog
  window.print();
};
const openEditModal = (category) => {
  editingCategory.value = { ...category };
};
const filterProductCount = () => {
  try {
    // Filter products based on product count range
    categories.value = sortedCategories.value.filter((category) => {
      const count = category.productCount


      const countFilter =
      (minCount.value === null || count >= minCount.value) &&
        (maxCount.value === null || count <= maxCount.value);

      return countFilter 
    });
  } catch (error) {
    window.alert("Error during filtering");
  }
};
const searchCategories = () => {
  if (searchQuery.value.trim() === "") {
    // Reset the category list if the search query is empty
    fetchCategories();
  } else {
    // Filter products based on the search query
    const query = searchQuery.value.toLowerCase().trim();
    categories.value = sortedCategories.value.filter((category) => {
      const categoryName = category.name.toLowerCase();
      return categoryName.includes(query);
    });
  }
};

//Create a computed property that returns the categories to display on the current page:
const paginatedCategories = computed(() => {
  sortCategories(); // Apply sorting to the entire list
  const startIndex = (currentPage.value - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  return sortedCategories.value.slice(startIndex, endIndex);
});
// Function to go to the previous page
const previousPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
};
const totalPages = computed(() => {
  return Math.ceil(sortedCategories.value.length / itemsPerPage);
});
const goToPage = (pageNumber) => {
  currentPage.value = pageNumber;
};
const toggleFilter = () => {
  filterShow.value = !filterShow.value;
  filterclose.value = !filterclose.value;
  fetchCategories();
};
// Function to go to the next page
const nextPage = () => {
  const totalPages = Math.ceil(sortedCategories.value.length / itemsPerPage);
  if (currentPage.value < totalPages) {
    currentPage.value++;
  }
};
// Function to close the edit modal
const closeEditModal = () => {
  editingCategory.value = null;
  fetchCategories();
};
// Function to close the delete confirmation modal
const cancelDelete = () => {
  deletingCategory.value = null;
  showDeleteConfirmation.value = false;
};
// Function to open the delete confirmation modal
const deleteCategory = (category) => {
  // Set the category to be deleted
  deletingCategory.value = category;
  // Open the delete confirmation modal
  showDeleteConfirmation.value = true;
};
// Function to delete the product
const deleteConfirmed = async () => {
  if (deletingCategory.value) {
    const { id } = deletingCategory.value;
    try {
      // Use Firebase to delete the product from Firestore
      await db.collection("categories").doc(id).delete();
      window.location.reload();
    } catch (error) {
      // Handle the error
      window.alert("Error deleting category");
    } finally {
      // Close the delete confirmation modal
      showDeleteConfirmation.value = false;
      // Fetch the updated list of products (if needed)
      fetchCategories();
    }
  }
};

// Function to fetch and populate the categories list
const fetchCategories = async () => {
  try {
    const categoriesSnapshot = await db.collection("categories").get();
    categories.value = categoriesSnapshot.docs.map((doc) => ({
      ...doc.data(),
      productCount: 0, // Initialize productCount
    }))
    // Update productCount after fetching the categories
    updateProductCount();
  } catch (error) {
    window.alert("Error fetching categories");
  }
};
const updateProductCount = async () => {
  for (const category of categories.value) {
    try {
      const productsSnapshot = await db
        .collection("products")
        .where("category", "array-contains", category.name)
        .get();
      category.productCount = productsSnapshot.docs.length;
    } catch (error) {
      window.alert(
        "Error counting products for category"
      );
    }
  }
};
// Function to open the category registration modal
const openCategoryRegistrationModal = () => {
  // Set showCategoryModal to true to show the modal
  showCategoryModal.value = true;
};
const sortCategories = () => {
  if (sortColumnRef.value && sortDirection.value) {
    categories.value.sort((a, b) => {
      let aValue = a[sortColumnRef.value];
      let bValue = b[sortColumnRef.value];

      // Convert values to strings for consistent comparison
      aValue = String(aValue);
      bValue = String(bValue);

      if (sortDirection.value === "asc") {
        return aValue.localeCompare(bValue);
      } else {
        return bValue.localeCompare(aValue);
      }
    });
  }
};

const sortedCategories = computed(() => {
  // Clone the original categories array to avoid sorting the original data
  const clonedCategories = [...categories.value];
  sortCategories(clonedCategories); // Apply sorting to the cloned array
  return clonedCategories;
});

const sortColumn = (column, direction) => {
  sortColumnRef.value = column;
  sortDirection.value = direction;
};
const closecategoryModal = () => {
  showCategoryModal.value = false;
  // Fetch the updated list of categories after a new category is registered
  fetchCategories();
};
// Fetch categories when the component is mounted
onMounted(() => {
  fetchCategories();
});
// Watch for changes in categories and update product counts when categories change
watch(categories, () => {
  updateProductCount();
});
watch(minCount, (newMin) => {
  if (newMin === "") {
    minCount.value = null;
  }
});
watch(maxCount, (newMax) => {
  if (newMax === "") {
    maxCount.value = null;
  }
});
watch([minCount, maxCount,searchQuery], () => {
  if (
    ((minCount.value === null || minCount.value === "") &&
      (maxCount.value === null || maxCount.value === "")) ||
   searchQuery.value === ""
  ) {
    fetchCategories();
  }
});
</script>
  