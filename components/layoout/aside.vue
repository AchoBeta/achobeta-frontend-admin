<script setup>
import { ref } from 'vue'
import { useMenuStore } from '~/stores'

const menuStore = useMenuStore()
const menuList = ref(menuStore.menuList)

const othersList = ref([{
  routeName: '/',
  content: '意见反馈',
}, {
  routeName: '/',
  content: '个人信息',
}, {
  routeName: '/',
  content: '设置',
}])
</script>

<template>
  <aside data-theme="dark" class="flex flex-col  w-56 bg-bg-base pl-1">
    <!-- LOGO -->
    <div class="text-3xl  font-bold text-center mt-8 mb-4">
      LOGO
    </div>
    <!-- 头像 -->
    <div class="flex items-center ml-6 px-2 mb-4 border rounded-lg w-44 h-16 ">
      <img class="rounded-lg w-10 h-10 bg-blue-400" mode="scaleToFill">
      <div class="px-4">
        <h2 class="font-bold pb-1">
          半糖小子
        </h2>
        <p class="text-xs">
          超级管理员
        </p>
      </div>
    </div>
    <!-- 菜单栏 -->
    <div>
      <h1 class="text-sm  ml-6 font-bold my-2">
        主菜单
      </h1>
      <template v-for="(item, index) in menuList" :key="index">
        <layoout-aside-item :route-name="item.routeName" :content="item.content" />
      </template>
    </div>
    <!-- 其它栏 -->
    <div>
      <h1 class="text-sm  ml-6 font-bold my-2">
        其它
      </h1>
      <template v-for="(item, index) in othersList" :key="index">
        <layoout-aside-item :route-name="item.routeName" :content="item.content" />
      </template>
    </div>
  </aside>
</template>
