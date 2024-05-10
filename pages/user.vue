<script lang="ts" setup>
import { useMouse } from '@vueuse/core'
// tracks mouse position
const { x, y } = useMouse()
</script>

<template>
  <div class="text-xl">
    用户
  </div>
  <count />
  <div>VueUse:</div>
  <div>当前鼠标位置:({{ x }}，{{ y }} )</div>
</template>
