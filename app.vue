<script setup lang="ts">
import zhCN from 'ant-design-vue/es/locale/zh_CN'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'

dayjs.locale('zh')
</script>

<template>
  <a-config-provider :locale="zhCN">
    <ClientOnly>
      <NuxtPage />
    </ClientOnly>
  </a-config-provider>
</template>
