<template>
  <!-- 生效区域问题 todo -->
  <div class="flex group items-center pl-6 py-2 border-l-[4px] hover:border-[#ff6175] cursor-pointer hover:text-[#ff6175]">
      <div
        class="bg-[#717579] h-8 w-8 group-hover:bg-[#ff6175]  "
        src="#"
        mode="scaleToFill"
      />
      <NuxtLink :to="props.routeName"  class="text-sm  w-full h-10 leading-10 text-[#717579] group-hover:text-[#ff6175] pl-6">{{ props.content }}</NuxtLink>
  </div>
</template>
<script setup>
const props = defineProps(
  {
    routeName: {
      type: String,
      required: true,
      default: 'home'
    },
    content:{
      type: String,
      required: true,
      default:'路由'
    }
  },

)
</script>
