<script lang="ts" setup>
import dayjs from 'dayjs';
import { getExamPaperDetailApi, removeQuesionApi } from '~/api/combineExamPaper';
import type { Question } from '~/api/combineExamPaper/types'

const route = useRoute()
const paperId = route.params?.paperId
const parent = ref(JSON.parse(route.query?.parent || ''))
const examBankId =route.query?.examBankId || '1'
const loading = ref(false)
const paperList = ref<Question[]>([])
const modalVisible = ref(false)
const showType = ref('编辑')

onMounted(() => {
  init()
})

const init = () => {
  getPaper()
}

const getPaper = async () => {
  loading.value = true
  const res = await getExamPaperDetailApi(paperId as any)
  if (res.code === 200) {
    paperList.value = res.data.questions
  } else {
    message.error(res.message)
  }

  loading.value = false
}

const openModal = () => {
  modalVisible.value = true
}

const onCancel = () => { modalVisible.value = false }

const addQuestions = async () => {
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

const handleDelete = async (id:number) => {
  loading.value = true

  const data = {
    paperId,
    questionIds: [id]
  }
  const res = await removeQuesionApi(data)
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
    <a-page-header style="border: 1px solid rgb(235, 237, 240)" :title="parent?.title"
      :sub-title=" parent.description + ' ' + '创建时间： ' + parent?.createTime"
      @back="() => navigateTo({ path: `/exam/${examBankId}`, query: { parent: route.query?.parent}})">
      <template #extra>
        <a-segmented v-model:value="showType" :options="['编辑', '预览']" />
        <a-button @click="openModal" type="primary" key="3">添加</a-button>
      </template>
    </a-page-header>

    <a-list :loading="loading" :grid="{ gutter: 4, column: 1 }" :data-source="paperList"
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
                  <a-popconfirm title="你确定要删除这道题目吗？" @confirm="handleDelete(item.id)">
                    <a-button class="ml-8" danger>删除</a-button>
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

    <a-modal :width="500" v-model:open="modalVisible" @cancel="onCancel" title="添加题目" :confirm-loading="loading"
      @ok="onSave" ok-text="确定" cancel-text="取消">
      暂未完成
    </a-modal>
  </main>

</template>

<style scoped></style>