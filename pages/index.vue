<script lang="ts" setup>
import zhCN from 'ant-design-vue/es/locale/zh_CN'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'

dayjs.locale('zh')
</script>

<template>
  <a-config-provider :locale="zhCN">
    <div class="flex h-screen">
      <!-- 侧边导航栏 -->
      <layoout-aside />
      <div class="flex-1 flex flex-col h-screen overflow-scroll">
        <!-- 顶部导航栏 -->
        <layoout-header />
        <div class="mt-16 bg-[#f5f5f5] min-h-[calc(100vh-4rem)] w-full">
          <NuxtPage />
        </div>
      </div>
    </div>
  </a-config-provider>
</template>
