<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { useMenuStore } from '@/stores'

const menueStore = storeToRefs(useMenuStore())
const menuList = [...menueStore.menuList.value, ...menueStore.otherMenuList.value]
</script>

<template>
  <header class="navbar bg-[#fbfbfb]">
    <!-- 更多 -->
    <div class="flex-none">
      <!-- 下拉菜单 todo 封装二次点击关闭 -->
      <div class="dropdown dropdown-hover">
        <button tabindex="0" role="button" class="btn btn-square btn-ghost">
          <svg
            xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
            class="inline-block w-5 h-5 stroke-current"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <ul tabindex="0" class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
          <li v-for="(item) in menuList" :key="item.id">
            <NuxtLink :to="item.routeName">
              {{ item.name }}
            </NuxtLink>
          </li>
        </ul>
      </div>
    </div>
    <!-- 页面名称 -->
    <div class="flex-1 text-xl font-bold ml-2">
      首页
    </div>
    <!-- 消息栏 -->
    <div class="flex-none">
      <!-- 搜索框 -->
      <label class="input input-bordered flex items-center gap-2 mr-8 ">
        <input type="text" class="grow" placeholder="Search">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="w-4 h-4 opacity-70">
          <path
            fill-rule="evenodd"
            d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
            clip-rule="evenodd"
          />
        </svg>
      </label>
      <!-- 通知项 -->
      <!-- 文件 -->
      <div class="indicator mx-4 mt-2 hover:scale-105 ">
        <span class="indicator-item badge badge-primary badge-sm">2</span>
        <div class="grid w-10 h-10 rounded-full  place-items-center">
          <i class="fa-solid fa-folder-open fa-xl text-[#a6adbb]" />
        </div>
      </div>
      <!-- 信息 -->
      <div class="indicator mx-4 mt-2 hover:scale-105 ">
        <span class="indicator-item badge badge-secondary badge-sm">10</span>
        <div class="grid w-10 h-10 rounded-full  place-items-center">
          <i class="fa-solid fa-envelope fa-xl text-[#a6adbb]" />
        </div>
      </div>
      <!-- 通知 -->
      <div class="indicator mx-4 mt-2 hover:scale-105 ">
        <span class="indicator-item badge badge-error  badge-sm">99+</span>
        <div class="grid w-10 h-10 rounded-full  place-items-center">
          <i class="fa-solid fa-bell fa-xl text-[#a6adbb]" />
        </div>
      </div>
      <!-- 主题切换 -->
      <label class="swap swap-rotate mr-4  ml-6">

        <!-- this hidden checkbox controls the state -->
        <input type="checkbox" class="theme-controller" value="black">

        <!-- sun icon -->
        <svg class="swap-off fill-current w-10 h-10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path
            d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z"
          />
        </svg>

        <!-- moon icon -->
        <svg class="swap-on fill-current w-10 h-10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path
            d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z"
          />
        </svg>
      </label>
    </div>
  </header>
</template>
