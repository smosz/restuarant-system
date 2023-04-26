<template>
  <navBar />
  <div class="settings">
    <div class="container mx-auto mt-7">
      <div
        class="flex flex-col lg:flex-row w-10/12 lg:w-8/12 bg-white rounded-xl mx-auto shadow-lg overflow-hidden"
      >
        <div class="w-full">
          <main class="flex-grow p-2">
            <div
              class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-2"
            >
              <h2 class="text-center text-3xl font-extrabold text-gray-900 self-center">
                Account Settings
              </h2>
              <Vue3Lottie :animationData="update" :height="150" :width="200" />
            </div>
          </main>
          <div class="border-t border-gray-200">
            <tabs/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import "vue3-lottie/dist/style.css";
import update from "../assets/update.json";
import navBar from "../components/navBar.vue";
import tabs from "../components/tabs.vue";

export default {
  name: "Settings",
  components: {
    navBar,
    update,
    tabs
  },
  setup() {
    return {
      update,
    };
  },
};
</script>
