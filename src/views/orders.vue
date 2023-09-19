<template>
    <div class="dashboard-container">
      <navBar />
      <ordersTable />
    </div>
  </template>
  
  <script>
  import navBar from "../components/navBar.vue";
  import ordersTable from "../components/ordersTable.vue";
  export default {
    name: "Orders",
    components: { navBar,ordersTable },
    setup() {},
  };
  </script>