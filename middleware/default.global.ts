import { useUserStore } from '../stores/modules/userStore';

// 路由守卫
export default defineNuxtRouteMiddleware((to, from) => {
  const userStore = useUserStore()
  const { token } = userStore

  if (token) {
    if (to.path === '/login') {
        return navigateTo('/')
    }
  } else {
    if (to.path !== '/login') {
        return navigateTo('/login')
    }
  }
})