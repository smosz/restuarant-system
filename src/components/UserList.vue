<template>
  <div class="bgColor">
    <div class="max-w-screen-lg mx-auto py-6">
      <div class="bg-white rounded-lg shadow-lg p-6 tab">
        <div class="flex justify-between items-center mb-4 no-print">
          <h2 class="text-2xl font-semibold">User List</h2>
          <button
            @click="openUserRegistrationModal"
            class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            <div class="flex items-center">
              <Icon icon="majesticons:plus-line" />
              <span class="pl-2">Register User</span>
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
              @keyup.enter="searchUsers"
              placeholder="Search users..."
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
          id="User-table"
          class="min-w-full border-collapse border border-gray-300"
        >
          <!-- Table header -->
          <thead>
            <tr>
              <th
                class=" py-3 bg-gray-200 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                <div class="flex items-center justify-center">
                  <span>Username</span>
                </div>
              </th>
              <th
                class=" py-3 bg-gray-200 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                <div class="flex items-center justify-center">
                  <span>User Email</span>
                </div>
              </th>
              <th
                class=" py-3 bg-gray-200 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                <div class="flex items-center justify-center">
                  <span>Gender</span>
                </div>
              </th>
              <th
                class=" py-3 bg-gray-200 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                <div class="flex items-center justify-center">
                  <span>Phone Number</span>
                </div>
              </th>
              <!-- <th
                class=" py-3 bg-gray-200 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                <div class="flex items-center justify-center">
                  <span>Password</span>
                </div>
              </th> -->
              <th
                class=" py-3 bg-gray-200 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                <div class="flex items-center justify-center">
                  <span>Role</span>
                </div>
              </th>
              <th
                class=" py-3 bg-gray-200 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                <div class="flex items-center justify-center">
                  <span>Last Login</span>
                </div>
              </th>
              <th
                class=" py-3 bg-gray-200 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                <div class="flex items-center justify-center">
                  <span>Last Signout</span>
                </div>
              </th>
              <th
                class=" py-3 bg-gray-200 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                <div class="flex items-center justify-center">
                  <span>Status</span>
                </div>
              </th>
              
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="user in paginatedUsers"
              :key="user.id"
              class="text-center"
            >
              <td class=" py-4 border border-gray-300">
                {{ user.Username }}
              </td>
              <td class=" py-4 border border-gray-300">
                {{ user.Email }}
              </td>
              <td class=" py-4 border border-gray-300">
                {{ user.Gender }}
              </td>
              <td class=" py-4 border border-gray-300">
                {{ user.Phone_Number }}
              </td>
              <!-- <td class=" py-4 border border-gray-300">
                {{ user.Password }}
              </td> -->
              <td class=" py-4 border border-gray-300">
                {{ user.Role }}
              </td>
              <td class=" py-4 border border-gray-300">
                {{ user.lastLogin }}
              </td>
              <td class=" py-4 border border-gray-300">
                {{ user.lastSignOut }}
              </td>
              <td class=" py-4 border border-gray-300">
                <el-tooltip :content="'Switch user status: ' + user.status" placement="top">
            <el-switch
              v-model="user.status"
              :active-value="'enabled'"
      :inactive-value="'disabled'"
      active-color="#13ce66"
      inactive-color="#ff4949"
              @change="updateUserStatus(user.id, user.status)"
            >
            </el-switch>
          </el-tooltip>
          
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
            :disabled="currentPage * itemsPerPage >= users.length"
            class="px-3 py-[10px] ml-[25px] bg-blue-500 no-print text-white hover:bg-blue-700 rounded-md cursor-pointer"
          >
            Next
          </button>
        </div>
        <div class="mt-2 text-center no-print">
          Total users: {{ users.length }}
        </div>
      </div>
    </div>

    <Signup v-if="showUserModal" @close="closeUserModal" />
  </div>
</template>

  
  <script setup>
import { ref, onMounted, watch, computed } from "vue";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";

import Signup from "../views/Signup.vue";

import jsPDF from "jspdf";
import "jspdf-autotable";
import * as XLSX from "xlsx";

