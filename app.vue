<template>
  <div class="flex flex-col items-center justify-center text-center">
    <header class="bg-pink-200 w-full">
      <NuxtLink to="/" class="text-2xl underline text-bule-600 mr-2">
        首页
      </NuxtLink>
      <NuxtLink to="/user" class="text-2xl underline text-bule-600 mr-2">
        用户
      </NuxtLink>
    </header>
    <NuxtPage />
  <div class="flex h-screen">
    <!-- 侧边导航栏 -->
    <layoout-aside></layoout-aside>
    <div class="flex flex-col flex-1">
      <!-- 顶部导航栏 -->
      <layoout-header></layoout-header>
      <!-- 内容区域 -->
      <NuxtPage ></NuxtPage>
    </div>
  </div>
</template>

<style>

</style>
