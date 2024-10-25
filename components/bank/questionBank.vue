<script lang="ts" setup>
import { createQuestionBankApi, getQuestionBankListApi, renameQuestionBankApi } from '~/api/questionBank'

onMounted(() => {
  init()
})

const loading = ref(false)
const init = () => {
  getQBankList()
}

const questionBank: any = ref([])
const getQBankList = async () => {
  loading.value = true
  const res = await getQuestionBankListApi()
  if (res.code === 200)
    questionBank.value = res.data
  else
    message.error(res.message)

  loading.value = false
}

const createModal = ref(false)
const createLibtype = ref('')
const openModal = () => {
  createModal.value = true
}
const onCancel = () => {
  createModal.value = false
}

const createQBank = async () => {
  if (!createLibtype.value.trim()) {
    message.error('试卷库名称不能为空!')
    return
  }

  loading.value = true
  const res = await createQuestionBankApi(createLibtype.value)
  if (res.code === 200) {
    createModal.value = false
    message.success(res.message)
    getQBankList()
  } else {
    message.error(res.message)
  }

  loading.value = false
}

const updateQBank = async (data: { libId: number, libType: string }) => {
  if (!data.libId)
    return

  loading.value = true
  const res = await renameQuestionBankApi(data)
  if (res.code === 200)
    message.success('更新成功')
  else
    message.error(res.message)

  loading.value = false
}
</script>

<template>
  <div class="mb-8 px-6">
    <a-button
      :loading="loading"
      class="flex items-center"
      type="primary"
      @click="openModal"
    >
      <PlusOutlined />创建
    </a-button>
    <a-modal
      v-model:open="createModal"
      :width="400"
      title="创建"
      :confirm-loading="loading"
      @cancel="onCancel"
      @ok="createQBank"
    >
      <a-input
        v-model:value="createLibtype"
        class="my-4"
        placeholder="请输入试卷库名称"
      />
    </a-modal>
  </div>
  <a-list
    :grid="{ gutter: 24, xs: 1, sm: 2, md: 3, lg: 4, xl: 4, xxl: 4 }"
    :data-source="questionBank"
    class="flex-1"
  >
    <template #renderItem="{ item }">
      <a-list-item
        :key="item.id"
        style="padding: 0"
      >
        <bank-card
          type="question"
          :data="item"
          :update-data="updateQBank"
        />
      </a-list-item>
    </template>
  </a-list>
</template>

<style scoped></style>
