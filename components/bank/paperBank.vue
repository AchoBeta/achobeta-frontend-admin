<script lang="ts" setup>
import { createPaeperBankApi, getPaeperBankListApi, renamePaeperBankApi } from '~/api/examPaperBank'

onMounted(() => {
  init()
})

const loading = ref(false)
const init = () => {
  getPaperBankList()
}

const paperBank: any = ref([])

const getPaperBankList = async () => {
  loading.value = true
  const res = await getPaeperBankListApi()
  if (res.code === 200)
    paperBank.value = res.data
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

const createPaperBank = async () => {
  if (!createLibtype.value.trim()) {
    message.error('试卷库名称不能为空!')
    return
  }

  loading.value = true
  const res = await createPaeperBankApi(createLibtype.value)
  if (res.code === 200) {
    createModal.value = false
    message.success(res.message)
    getPaperBankList()
  } else {
    message.error(res.message)
  }

  loading.value = false
}

const updatePaperBank = async (data: { libId: number, libType: string }) => {
  if (!data.libId)
    return

  loading.value = true
  const res = await renamePaeperBankApi(data)
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
      @ok="createPaperBank"
    >
      <a-input
        v-model:value="createLibtype"
        class="my-4"
        placeholder="请输入试卷库名称"
      />
    </a-modal>
  </div>
  <a-list
    :loading="loading"
    :grid="{ gutter: 24, xs: 1, sm: 2, md: 3, lg: 4, xl: 4, xxl: 4 }"
    :data-source="paperBank"
    class="flex-1"
  >
    <template #renderItem="{ item }">
      <a-list-item
        :key="item.id"
        style="padding: 0"
      >
        <bank-card
          type="exam"
          :data="item"
          :update-data="updatePaperBank"
        />
      </a-list-item>
    </template>
  </a-list>
</template>

<style scoped></style>
