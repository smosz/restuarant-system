<template>
    <div class="dashboard-container">
      <navBar />
      <categoryList/>
    </div>
  </template>
  
  <script>
  import navBar from "../../components/navBar.vue";
  import categoryList from "../../components/categoryList.vue";
  export default {
    name: "Categories",
    components: { navBar,categoryList },
    setup() {},
  };
  </script>
  