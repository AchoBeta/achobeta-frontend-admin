<script lang="ts" setup>
import { getPaeperBankListApi, createPaeperBankApi, renamePaeperBankApi } from '~/api/examPaperBank';

onMounted(()=> {
  init()
})
 
const loading = ref(false)
const init = () => {
  getPaperBankList()
}

const paperBank: any = ref([])

const getPaperBankList = async () => {
  loading.value = true;
  const res = await getPaeperBankListApi()
  if(res.code === 200) {
    paperBank.value = res.data
  } else {
    message.error(res.message)
  }

  loading.value = false
}

const createModal = ref(false)
const createLibtype = ref('')

const openModal = () => {createModal.value = true}

const onCancel = () => {createModal.value = false}

const createPaperBank = async () => {
  if(!createLibtype.value.trim()) {
    message.error('试卷库名称不能为空!')
    return
  }

  loading.value = true
  const res = await createPaeperBankApi(createLibtype.value)
  if(res.code === 200) {
    createModal.value = false
    message.success(res.message)
    getPaperBankList()
  } else {
    message.error(res.message)
  }

  loading.value = false
}

const updatePaperBank= async (data:{ libId: number, libType: string}) => {
  if(!data.libId) {
    return
  }

  loading.value = true
  const res = await renamePaeperBankApi(data)
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
      @ok="createPaperBank" ok-text="创建" cancel-text="取消">
      <a-input v-model:value="createLibtype" class="my-4" placeholder="请输入试卷库名称" />
    </a-modal>
  </div>
  <a-list :loading="loading" :grid="{ gutter: 0, column: 4 }" :data-source="paperBank"
    :pagination="{hideOnSinglePage: true}" class='flex-1'>
    <template #renderItem="{ item }">
      <a-list-item>
        <bank-card type="exam" :data="item" :updateData="updatePaperBank"></bank-card>
      </a-list-item>
    </template>
  </a-list>
</template>

<style scoped></style>