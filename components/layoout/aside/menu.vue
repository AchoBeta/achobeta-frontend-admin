<script setup lang="ts">
import type { MenuItem } from '@/types/menuItem'

const props = defineProps({
  menuList: {
    type: Array,
    require: true,
    default: () => [],
  },
  title: {
    type: String,
    require: true,
    default: '菜单',
  },
})

function isRouteActive(menuItem: MenuItem): boolean {
  const { path } = useRoute()
  return menuItem.routeName === path
}
</script>

<template>
  <h1 class="text-sm text-slate-900  ml-6 font-bold my-2">
    {{ props.title }}
  </h1>
  <div
    v-for="(item, index) in props.menuList as MenuItem[]"
    :key="index"
  >
    <NuxtLink
      :to="item.routeName"
      :data-id="item.id"
      :class="{ active: isRouteActive(item) }"
      class="flex group items-center pl-6 py-2 border-l-[4px]  border-bg-base hover:border-active-base cursor-pointer hover:text-active-base"
    >
      <div class="flex-2 w-[30px]">
        <!-- 图标 -->
        <i :class="item.icon" />
      </div>
      <!-- 文字 -->
      <div
        :to="item.routeName"
        class="flex-6 text-sm h-10 leading-10 text-gray-base text-inherit group-hover:text-active-base ml-4"
      >
        {{ item.name }}
      </div>
    </NuxtLink>
  </div>
</template>

<style scoped>
.active {
  border: 4px solid #ff6175;
  border-right-width: 0;
  border-top-width: 0;
  border-bottom-width: 0;
  color: #ff6175;
}
</style>
