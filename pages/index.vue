<script lang="ts" setup>

</script>

<template>
  <div class="flex h-screen">
    <!-- 侧边导航栏 -->
    <layoout-aside />
    <div class="flex-1 flex flex-col h-screen overflow-scroll">
      <!-- 顶部导航栏 -->
      <layoout-header />
      <div class="mt-16 bg-[#f5f5f5] min-h-[calc(100vh-4rem)] w-full">
        <!-- 内容区域 -->
        <NuxtPage />
      </div>
    </div>
  </div>
</template>
