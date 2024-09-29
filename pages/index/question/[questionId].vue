<script setup>
import { selectQuestionApi } from '~/api/question'

const route = useRoute()
const questionId = route.params.questionId
const parent = ref(JSON.parse(route.query.parent))

const condition = {
  libId: Number(questionId),
  current: 1,
  pageSize: 20
}

onMounted(() => {
  init()
})
const loading = ref(false)
const init = () => {
  getExamPaper()
}

const onPaginationChange = (current, size) => {
  pagination.current = current,
    pagination.pageSize = size,

    condition.current = current,
    condition.pageSize = size,

    getExamPaper()
}

const pagination = {
  current: 1,
  pageSize: 10,
  hideOnSinglePage: true,
  showSizeChanger: true,
  total: 0,
  onChange: onPaginationChange
}

const questionList = ref([])
const getExamPaper = async () => {
  loading.value = true
  const res = await selectQuestionApi(condition)
  if (res.code === 200) {
    pagination.total = res.data.total
    questionList.value = res.data.list
  } else {
    message.error(res.message)
  }

  loading.value = false
}
const modalVisible = ref(false)
const selectedQuestion = ref({})
const formState = ref({
  libId: 1,
  title: '',
  standard: ''
})

const useForm = Form.useForm;

const openModal = (data) => {
  selectedQuestion.value = data
  modalVisible.value = true
}
const onCancel = () => { modalVisible.value = false }
const onSave = () => {
  console.log(useForm, 'formState')
}

</script>

<template>
  <main class="flex-1 flex flex-col p-4 bg-bg-base min-h-full">
    <a-page-header style="border: 1px solid rgb(235, 237, 240)" :title="parent.libType"
      :sub-title="'ID: ' + parent.id + ' ' + '创建时间： ' + parent.createTime" @back="() => navigateTo('/examPaperBank')">
      <template #extra>
        <a-button @click="openModal" type="primary" key="3">创建</a-button>
      </template>
    </a-page-header>

    <a-list :loading="loaidng" :grid="{ gutter: 4, column: 1 }" :data-source="questionList" :pagination="pagination"
      class='flex-1 h-full'>
      <template #renderItem="{ item, index }">
        <a-list-item style="padding: 12px 0; margin-bottom: 0; ">
          <div class="rounded-xl p-4 bg-slate-100 h-[150px]">
            <div class="flex">
              <a-tag color="green" class="mr-12">ID: {{ item.id }}</a-tag>
            </div>
            <div class="mt-2"> {{ index + 1 + '.' }} <span class="ml-1">{{ item.title || '--' }} </span></div>
            <div class="mt-4 ml-4">
              <a-typography-paragraph :ellipsis="{rows: 2}" :content="'参考答案: ' + item.standard" />
            </div>
          </div>
        </a-list-item>
      </template>
    </a-list>

    <a-modal :width="500" v-model:open="modalVisible" @cancel="onCancel" title="创建" :confirm-loading="loading"
      @ok="onSave" ok-text="创建" cancel-text="取消">
      <a-form class="mt-12" :model="formState" name="basic" :label-col="{ span: 4 }" :wrapper-col="{ span: 20 }"
        autocomplete="on" @finish="onSave">
        <a-form-item label="题目" name="title" :rules="[{ required: true, message: '请输入题目' }]">
          <a-input v-model:value="formState.title" />
        </a-form-item>

        <a-form-item label="标准答案" name="standard" :rules="[{ required: true, message: '请输入标准答案' }]">
          <a-textarea v-model:value="formState.standard" />
        </a-form-item>
      </a-form>
    </a-modal>
  </main>

</template>

<style scoped></style>