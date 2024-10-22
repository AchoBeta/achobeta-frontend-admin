<script lang="ts" setup>
import { getQuestionBankListApi, renameQuestionBankApi, createQuestionBankApi } from '~/api/questionBank'

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
    message.error(res.message)
  }

  loading.value = false
}

const createModal = ref(false)
const createLibtype = ref('')

const openModal = () => {createModal.value = true}

const onCancel = () => {createModal.value = false}

const createQBank = async () => {
  if(!createLibtype.value.trim()) {
    message.error('试卷库名称不能为空!')
    return
  }

  loading.value = true
  const res = await createQuestionBankApi(createLibtype.value)
  if(res.code === 200) {
    createModal.value = false
    message.success(res.message)
    getQBankList()
  } else {
    message.error(res.message)
  }

  loading.value = false
}

const updateQBank = async (data:{ libId: number, libType: string}) => {
  if(!data.libId) {
    return
  }

  loading.value = true
  const res = await renameQuestionBankApi(data)
  if(res.code === 200) {
    message.success('更新成功')
  } else {
    message.error(res.message)
  }

  loading.value = false
}
</script>

<template>
  <div class="mb-8 px-6">
    <a-button :loading="loading" @click="openModal" class="flex items-center" type="primary">
      <PlusOutlined />创建
    </a-button>
    <a-modal :width="400" v-model:open="createModal" @cancel="onCancel" title="创建" :confirm-loading="loading"
      @ok="createQBank">
      <a-input v-model:value="createLibtype" class="my-4" placeholder="请输入试卷库名称" />
    </a-modal>
  </div>
  <a-list :grid="{ gutter: 24, xs: 1, sm: 2, md: 3, lg: 4, xl: 4, xxl: 4 }" :data-source="questionBank" class='flex-1'>
    <template #renderItem="{ item }">
      <a-list-item :key="item.id" style="padding: 0">
        <bank-card type="question" :data="item" :updateData="updateQBank"></bank-card>
      </a-list-item>
    </template>
  </a-list>
</template>

<style scoped></style>