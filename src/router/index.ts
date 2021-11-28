import { createRouter, createWebHistory } from 'vue-router'
import Calculator from '@/views/CalculatorView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Calculator
    }
  ]
})

export default router
