<script lang="ts" setup>
import type { UnwrapRef } from 'vue'
import { onMounted } from 'vue';
import { getUserInfo } from '@/api/user';

interface userInfo {
  username: string
  nickname: string
  email: string
  phoneNumber: string
}

let userInfo: UnwrapRef<userInfo> = reactive({
  username: '',
  nickname: '',
  email: '',
  phoneNumber: '',
})

const activeKey = ref('1');
onMounted(() => {
  // init()
})

const init = async () => {
  try {
    const res = await getUserInfo()
    userInfo = res.data
  } catch (err) {
    console.log(err)
    message.error('获取用户信息失败')
  }
}
</script>

<template>
  <no-ssr>
    <main class="p-4">
      <a-card class="min-h-[500px]">
        <a-tabs v-model:activeKey="activeKey" tab-position="left" animated>
          <a-tab-pane key="1" tab="个人信息">
            <personalData-information :userInfo="userInfo" />
          </a-tab-pane>
          <a-tab-pane key="2" tab="账号设置">
            <personalData-setting :userInfo="userInfo" />
          </a-tab-pane>
          <a-tab-pane key="3" tab="我的收藏">我的收藏</a-tab-pane>
        </a-tabs>
      </a-card>
    </main>
  </no-ssr>
</template>
