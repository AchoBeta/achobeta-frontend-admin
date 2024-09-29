import type { MenuItem } from '@/types/menuItem'
import { defineStore } from 'pinia'
import type { Ref } from 'vue'

export const useMenuStore = defineStore('menuList', () => {
  // 主菜单
  const menuList: Ref<MenuItem[]> = ref([{
    id: 1,
    routeName: '/',
    icon: 'fa-solid fa-house-chimney-window fa-lg',
    name: '首页',
  },{
    id: 2,
    routeName: '/member',
    icon: 'fa-solid fa-user-graduate fa-lg',
    name: '正式成员',
  }, {
    id: 3,
    routeName: '/email',
    icon: 'fa-solid fa-envelope fa-lg',
    name: '邮箱通知',
  }, {
    id: 4,
    routeName: '/activity',
    icon: 'fa-solid fa-flag fa-lg',
    name: '活动管理',
  }, {
    id: 5,
    routeName: '/interviewManage',
    icon: 'fa-solid fa-book fa-lg',
    name: '面试管理',
  }, {
    id: 6,
    routeName: '/examPaperBank',
    icon: 'fa-solid fa-folder fa-lg',
    name: '试题库',
  }, {
    id: 7,
    routeName: '/resume',
    icon: 'fa-solid fa-clipboard-list fa-lg',
    name: '简历管理',
  }
  ])

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
