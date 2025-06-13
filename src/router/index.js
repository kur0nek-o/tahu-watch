import DetailPage from '@/pages/DetailPage.vue'
import HomePage from '@/pages/HomePage.vue'
import LoginPage from '@/pages/LoginPage.vue'
import RegisterPage from '@/pages/RegisterPage.vue'

import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: LoginPage,
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterPage,
    },
    {
      path: '/beranda',
      name: 'beranda',
      component: HomePage,
    },
    {
      path: '/detail/:slug',
      name: 'detail',
      component: DetailPage,
    },
  ],
})

export default router
