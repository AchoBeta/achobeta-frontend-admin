<template>
  <!-- 生效区域问题-> navigateTo 解决-->
  <div
    class="flex group items-center pl-6 py-2 border-l-[4px] border-bg-base hover:border-active-base cursor-pointer hover:text-active-base"
    @click="navigateTo(props.routeName)"
  >
    <i :class="icons"></i>
    <div
      :to="props.routeName"
      class="text-sm w-full h-10 leading-10 text-gray-base group-hover:text-active-base pl-6"
    >
      {{ props.content }}
    </div>
  </div>
</template>
<script lang="ts" setup>
const props = defineProps({
  routeName: {
    type: String,
    required: true,
    default: "home",
  },
  content: {
    type: String,
    required: true,
    default: "路由",
  },
  icons:{
    type: String,
    required: true,
    default: "icon-home"
  }
});
</script>
