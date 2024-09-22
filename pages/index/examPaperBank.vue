<script lang="ts" setup>

const activeKey = ref('1')
</script>

<template>
  <div class="p-2">
    <a-tabs class="rounded-2xl bg-white p-4" v-model:activeKey="activeKey">
      <a-tab-pane key="1" tab="题库">
        <bank-questionBank></bank-questionBank>
      </a-tab-pane>
      <a-tab-pane key="2" tab="试卷库" force-render>
        <bank-paperBank></bank-paperBank>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<style scoped></style>
