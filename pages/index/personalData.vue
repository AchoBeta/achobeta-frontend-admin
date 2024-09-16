<script lang="ts" setup>

const loading = ref(true)
const activeKey = ref('1');
</script>

<template>
  <ClientOnly>
    <main class="p-4">
      <a-card class="min-h-[500px]">
        <a-spin :spinning="loading">
          <a-tabs v-if="!loading" v-model:activeKey="activeKey" tab-position="left" animated>
            <a-tab-pane key="1" tab="个人信息">
              <personalData-information />
            </a-tab-pane>
            <a-tab-pane key="2" tab="账号设置">
              <personalData-setting />
            </a-tab-pane>
            <a-tab-pane key="3" tab="我的收藏">我的收藏</a-tab-pane>
          </a-tabs>
        </a-spin>
      </a-card>
    </main>
  </ClientOnly>
</template>
