<script lang="ts" setup>
const activeKey = ref('1')

onMounted(() => {
  init()
})

const init = () => {
  const route = useRoute()
  const type = route.query?.type

  if(type === 'paper') {
    activeKey.value = '2'
  }
}

</script>

<template>
  <div class="bg-[#f5f5f5] p-2">
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
