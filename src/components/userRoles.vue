<template>
  <div class="bgColor">
    <div class="max-w-screen-lg mx-auto py-6">
      <div class="bg-white rounded-lg shadow-lg p-6 tab">
        <div class="flex justify-between items-center mb-4 no-print">
          <h2 class="text-2xl font-semibold">Role List</h2>
          <button
            @click="openRoleRegistrationModal"
            class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            <div class="flex items-center">
              <Icon icon="majesticons:plus-line" />
              <span class="pl-2">Register Role</span>
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
              @keyup.enter="searchroles"
              placeholder="Search roles..."
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


        <table id="Role-table" class="min-w-full border-collapse border border-gray-300">
          <!-- Table header -->
          <thead>
            <tr>
              <th
                class="px-6 py-3 bg-gray-200 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                <div class="flex items-center justify-center">
                  <span>Role Name</span>
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
                  <span>Role description</span>
                  <span class="ml-2 no-print">
                    <Icon
                      icon="fa6-solid:sort-up"
                      class="mx-1 mb-[-8px] w-5 text-lg hover:text-blue-500 cursor-pointer"
                      @click="sortColumn('description', 'asc')"
                    />
                    <Icon
                      icon="fa6-solid:sort-down"
                      class="mx-1 mb-0 w-5 text-lg hover:text-blue-500 cursor-pointer"
                      @click="sortColumn('description', 'desc')"
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
            <tr v-for="role in paginatedRoles" :key="role.uid">
              <td class="px-6 py-4 border border-gray-300">
                {{ role.name }}
              </td>
              <td class="px-6 py-4 border border-gray-300">
                {{ role.description }}
              </td>
              <td class="no-print py-4 border border-gray-300">
                <div class="flex space-x-2 justify-center">
                  <button
                    @click="openEditModal(role)"
                    class="text-blue-500 hover:text-blue-700 px-3 py-1 underline"
                  >
                    Edit
                  </button>
                  <button
                    @click="deleteRole(role)"
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
          <!-- Display page Numbers -->
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
            :disabled="currentPage * itemsPerPage >= sortedRoles.length"
            class="px-3 py-[10px] ml-[25px] bg-blue-500 no-print text-white hover:bg-blue-700 rounded-md cursor-pointer"
          >
            Next
          </button>
        </div>
        <div class="mt-2 text-center no-print">
          Total roles: {{ sortedRoles.length }}
        </div>
      </div>
    </div>

    <userRoleModal v-if="showRoleModal" @close="closeRoleModal" />
    <!-- Use the EditRoleModal component with a prop -->
    <editRoleModal
      :editingRole="editingRole"
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
import userRoleModal from "./userRoleModal.vue";
import jsPDF from "jspdf";
import "jspdf-autotable";
import * as XLSX from "xlsx";
import deleteConfirmationModal from "../components/deleteConfirmationModal.vue";
import editRoleModal from "../components/editRoleModal .vue";
// Control the visibility of the Role registration modal
const showRoleModal = ref(false);
// Define a ref to store the list of roles
const roles = ref([]);

// Define a ref to control the visibility of the delete confirmation modal
const showDeleteConfirmation = ref(false);
const sortColumnRef = ref(null);
const sortDirection = ref("asc"); // Default sorting direction
// Define a ref to store the Role being deleted
const deletingRole = ref(null);
// Define the Firestore database reference
const db = firebase.firestore();
// Define pagination state
const currentPage = ref(1); // Current page
const itemsPerPage = 5; // description of items to display per page
const searchQuery = ref("");

// Define a ref to track the Role being edited
const editingRole = ref(null);
// Method to export the table content to PDF
const exportToPDF = () => {
  // Create a new jsPDF instance
  const pdf = new jsPDF();

  // Define columns for the table
  const columns = [

    "Role Name",
    "Role description",
    
  ];

  // Define the rows of the table by mapping over your Role data
  const rows = roles.value.map((role) => [

    role.name,
    role.description,

  ]);

  // Set the title for the PDF
  pdf.setFontSize(16);
  pdf.text("Role List", 10, 10);

  // AutoTable is a jsPDF plugin for creating tables
  pdf.autoTable({
    head: [columns],
    body: rows,
  });

  // Save the PDF with a filename
  pdf.save("Role-list.pdf");
};

