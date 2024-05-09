<template>
    <div class="text-xl">首页</div>
    <count></count>
    <div>VueUse:</div>
    <div>当前鼠标位置:({{ x }}，{{ y }} )</div>
</template>
<script lang="ts" setup>
import { useLocalStorage, useMouse, usePreferredDark } from '@vueuse/core'
// tracks mouse position
const { x, y } = useMouse()

// if user prefers dark theme
const isDark = usePreferredDark()

// persist state in localStorage
const store = useLocalStorage(
    'my-storage',
    {
    name: 'Apple',
    color: 'red',
    },
)
</script>
