import { pinia } from '../main.js';
import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '../views/Dashboard.vue'
import Login from '../views/Login.vue'
import Profile from '../views/Profile.vue'
import Settings from '../views/Settings.vue'
import firebase from 'firebase/compat/app'
import NotFound from '../components/NotFound.vue'
import Modal from '../components/Modal.vue'
import Allproducts from '../views/products/Allproducts.vue'
import Addproduct from '../views/products/Addproduct.vue'
import Categories from '../views/products/Categories.vue'
import Customers from '../views/Customers.vue'
import Pos from '../views/pos.vue'
import Orders from '../views/orders.vue'
import roles from '../views/roles.vue'
import users from '../views/users.vue'
import Expenses from '../views/expenses.vue'
import { useUserStore } from "../stores/user";

// import Addcategory from '../views/products/Addcategory.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/modal',
      name: 'Modal',
      component: Modal,
      beforeRouteEnter(from) {
        alert('Please login first')
        // redirect back home
        if (from.name == '/') {
          return '/dashboard'
        }
      },
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/settings',
      name: 'Settings',
      component: Settings,
      meta: {
        requiresAuth: true,
      }
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/pos',
      name: 'Pos',
      component: Pos,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/expenses',
      name: 'Expenses',
      component: Expenses,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/roles',
      name: 'Roles',
      component: roles,
      meta: {
        requiresAuth: true,
        requiresAnyRole: ['Admin', 'Tech'] // This route requires either 'Admin' or 'Tech' role
      }
    },
    
    {
      path: '/oders',
      name: 'Orders',
      component: Orders,
      meta: {
        requiresAuth: true, requiresAnyRole: ['Admin', 'Tech']
      }
    },
    {
      path: '/users',
      name: 'Users',
      component: users,
      meta: {
        requiresAuth: true, requiresAnyRole: ['Admin', 'Tech']
      }
    },
    {
      path: '/customers',
      name: 'Customers',
      component: Customers,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/all-products',
      name: 'Allproducts',
      component: Allproducts,
      meta: {
        requiresAuth: true, requiresAnyRole: ['Admin', 'Tech']
      }
    },
    {
      path: '/categories',
      name: 'Categories',
      component: Categories,
      meta: {
        requiresAuth: true, requiresAnyRole: ['Admin', 'Tech']
      }
    },
    {
      path: '/add-product',
      name: 'Addproduct',
      component: Addproduct,
      meta: {
        requiresAuth: true, requiresAnyRole: ['Admin', 'Tech']
      }
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: NotFound
    },
  ]
})

router.beforeEach(async (to, from, next) => {
  const userStore = useUserStore(pinia);
  try {
    if (!userStore.loggedInUserData.length) {
      await userStore.fetchLoggedInUserData();
    }

    const userRole = userStore.loggedInUserData.Role;

    if (to.matched.some(record => record.meta.requiresAuth)) {
      if (!firebase.auth().currentUser) {
        next({
          path: '/',
          query: {
            redirect: to.fullPath
          }
        });
      } else {
        next();
      }
    } else if (firebase.auth().currentUser) {
      next({
        path: '/pos',
        query: {
          redirect: to.fullPath
        }
      });
    } else if (to.matched.some(record => ['Admin', 'Tech'].includes(record.meta.requiresRole))){
      // Allow access for admin routes
      if (userRole === 'Admin' || userRole === 'Tech') {
        next();
      } else {
        next('/pos'); // Redirect to an access denied page for non-admins
      }
    } else {
      next();
    }
  } catch (error) {
    // Handle any errors that occur during data fetch
    console.error('Error fetching user data:', error);
    next(error); // You can pass the error to next() to handle it further.
  }
});


export default router