const exportToExcel = () => {
  // Check if 'roles' is an array
  if (!Array.isArray(roles.value)) {
    console.error("roles is not an array.");
    return;
  }

  // Create a new workbook
  const workbook = XLSX.utils.book_new();

  // Create a worksheet and add data to it
  const worksheet = XLSX.utils.aoa_to_sheet([
    [
     
    "Role Name",
    "Role description",
    ],
    // Map your Role data to rows here
    ...roles.value.map((role) => [
    role.name,
    role.description,
    ]),
  ]);

  // Add the worksheet to the workbook
  XLSX.utils.book_append_sheet(workbook, worksheet, "Role List");
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
  a.download = "Role-list.xlsx";
  a.click();

  // Clean up the URL.createObjectURL
  window.URL.revokeObjectURL(url);
};
const printTable = () => {
  // Trigger the browser's print dialog
  window.print();
};
const openEditModal = (role) => {
 
  editingRole.value = { ...role };
};

const searchroles = () => {
  if (searchQuery.value.trim() === "") {
    // Reset the Role list if the search query is empty
    fetchroles();
  } else {
    // Filter roles based on the search query
    const query = searchQuery.value.toLowerCase().trim();
    roles.value = sortedRoles.value.filter((role) => {
      const roleName = role.name.toLowerCase();
      return roleName.includes(query);
    });
  }
};

//Create a computed property that returns the roles to display on the current page:
const paginatedRoles = computed(() => {
  sortroles(); // Apply sorting to the entire list
  const startIndex = (currentPage.value - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  return sortedRoles.value.slice(startIndex, endIndex);
});
// Function to go to the previous page
const previousPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
};
const totalPages = computed(() => {
  return Math.ceil(sortedRoles.value.length / itemsPerPage);
});
const goToPage = (pageNumber) => {
  currentPage.value = pageNumber;
};

// Function to go to the next page
const nextPage = () => {
  const totalPages = Math.ceil(sortedRoles.value.length / itemsPerPage);
  if (currentPage.value < totalPages) {
    currentPage.value++;
  }
};
// Function to close the edit modal
const closeEditModal = () => {
  editingRole.value = null;
  fetchroles();
};
// Function to close the delete confirmation modal
const cancelDelete = () => {
  deletingRole.value = null;
  showDeleteConfirmation.value = false;
};
// Function to open the delete confirmation modal
const deleteRole = (role) => {
  // Set the Role to be deleted
  deletingRole.value = role;
  // Open the delete confirmation modal
  showDeleteConfirmation.value = true;
};
// Function to delete the Role
const deleteConfirmed = async () => {
  if (deletingRole.value) {
    const { id } = deletingRole.value;
    try {
      // Use Firebase to delete the Role from Firestore
      await db.collection("roles").doc(id).delete();
      // Show a success message or perform any other actions if needed
      console.log("Role deleted successfully");
    } catch (error) {
      // Handle the error
      console.error("Error deleting Role:", error);
    } finally {
      // Close the delete confirmation modal
      showDeleteConfirmation.value = false;
      // Fetch the updated list of roles (if needed)
      fetchroles();
    }
  }
};

// Function to fetch and populate the roles list
const fetchroles = async () => {
  try {
    const rolesSnapshot = await db.collection("roles").get();
    roles.value = rolesSnapshot.docs.map((doc) => doc.data())
  } catch (error) {
    console.error("Error fetching roles:", error);
  }
};

// Function to open the Role registration modal
const openRoleRegistrationModal = () => {
  // Set showRoleModal to true to show the modal
  showRoleModal.value = true;
};
const sortroles = () => {
  if (sortColumnRef.value && sortDirection.value) {
    roles.value.sort((a, b) => {
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

const sortedRoles = computed(() => {
  // Clone the original roles array to avoid sorting the original data
  const clonedroles = [...roles.value];
  sortroles(clonedroles); // Apply sorting to the cloned array
  return clonedroles;
});

const sortColumn = (column, direction) => {
  sortColumnRef.value = column;
  sortDirection.value = direction;
};
const closeRoleModal = () => {
  showRoleModal.value = false;
  // Fetch the updated list of roles after a new Role is registered
  fetchroles();
};
// Fetch roles when the component is mounted
onMounted(() => {
  fetchroles();
});

watch([searchQuery], () => {
  if (
   searchQuery.value === ""
  ) {
    fetchroles();
  }
});
</script>
  