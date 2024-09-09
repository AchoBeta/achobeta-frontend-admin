<script setup lang="ts">
import { useUserStore } from '~/stores/modules/userStore';
import { message } from 'ant-design-vue'

const logout = () => {
  const userStore = useUserStore()


  message.success('退出成功')
  userStore.logout()
  window.location.href = '/login'




}


</script>

<template>
  <div class="flex  justify-center mt-2">
    <NuxtLink to="/login">
      <div @click="logout" class="btn">
        退出登录
      </div>
    </NuxtLink>
  </div>
</template>
