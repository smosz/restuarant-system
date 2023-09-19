import { defineStore } from 'pinia';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

const db = firebase.firestore();

export const useCategoryStore = defineStore('category', {
  state: () => ({
    categories: [],
    selectedCategory: "",
    availableCategories: [],
  }),

  actions: {
    
    async fetchCategories() {
      try {
        const categoriesSnapshot = await db.collection('categories').get();
        this.categories = categoriesSnapshot.docs.map((doc) => doc.data().name);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    },
    
    async fetchCategoryNames() {
      try {
        const categoriesSnapshot = await db.collection("categories").get();
        const categoryNames = categoriesSnapshot.docs.map((doc) => doc.data().name);
        return categoryNames;
      } catch (error) {
        console.error("Error fetching category names:", error);
        return [];
      }
    },
    
    async fetchAvailableCategories() {
      try {
        const categoryNames = await this.fetchCategoryNames(); // Corrected
        this.availableCategories = categoryNames;
      } catch (error) {
        console.error("Error fetching available categories:", error);
      }
    },
    
    async selectCategory(category) {
      // Set the selected category
      this.selectedCategory = category;
    },
  },
});
