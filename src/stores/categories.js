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
        const categoriesData = categoriesSnapshot.docs.map((doc) => doc.data().name);
        
        // Sort the categories alphabetically
        this.categories = categoriesData.sort();
      } catch (error) {
        window.alert('Error fetching categories');
      }
    },
    
    
    async fetchCategoryNames() {
      try {
        const categoriesSnapshot = await db.collection("categories").get();
        const categoryNames = categoriesSnapshot.docs.map((doc) => doc.data().name);
        return categoryNames;
      } catch (error) {
        window.alert("Error fetching category names");
        return [];
      }
    },
    
    async fetchAvailableCategories() {
      try {
        const categoryNames = await this.fetchCategoryNames(); // Corrected
        this.availableCategories = categoryNames.sort();
      } catch (error) {
        window.alert("Error fetching available categories");
      }
    },
    
    async selectCategory(category) {
      // Set the selected category
      this.selectedCategory = category;
    },
  },
});
