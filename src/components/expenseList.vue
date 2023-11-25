<template>
  <div class="bgColor">
    <div class="max-w-screen-lg mx-auto py-6">
      <div class="bg-white rounded-lg shadow-lg px-6 pt-6 tab">
        <div class="flex justify-between items-center mb-4 no-print">
          <h2 class="text-2xl font-semibold">Expense List</h2>
          <button
            @click="openExpensesRegistrationModal"
            class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            <div class="flex items-center">
              <Icon icon="majesticons:plus-line" />
              <span class="pl-2">Register Expense</span>
            </div>
          </button>
        </div>

        <div
          class="mt-2 mb-4 flex items-center font-['monospace'] space-x-2 justify-between no-print"
        >
          <div class="flex items-center">
            <!-- Search input field -->
            <input
              v-model="searchQuery"
              type="text"
              class="search-input"
              @keyup.enter="searchexpenses"
              placeholder="Search expenses..."
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

        <table
          id="expense-table"
          class="min-w-full border-collapse border border-gray-300"
        >
          <!-- Table header -->
          <thead>
            <tr>
              <th
                class="py-2 bg-gray-200 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                <div class="flex items-center justify-center">
                  <span>Date</span>
                </div>
              </th>
              <th
                class="py-2 bg-gray-200 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                <div class="flex items-center justify-center">
                  <span> Name</span>
                </div>
              </th>
              <th
                class="py-2 bg-gray-200 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                <div class="flex items-center justify-center">
                  <span>Description</span>
                </div>
              </th>
              <th
                class="py-2 bg-gray-200 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                <div class="flex items-center justify-center">
                  <span>Qty</span>
                  <span class="ml-2 no-print">
                    <Icon
                      icon="fa6-solid:sort-up"
                      class="mx-1 mb-[-8px] w-5 text-lg hover:text-blue-500 cursor-pointer"
                      @click="sortColumn('quantity', 'asc')"
                    />
                    <Icon
                      icon="fa6-solid:sort-down"
                      class="mx-1 mb-0 w-5 text-lg hover:text-blue-500 cursor-pointer"
                      @click="sortColumn('quantity', 'desc')"
                    />
                  </span>
                </div>
              </th>

              <th
                class="py-2 bg-gray-200 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                <div class="flex items-center justify-center">
                  <span> Price</span>
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
              <th
                class="py-2 bg-gray-200 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                <div class="flex items-center justify-center">
                  <span>Total Amount</span>
                  <span class="ml-2 no-print">
                    <Icon
                      icon="fa6-solid:sort-up"
                      class="mx-1 mb-[-8px] w-5 text-lg hover:text-blue-500 cursor-pointer"
                      @click="sortColumn('totalAmount', 'asc')"
                    />
                    <Icon
                      icon="fa6-solid:sort-down"
                      class="mx-1 mb-0 w-5 text-lg hover:text-blue-500 cursor-pointer"
                      @click="sortColumn('totalAmount', 'desc')"
                    />
                  </span>
                </div>
              </th>
              <th
                class="no-print py-2 bg-gray-200 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="expense in paginatedExpenses" :key="expense.uid">
              <td class="text-center py-4 border border-gray-300">
                <p>{{ expense.date }}</p>
                <p>{{ expense.time }}</p>
              </td>
              <td class="text-center py-4 border border-gray-300">
                {{ expense.name }}
              </td>
              <td class="text-center py-4 border border-gray-300">
                {{ expense.description }}
              </td>
              <td class="text-center py-4 border border-gray-300">
                {{ expense.quantity }}
              </td>
              <td class="text-center py-4 border border-gray-300">
                UGX {{ expense.amount.toLocaleString() }}
              </td>
              <td class="text-center py-4 border border-gray-300">
                {{
                  expense.totalAmount > 0
                    ? "UGX " + expense.totalAmount.toLocaleString()
                    : "0"
                }}
              </td>

              <td class="no-print py-4 border border-gray-300">
                <div class="flex space-x-2 justify-center">
                  <button
                    @click="openEditModal(expense)"
                    class="text-blue-500 hover:text-blue-700 px-3 py-1 underline"
                  >
                    Edit
                  </button>
                  <button
                    @click="deleteExpense(expense)"
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
            :disabled="currentPage * itemsPerPage >= sortedExpenses.length"
            class="px-3 py-[10px] ml-[25px] bg-blue-500 no-print text-white hover:bg-blue-700 rounded-md cursor-pointer"
          >
            Next
          </button>
        </div>
     
        <div class="mt-2 text-center no-print">
            <div
              class="bg-gray-200 p-4 rounded-sm shadow-sm flex items-center text-[20px] justify-between"
            >
              
              <p class="font-semibold text-black">
                Expense Bal:<span
                  class="ml-4 text-3xl font-semibold text-orange-500"
                  >UGX {{ expenseBalance.toLocaleString() }}</span
                >
              </p>
              <p class="font-semibold text-gray-700">
                Total expenses:<span
                  class="ml-4 text-3xl font-semibold text-orange-500"
                >
                {{ sortedExpenses.length }}</span
                >
              </p>
              <p class="font-semibold text-black">
                Total Amount:<span
                  class="ml-4 text-3xl font-semibold text-orange-500"
                  >UGX {{ totalAmount.toLocaleString() }}</span
                >
              </p>
            </div>
          </div>
      </div>
    </div>

    <addExpenseModal v-if="showExpensesModal" @close="closeexpenseModal" />
    <!-- Use the EditExpenseModal component with a prop -->
    <editExpenseModal
      :editingExpense="editingExpense"
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
import addExpenseModal from "./addExpenseModal.vue";
import jsPDF from "jspdf";
import "jspdf-autotable";
import * as XLSX from "xlsx";
import deleteConfirmationModal from "../components/deleteConfirmationModal.vue";
import editExpenseModal from "../components/editExpenseModal.vue";
// Control the visibility of the expense registration modal
const showExpensesModal = ref(false);
// Define a ref to store the list of expenses
const expenses = ref([]);

