import { defineStore } from 'pinia'
import type { Ref } from 'vue'
import type { MenuItem } from '@/types/menuItem'

export const useMenuStore = defineStore('menuList', () => {
  // 主菜单
  const menuList: Ref<MenuItem[]> = ref([{
    id: 1,
    routeName: '/',
    icon: 'fa-solid fa-house-chimney-window fa-lg',
    name: '首页',
  }, {
    id: 2,
    routeName: '/user',
    icon: 'fa-solid fa-user fa-lg',
    name: '用户',
  }, {
    id: 3,
    routeName: '/interviewer',
    icon: 'fa-solid fa-user-graduate fa-lg',
    name: '面试官',
  }, {
    id: 4,
    routeName: '/email',
    icon: 'fa-solid fa-envelope fa-lg',
    name: '邮箱通知',
  }, {
    id: 5,
    routeName: '/schedule',
    icon: 'fa-solid fa-calendar-days fa-lg',
    name: '招新日程',
  }, {
    id: 6,
    routeName: '/evaluation',
    icon: 'fa-solid fa-book fa-lg',
    name: '面试评价',
  },{
    id: 7,
    routeName: '/examPaperBank',
    icon: 'fa-solid fa-folder fa-lg',
    name: '试卷库',
  }])

  // 其它菜单
  const otherMenuList: Ref<MenuItem[]> = ref([{
    id: 1,
    routeName: '/feedback',
    icon: 'fa-solid fa-comment-dots fa-lg',
    name: '意见反馈',
  }, {
    id: 2,
    routeName: '/personalData',
    icon: 'fa-solid fa-image-portrait fa-lg',
    name: '个人信息',
  }, {
    id: 3,
    routeName: '/setting',
    icon: 'fa-solid fa-gear fa-lg',
    name: '设置',
  }],
  )

  return {
    menuList,
    otherMenuList,
  }
})
