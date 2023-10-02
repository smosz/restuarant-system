import { defineStore } from 'pinia';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

const db = firebase.firestore();

export const useRoleStore = defineStore('role', {
  state: () => ({
    roles: [],
    selectedRole: "",
    availableRoles: [],
  }),

  actions: {
    
    async fetchRoles() {
      try {
        const rolesSnapshot = await db.collection('roles').get();
        this.roles = rolesSnapshot.docs.map((doc) => doc.data());
      } catch (error) {
        window.alert('Error fetching roles');
      }
    },
    
    async fetchRoleNames() {
      try {
        const rolesSnapshot = await db.collection("roles").get();
        const roleNames = rolesSnapshot.docs.map((doc) => doc.data().name);
        return roleNames;
      } catch (error) {
        window.alert("Error fetching role names");
        return [];
      }
    },
    
    async fetchAvailableRoles() {
      try {
        const roleNames = await this.fetchRoleNames(); // Corrected
        this.availableRoles = roleNames;
      } catch (error) {
        window.alert("Error fetching available roles");
      }
    },
    
    async selectrole(role) {
      // Set the selected role
      this.selectedRole = role;
    },
  },
});
