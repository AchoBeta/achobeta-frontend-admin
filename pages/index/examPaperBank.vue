<script setup>
import { PlusOutlined } from '@ant-design/icons-vue'
import { onMounted, ref } from 'vue'
// import { getPaeperBankList } from '~/api/examPaperBank'

// onMounted(() => {
//   getPaperBank()
// })

const paperBankList = ref([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
// const hideTooltipStr = ref('题库名称')

async function getPaperBank() {
  // TODO:
  // const res = await getPaeperBankList()
  // paperBankList.value = res.data
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
      <!-- <a-list :grid="{ gutter: 4, column: 5 }" :data-source="paperBankList" pagination>
        <template #renderItem="{ item }">
          <a-list-item style="padding: 12px 0;margin-bottom: 0;">
            <a-card class="bg-blue-200" hoverable>
              <a-typography-paragraph v-model:content="hideTooltipStr" :editable="{ tooltip: false }" />
            </a-card>
          </a-list-item>
        </template>
</a-list> -->
    </a-card>
  </div>
</template>

<style scoped></style>
