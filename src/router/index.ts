import { createRouter, createWebHistory, type Router } from 'vue-router'
import TheHome from '@/views/TheHome.vue'

const router: Router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: TheHome
    }
  ]
})

export default router
