<template>
  <div>
    <!-- Search input field -->
    <input v-model="productStore.searchQuery" v-if="categoryStore.availableCategories.length > 0" type="text"
<<<<<<< HEAD
      class="search-input mb-4" @keyup.enter="productStore.searchProducts" placeholder="Search Products..." />
=======
      class="search-input mb-4 uppercase" @keyup.enter="productStore.searchProducts" placeholder="Search Products..." />
>>>>>>> 9156ac0f0df5aac935aeb34399cac8c28282e2f6
    <!-- Category Slider -->
    <div class="flex">
      <!-- Navigate to the left -->
      <div v-if="visibleCategoriesIndex > 0"
        @click="slideCategoriesLeft"
        class="min-w-max border border-gray-300  rounded-md p-2 z-10 bg-blue-100 cursor-pointer hover:bg-gray-100 shadow-md  h-max">
        <svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 16 16" viewBox="0 0 16 16" width="20"
          height="24">
          <polyline fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10"
            points="7.5 10.5 7.5 14.5 .5 8 7.5 1.5 7.5 5.5 15.5 5.5 15.5 10.5 9.5 10.5" display="none"></polyline>
          <path
            d="M7.5,1c0.1,0,0.1,0,0.2,0C7.9,1.1,8,1.3,8,1.5V5h7.5C15.8,5,16,5.2,16,5.5v5c0,0.3-0.2,0.5-0.5,0.5h-6
			C9.2,11,9,10.8,9,10.5S9.2,10,9.5,10H15V6H7.5C7.2,6,7,5.8,7,5.5V2.6L1.2,8L7,13.4v-2.9C7,10.2,7.2,10,7.5,10S8,10.2,8,10.5v4
			c0,0.2-0.1,0.4-0.3,0.5c-0.2,0.1-0.4,0-0.5-0.1l-7-6.5C0.1,8.3,0,8.1,0,8c0-0.1,0.1-0.3,0.2-0.4l7-6.5C7.3,1,7.4,1,7.5,1z"
            display="none" fill="#000000" class="color000 svgShape"></path>
          <polygon fill="#f9c00c" points="7.5 5.5 7.5 3.5 1.6 9 7.5 14.5 7.5 10.5 15.5 10.5 15.5 5.5"
            class="colorf9c00c svgShape"></polygon>
          <path fill="#3e3643" d="M0,8c0,0.1,0.1,0.3,0.2,0.4l7,6.5C7.3,15,7.5,15,7.7,15C7.9,14.9,8,14.7,8,14.5v-4C8,10.2,7.8,10,7.5,10
				S7,10.2,7,10.5v2.9L1.2,8L7,2.6v2.9C7,5.8,7.2,6,7.5,6H15v4H9.5C9.2,10,9,10.2,9,10.5S9.2,11,9.5,11h6c0.3,0,0.5-0.2,0.5-0.5v-5
				C16,5.2,15.8,5,15.5,5H8V1.5C8,1.3,7.9,1.1,7.7,1C7.5,1,7.3,1,7.2,1.1l-7,6.5C0.1,7.7,0,7.9,0,8z"
            class="color3e3643 svgShape"></path>
        </svg>

      </div>
      <div v-if="categoryStore.availableCategories.length > 0"
        class="min-w-max border border-gray-300  rounded-md p-2 z-10 cursor-pointer hover:bg-gray-100 shadow-md mr-4 h-max"
        @click="categoryStore.selectCategory('All')"
        :class="{ 'bg-blue-100': categoryStore.selectedCategory === 'All', 'bg-orange-200': categoryStore.selectedCategory != 'All' }">

        ALL

      </div>
      <div class="flex overflow-hidden">

        <div v-for="(category, index) in visibleCategories" :key="index"
          class="min-w-max border h-max  border-gray-300 rounded-md p-2 cursor-pointer hover:shadow-black shadow-md mr-4"
          @click="categoryStore.selectCategory(category)" :class="{
            'bg-blue-100': categoryStore.selectedCategory === category, 'bg-orange-200': categoryStore.selectedCategory != category,
          }">
          {{ category }}
        </div>
      </div>
      <!-- Navigate to the right -->
      <div v-if="visibleCategoriesIndex < categoryStore.availableCategories.length - categoriesPerPage" 
        @click="slideCategoriesRight"
        class="min-w-max border border-gray-300  rounded-md p-2 z-10 bg-blue-100 cursor-pointer hover:bg-gray-100 shadow-md  h-max">

        <svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 16 16" viewBox="0 0 16 16" width="20"
          height="24">
          <polyline fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10"
            points="8.5 5.5 8.5 1.5 15.5 8 8.5 14.5 8.5 10.5 .5 10.5 .5 5.5 6.5 5.5" display="none"></polyline>
          <path d="M8.5,15c-0.1,0-0.1,0-0.2,0C8.1,14.9,8,14.7,8,14.5V11H0.5C0.2,11,0,10.8,0,10.5v-5C0,5.2,0.2,5,0.5,5h6
			C6.8,5,7,5.2,7,5.5S6.8,6,6.5,6H1v4h7.5C8.8,10,9,10.2,9,10.5v2.9L14.8,8L9,2.6v2.9C9,5.8,8.8,6,8.5,6S8,5.8,8,5.5v-4
			C8,1.3,8.1,1.1,8.3,1C8.5,1,8.7,1,8.8,1.1l7,6.5C15.9,7.7,16,7.9,16,8s-0.1,0.3-0.2,0.4l-7,6.5C8.7,15,8.6,15,8.5,15z"
            display="none" fill="#000000" class="color000 svgShape"></path>
          <polygon fill="#f9c00c" points="8.5 12.5 14.4 7 8.5 1.5 8.5 5.5 .5 5.5 .5 10.5 8.5 10.5"
            class="colorf9c00c svgShape"></polygon>
          <path fill="#3e3643" d="M8.5,15c-0.1,0-0.1,0-0.2,0C8.1,14.9,8,14.7,8,14.5V11H0.5C0.2,11,0,10.8,0,10.5v-5C0,5.2,0.2,5,0.5,5h6
				C6.8,5,7,5.2,7,5.5S6.8,6,6.5,6H1v4h7.5C8.8,10,9,10.2,9,10.5v2.9L14.8,8L9,2.6v2.9C9,5.8,8.8,6,8.5,6S8,5.8,8,5.5v-4
				C8,1.3,8.1,1.1,8.3,1C8.5,1,8.7,1,8.8,1.1l7,6.5C15.9,7.7,16,7.9,16,8s-0.1,0.3-0.2,0.4l-7,6.5C8.7,15,8.6,15,8.5,15z"
            class="color3e3643 svgShape"></path>
        </svg>


      </div>
    </div>

    <!-- Product Display -->
    <div class="pdis grid grid-cols-3 gap-2 border bg-black rounded-2xl p-3 max-h-[86rem] overflow-y-auto">
      <div v-for="(product, index) in productStore.filteredProducts" :key="index"
        class="rounded-lg p-4 relative bg-[#eea2c8] " @mouseenter="product.isHovered = true"
        @mouseleave="product.isHovered = false">
        <!-- Product Image (Blurred when hovered) -->
        <div class="relative group m-0 p-0 flex justify-center">
          <img :src="product.productImage" alt="Product Image"
  class=" max-h-48 h-auto group-hover:filter-blur-md group-hover:scale-95 transition-transform" />

          <!-- Add Icon (Displayed when hovered) -->
          <div v-if="product.isHovered" @click="productStore.addToCart(product)"
            class="absolute inset-0 flex items-center cursor-pointer justify-center bg-black bg-opacity-50 transition-opacity m-0 p-0">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-full text-green-500" fill="none" viewBox="0 0 24 24"
              stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </div>
        </div>
        
        <!-- Product Info -->
        <div class="mt-2">
          <span >
            <p class="text-base text-[#161f36] font-bold">{{ product.name }}</p>
            
          </span>
          <span class="flex space-x-2 justify-between items-center">
            <p :class="product.stockQuantity <= 20
              ? 'text-sm text-red-500'
              : 'text-sm text-black'
              ">
              {{ product.sku }}

            </p>
            <p class="text-lg text-[green] font-bold">
              UGX {{ product.price.toLocaleString() }}
            </p>
           
          </span>
          <span>
            <p v-if="product.stockQuantity > 20" class="text-sm text-[teal] font-semibold font-['cursive']">
              {{ product.stockQuantity }} in Stock
            </p>
            <Vue3Lottie v-if="product.stockQuantity <= 20 && product.stockQuantity > 0" :animationData="low" :height="37"
              :width="30" />
            <Vue3Lottie v-if="product.stockQuantity === 0" :animationData="empty" :height="37" :width="30" />
          </span>
        </div>
      </div>
    </div>

  </div>
