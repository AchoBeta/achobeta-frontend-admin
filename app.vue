<template>
  <div>
    <NuxtPage/>


  <div v-if="!haslogin">
    <NuxtPage></NuxtPage>

  </div>
  <div v-else class="flex h-screen">
    <!-- 侧边导航栏 -->
    <layoout-aside></layoout-aside>
    <div class="flex flex-col flex-1">
      <!-- 顶部导航栏 -->
      <layoout-header></layoout-header>
      <!-- 内容区域 -->
      <NuxtPage></NuxtPage>

    </div>
  </div>
</template>

<style>

</style>

<script setup lang="ts">
const haslogin = false
</script>
<style></style>