import { defineStore } from 'pinia';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

const db = firebase.firestore();

export const useOrdersStore = defineStore('order', {
  state: () => ({
    orders: [],
    cartItems:[],
    // productItems:[],
    currentOrder: null, // Variable to store the current order being viewed
  }),
  // ... other parts of your store
  getters: {
    // Example getter to get the total number of orders
    totalOrdersCount() {
      return this.orders.length;
    },
    // Example getter to get the total price of all orders
    totalOrdersPrice() {
      return this.orders.reduce((total, order) => total + order.totalAmount);
    },
    // You can define more getters as needed
  },
  actions: {
    async fetchOrders() {
      try {
        const ordersSnapshot = await db.collection('orders').orderBy("timestamp", "desc").get();
        this.orders = ordersSnapshot.docs.map((doc) => doc.data());
        this.cartItems = ordersSnapshot.docs.map((doc) => doc.data().cart);
       
      } catch (error) {
        window.alert('Error fetching orders');
      }
    },

    // Action to set the current order
    setCurrentOrder(order) {
      this.currentOrder = order;
    },
  },
});