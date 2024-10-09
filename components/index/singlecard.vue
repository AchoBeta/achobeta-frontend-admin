<script lang="ts" setup>
const props = defineProps({
  title: {
    type: Number,
    default: '9825',
  },
  text: {
    type: String,
    default: '面试人数',
  },
  subtext: {
    type: String,
    default: '比去年增加10%',
  },
  icon: {
    type: String,
    default: 'https://obscloud.ulearning.cn/resources/web/17154132446384300.png',
  },
  color: {
    type: String,
    default: '#c61cca',
  },

})
</script>

<template>
  <div :style="{ backgroundColor: props.color }" class="single-card  flex  p-4 w-5/12 h-32 mb-4 rounded-2xl">
    <div class="w-2/3 h-full flex  content-center flex-wrap">
      <div class="card-title w-full  text-center text-white">
        {{ props.title }}
      </div>
      <div class="card-text text-sm text-left py-3 text-white">
        {{ props.text }}
      </div>
      <p class="card-text w-full text-xs text-left text-white">
        {{ props.subtext }}
      </p>
    </div>
    <div class="w-1/3 h-full flex justify-center content-center items-center">
      <img class="w-14 h-14" :src="props.icon">
    </div>
  </div>
</template>
