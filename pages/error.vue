<template>
  <a-result status="error" :title="error.statusCode"
    :sub-title="error.message || error.statusMessage || '服务器发生错误，请联系管理员'">
    <template #extra>
      <a-button @click="$router.push('/')" key="console" type="primary">Back Home</a-button>
      <a-button key="buy">Buy Again</a-button>
    </template>
    <div v-html="error.stack"></div>
  </a-result>
</template>
<script setup>
const props = defineProps({
  error: Object,
});

const { error } = toRefs(props);
</script>
<style lang="less" scoped>
.desc p {
  margin-bottom: 1em;
}
</style>
