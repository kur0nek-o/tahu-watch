import DetailPage from '@/pages/DetailPage.vue'
import HomePage from '@/pages/HomePage.vue'
import LoginPage from '@/pages/LoginPage.vue'
import RegisterPage from '@/pages/RegisterPage.vue'

import { authMiddleware } from '@/middlewares/authMiddleware'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: LoginPage,
      meta: { requiresGuest: true },
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterPage,
      meta: { requiresGuest: true },
    },
    {
      path: '/',
      name: 'beranda',
      component: HomePage,
      meta: { requiresAuth: true },
    },
    {
      path: '/detail/:slug',
      name: 'detail',
      component: DetailPage,
      meta: { requiresAuth: true },
    },
  ],
})

router.beforeEach(authMiddleware)

export default router
