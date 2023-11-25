<template>
  <div class="dashboard-container">
    <div>
      <navBar />
    </div>

    <div class="flex">
      <sideBar
        :isSidebarOpen="isSidebarOpen"
        @closeSidebar="closeSidebar"
        @toggleListSection="toggleListSection" 
        @toggleReportSection="toggleReportSection" 
        @toggleAddSection="toggleAddSection" 
      />
      <Icon
        icon="tabler:layout-sidebar-left-expand-filled"
        :height="47"
        class="cursor-pointer z-0"
        @click="toggleSidebar"
        v-if="closIcon"
      />
      
      <productList :showListSection="showListSection" :visible="showListSection" />
      <report :showReportSection="showReportSection" :visible="showReportSection" />
      <addHistory :showAddsection="showAddsection" :visible="showAddsection" />
    </div>
  </div>
</template>

<script setup>
import navBar from "../../components/navBar.vue";
import productList from "../../components/productList.vue";
import report from "../../components/report.vue";
import addHistory from "../../components/addHistory.vue";
import sideBar from "../../components/sideBar.vue";
import { ref } from "vue";

// Data property to control the visibility of the "List" section
const showListSection = ref(true);
const showReportSection = ref(false);
const showAddsection = ref(false);
// Define a reactive variable to track the sidebar state
const isSidebarOpen = ref(false);
const closIcon = ref(true);

// Method to toggle the sidebar state
const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value;
  closIcon.value = !closIcon.value;
};

// Method to close the sidebar and show the icon
const closeSidebar = () => {
  isSidebarOpen.value = false;
  closIcon.value = true;

};

// Event handlers for toggling sections
const toggleListSection = () => {
  showListSection.value = true;
  showReportSection.value = false; // Hide the Report section
  showAddsection.value = false;
};

const toggleReportSection = () => {
  showReportSection.value = true;
  showListSection.value = false; // Hide the List section
  showAddsection.value = false;

};
const toggleAddSection = () => {
  showAddsection.value = true;
  showListSection.value = false; // Hide the List section
  showReportSection.value = false;
};
</script>
