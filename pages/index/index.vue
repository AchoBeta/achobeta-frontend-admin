<script lang="ts" setup>
import { useCounterStore } from '@/stores/index'

const counterStore = useCounterStore()

function handleAddCount() {
  counterStore.increament()
}
</script>

<template>
  <div class="mx-auto py-10">
    <div class="text-xl">
      首页
      store{{ counterStore.count }}
      <button @click="handleAddCount">
        add count
      </button>
      <div class=" w-[28px] h-[28px] bg-slate-200">
        <Icon-bot class=" text-2xl" />
      </div>
    </div>
  </div>
</template>