</template>
<script setup>
import { onMounted, watch, ref,computed } from "vue";
import { useCategoryStore } from "../stores/categories.js";
import { useProductStore } from "../stores/products.js";
import low from "../assets/low.json";
import empty from "../assets/empty.json";
const categoryStore = useCategoryStore();
const productStore = useProductStore();
const visibleCategoriesIndex = ref(0); // Initialize with 0
const categoriesPerPage = 5;
const visibleCategories = computed(() => {
  const start = visibleCategoriesIndex.value;
  const end = start + categoriesPerPage;
  return categoryStore.availableCategories.slice(start, end);
});
const slideCategoriesLeft = () => {
  if (visibleCategoriesIndex.value > 0) {
    visibleCategoriesIndex.value -= 4;
<<<<<<< HEAD
  }
};

const slideCategoriesRight = () => {
  const lastVisibleIndex = categoryStore.availableCategories.length - categoriesPerPage;
  if (visibleCategoriesIndex.value < lastVisibleIndex) {
    visibleCategoriesIndex.value += 4;
  }
};
=======
  }
};
const slideCategoriesRight = () => {
  const lastVisibleIndex = categoryStore.availableCategories.length - categoriesPerPage;
  if (visibleCategoriesIndex.value < lastVisibleIndex) {
    visibleCategoriesIndex.value += 4;
  }
};

>>>>>>> 9156ac0f0df5aac935aeb34399cac8c28282e2f6
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
<<<<<<< HEAD
    window.alert("Error fetching categories");
=======
    window.alert("Error fetching Data");
>>>>>>> 9156ac0f0df5aac935aeb34399cac8c28282e2f6
  }
});
// Inside your script setup
</script>