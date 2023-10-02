// customers.js

import { defineStore } from 'pinia';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

const db = firebase.firestore();
export const useCustomerStore = defineStore('customer', {
  state: () => ({
    customers: [],
    newCustomer: {
      id: '', // Unique ID for the new customer
      name: '',
      number: '',
      
    },
    customerWithNa: '', 
  }),
  getters: {
    // Getter methods for accessing customer data
    // You can define getters here if needed
      // Getter methods for accessing customer data
      
  },
  actions: {
    // Actions for managing customers
    async fetchCustomers() {
        try {
            const customersSnapshot = await db.collection("customers").get();
            this.customers = customersSnapshot.docs.map((doc) => doc.data())
            this.customerWithNa = this.customers.filter(customer => customer.number === "N/A");
          } catch (error) {
            window.alert("Error fetching customers");
          }
    },
  
    async addCustomer() {
      try {
        // Generate a unique ID for the new customer
        const customerId = db.collection('customers').doc().id;
    
        // Add the new customer data to Firestore with the generated ID
        await db.collection('customers').doc(customerId).set(this.newCustomer);
    
        // Update the unique ID for the new customer
        this.newCustomer.id = customerId;
    
        // Push the new customer into the customers array in the state
        this.customers.push(this.newCustomer);
    
        // Clear the form fields after successful submission
        this.newCustomer = {
          id: '', // Reset the ID
          name: '',
          number: '',
        };
      } catch (error) {
        window.alert('Error adding customer');
      }
    },
    
  },
});
