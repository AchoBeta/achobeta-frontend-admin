<script lang="ts" setup>
const props = defineProps({
  title: {
    type: String,
    default: '345',
  },

  subtext: {
    type: String,
    default: '待审批',
  },

  color: {
    type: String,
    default: '#ffffff',
  },
  ringcolor: {
    type: String,
    default: '#2d83da',
  },

})
</script>

<template>
  <div :style="{ backgroundColor: props.color }" class="single-card  flex  p-4 w-5/12 h-32 mb-4 rounded-2xl">
    <div class="w-2/3  h-full flex  content-center flex-wrap">
      <div class="card-title w-full  text-center text-black">
        {{ props.title }}
      </div>
      <p class="card-text text-xs text-left text-black">
        {{ props.subtext }}
      </p>
    </div>
    <div class="w-1/3 h-full flex justify-center content-center items-center">
      <!-- <div :style="{ color: props.ringcolor }" class="radial-progress w-16 h-16  bg-[#f5f5f5]" style="--value:70;"
        role="progressbar">
        70%
      </div> -->

      <div class=" w-16 h-16">
        <div
          :style="{ color: props.ringcolor }"
          class="radial-progress  bg-[#f5f5f5] text-primary-content border-4 border-[#f5f5f5]"
          style="--value:70;" role="progressbar"
        >
          70%
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.single-card {
    box-shadow: -9px 9px 18px #ebebeb,
        9px -9px 18px #ffffff;
}
</style>
