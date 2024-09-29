<script lang="ts" setup>
import { Form } from 'ant-design-vue';
import dayjs from 'dayjs';
import { getBankExamPaperApi } from '~/api/examPaper';
import type { List } from '~/api/examPaper/types'

const route = useRoute()
const paperId = route.params?.paperId
const parent = ref(JSON.parse(route.query?.parent || ''))
const condition = {
  libId: Number(paperId),
  current: 1,
  pageSize: 20
}
const loading = ref(false)
const paperList = ref<List[]>([])
const modalVisible = ref(false)
const selectedQuestion = ref(null)
const useForm = Form.useForm;
const showType = ref('编辑')
const formRef = reactive({
  libId: paperId,
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
const { resetFields, validate, validateInfos } = useForm(formRef, rulesRef);

onMounted(() => {
  init()
})

const init = () => {
  getPaper()
}

const onPaginationChange = (current, size) => {
  pagination.current = current,
    pagination.pageSize = size,

    condition.current = current,
    condition.pageSize = size,

    getPaper()
}

const pagination = {
  current: 1,
  pageSize: 10,
  hideOnSinglePage: true,
  showSizeChanger: true,
  total: 0,
  onChange: onPaginationChange
}

const getPaper = async () => {
  loading.value = true
  const res = await getBankExamPaperApi(condition)
  if (res.code === 200) {
    pagination.total = res.data.total
    paperList.value = res.data.list
  } else {
    message.error(res.message)
  }

  loading.value = false
}

const openModal = (data) => {
  selectedQuestion.value = data
  if (data) {
    formRef.standard = data.standard
    formRef.title = data.title
  }

  modalVisible.value = true
}

const onCancel = () => { modalVisible.value = false }

const updateOrAdd = async () => {
  loading.value = true
  const data = {
    libIds: [Number(paperId)],
    title: formRef.title,
    standard: formRef.standard
  }
  if (selectedQuestion.value?.id) {
    const res = await updateQuestionApi(selectedQuestion.value.id, data)
    if (res.code === 200) {
      getPaper()
      modalVisible.value = false
      resetFields()
      message.success('更新成功')
    } else {
      message.error(res.message)
    }
  } else {
    const res = await createQuestionApi(data)
    if (res.code === 200) {
      getPaper()
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
      console.error(e)
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
    getPaper()
  } else {
    message.error(res.message)
  }

  loading.value = false
}

</script>

<template>
  <main class="flex-1 flex flex-col p-4 bg-bg-base min-h-full">
    <a-page-header style="border: 1px solid rgb(235, 237, 240)" :title="parent?.libType"
      :sub-title="'ID: ' + parent?.id + ' ' + '创建时间： ' + parent?.createTime" @back="() => navigateTo('/examPaperBank')">
      <template #extra>
        <a-segmented v-model:value="showType" :options="['编辑', '预览']" />
        <a-button @click="openModal(null)" type="primary" key="3">创建</a-button>
      </template>
    </a-page-header>

    <a-list :loading="loaidng" :grid="{ gutter: 4, column: 1 }" :data-source="paperList" :pagination="pagination"
      class='flex-1 h-full bg-white mt-6'>
      <template #renderItem="{ item, index }">
        <a-list-item style="padding: 0 0; margin-bottom: 0; ">
          <div class="rounded-xl p-4 h-[150px]">
            <div v-show="showType === '编辑'" class="flex justify-between items-center">
              <div class="flex">
                <a-tag color="green" class="mr-12">ID: {{ item.id }}</a-tag>
              </div>
              <div>
                <a-space>
                  <div class="text-gray-400">上次修改时间：{{ dayjs(item.createTime).format('YYYY-MM-DD HH:MM') }}</div>
                  <a-button @click="openModal(item)">编辑</a-button>
                  <a-popconfirm title="你确定要删除这道题目吗？" @confirm="handleDelete(item.id)">
                    <a-button danger>删除</a-button>
                  </a-popconfirm>
                </a-space>
              </div>
            </div>
            <div class="mt-2 font-bold text-lg"> {{ index + 1 + '.' }} <span class="ml-1">{{ item.title || '--' }}
              </span></div>
            <div class="mt-4 ml-4">
              <a-typography-paragraph :ellipsis="{rows: 2}" :content="'参考答案: ' + item.standard" />
            </div>
          </div>
        </a-list-item>
      </template>
    </a-list>

    <a-modal :width="500" v-model:open="modalVisible" @cancel="onCancel" :title="selectedQuestion ? '更新' : '创建'"
      :confirm-loading="loading" @ok="onSave" ok-text="确定" cancel-text="取消">
      <a-form class="mt-12" name="basic" :label-col="{ span: 4 }" :wrapper-col="{ span: 20 }" autocomplete="on">
        <a-form-item label="题目" name="title" required>
          <a-input v-model:value="formRef.title" />
        </a-form-item>

        <a-form-item label="标准答案" name="standard" required>
          <a-textarea style="max-height: 300px;" auto-size v-model:value="formRef.standard" />
        </a-form-item>
      </a-form>
    </a-modal>
  </main>

</template>

<style scoped></style>