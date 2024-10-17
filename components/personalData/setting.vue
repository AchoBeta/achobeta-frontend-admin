<script lang="ts" setup>
import { updateUserInfoApi } from '~/api/user';
import type { UserInfo } from '~/api/user/types';
import { useUserStore } from '~/stores';
import pkg from 'lodash'

const { cloneDeep } = pkg
const userStore = useUserStore()
const { userInfo } = userStore
const formState:UserInfo = ref(cloneDeep(userInfo))
const loading = ref(false)

const updateBaseinfo = async () => {
  loading.value = true
  if(!formState.value.avatar) formState.value.avatar = 11478277801024
  const res = await updateUserInfoApi(formState.value.avatar, formState.value.nickname as string)
  if (res.code === 200) {
    message.success('更新成功')
    userStore.setUserInfo(cloneDeep(formState.value))
  } else {
    message.error(res.message)
  }

  loading.value = false
}

const handleAvatarChange = (avatar:number) => {
  formState.value.avatar = avatar
}

</script>

<template>
  <div class="flex rounded-lg p-4">
    <div class="w-1/3">
      <a-form layout="vertical" :model="formState">
        <a-form-item label="账号">
          <a-input :disabled="true" v-model:value="formState.username" placeholder="请输入用户名" />
        </a-form-item>
        <a-form-item label="昵称">
          <a-input v-model:value="formState.nickname" placeholder="请输入昵称" />
        </a-form-item>
        <a-form-item label="邮箱">
          <a-input :disabled="true" v-model:value="formState.email" placeholder="请输入邮箱" />
        </a-form-item>
        <a-form-item label="电话号码">
          <a-input :disabled="true" v-model:value="formState.phoneNumber" placeholder="请输入电话号码" />
        </a-form-item>
        <a-form-item>
          <a-button :loading="loading" @click="updateBaseinfo" type="primary">更新</a-button>
        </a-form-item>
      </a-form>
    </div>
    <div class="flex flex-col items-center justify-center w-36 h-48 ml-24 mt-4 ">
      <personalData-avatar :avatar="userInfo.avatar" :imgChange="handleAvatarChange" />
    </div>
  </div>
</template>
