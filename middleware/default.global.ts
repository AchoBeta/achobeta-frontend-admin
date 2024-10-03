import { useUserStore } from '../stores/modules/userStore';

// 路由守卫
export default defineNuxtRouteMiddleware((to, from) => {
  const userStore = useUserStore()
  const { token } = userStore

  if (to.path === '/login') {
    if (token) {
      return navigateTo('/')
    }
  } else {
    if (!token) {
      return navigateTo('/login')
    } else {
    }

  }
})