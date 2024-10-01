<script lang="ts" setup>
import { useUserStore } from '~/stores'
import { useAvatar } from '~/utils/user';

const userStore = useUserStore()
const { userInfo } = storeToRefs(userStore)

</script>

<template>
  <div class="flex flex-col justify-center w-[300px] bg-blue-100 rounded-lg items-center p-4">
    <a-avatar :size="{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }" :src="useAvatar(userInfo.avatar)"
      class="object-contain" />
    <div className="badge badge-accent text-white mt-2">
      {{ userInfo.userType === 2 ? '管理员' : '用户' }}
    </div>
    <h2 class="pt-4 pb-1 text-xl font-bold text-center">
      {{ userInfo.nickname }}
    </h2>
    <span class="pb-4">要么卷，要么卷铺盖</span>
    <ul>
      <li class="flex items-center pb-1">
        <HomeOutlined class="mr-2" />广东 东莞
      </li>
      <li class="flex items-center pb-1">
        <PhoneOutlined class="mr-2" />{{ userInfo.phoneNumber || '暂未设置' }}
      </li>
      <li class="flex items-center pb-1">
        <MailOutlined class="mr-2" />{{ userInfo.email || '暂未设置' }}
      </li>
    </ul>
  </div>
</template>
