import { defineStore } from 'pinia';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

const db = firebase.firestore();

export const useRoleStore = defineStore('role', {
  state: () => ({
    roles: [],
    selectedRole: "",
    availableoRles: [],
  }),

  actions: {
    
    async fetchRoles() {
      try {
        const rolesSnapshot = await db.collection('roles').get();
        this.roles = rolesSnapshot.docs.map((doc) => doc.data());
      } catch (error) {
        console.error('Error fetching roles:', error);
      }
    },
    
    async fetchRoleNames() {
      try {
        const rolesSnapshot = await db.collection("roles").get();
        const roleNames = rolesSnapshot.docs.map((doc) => doc.data().name);
        return roleNames;
      } catch (error) {
        console.error("Error fetching role names:", error);
        return [];
      }
    },
    
    async fetchAvailableRoles() {
      try {
        const roleNames = await this.fetchRoleNames(); // Corrected
        this.availableRoles = roleNames;
      } catch (error) {
        console.error("Error fetching available roles:", error);
      }
    },
    
    async selectrole(role) {
      // Set the selected role
      this.selectedRole = role;
    },
  },
});
