<template>
    <div class="dashboard-container">
      <navBar />
      <userList />
    </div>
  </template>
  
  <script>
  import navBar from "../components/navBar.vue";
  import userList from "../components/userList.vue";


  export default {
    name: "Users",
    components: { navBar,userList  },
    setup() {},
  };
  </script>