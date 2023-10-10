<template>
  <div>
    <!-- Search input field -->
    <input
      v-model="productStore.searchQuery"
      v-if="categoryStore.availableCategories.length > 0"
      type="text"
      class="search-input mb-4"
      @keyup.enter="productStore.searchProducts"
      placeholder="Search Products..."
    />
    <!-- Category Slider -->
    <div
    :class="{ 'slider-paused': sliderPaused }"
    class="slider-container"
  @mouseenter="stopSlider"
  @mouseleave="startSlider"
  ref="sliderContainer"
    >
      <div class="slider">
        <div
          v-if="categoryStore.availableCategories.length > 0"
          class="min-w-max border border-gray-300 bg-orange-200 rounded-md p-2 cursor-pointer hover:bg-gray-100 shadow-md mr-4 h-max"
          @click="categoryStore.selectCategory('All')"
          :class="{ 'bg-blue-100': categoryStore.selectedCategory === 'All' }"
        >
          All
        </div>
        <div
          v-for="(category, index) in categoryStore.availableCategories"
          :key="index"
          class="min-w-max border h-max bg-orange-200 border-gray-300 rounded-md p-2 cursor-pointer hover:shadow-black shadow-md mr-4"
          @click="categoryStore.selectCategory(category)"
          :class="{
            'bg-blue-100': categoryStore.selectedCategory === category,
          }"
        >
          {{ category }}
        </div>
      </div>
    </div>

    <!-- Product Display -->
    <div
      class="pdis grid grid-cols-3 gap-2 border bg-black rounded-2xl p-3 max-h-[86rem] overflow-y-auto"
    >
      <div
        v-for="(product, index) in productStore.filteredProducts"
        :key="index"
        class="rounded-lg p-4 relative bg-[#eea2c8]"
        @mouseenter="product.isHovered = true"
        @mouseleave="product.isHovered = false"
      >
        <!-- Product Image (Blurred when hovered) -->
        <div class="relative group m-0 p-0">
          <img
            :src="product.productImage"
            alt="Product Image"
            class="w-full h-auto group-hover:filter-blur-md group-hover:scale-95 transition-transform"
          />
          <!-- Add Icon (Displayed when hovered) -->
          <div
            v-if="product.isHovered"
            @click="productStore.addToCart(product)"
            class="absolute inset-0 flex items-center cursor-pointer justify-center bg-black bg-opacity-50 transition-opacity m-0 p-0"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-16 w-full text-green-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
          </div>
        </div>

        <!-- Product Info -->
        <div class="mt-2">
          <span class="flex space-x-2 justify-between">
            <p class="text-lg text-[#161f36] font-bold">{{ product.sku }}</p>
            <p
              :class="
                product.stockQuantity <= 20
                  ? 'text-sm text-red-500'
                  : 'text-sm text-black'
              "
            >
              {{ product.name }}
            </p>
          </span>
          <span class="flex space-x-2 justify-between items-center">
            <p class="text-lg text-[#161f36] font-bold">
              UGX {{ product.price.toLocaleString() }}
            </p>
            <p v-if="product.stockQuantity > 20" class="text-sm text-black">
              {{ product.stockQuantity }} in Stock
            </p>
            <Vue3Lottie
              v-if="product.stockQuantity <= 20 && product.stockQuantity > 0"
              :animationData="low"
              :height="37"
              :width="30"
            />
            <Vue3Lottie
              v-if="product.stockQuantity === 0"
              :animationData="empty"
              :height="37"
              :width="30"
            />
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { onMounted, watch, ref } from "vue";
import { useCategoryStore } from "../stores/categories.js";
import { useProductStore } from "../stores/products.js";
import low from "../assets/low.json";
import empty from "../assets/empty.json";
const categoryStore = useCategoryStore();
const productStore = useProductStore();
const sliderPaused = ref(false);
const sliderContainer = ref(null);
let isScrolling = false;
let startX = 0;
let scrollLeft = 0;

const stopSlider = () => {
  sliderPaused.value = true;
  
};

const startSlider = () => {
  sliderPaused.value = false;
};
const scrollStart = (e) => {
  // Initialize variables to track the start position
  startX = e.clientX || e.touches[0].clientX;
  scrollLeft = sliderContainer.value.scrollLeft;
  isScrolling = true;

  // Prevent default behavior for touch devices
  if (e.type === "touchstart") {
    e.preventDefault();
  }
};

const scrollMove = (e) => {
  // Return early if scrolling hasn't started
  if (!isScrolling) return;

  // Calculate the new scroll position
  const x = e.clientX || e.touches[0].clientX;
  const scrollX = scrollLeft - (x - startX);

  // Set the new scroll position
  sliderContainer.value.scrollLeft = scrollX;

  // Prevent default behavior for touch devices
  if (e.type === "touchmove") {
    e.preventDefault();
  }
};

const scrollEnd = () => {
  // Stop scrolling
  isScrolling = false;
};
// Watch the searchQuery property
watch(
  () => productStore.searchQuery,
  () => {
    let newSearchQuery = productStore.searchQuery;
    if (newSearchQuery === "") {
      // When the searchQuery becomes empty, trigger the searchProducts action
      productStore.searchProducts();
    }
  }
);
onMounted(async () => {
  try {
    await productStore.fetchProducts(),
      categoryStore.fetchCategories(),
      categoryStore.fetchCategoryNames(),
      categoryStore.fetchAvailableCategories(),
      categoryStore.selectCategory("All");
  } catch (error) {
   window.alert("Error fetching categories");
  }
  const container = sliderContainer.value;

if (container) {
  container.addEventListener("mousedown", scrollStart);
  container.addEventListener("touchstart", scrollStart);
  container.addEventListener("mousemove", scrollMove);
  container.addEventListener("touchmove", scrollMove);
  container.addEventListener("mouseup", scrollEnd);
  container.addEventListener("touchend", scrollEnd);
}
});
// Inside your script setup
</script>