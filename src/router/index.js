import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import ProductView from '../views/ProductView.vue'
import BuyCoinView from '../views/BuyCoinView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/product',
    name: "product",
    component:ProductView
  },
  {
    path: '/buycoin',
    name: "buycoin",
    component:BuyCoinView
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