// Control the visibility of the User registration modal
const showUserModal = ref(false);
// Define the Firestore database reference
const db = firebase.firestore();
// Define pagination state
const currentPage = ref(1); // Current page
const itemsPerPage = 5; // description of items to display per page
const searchQuery = ref("");
// Define a ref to store the list of users
const users = ref([]);
// Method to export the table content to PDF
const exportToPDF = () => {
  // Create a new jsPDF instance
  const pdf = new jsPDF();

  // Define columns for the table
  const columns = ["User Name", "User description"];

  // Define the rows of the table by mapping over your User data
  const rows = users.value.map((User) => [User.name, User.description]);

  // Set the title for the PDF
  pdf.setFontSize(16);
  pdf.text("User List", 10, 10);

  // AutoTable is a jsPDF plugin for creating tables
  pdf.autoTable({
    head: [columns],
    body: rows,
  });

  // Save the PDF with a filename
  pdf.save("User-list.pdf");
};

const exportToExcel = () => {
  // Check if 'users' is an array
  if (!Array.isArray(users.value)) {
    window.alert("users is not an array.");
    return;
  }

  // Create a new workbook
  const workbook = XLSX.utils.book_new();

  // Create a worksheet and add data to it
  const worksheet = XLSX.utils.aoa_to_sheet([
    ["User Name", "User description"],
    // Map your User data to rows here
    ...users.value.map((User) => [User.name, User.description]),
  ]);

  // Add the worksheet to the workbook
  XLSX.utils.book_append_sheet(workbook, worksheet, "User List");
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
  a.download = "User-list.xlsx";
  a.click();

  // Clean up the URL.createObjectURL
  window.URL.revokeObjectURL(url);
};
const printTable = () => {
  // Trigger the browser's print dialog
  window.print();
};

const searchUsers = () => {
  if (searchQuery.value.trim() === "") {
    // Reset the User list if the search query is empty
    fetchUsersData();
  } else {
    // Filter users based on the search query
    const query = searchQuery.value.toLowerCase().trim();
    users.value = users.value.filter((user) => {
      const UserName = user.name.toLowerCase();
      return UserName.includes(query);
    });
  }
};
// Method to update the user's status (enabled/disabled)
const updateUserStatus = async (userId, currentStatus) => {
  try {
    const userRef = db.collection("users").doc(userId);

    // Toggle the user's status()
    if(currentStatus==='enabled'){
      const newStatus = 'enabled' ;
      await userRef.update({ status: newStatus });
    }else if(currentStatus==='disabled'){
      const newStatus = 'disabled' ;
      await userRef.update({ status: newStatus });
    }
  } catch (error) {
    console.error("Error updating user status", error);
  }
};


//Create a computed property that returns the users to display on the current page:
const paginatedUsers = computed(() => {
  const startIndex = (currentPage.value - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  return users.value.slice(startIndex, endIndex);
});
// Function to go to the previous page
const previousPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
};
const totalPages = computed(() => {
  return Math.ceil(users.value.length / itemsPerPage);
});
const goToPage = (pageNumber) => {
  currentPage.value = pageNumber;
};
const userId = ref("");
// Function to go to the next page
const nextPage = () => {
  const totalPages = Math.ceil(users.length / itemsPerPage);
  if (currentPage.value < totalPages) {
    currentPage.value++;
  }
};
const fetchUsersData = async () => {
  try {
    const usersSnapshot = await db.collection("users").get();
    users.value = usersSnapshot.docs.map((doc) => {
      const userData = doc.data();
      console.log(userData)
      return {
        ...userData, 
      };
    });
  } catch (error) {
    // Handle any errors that occur during the fetch
    window.alert("Error fetching users");
    throw error; // Optionally rethrow the error for the component to handle
  }
};


// Function to open the User registration modal
const openUserRegistrationModal = () => {
  // Set showUserModal to true to show the modal
  showUserModal.value = true;
};

// Fetch users when the component is mounted
onMounted(() => {
  firebase.auth().onAuthStateChanged(async (firebaseUser) => {
    userId.value = firebaseUser.uid;
  });
  fetchUsersData();
});

watch([searchQuery], () => {
  if (searchQuery.value === "") {
    fetchUsersData();
  }
});
</script>
  