<template>
    <div class="dashboard-container">
      <navBar />
      <userRoles />
    </div>
  </template>
  
  <script>
  import navBar from "../components/navBar.vue";
  import userRoles from "../components/userRoles.vue";

  export default {
    name: "Roles",
    components: { navBar,userRoles  },
    setup() {},
  };
  </script>