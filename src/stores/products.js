import { defineStore } from 'pinia';
import { useCategoryStore } from './categories.js';
<<<<<<< HEAD

import axios from "axios";


=======
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import { getDatabase, ref as stRef, get, remove } from "firebase/database";
const db = firebase.firestore();
>>>>>>> 868b9b0e63871cce18fc0ae7d8bd79e63a7fd462

// Retrieve the cart data from localStorage, if available
const initialCart = JSON.parse(localStorage.getItem('cart')) || [];

export const useProductStore = defineStore('product', {
  state: () => ({
    products: [],
    cachedProducts: [], // New cachedProducts array
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
     // Define a new getter to calculate the total amount of all products
    totalAmountOfAllProducts: (state) => {
  
       const total = state.products.reduce((total, product) => total + product.amount, 0);
       
  if (total > 0) {
    return total.toLocaleString();
  } else {
    return "0";
  }
    },
  },
  
  actions: {
    async fetchProducts() {
    try {
        if (this.cachedProducts.length === 0) {
          // Only fetch products if the cache is empty
<<<<<<< HEAD
          const response = await axios.get("http://localhost:8080/products"); // Replace with your API endpoint
          this.products = response.data.map((product) => {
            return {
              ...product,
=======
          const productsSnapshot = await db.collection("products").get();
          this.products = productsSnapshot.docs.map((doc) => {
            const productData = doc.data();
            return {
              ...productData,
>>>>>>> 868b9b0e63871cce18fc0ae7d8bd79e63a7fd462
              isHovered: false,
              customPrice: 0,
            };
          });

          // Cache the fetched products
          this.cachedProducts = this.products.slice();
        } else {
          // Use the cached products
          this.products = this.cachedProducts.slice();
<<<<<<< HEAD
        }
=======
        }this.addNewProduct()
>>>>>>> 868b9b0e63871cce18fc0ae7d8bd79e63a7fd462
      } catch (error) {
        console.error(error)
        window.alert("Error fetching products");
      }
    },
    async searchProducts() {
      if (this.searchQuery.trim() === "") {
        await this.fetchProducts();
      } else {
        const query = this.searchQuery.toUpperCase().trim();
        this.products = this.products.filter((product) => {
          const productName = product.name.toUpperCase();
          const productSku = product.sku.toUpperCase();
          return productName.includes(query) || productSku.includes(query);
        });
      }
    },
    addToCart(product) {
      // Check if the product is already in the cart based on a unique identifier (e.g., sku)
      const existingCartItem = this.cart.find(item => item.product.id === product.id);

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
<<<<<<< HEAD

=======
    addNewProduct() {
      // Create a new product object
      const newProduct = {
        id: 'FB001XT56WHJAKKLBKJ',
        sku: "FB001", // Customize the SKU as needed
        name: "FACEBEAT", // Set the name property
        price: 30000,
        stockQuantity: Infinity,
        amount:0
      };

     // Check if the product already exists in the products array
     const productExists = this.products.some(product => product.id === newProduct.id);

     if (!productExists) {
       // Add the new product to the fetched products in the store
       this.products.push(newProduct);

       // Optionally, you can also add it to the cachedProducts if needed
       this.cachedProducts.push(newProduct);
     }
    },
>>>>>>> 868b9b0e63871cce18fc0ae7d8bd79e63a7fd462
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
