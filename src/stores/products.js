import { defineStore } from 'pinia';
import { useCategoryStore } from './categories.js';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

const db = firebase.firestore();

// Retrieve the cart data from localStorage, if available
const initialCart = JSON.parse(localStorage.getItem('cart')) || [];

export const useProductStore = defineStore('product', {
  state: () => ({
    products: [],
    searchQuery: "",
    cart: initialCart, // Initialize the cart with the retrieved data
  }),
  getters: {
    // Define the type for filteredProducts
    filteredProducts: (state) => {
      const categoryStore = useCategoryStore();
      if (categoryStore.selectedCategory === "All") {
        return state.products; // Use state.products to access the store's state
      } else if (categoryStore.selectedCategory) {
        return state.products.filter((product) => {
          const productCategory = product.category;
          return productCategory.includes(categoryStore.selectedCategory);
        });
      } else {
        return state.products;
      }
    },
  },
  actions: {
    async fetchProducts() {
      try {
        const productsSnapshot = await db.collection("products").get();
        this.products = productsSnapshot.docs.map((doc) => {
          const productData = doc.data();
          return {
            ...productData,
            isHovered: false,
          };
        });
      } catch (error) {
        window.alert("Error fetching products");
      }
    },
    

    async searchProducts() {
      if (this.searchQuery.trim() === "") {
        console.log(this.searchQuery);
        await this.fetchProducts();
      } else {
        const query = this.searchQuery.toLowerCase().trim();
        this.products = this.products.filter((product) => {
          const productName = product.name.toLowerCase();
          const productSku = product.sku.toLowerCase();
          return productName.includes(query) || productSku.includes(query);
        });
      }
    },
  addToCart(product) {
    // Check if the product is already in the cart based on a unique identifier (e.g., sku)
    const existingCartItem = this.cart.find(item => item.product.sku === product.sku);
  
    if (existingCartItem) {
      // Check if the quantity is less than the available stock
      if (existingCartItem.quantity < product.stockQuantity) {
        
        // If the quantity is less than the available stock, increase it
        existingCartItem.quantity += 1;

      } else {

        // If the quantity is equal to or less than zero, show a message
        window.alert(`Cannot add more of ${product.name} to the cart. Stock is exhausted.`);
      }
    } else {
      // If the product is not in the cart and stock quantity is greater than zero, add it as a new item
      if (product.stockQuantity > 0) {
        this.cart.push({
          product,
          quantity: 1,
        });
      } else {
        window.alert(`Cannot add ${product.name} to the cart. Stock is exhausted.`);
      }
    }
    // Save the updated cart data to localStorage
    localStorage.setItem('cart', JSON.stringify(this.cart));
  },
    removeFromCart(cartItem) {
      // Remove the specified cart item from the cart
      const index = this.cart.indexOf(cartItem);
      if (index !== -1) {
        this.cart.splice(index, 1);
      }

      // Save the updated cart data to localStorage
      localStorage.setItem('cart', JSON.stringify(this.cart));
    },  
    clearCart() {
      this.cart = []; // Clear the cart by assigning an empty array
      localStorage.removeItem('cart'); // Also remove cart data from localStorage
    }, 
    
    
  },
});
