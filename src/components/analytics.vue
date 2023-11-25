<template>
    <div class="p-4 w-full" v-if="showAnalyticsSection">
  hello analytics
    </div>
  </template>
  
  <script setup>
  const { props } = defineProps(["showAnalyticsSection"]);
  </script>
  