// Define a ref to control the visibility of the delete confirmation modal
const showDeleteConfirmation = ref(false);
const sortColumnRef = ref(null);
const sortDirection = ref("asc"); // Default sorting direction
// Define a ref to store the expense being deleted
const deletingExpense = ref(null);
// Define the Firestore database reference
const db = firebase.firestore();
// Define pagination state
const currentPage = ref(1); // Current page
const itemsPerPage = 5; // Number of items to display per page
const searchQuery = ref("");
const expenseMoney = ref([]);
// Define a ref to track the expense being edited
const editingExpense = ref(null);
// Method to export the table content to PDF
const exportToPDF = () => {
  // Create a new jsPDF instance
  const pdf = new jsPDF();

  // Define columns for the table
  const columns = ["expense Name", "expense Number"];

  // Define the rows of the table by mapping over your expense data
  const rows = expenses.value.map((expense) => [expense.name, expense.number]);

  // Set the title for the PDF
  pdf.setFontSize(16);
  pdf.text("expense List", 10, 10);

  // AutoTable is a jsPDF plugin for creating tables
  pdf.autoTable({
    head: [columns],
    body: rows,
  });

  // Save the PDF with a filename
  pdf.save("expense-list.pdf");
};

const exportToExcel = () => {
  // Check if 'expenses' is an array
  if (!Array.isArray(expenses.value)) {
    return;
  }

  // Create a new workbook
  const workbook = XLSX.utils.book_new();

  // Create a worksheet and add data to it
  const worksheet = XLSX.utils.aoa_to_sheet([
    ["expense Name", "expense Number"],
    // Map your expense data to rows here
    ...expenses.value.map((expense) => [expense.name, expense.number]),
  ]);

  // Add the worksheet to the workbook
  XLSX.utils.book_append_sheet(workbook, worksheet, "expense List");
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
  a.download = "expense-list.xlsx";
  a.click();

  // Clean up the URL.createObjectURL
  window.URL.revokeObjectURL(url);
};
const printTable = () => {
  // Trigger the browser's print dialog
  window.print();
};
const openEditModal = (expense) => {
  editingExpense.value = { ...expense };
};

