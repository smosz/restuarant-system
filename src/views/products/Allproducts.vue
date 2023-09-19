<template>
    <div class="dashboard-container">
      <div>
        <navBar />
      </div>
      
      <div >
        <productList/>
      </div>
      
    </div>
  </template>
  
  <script>
  import navBar from "../../components/navBar.vue";
  import productList from "../../components/productList.vue";

  export default {
    name: "AllProducts",
    components: { navBar,productList  },
    setup() {},
  };
  </script>
  