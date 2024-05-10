<template>
  <div class="flex h-screen">
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
<script lang="ts" setup>
</script>