const searchexpenses = () => {
  if (searchQuery.value.trim() === "") {
    // Reset the expense list if the search query is empty
    fetchExpenses();
  } else {
    // Filter expenses based on the search query
    const query = searchQuery.value.toLowerCase().trim();
    expenses.value = sortedExpenses.value.filter((expense) => {
      const expenseName = expense.name.toLowerCase();
      return expenseName.includes(query);
    });
  }
};

//Create a computed property that returns the expenses to display on the current page:
const paginatedExpenses = computed(() => {
  sortExpenses(); // Apply sorting to the entire list
  const startIndex = (currentPage.value - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  return sortedExpenses.value.slice(startIndex, endIndex);
});
// Function to go to the previous page
const previousPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
};
const totalPages = computed(() => {
  return Math.ceil(sortedExpenses.value.length / itemsPerPage);
});
const goToPage = (pageNumber) => {
  currentPage.value = pageNumber;
};

// Function to go to the next page
const nextPage = () => {
  const totalPages = Math.ceil(sortedExpenses.value.length / itemsPerPage);
  if (currentPage.value < totalPages) {
    currentPage.value++;
  }
};
// Function to close the edit modal
const closeEditModal = () => {
  editingExpense.value = null;
  fetchExpenses();
};
// Function to close the delete confirmation modal
const cancelDelete = () => {
  deletingExpense.value = null;
  showDeleteConfirmation.value = false;
};
// Function to open the delete confirmation modal
const deleteExpense = (expense) => {
  // Set the expense to be deleted
  deletingExpense.value = expense;
  // Open the delete confirmation modal
  showDeleteConfirmation.value = true;
};
// Function to delete the expense
const deleteConfirmed = async () => {
  if (deletingExpense.value) {
    const { id } = deletingExpense.value;
    try {
      // Use Firebase to delete the expense from Firestore
      await db.collection("expenses").doc(id).delete();
      // Show a success message or perform any other actions if needed
      window.location.reload();
    } catch (error) {
      // Handle the error
      window.alert("Error deleting expense");
    } finally {
      // Close the delete confirmation modal
      showDeleteConfirmation.value = false;
      // Fetch the updated list of expenses (if needed)
      fetchExpenses();
    }
  }
};
const totalAmount = computed(() => {
  return expenses.value.reduce(
    (total, expense) => total + expense.totalAmount,
    0
  );
});
// Function to fetch and populate the expenses list
const fetchExpenses = async () => {
  try {
    const expensesSnapshot = await db.collection("expenses").get();
    expenses.value = expensesSnapshot.docs.map((doc) => doc.data());
    // Filter out undefined or missing 'money' values
    expenseMoney.value = expensesSnapshot.docs
      .map((doc) => doc.data().money)
      .filter((money) => money !== undefined);
  } catch (error) {
    window.alert("Error fetching expenses");
  }
};
const expenseBalance = computed(() => {
  const totalExpenseMoney = expenseMoney.value.reduce(
    (total, money) => total + money,
    0
  );
  return totalExpenseMoney - totalAmount.value;
});
// Function to open the expense registration modal
const openExpensesRegistrationModal = () => {
  // Set showExpensesModal to true to show the modal
  showExpensesModal.value = true;
};
const sortExpenses = () => {
  if (sortColumnRef.value && sortDirection.value) {
    expenses.value.sort((a, b) => {
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

const sortedExpenses = computed(() => {
  // Clone the original expenses array to avoid sorting the original data
  const clonedExpenses = [...expenses.value];
  sortExpenses(clonedExpenses); // Apply sorting to the cloned array
  return clonedExpenses;
});

const sortColumn = (column, direction) => {
  sortColumnRef.value = column;
  sortDirection.value = direction;
};
const closeexpenseModal = () => {
  showExpensesModal.value = false;
  // Fetch the updated list of expenses after a new expense is registered
  fetchExpenses();
};

// Fetch expenses when the component is mounted
onMounted(() => {
  fetchExpenses();
});

watch([searchQuery], () => {
  if (searchQuery.value === "") {
    fetchExpenses();
  }
});
</script>
      