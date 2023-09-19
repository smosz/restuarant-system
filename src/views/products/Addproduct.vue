<template>
    <div class="dashboard-container">
      <navBar />
<productsForm/>
    </div>
  </template>
  
  <script>
  import navBar from "../../components/navBar.vue";
  import productsForm from "../../components/productsForm.vue";
  export default {
    name: "Addproduct",
    components: { navBar,productsForm },
    setup() {},
  };
  </script>
  