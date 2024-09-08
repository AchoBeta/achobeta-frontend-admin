import pinia from '~/stores'
import { useUserStore } from '../stores/modules/userStore'

// 路由守卫
export default defineNuxtRouteMiddleware((to, from) => {
  const userStore = useUserStore(pinia)
  const { token } = userStore
  console.log(token,'token')
  if (token) {
    if (to.path === '/login') {
      message.error('您已登录，请先退出账号')
      return navigateTo('/')
    }
  } else {
    if (to.path !== '/login') {
      message.error('登录信息过期，请登录')
      return navigateTo('/login')
    }
  }
})