<script setup lang="ts">
import zhCN from 'ant-design-vue/es/locale/zh_CN'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import { useThemeStore } from '~/stores'

const themeStore = useThemeStore()
const { theme } = storeToRefs(themeStore)

dayjs.locale('zh')
</script>

<template>
  <html :data-theme="theme">
    <ClientOnly>
      <a-config-provider :locale="zhCN">
        <NuxtLayout>
          <NuxtPage />
        </NuxtLayout>
      </a-config-provider>
    </ClientOnly>
  </html>
</template>
