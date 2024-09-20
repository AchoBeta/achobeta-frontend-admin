<script lang="ts" setup>
import { getQuestionBankListApi } from '~/api/questionBank'

onMounted(()=> {
  init()
})
 
const loading = ref(false)
const init = () => {
  getQBankList()
}

const questionBank: any = ref([])
const getQBankList = async () => {
  loading.value = true;
  const res = await getQuestionBankListApi()
  if(res.code === 200) {
    questionBank.value = res.data
  } else {
    loading.value = false
  }
}
</script>

<template>
  <a-list :grid="{ gutter: 0, column: 5 }" :data-source="questionBank" :pagination="{hideOnSinglePage: true}"
    class='flex-1'>
    <template #renderItem="{ item }">
      <a-list-item>
        <a-card :headStyle="{padding: '0 12px' }" :body-style="{padding: 12}" hoverable class="w-full h-32 bg-blue-200">
          <template #title>
            {{ item.libType }}
          </template>
        </a-card>
      </a-list-item>
    </template>
  </a-list>
</template>

<style scoped></style>