<template>
    <div class="bgColor">
      <div class="max-w-screen-lg mx-auto py-6">
        <div class="bg-white rounded-lg shadow-lg p-6 tab">
          <div class="flex justify-between items-center mb-4 no-print">
            <h2 class="text-2xl font-semibold">Customer List</h2>
            <button
              @click="openCustomerRegistrationModal"
              class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >
              <div class="flex items-center">
                <Icon icon="majesticons:plus-line" />
                <span class="pl-2">Register Customer</span>
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
                @keyup.enter="searchCustomers"
                placeholder="Search customers..."
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
  
  
          <table id="customer-table" class="min-w-full border-collapse border border-gray-300">
            <!-- Table header -->
            <thead>
              <tr>
                <th
                  class="px-6 py-3 bg-gray-200 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  <div class="flex items-center justify-center">
                    <span>Customer Name</span>
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
                  <div class="flex items-center justify-center">
                    <span>Customer Number</span>
                    <span class="ml-2 no-print">
                      <Icon
                        icon="fa6-solid:sort-up"
                        class="mx-1 mb-[-8px] w-5 text-lg hover:text-blue-500 cursor-pointer"
                        @click="sortColumn('number', 'asc')"
                      />
                      <Icon
                        icon="fa6-solid:sort-down"
                        class="mx-1 mb-0 w-5 text-lg hover:text-blue-500 cursor-pointer"
                        @click="sortColumn('number', 'desc')"
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
              <tr v-for="customer in paginatedcustomers" :key="customer.uid">
                <td class="px-6 py-4 border border-gray-300">
                  {{ customer.name }}
                </td>
                <td class="px-6 py-4 border border-gray-300">
                  {{ customer.number }}
                </td>
                <td class="no-print py-4 border border-gray-300">
                  <div class="flex space-x-2 justify-center">
                    <button
                      @click="openEditModal(customer)"
                      class="text-blue-500 hover:text-blue-700 px-3 py-1 underline"
                    >
                      Edit
                    </button>
                    <button
                      @click="deleteCustomer(customer)"
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
              :disabled="currentPage * itemsPerPage >= sortedcustomers.length"
              class="px-3 py-[10px] ml-[25px] bg-blue-500 no-print text-white hover:bg-blue-700 rounded-md cursor-pointer"
            >
              Next
            </button>
          </div>
          <div class="mt-2 text-center no-print">
            Total customers: {{ sortedcustomers.length }}
          </div>
        </div>
      </div>
  
      <addCustomerModal v-if="showcustomerModal" @close="closecustomerModal" />
      <!-- Use the EditcustomerModal component with a prop -->
      <editCustomerModal
        :editingCustomer="editingCustomer"
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
  import addCustomerModal from "./addCustomerModal.vue";
  import jsPDF from "jspdf";
  import "jspdf-autotable";
  import * as XLSX from "xlsx";
  import deleteConfirmationModal from "../components/deleteConfirmationModal.vue";
  import editCustomerModal from "../components/editCustomerModal.vue";
  // Control the visibility of the customer registration modal
  const showcustomerModal = ref(false);
  // Define a ref to store the list of customers
  const customers = ref([]);

  // Define a ref to control the visibility of the delete confirmation modal
  const showDeleteConfirmation = ref(false);
  const sortColumnRef = ref(null);
  const sortDirection = ref("asc"); // Default sorting direction
  // Define a ref to store the customer being deleted
  const deletingCustomer = ref(null);
  // Define the Firestore database reference
  const db = firebase.firestore();
  // Define pagination state
  const currentPage = ref(1); // Current page
  const itemsPerPage = 5; // Number of items to display per page
  const searchQuery = ref("");

  // Define a ref to track the customer being edited
  const editingCustomer = ref(null);
  // Method to export the table content to PDF
  const exportToPDF = () => {
    // Create a new jsPDF instance
    const pdf = new jsPDF();
  
    // Define columns for the table
    const columns = [
  
      "Customer Name",
      "Customer Number",
      
    ];
  
    // Define the rows of the table by mapping over your customer data
    const rows = customers.value.map((customer) => [
  
      customer.name,
      customer.number,
  
    ]);
  
    // Set the title for the PDF
    pdf.setFontSize(16);
    pdf.text("customer List", 10, 10);
  
    // AutoTable is a jsPDF plugin for creating tables
    pdf.autoTable({
      head: [columns],
      body: rows,
    });
  
    // Save the PDF with a filename
    pdf.save("customer-list.pdf");
  };
  
  const exportToExcel = () => {
    // Check if 'customers' is an array
    if (!Array.isArray(customers.value)) {
      console.error("customers is not an array.");
      return;
    }
  
    // Create a new workbook
    const workbook = XLSX.utils.book_new();
  
    // Create a worksheet and add data to it
    const worksheet = XLSX.utils.aoa_to_sheet([
      [
       
      "Customer Name",
      "Customer Number",
      ],
      // Map your customer data to rows here
      ...customers.value.map((customer) => [
      customer.name,
      customer.number,
      ]),
    ]);
  
    // Add the worksheet to the workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, "customer List");
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
    a.download = "customer-list.xlsx";
    a.click();
  
    // Clean up the URL.createObjectURL
    window.URL.revokeObjectURL(url);
  };
  const printTable = () => {
    // Trigger the browser's print dialog
    window.print();
  };
  const openEditModal = (customer) => {
    editingCustomer.value = { ...customer };
  };

  const searchCustomers = () => {
    if (searchQuery.value.trim() === "") {
      // Reset the customer list if the search query is empty
      fetchcustomers();
    } else {
      // Filter customers based on the search query
      const query = searchQuery.value.toLowerCase().trim();
      customers.value = sortedcustomers.value.filter((customer) => {
        const customerName = customer.name.toLowerCase();
        return customerName.includes(query);
      });
    }
  };
  
  //Create a computed property that returns the customers to display on the current page:
  const paginatedcustomers = computed(() => {
    sortcustomers(); // Apply sorting to the entire list
    const startIndex = (currentPage.value - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return sortedcustomers.value.slice(startIndex, endIndex);
  });
  // Function to go to the previous page
  const previousPage = () => {
    if (currentPage.value > 1) {
      currentPage.value--;
    }
  };
  const totalPages = computed(() => {
    return Math.ceil(sortedcustomers.value.length / itemsPerPage);
  });
  const goToPage = (pageNumber) => {
    currentPage.value = pageNumber;
  };

  // Function to go to the next page
  const nextPage = () => {
    const totalPages = Math.ceil(sortedcustomers.value.length / itemsPerPage);
    if (currentPage.value < totalPages) {
      currentPage.value++;
    }
  };
  // Function to close the edit modal
  const closeEditModal = () => {
    editingCustomer.value = null;
    fetchcustomers();
  };
  // Function to close the delete confirmation modal
  const cancelDelete = () => {
    deletingCustomer.value = null;
    showDeleteConfirmation.value = false;
  };
  // Function to open the delete confirmation modal
  const deleteCustomer = (customer) => {
    // Set the customer to be deleted
    deletingCustomer.value = customer;
    // Open the delete confirmation modal
    showDeleteConfirmation.value = true;
  };
  // Function to delete the customer
  const deleteConfirmed = async () => {
    if (deletingCustomer.value) {
      const { id } = deletingCustomer.value;
      try {
        // Use Firebase to delete the customer from Firestore
        await db.collection("customers").doc(id).delete();
        // Show a success message or perform any other actions if needed
        console.log("customer deleted successfully");
      } catch (error) {
        // Handle the error
        console.error("Error deleting customer:", error);
      } finally {
        // Close the delete confirmation modal
        showDeleteConfirmation.value = false;
        // Fetch the updated list of customers (if needed)
        fetchcustomers();
      }
    }
  };
  
  // Function to fetch and populate the customers list
  const fetchcustomers = async () => {
    try {
      const customersSnapshot = await db.collection("customers").get();
      customers.value = customersSnapshot.docs.map((doc) => doc.data())
    } catch (error) {
      console.error("Error fetching customers:", error);
    }
  };

  // Function to open the customer registration modal
  const openCustomerRegistrationModal = () => {
    // Set showcustomerModal to true to show the modal
    showcustomerModal.value = true;
  };
  const sortcustomers = () => {
    if (sortColumnRef.value && sortDirection.value) {
      customers.value.sort((a, b) => {
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
  
  const sortedcustomers = computed(() => {
    // Clone the original customers array to avoid sorting the original data
    const clonedcustomers = [...customers.value];
    sortcustomers(clonedcustomers); // Apply sorting to the cloned array
    return clonedcustomers;
  });
  
  const sortColumn = (column, direction) => {
    sortColumnRef.value = column;
    sortDirection.value = direction;
  };
  const closecustomerModal = () => {
    showcustomerModal.value = false;
    // Fetch the updated list of customers after a new customer is registered
    fetchcustomers();
  };
  // Fetch customers when the component is mounted
  onMounted(() => {
    fetchcustomers();
  });

  watch([searchQuery], () => {
    if (
     searchQuery.value === ""
    ) {
      fetchcustomers();
    }
  });
  </script>
    