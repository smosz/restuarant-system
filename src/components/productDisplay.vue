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
    <div class="flex  space-x-4 mb-4 flex-wrap ">
      <div
        v-if="categoryStore.availableCategories.length > 0"
        class="border border-gray-300 bg-orange-200 rounded-md p-2 cursor-pointer hover:bg-gray-100 shadow-md  mb-4"
        @click="categoryStore.selectCategory('All')"
        :class="{ 'bg-blue-100': categoryStore.selectedCategory === 'All' }"
      >
        All
      </div>
      <div
        v-for="(category, index) in categoryStore.availableCategories"
        :key="index"
        class="border bg-orange-200 border-gray-300 rounded-md p-2 cursor-pointer hover:shadow-black shadow-md mb-4"
        @click="categoryStore.selectCategory(category)"
        :class="{ 'bg-blue-100': categoryStore.selectedCategory === category }"
      >
        {{ category }}
      </div>
    </div>

    <!-- Product Display -->
    <div class="grid grid-cols-3 gap-2 border bg-black rounded-2xl p-3 max-h-[40rem] overflow-y-auto">
      <div
        v-for="(product, index) in productStore.filteredProducts"
        :key="index"
        class=" rounded-lg p-4  relative bg-[#eea2c8] "
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
            @click="productStore.addToCart(product);"
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
            <p class="text-lg text-[#161f36] font-bold ">{{ product.sku }}</p>
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
            <p class="text-lg text-[#161f36] font-bold">UGX {{ product.price.toLocaleString() }}</p>
            <p v-if="product.stockQuantity > 20" class="text-sm text-black">
              {{ product.stockQuantity }} in Stock
            </p>
            <Vue3Lottie
              v-if="product.stockQuantity <= 20"
              :animationData="low"
              :height="37"
              :width = '30'
            />
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { onMounted, watch } from "vue";
import { useCategoryStore } from "../stores/categories.js";
import { useProductStore } from "../stores/products.js";
import low from "../assets/low.json";

const categoryStore = useCategoryStore();
const productStore = useProductStore();

onMounted(async () => {
  try {
    await productStore.fetchProducts(),
      categoryStore.fetchCategories(),
      categoryStore.fetchCategoryNames(),
      categoryStore.fetchAvailableCategories(),
      categoryStore.selectCategory("All");
  } catch (error) {
    console.error("Error fetching categories:", error);
  }
});

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

// Inside your script setup
</script>