import { createRouter, createWebHistory } from 'vue-router'
import CryptoCurrencies from '@/views/cryptoCurrencies.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: CryptoCurrencies
    },
    // {
    //   path: '/about',
    //   name: 'about',

    //   lazy-loaded when the route is visited
    //   component: () => import('@/views/AboutView.vue')
    // },
  ]
})

export default router
