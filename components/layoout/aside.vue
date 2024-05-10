<template>
    <asdie data-theme="dark" class="flex flex-col  w-56 bg-bg-base pl-1">
      <!-- LOGO -->
      <div class="text-3xl  font-bold text-center mt-8 mb-4">LOGO</div>
      <!-- 头像 -->
      <div class="flex items-center ml-6 px-2 mb-4 border rounded-lg w-44 h-16 ">
          <image
            class="rounded-lg w-10 h-10 bg-blue-400"
            src="https://avatars.githubusercontent.com/u/10163467?v=4"
            mode="scaleToFill"
          />
          <div class="px-4">
            <h2 class="font-bold pb-1">半糖小子</h2>
            <p class="text-xs">超级管理员</p>
          </div>
      </div>
      <!-- 菜单栏 -->
      <div>
          <h1 class="text-sm  ml-6 font-bold my-2">主菜单</h1>
          <template v-for="(item) in menuList" :key="index">
            <layoout-aside-item  :routeName="item.routeName" :content="item.content"></layoout-aside-item>
          </template>
      </div>
      <!-- 其它栏 -->
      <div>
          <h1 class="text-sm  ml-6 font-bold my-2">其它</h1>
          <template v-for="(item) in othersList" :key="index">
            <layoout-aside-item  :routeName="item.routeName" :content="item.content"></layoout-aside-item>
          </template>
      </div>
    </asdie>
</template>
<script setup>
import { ref } from 'vue'
const menuList = ref([{
  routeName: '/',
  content: '首页'
},{
  routeName: '/user',
  content: '用户'
},{
  routeName: '/interviewer',
  content: '面试官'
},{
  routeName: '/email',
  content: '邮箱通知'
},{
  routeName: '/schedule',
  content: '招新日程'
},{
  routeName: '/evaluation',
  content: '面试评价'
}])
const othersList = ref([{
  routeName: '/feedback',
  content: '意见反馈'
},{
  routeName: '/personalData',
  content: '个人信息'
},{
  routeName: '/setting',
  content: '设置'
}])

</script>
