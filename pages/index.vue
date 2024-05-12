<script lang="ts" setup>

</script>

<template>
  <div class="flex min-h-screen">
    <!-- 侧边导航栏 -->
    <layoout-aside />
    <div class="flex flex-col flex-1">
      <!-- 顶部导航栏 -->
      <layoout-header />
      <!-- 内容区域 -->
      <NuxtPage />
    </div>
  </div>
</template>
