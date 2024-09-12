<script setup lang="ts">
import { message } from 'ant-design-vue'
import { useUserStore } from '~/stores/modules/userStore'

function logout() {
  const userStore = useUserStore()

  message.success('退出成功')
  userStore.logout()
  window.location.href = '/login'
}
</script>

<template>
  <div class="flex  justify-center mt-2">
    <NuxtLink to="/login">
      <div class="btn" @click="logout">
        退出登录
      </div>
    </NuxtLink>
  </div>
</template>
