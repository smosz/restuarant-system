<template>
  <div class="p-4 w-full " v-if="showSalesDataSection">
    <overview />
<latestCus />

  </div>
</template>

<script setup>
import latestCus  from './latestCus.vue'
import overview  from './overview.vue'
const { props } = defineProps(["showSalesDataSection"]);
</script>
