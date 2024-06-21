<script lang="ts" setup>
import { ref } from 'vue'

const current = ref(1)
</script>

<template>
  <no-ssr>
    <a-pagination v-model:current="current" :total="100" />
  </no-ssr>
</template>

<style scoped>
.ant-pagination .ant-pagination-item {
  background-color: pink !important;
}
</style>
