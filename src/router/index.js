import { createRouter, createWebHistory } from 'vue-router'
import Login from '../Login.vue'
import Home from '../view/Home.vue'
import DeviceCheck from '../DeviceCheck.vue'
import HistoryCheck from '../HistoryCheck.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/Login', name: 'login', component: Login },
    { path: '/', name: 'home', component: Home, meta: { requiresAuth: true } },
    { path: '/DeviceCheck', name: 'device-check', component: DeviceCheck, meta: { requiresAuth: true } },
    { path: '/HistoryCheck', name: 'history', component: HistoryCheck, meta: { requiresAuth: true } },
  ],
})

// guard อย่างง่าย: ต้องมี session ถึงจะเข้าได้
router.beforeEach((to, from, next) => {
  const session = localStorage.getItem('session')
  if (to.meta.requiresAuth && !session) {
    next({ name: 'login' })
  } else if (to.name === 'login' && session) {
    next({ name: 'home' })
  } else {
    next()
  }
})

export default router