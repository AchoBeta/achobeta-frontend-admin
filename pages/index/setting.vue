<script setup lang="ts">
import { message } from 'ant-design-vue'
import { useUserStore } from '~/stores/modules/userStore'

const userStore = useUserStore()

function logOut() {
  userStore.logOut()
  setTimeout(() => {
    message.success('退出成功')
  }, 200)
}
</script>

<template>
  <div class="flex  justify-center mt-2">
    <NuxtLink to="/login">
      <div
        class="btn btn-outline btn-warning"
        @click="logOut"
      >
        退出登录
      </div>
    </NuxtLink>
  </div>
</template>
