import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '../views/Dashboard.vue'
import Login from '../views/Login.vue'
import Profile from '../views/Profile.vue'
import Settings from '../views/Settings.vue'
import Signup from '../views/Signup.vue'
import firebase from 'firebase/compat/app'
import NotFound from '../components/NotFound.vue'
import Modal from '../components/Modal.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/signup',
      name: 'Signup',
      component: Signup
    },
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
      path: '/dashboard',
      query: {
        redirect: to.fullPath
      }
    })
  } else {
    next()
  }
})

export default router

