<script lang="ts" setup>
const activeKey = ref('1')

</script>

<template>
  <div class="p-4 bg-[#f5f5f5]">
    <a-tabs class="rounded-2xl bg-white p-4" v-model:activeKey="activeKey">
      <a-tab-pane key="1" tab="面试预约">
        <interview-actCard />
      </a-tab-pane>
      <a-tab-pane key="2" tab="面试" force-render>
        <bank-paperBank></bank-paperBank>
      </a-tab-pane>
      <a-tab-pane key="3" tab="面试评估" force-render>
        <bank-paperBank></bank-paperBank>
      </a-tab-pane>
      <a-tab-pane key="4" tab="面试反馈" force-render>
        暂未开发
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<style scoped></style>
