import { useUserStore } from '../stores/modules/userStore';

// 路由守卫
export default defineNuxtRouteMiddleware((to, from) => {
  const userStore = useUserStore()
  const { token } = userStore

  if (token) {
    if (to.path === '/login') {
      setTimeout(() => {
        message.error('您已登录，请先退出账号')
        return navigateTo('/')
      }, 1000);
    }
  } else {
    if (to.path !== '/login') {
      message.error('登录信息过期，请登录')
      setTimeout(() => {
        return navigateTo('/login')
      }, 1000);
    }
  }
})