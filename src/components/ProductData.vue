<template>
    <div class="p-4 w-full" v-if="showProductDataSection">
      <overviewProducts />
<latestProducts />
    </div>
  </template>
  
  <script setup>
  import latestProducts  from './latestProducts.vue'
import overviewProducts  from './overviewProducts.vue'
  const { props } = defineProps(["showProductDataSection"]);
  </script>
  