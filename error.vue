<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps({
  error: Object as () => NuxtError,
})

const { error } = toRefs(props)
</script>

<template>
  <div class="h-screen w-full bg-gradient-to-t from-white to-slate-200 flex flex-col justify-center items-center">
    <h1 class="font-bold text-8xl">
      {{ error?.statusCode }}
    </h1>
    <p class="bg-gray-300 py-2 px-4 rounded-xl mt-4 -mb-2">
      {{ error?.message }}
    </p>
    <NuxtLink
      class="mt-8"
      to="/"
    >
      <a-button
        type="primary"
        size="large"
      >
        回到首页
      </a-button>
    </NuxtLink>
  </div>
</template>
