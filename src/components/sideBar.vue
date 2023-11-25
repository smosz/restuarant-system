<template>
    <transition-group name="sidebar-slide" appear>
      <aside class="sidebar" v-if="isSidebarOpen">
        <div class="close-button" >
          <Icon
            icon="tabler:layout-sidebar-right-expand-filled"
            :height="47"
            class="cursor-pointer hover:text-blue-600"
            @click="closeSidebar"
          />
        </div>
        <div class="content">
          <h1 class="title">Product Report</h1>
          <a class="sidebar-link" @click="toggleListSection" :class="{ 'active-link': isListSectionActive }">
            <Icon icon="icon-park:view-list" class="mr-2"/>
            Product List
          </a>
          <a class="sidebar-link" @click="toggleReportSection" :class="{ 'active-link': isReportSectionActive }"><Icon icon="flat-color-icons:shop" class="mr-2"/>Stock Managment</a>
          <a class="sidebar-link" @click="toggleAddSection" :class="{ 'active-link': isAddSectionActive }"><Icon icon="system-uicons:box-add" class="mr-2"/> Addition History</a>
        </div>
      </aside>
    </transition-group>
  </template>
  
  <script setup>
  import { ref, defineProps, defineEmits } from "vue";
  const isListSectionActive = ref(false);
const isReportSectionActive = ref(false);
const isAddSectionActive = ref(false);

  const props = defineProps({
    isSidebarOpen: Boolean,
  });
  
  const emits = defineEmits(["closeSidebar", "toggleListSection", "toggleReportSection","toggleAddSection"]);
  
  const toggleListSection = () => {
    isListSectionActive.value = true;
  isReportSectionActive.value = false;
  isAddSectionActive.value = false;
    emits("toggleListSection");
  };
  
  const toggleReportSection = () => {
    isReportSectionActive.value = true;
  isListSectionActive.value = false;
  isAddSectionActive.value = false;
    emits("toggleReportSection");
  };
  const toggleAddSection = () => {
    isAddSectionActive.value = true;
    isReportSectionActive.value = false;
  isListSectionActive.value = false;
    emits("toggleAddSection");
  };
  const closeSidebar = () => {
    emits("closeSidebar");
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
  