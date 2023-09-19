import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', {
  state: () => ({
    cartItems: [],
    customer: null,
  }),

  getters: {
    totalItems() {
      return this.cartItems.reduce((total, item) => total + item.quantity, 0);
    },
    totalPrice() {
      return this.cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    },
  },

  actions: {
    addToCart(product) {
      // Check if the product is already in the cart
      const existingItem = this.cartItems.find((item) => item.id === product.id);

      if (existingItem) {
        existingItem.quantity++;
      } else {
        this.cartItems.push({
          id: product.id,
          name: product.name,
          price: product.price,
          quantity: 1,
        });
      }
    },
    removeFromCart(productId) {
      const index = this.cartItems.findIndex((item) => item.id === productId);

      if (index !== -1) {
        this.cartItems.splice(index, 1);
      }
    },
    clearCart() {
      this.cartItems = [];
    },
    setCustomer(customer) {
      this.customer = customer;
    },
  },
});
