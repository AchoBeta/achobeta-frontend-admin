import { defineStore } from 'pinia'


export const useMenuStore = defineStore('menuList', () => {
  const menuList = ref([{
    routeName: '/',
    content: '首页',
  }, {
    routeName: '/user',
    content: '用户',
  }, {
    routeName: '/',
    content: '面试官',
  }, {
    routeName: '/',
    content: '邮箱通知',
  }, {
    routeName: '/',
    content: '招新日程',
  }, {
    routeName: '/',
    content: '面试评价',
  }])
  return {
    menuList
  }
},
)