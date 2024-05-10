<script lang="ts" setup>
const props = defineProps({
  routeName: {
    type: String,
    required: true,
    default: 'home',
  },
  content: {
    type: String,
    required: true,
    default: '路由',
  },
})
</script>

<template>
  <NuxtLink
    :to="props.routeName"
    class="flex group items-center pl-6 py-2 border-l-[4px] border-bg-base hover:border-active-base cursor-pointer hover:text-active-base"
  >
    <div class="bg-gray-base h-8 w-8 group-hover:bg-active-base" src="#" mode="scaleToFill" />
    <div :to="props.routeName" class="text-sm w-full h-10 leading-10 text-gray-base group-hover:text-active-base pl-6">
      {{ props.content }}
    </div>
  </NuxtLink>
</template>
