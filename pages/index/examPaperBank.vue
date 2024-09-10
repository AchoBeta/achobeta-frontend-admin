<script setup>
import { PlusOutlined } from '@ant-design/icons-vue'
import { onMounted, ref } from 'vue'
import { getPaeperBankList } from '~/api/examPaperBank'

onMounted(() => {
  getPaperBank()
})

const paperBankList = ref([])

async function getPaperBank() {
  // TODO:
  const res = await getPaeperBankList()
  paperBankList.value = res.data
  console.log(paperBankList.value)
}
</script>

<template>
  <div class="p-4 ">
    <a-card style="width: 100%;">
      <div class="mb-4">
        <button class="btn btn-primary btn-sm">
          <PlusOutlined />
          添加
        </button>
      </div>
      <a-card style="width: 200px">
        题库1
      </a-card>
    </a-card>
  </div>
</template>

<style scoped></style>
