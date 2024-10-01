<script lang="ts" setup>
const activeKey = ref('1');
</script>

<template>
  <main class="p-4">
    <a-card class="min-h-[500px]">
      <a-tabs v-model:activeKey="activeKey" tab-position="left" animated>
        <a-tab-pane key="1" tab="个人信息">
          <personalData-information />
        </a-tab-pane>
        <a-tab-pane key="2" tab="账号设置">
          <personalData-setting />
        </a-tab-pane>
        <a-tab-pane key="3" tab="正式成员">正式信息</a-tab-pane>
      </a-tabs>
    </a-card>
  </main>
</template>
