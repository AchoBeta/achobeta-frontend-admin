<script lang="ts" setup>
import { useMouse, usePreferredDark } from '@vueuse/core'
// tracks mouse position
const { x, y } = useMouse()

// if user prefers dark theme
const isDark = usePreferredDark()
</script>

<template>
  <div class="text-xl">
    首页
  </div>
  <count />
  <div>VueUse:</div>
  <div>当前鼠标位置:({{ x }}，{{ y }} )</div>
  <div>{{ isDark }}</div>
</template>
