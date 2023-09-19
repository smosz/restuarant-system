<template>
    <div class="dashboard-container">
      <navBar />
      <customerList />
    </div>
  </template>
  
  <script>
  import navBar from "../components/navBar.vue";
  import customerList from "../components/customerList.vue";

  export default {
    name: "Customers",
    components: { navBar,customerList  },
    setup() {},
  };
  </script>