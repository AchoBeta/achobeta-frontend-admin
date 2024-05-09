<template>
    <asdie class="flex flex-col  w-56 bg-[#fbfbfb] pl-1">
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
          <h1 class="text-sm text-black ml-6 font-bold my-2">主菜单</h1>
          <template v-for="(item) in itemsList" :key="index">
            <layoout-aside-item  :routeName="item.routeName" :content="item.content"></layoout-aside-item>
          </template>
      </div>
      <div>
          <h1 class="text-sm text-black ml-6 font-bold my-2">其它</h1>
          <template v-for="(item) in 2" :key="index">
            <layoout-aside-item  :routeName="item.routeName" :content="item.content"></layoout-aside-item>
          </template>
      </div>
    </asdie>
</template>
<script setup>
import { ref } from 'vue'
const itemsList = ref([{
  routeName: '/',
  content: '首页'
},{
  routeName: '/user',
  content: '用户'
},{
  routeName: '/',
  content: '面试官'
},{
  routeName: '/',
  content: '邮箱通知'
},{
  routeName: '/',
  content: '招新日程'
},{
  routeName: '/',
  content: '面试评价'
}])

</script>
