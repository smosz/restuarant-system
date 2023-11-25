<template>
    <transition-group name="sidebar-slide" appear>
      <aside class="sidebar" v-if="isDashSideBarOpen">
        <div class="close-button" >
          <Icon
            icon="tabler:layout-sidebar-right-expand-filled"
            :height="47"
            class="cursor-pointer hover:text-blue-600"
            @click="closeDashSideBar"
          />
        </div>
        <div class="content">
          <h1 class="title">Sales Report</h1>
          <a class="sidebar-link" @click="toggleDataSection" :class="{ 'active-link': isDataSectionActive }">
            <Icon icon="flat-color-icons:sales-performance" class="mr-2"/>
            Sales Data
          </a>
          <a class="sidebar-link" @click="toggleProductDataSection" :class="{ 'active-link': isProductDataSectionActive }">
            <Icon icon="fluent-mdl2:product-variant" class="mr-2"/>
            Inventory Data
          </a>
          <!-- <a class="sidebar-link" @click="toggleAnalyticsSection" :class="{ 'active-link': isAnalyticsSectionActive }">
            <Icon icon="icon-park:chart-graph" class="mr-2"/>
            Analytics
          </a> -->
        </div>
      </aside>
    </transition-group>
  </template>
  
  <script setup>
  import { ref, defineProps, defineEmits } from "vue";
  const isDataSectionActive = ref(false);
  const isProductDataSectionActive = ref(false);
  const isAnalyticsSectionActive = ref(false);
  const props = defineProps({
    isDashSideBarOpen: Boolean,
  });
  
  const emits = defineEmits(["closeDashSideBar", "toggleDataSection","toggleProductDataSection","toggleAnalyticsSection"]);
  
  const toggleDataSection = () => {
    isDataSectionActive.value = true;
    isProductDataSectionActive.value = false;
    isAnalyticsSectionActive.value=false
    emits("toggleDataSection");
  };
  const toggleProductDataSection = () => {
    isDataSectionActive.value = false;
    isProductDataSectionActive.value = true;
    isAnalyticsSectionActive.value=false
    emits("toggleProductDataSection");
  };
  const toggleAnalyticsSection = () => {
    isDataSectionActive.value = false;
    isProductDataSectionActive.value = false;
    isAnalyticsSectionActive.value=true
    emits("toggleAnalyticsSection");
  };
  const closeDashSideBar = () => { 
    emits("closeDashSideBar");
  };
  </script>
  
  <style scoped>
   .sidebar {
  background-color: #2c3e50; /* Sidebar background color */
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2); /* Sidebar box shadow */
  width: 17%;
  z-index: 100;
  display: flex;
  flex-direction: column;
}
  .close-button {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding: 10px;
  }
  
  .close-button:hover {
    cursor: pointer;
  }
  
  .content {
    
    color: #ecf0f1; /* Text color */
    display: flex;
    flex-direction: column;
  }
  
  .active-link {
    background-color: #0e2ee9; /* Set the background color for active links */
    color: #fff; /* Change text color for active links */
  }
  
  .title {
    font-size: 24px;
    font-weight: bold;
    text-align: center;
    margin-top: 10px;
    margin-bottom: 20px;
  }
  
  .sidebar-link {

    cursor: pointer;
    display: flex;
    align-items: center;
    padding: 5px 8px;
    text-decoration: none;
    color: #ecf0f1; /* Link color */
    transition: color 0.2s;
  
  }
  
  .sidebar-link:hover {
    color: #949494; /* Hover color */
  }
  </style>
  