<script setup>
import { selectQuestionApi, updateQuestionApi, createQuestionApi, deleteQuestionApi } from '~/api/question'
import { getQuestionBankListApi } from '~/api/questionBank';
import { Form } from 'ant-design-vue';
import dayjs from 'dayjs';

const createModal = ref()
const route = useRoute()
const questionId = route.params?.questionId
const parent = ref(JSON.parse(route.query?.parent || ''))
const condition = {
  libIds: [Number(questionId)],
  current: 1,
  pageSize: 20
}
const loading = ref(false)
const questionList = ref([])
const modalVisible = ref(false)
const selectedQuestion = ref(null)
const useForm = Form.useForm;
const formState = reactive({
  libId: questionId,
  title: '',
  standard: '',
});
const rulesRef = reactive({
  title: [
    {
      required: true,
      message: '请输入题目',
    },
  ],
  standard: [
    {
      required: true,
      message: '输入标准答案',
    },
  ],
});
const { resetFields, validate, validateInfos } = useForm(formState, rulesRef);
const bankList = ref([])

onMounted(() => {
  init()
})

const init = () => {
  getQuestion()
  getLibIds()
}

const onPaginationChange = (current, size) => {
  pagination.current = current,
    pagination.pageSize = size,
    condition.current = current,
    condition.pageSize = size,
    getQuestion()
}

const pagination = {
  current: 1,
  pageSize: 10,
  hideOnSinglePage: true,
  showSizeChanger: true,
  total: 0,
  onChange: onPaginationChange
}

const getQuestion = async () => {
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

const openModal = (data) => {
  selectedQuestion.value = data
  if (data) {
    formState.standard = data.standard
    formState.title = data.title
  }

  modalVisible.value = true
}

const onCancel = () => { modalVisible.value = false }

const updateOrAdd = async () => {
  loading.value = true
  const data = {
    libIds: formState.libIds,
    title: formState.title,
    standard: formState.standard
  }
  if (selectedQuestion.value?.id) {
    const res = await updateQuestionApi(selectedQuestion.value.id, data)
    if (res.code === 200) {
      getQuestion()
      modalVisible.value = false
      resetFields()
      message.success('更新成功')
    } else {
      message.error(res.message)
    }
  } else {
    const res = await createQuestionApi(data)
    if (res.code === 200) {
      getQuestion()
      modalVisible.value = false
      resetFields()
      message.success('创建成功')
    } else {
      message.error(res.message)
    }
  }

  loading.value = false
}

const onSave = () => {
  validate()
    .then(res => {
      updateOrAdd()
    })
    .catch(e => {
      e.errorFields.forEach(i => {
        i.errors.forEach(err => {
          message.error(err)
        })
      })
    })
}

const handleDelete = async (id) => {
  loading.value = true
  const res = await deleteQuestionApi(id)
  if (res.code === 200) {
    message.success('删除成功')
    getQuestion()
  } else {
    message.error(res.message)
  }

  loading.value = false
}

// 获取所有题库
const getLibIds = async () => {
  loading.value = true
  const res = await getQuestionBankListApi()
  if (res.code === 200) {
    bankList.value = res.data
    formState.libIds = [Number(questionId)]
  } else {
    message.error(res.message)
  }

  loading.value = false
}

const openInsertModal = () => {
  if (createModal.value) {
    createModal.value.openModal()
  }
}

</script>

<template>
  <main class="flex-1 flex flex-col p-4 bg-[#f5f5f5] min-h-full">
    <a-page-header style="background-color: #fff; border: 1px solid rgb(235, 237, 240)" :title="parent?.libType"
      :sub-title="'ID: ' + parent?.id + ' ' + '创建时间： ' + parent?.createTime" @back="() => navigateTo('/examPaperBank')">
      <template #extra>
        <a-button @click="openInsertModal(null)" key="2">插入</a-button>
        <a-button @click="openModal(null)" type="primary" key="3">创建</a-button>
      </template>
    </a-page-header>

    <a-list :loading="loading" :grid="{ gutter: 4, column: 1 }" :data-source="questionList" :pagination="pagination"
      class='flex-1 h-full'>
      <template #renderItem="{ item, index }">
        <a-list-item :key="item.id" style="padding: 12px 0; margin-bottom: 0; ">
          <div class="rounded-xl p-4">
            <div class="flex justify-between items-center">
              <div class="flex">
                <a-tag color="green" class="mr-12">ID: {{ item.id }}</a-tag>
              </div>
              <div>
                <a-space>
                  <div class="text-gray-400 mr-8">上次修改时间：{{ dayjs(item.updateTime).format('YYYY-MM-DD HH:mm:ss') }}
                  </div>
                  <a-button @click="openModal(item)">编辑</a-button>
                  <a-popconfirm title="你确定要删除这道题目吗？" @confirm="handleDelete(item.id)">
                    <a-button danger>删除</a-button>
                  </a-popconfirm>
                </a-space>
              </div>
            </div>
            <div class="mt-2"> {{ index + 1 + condition.pageSize * (condition.current - 1) + '.' }} <span
                class="ml-1">{{
                item.title || '--' }}
              </span></div>
            <div class="mt-4 ml-4">
              <common-markdownEditor :toolbarsFlag="false" defaultOpen="preview" v-model="item.standard" />
            </div>
          </div>
        </a-list-item>
      </template>
    </a-list>

    <a-modal :width="820" v-model:open="modalVisible" @cancel="onCancel" :title="selectedQuestion ? '更新' : '创建'"
      :confirm-loading="loading" @ok="onSave">
      <a-form class="mt-12" name="basic" :model="formState" autocomplete="on" layout="vertical">

        <a-form-item label="题库" name="libIds" required>
          <a-select v-model:value="formState.libIds" placeholder="请选择创建到的题库" mode="tags">
            <a-select-option v-for="item in bankList" :key="item.id" :value="item.id">{{ item.libType
              }}</a-select-option>
          </a-select>
        </a-form-item>

        <a-form-item label="题目" name="title" required>
          <a-input v-model:value="formState.title" />
        </a-form-item>

        <a-form-item label="标准答案" name="standard" required>
          <common-markdownEditor v-model="formState.standard" />
        </a-form-item>
      </a-form>
    </a-modal>
  </main>

  <bank-paper-insertModal ref="createModal" :refresh="getQuestion" />
</template>

<style scoped></style>