<template>
  <div class="flex rounded-lg p-4">
    <div class="w-1/3">
      <a-form layout="vertical" :model="formState">
        <a-form-item label="用户名">
          <a-input v-model:value="formState.username" placeholder="请输入用户名" />
        </a-form-item>
        <a-form-item label="昵称">
          <a-input v-model:value="formState.nickname" placeholder="请输入昵称" />
        </a-form-item>
        <a-form-item label="邮箱">
          <a-input v-model:value="formState.email" placeholder="请输入邮箱" />
        </a-form-item>
        <a-form-item label="电话号码">
          <a-input v-model:value="formState.phoneNumber" placeholder="请输入电话号码" />
        </a-form-item>
        <a-form-item>
          <a-button style="margin: 0 auto" type="primary">更新</a-button>
        </a-form-item>
      </a-form>
    </div>
    <div class="flex flex-col items-center justify-center w-36 h-48 ml-24 mt-4 ">
      <a-avatar :size="{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }"
        src="https://raw.githubusercontent.com/singleeeee/imgStorage/main/img/202405121150054.jpg"
        class="object-contain">
      </a-avatar>
      <button className="btn btn-sm mt-6">
        <span v-if="false" className="loading loading-spinner"></span>
        <span v-if="true">
          <UploadOutlined class="pb-1" />
        </span>
        更新头像
      </button>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { reactive } from 'vue'
import type { UnwrapRef } from 'vue'

interface userInfo {
  username: string
  nickname: string
  email: string
  phoneNumber: string
}

const formState: UnwrapRef<userInfo> = reactive({
  username: '',
  nickname: '',
  email: '',
  phoneNumber: '',
})

</script>
