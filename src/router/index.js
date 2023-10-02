import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '../views/Dashboard.vue'
import Login from '../views/Login.vue'
import Profile from '../views/Profile.vue'
import Settings from '../views/Settings.vue'
import Signup from '../views/Signup.vue'
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
        requiresAuth: true
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
      path: '/roles',
      name: 'Roles',
      component: roles,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/oders',
      name: 'Orders',
      component: Orders,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/users',
      name: 'Users',
      component: users,
      meta: {
        requiresAuth: true
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
        requiresAuth: true
      }
    },
    {
      path: '/categories',
      name: 'Categories',
      component: Categories,
      meta: {
        requiresAuth: true
      }
    },
    // {
    //   path: '/Addcategory',
    //   name: 'Addcategory',
    //   component: Addcategory,
    //   meta: {
    //     requiresAuth: true
    //   }
    // },
    {
      path: '/add-product',
      name: 'Addproduct',
      component: Addproduct,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: NotFound
    },
  ]
})
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!firebase.auth().currentUser) {
      next({
        path: '/',
        query: {
          redirect: to.fullPath
        }
      })
    } else {
      next()
    }
  } else if (firebase.auth().currentUser) {
    next({
      path: '/pos',
      query: {
        redirect: to.fullPath
      }
    })
  } else {
    next()
  }
})

export default router

