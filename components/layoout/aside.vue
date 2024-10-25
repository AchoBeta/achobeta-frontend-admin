<script setup>
import { useMenuStore } from '~/stores'
import { useUserStore } from '~/stores/modules/userStore'

const userStore = useUserStore()
const { userInfo } = storeToRefs(userStore)
const menuStore = useMenuStore()
const { menuList, otherMenuList } = storeToRefs(menuStore)
const { avatar: avatarSrc, loading: avatarLoading } = useAvatar(userInfo.value.avatar)// todo 改变引用不触发响应式
</script>

<template>
  <aside
    data-theme="dark"
    class="hidden md:block flex-col h-full overflow-scroll w-56 ease bg-bg-base p-1 border-r-2 border-gray-100"
  >
    <!-- LOGO -->
    <div class="w-full text-center mt-2 mb-2">
      <img
        src="~/assets/img/achobeta.jpg"
        class="mx-auto rounded-lg w-24 h-24 object-fill"
        alt="头像"
      >
    </div>
    <!-- 头像 -->
    <div class="flex items-center ml-6 px-2 py-2 mb-4 border rounded-lg w-44 h-16 ">
      <a-spin :spinning="avatarLoading">
        <img
          :src="avatarSrc"
          class="rounded-lg w-12 h-12 object-fill"
          alt="头像"
        >
      </a-spin>
      <div class="px-3">
        <h2 class="font-bold text-sm text-slate-900 pb-1">
          {{ userInfo.nickname }}
        </h2>
        <p class="text-xs">
          {{ userInfo.userType === 2 ? '管理员' : '用户' }}
        </p>
      </div>
    </div>
    <!-- 菜单栏 -->
    <div>
      <LayooutAsideMenu
        :menu-list="menuList"
        title="主菜单"
      />
    </div>
    <!-- 其它栏 -->
    <div>
      <LayooutAsideMenu
        :menu-list="otherMenuList"
        title="其它"
      />
    </div>
  </aside>
</template>
