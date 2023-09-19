<template>
    <div class="dashboard-container">
      <navBar />
      <div class="flex bg-gradient-to-r from-purple-200 to-blue-200">
<productDisplay class="pl-4 pt-4  h-screen w-[64%]"/>
  <addCat/>
      </div>
    </div>
  </template>
  
  <script setup>
  import navBar from "../components/navBar.vue";
  import productDisplay from "../components/productDisplay.vue";
  import addCat from "../components/addCat.vue";
  
  </script>