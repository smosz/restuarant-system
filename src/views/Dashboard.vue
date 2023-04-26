<template>
  <div class="dashboard-container">
    <navBar />
    <tabs />
  </div>
</template>

<script>
import navBar from "../components/navBar.vue";
import tabs from "../components/tabs.vue";
export default {
  name: "Dashboard",
  components: { navBar,tabs },
  setup() {},
};
</script>
