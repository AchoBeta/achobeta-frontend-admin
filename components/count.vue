<script setup>
import { useCounterStore } from '@/stores/counter'

const counterStore = useCounterStore()
</script>

<template>
  <div>Current Count: {{ counterStore.count }}</div>
  <div class="btn" @click="counterStore.increment()">
    +1
  </div>
</template>
