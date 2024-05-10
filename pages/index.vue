<template>
    <div class="mx-auto py-10">
        <div class="text-xl">首页</div>
    </div>
</template>
<script lang="ts" setup>

import { useMouse, usePreferredDark } from '@vueuse/core'
// tracks mouse position
const { x, y } = useMouse()

// if user prefers dark theme
const isDark = usePreferredDark()
</script>
