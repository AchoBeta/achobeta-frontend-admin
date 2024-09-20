<script setup>
import { PlusOutlined } from '@ant-design/icons-vue'
import { onMounted, ref } from 'vue'
// import { getPaeperBankList } from '~/api/examPaperBank'

// onMounted(() => {
//   getPaperBank()
// })

const paperBankList = ref([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
// const hideTooltipStr = ref('题库名称')
const activeKey = ref('1')

async function getPaperBank() {
  // TODO:
  // const res = await getPaeperBankList()
  // paperBankList.value = res.data
  console.log(paperBankList.value)
}
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
