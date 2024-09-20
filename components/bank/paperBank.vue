<script lang="ts" setup>
import { getPaeperBankListApi, createPaeperBankApi } from '~/api/examPaperBank';

onMounted(()=> {
  init()
})
 
const loading = ref(false)
const init = () => {
  getPaperBankList()
}

const questionBank: any = ref([])

const getPaperBankList = async () => {
  loading.value = true;
  const res = await getPaeperBankListApi()
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

</script>

<template>
  <div class="mb-8 px-6">
    <a-button @click="openModal" class="flex items-center" type="primary">
      <PlusOutlined />创建
    </a-button>
    <a-modal :width="400" v-model:open="createModal" @cancel="onCancel" title="创建" :confirm-loading="loading"
      @ok="createPaperBank" ok-text="创建" cancel-text="取消">
      <a-input v-model:value="createLibtype" class="my-4" placeholder="请输入试卷库名称" />
    </a-modal>
  </div>
  <a-list :grid="{ gutter: 0, column: 4 }" :data-source="questionBank" :pagination="{hideOnSinglePage: true}"
    class='flex-1'>
    <template #renderItem="{ item }">
      <a-list-item>
        <a-card :headStyle="{padding: '0 12px' }" :body-style="{padding: 12}" bordered hoverable
          class="w-full bg-slate-100">
          <template #title>
            {{ item.libType }}
          </template>
        </a-card>
      </a-list-item>
    </template>
  </a-list>
</template>

<style scoped></style>