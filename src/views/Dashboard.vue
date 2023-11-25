<template>
  <div class="dashboard-container">
    <div>
      <navBar />
    </div>

    <div class="flex">
      <dashSideBar
        :isDashSideBarOpen="isDashSideBarOpen"
        @closeDashSideBar="closeDashSideBar"
        @toggleDataSection="toggleDataSection" 
        @toggleProductDataSection="toggleProductDataSection" 
        @toggleAnalyticsSection="toggleAnalyticsSection"
      />
      <Icon
        icon="tabler:layout-sidebar-left-expand-filled"
        :height="47"
        class="cursor-pointer z-0"
        @click="toggleDashSideBar"
        v-if="closIcon"
      />
      
      <salesData :showSalesDataSection="showSalesDataSection" :visible="showSalesDataSection" />
      <productData :showProductDataSection="showProductDataSection" :visible="showProductDataSection" />
      <analytics :showAnalyticsSection="showAnalyticsSection" :visible="showAnalyticsSection" />
    </div>
  </div>
</template>

<script setup>
import navBar from "../components/navBar.vue";
import salesData from "../components/salesData.vue";
import analytics from "../components/analytics.vue";
import productData from "../components/productData.vue";
import dashSideBar from "../components/dashSideBar.vue";
import { ref } from "vue";

// Data property to control the visibility of the "List" section
const showSalesDataSection = ref(true);
const showProductDataSection = ref(false);
const showAnalyticsSection =ref(false);
// Define a reactive variable to track the dashSideBar state
const isDashSideBarOpen = ref(false);
const closIcon = ref(true);

// Method to toggle the dashSideBar state
const toggleDashSideBar = () => {
  isDashSideBarOpen.value = !isDashSideBarOpen.value;
  closIcon.value = !closIcon.value;
};

// Method to close the dashSideBar and show the icon
const closeDashSideBar = () => {
  isDashSideBarOpen.value = false;
  closIcon.value = true;

};

// Event handlers for toggling sections
const toggleDataSection = () => {
  showSalesDataSection.value = true;
  showProductDataSection.value = false;
  showAnalyticsSection.value=false
};
const toggleProductDataSection = () => {
  showProductDataSection.value = true;
  showSalesDataSection.value = false;
  showAnalyticsSection.value=false
};
const toggleAnalyticsSection = () => {
  showAnalyticsSection.value=true
  showProductDataSection.value = false;
  showSalesDataSection.value = false;

};

</script>
