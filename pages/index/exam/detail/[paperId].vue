<script lang="ts" setup>
import type { CheckboxValueType } from 'ant-design-vue/es/checkbox/interface'
import dayjs from 'dayjs'
import { addQuesionApi, getExamPaperDetailApi, removeQuesionApi } from '~/api/combineExamPaper'
import type { Question } from '~/api/combineExamPaper/types'
import { selectQuestionApi } from '~/api/question'
import type { List } from '~/api/question/types'
import { getQuestionBankListApi } from '~/api/questionBank'

const editRef = ref()
const route = useRoute()
const paperId = Number(route.params?.paperId)
const parent = ref(JSON.parse(route.query?.parent || '' as any))
const examBankId = route.query?.examBankId || '1'
const loading = ref(false)
const paperList = ref<Question[]>([])
const modalVisible = ref(false)
const showType = ref('编辑')
const okText = ref('下一步')
const modalTitle = ref('请先选择题库')
const modalLoading = ref(false)
const selectedQBank = ref<CheckboxValueType[]>([])
const Qbank = ref<any>([])
const questionList = ref<{ title: string, questions: List[] }[]>([])
const selectedQuestions = ref(undefined)

onMounted(() => {
  init()
})

const init = () => {
  getPaper()
}

const getPaper = async () => {
  loading.value = true
  const res = await getExamPaperDetailApi(paperId as any)
  if (res.code === 200)
    paperList.value = res.data.questions
  else
    message.error(res.message)

  loading.value = false
}

const onCancel = () => {
  questionList.value = []
  selectedQBank.value = []
  selectedQuestions.value = undefined
  okText.value = '下一步'
  modalTitle.value = '请选择题库'
  modalVisible.value = false
}

const addQuestions = async () => {
  if ((!selectedQuestions.value || Array.isArray(selectedQuestions.value)) && selectedQuestions.value?.length <= 0) {
    message.error('请先选择题目')
    return
  }

  loading.value = true
  const data = {
    paperId: Number(paperId),
    questionIds: selectedQuestions.value || [],
  }

  const res = await addQuesionApi(data)
  if (res.code === 200) {
    getPaper()
    message.success('添加成功')
  }
  else {
    message.error('添加失败')
  }

  onCancel() // 关闭弹窗
  loading.value = false
}

const onSave = () => {
  if (okText.value === '下一步') {
    if (Array.isArray(selectedQBank.value)) {
      modalLoading.value = true
      const request: Array<Promise<any>> = []
      selectedQBank.value.forEach((item: CheckboxValueType) => {
        request.push(getQuestion(item.value, item.label))
      })
      Promise.all(request)
        .then(() => {
          okText.value = '添加'
          modalTitle.value = '请选择要添加的题目'
        })
        .catch(() => message.error('出错了！'))
        .finally(() => {
          modalLoading.value = false
        })
    }
    else {
      message.error('请先选择题库！')
    }
  }
  else {
    addQuestions()
  }
}

const handleDelete = async (id: number) => {
  loading.value = true
  const data = {
    paperId,
    questionIds: [id],
  }

  const res = await removeQuesionApi(data)
  if (res.code === 200) {
    message.success('删除成功')
    getPaper()
  }
  else {
    message.error(res.message)
  }

  loading.value = false
}

const handleEdit = async (item: any) => {
  if (editRef.value)
    editRef.value.openModal(item)
}

const openModal = () => {
  modalLoading.value = true
  getQBank()
  modalVisible.value = true
}

const getQBank = async () => {
  modalLoading.value = true
  const res = await getQuestionBankListApi()
  if (res.code === 200) {
    Qbank.value = res.data.map((i) => {
      return {
        label: i.libType,
        value: i.id,
      }
    })
  }
  else {
    message.error(res.message)
  }

  modalLoading.value = false
}

const getQuestion = async (id: number, title: string) => {
  const condition = {
    current: 1,
    pageSize: 200,
    libIds: [id],
  }

  selectQuestionApi(condition).then ((res) => {
    if (res.code === 200) {
      const q = {
        title,
        questions: res.data.list.map((item) => {
          return {
            ...item,
            label: item.title,
            value: item.id,
          }
        }),
      }

      q.questions.length > 0 && questionList.value.push(q)
    }
    else {
      message.error(res.message)
    }
  })
}
</script>

<template>
  <main class="flex-1 flex flex-col p-4 bg-bg-base min-h-full">
    <a-page-header
      style="background-color: #fff; border: 1px solid rgb(235, 237, 240)"
      :title="parent?.title"
      :sub-title=" `${parent.description} ` + `创建时间： ${parent?.createTime}`"
      @back="() => navigateTo({ path: `/exam/${examBankId}`, query: { parent: route.query?.parent } })"
    >
      <template #extra>
        <a-segmented
          v-model:value="showType"
          :options="['编辑', '预览']"
        />
        <a-button
          key="3"
          type="primary"
          @click="openModal"
        >
          添加
        </a-button>
      </template>
    </a-page-header>

    <a-list
      :loading="loading"
      :grid="{ gutter: 4, column: 1 }"
      :data-source="paperList"
      class="flex-1 h-full bg-white mt-6"
    >
      <template #renderItem="{ item, index }">
        <a-list-item
          :key="item.id"
          style="padding: 0 0; margin-bottom: 0"
        >
          <div class="rounded-xl p-4 ">
            <div
              v-show="showType === '编辑'"
              class="flex justify-between items-center"
            >
              <div class="flex">
                <a-tag
                  color="green"
                  class="mr-12"
                >
                  ID: {{ item.id }}
                </a-tag>
              </div>
              <div>
                <a-space>
                  <div class="text-gray-400">
                    上次修改时间：{{ dayjs(item.updateTime).format('YYYY-MM-DD HH:mm:ss') }}
                  </div>
                  <a-button
                    class="ml-8"
                    @click="handleEdit(item)"
                  >
                    编辑
                  </a-button>
                  <a-popconfirm
                    title="你确定要删除这道题目吗？"
                    @confirm="handleDelete(item.id)"
                  >
                    <a-button danger>
                      删除
                    </a-button>
                  </a-popconfirm>
                </a-space>
              </div>
            </div>
            <div class="mt-2 font-bold text-lg">
              {{ `${index + 1}.` }} <span class="ml-1">{{ item.title || '--' }}
              </span>
            </div>
            <div class="mt-4 ml-4">
              <CommonMarkdownEditor
                v-model="item.standard"
                default-open="preview"
                :toolbars-flag="false"
              />
            </div>
          </div>
        </a-list-item>
      </template>
    </a-list>

    <a-modal
      v-model:open="modalVisible"
      :width="500"
      :title="modalTitle"
      :confirm-loading="loading"
      :ok-text="okText"
      @cancel="onCancel"
      @ok="onSave"
    >
      <a-spin :spinning="modalLoading">
        <a-checkbox-group
          v-if="okText === '下一步'"
          v-model:value="selectedQBank"
          style="width: 100%;"
          name="questionBank"
        >
          <a-row>
            <a-col
              v-for="(item, index) in Qbank"
              :key="index"
              :span="8"
            >
              <a-checkbox :value="item">
                {{ item.label }}
              </a-checkbox>
            </a-col>
          </a-row>
        </a-checkbox-group>
        <div v-else>
          <a-checkbox-group
            v-model:value="selectedQuestions"
            style="width: 100%; flex-direction: column;"
            name="questions"
          >
            <a-row
              v-for="(qBank, index) in questionList"
              :key="index"
              :wrap="true"
              style="width: 100%;"
            >
              <a-divider style="width: 100%;">
                {{ qBank.title }}
              </a-divider>
              <a-col
                v-for="(item, index1) in qBank.questions"
                :key="index1"
                :span="24"
                style="width: 100%;"
              >
                <a-checkbox
                  :value="item.id"
                  style="white-space: normal;"
                >
                  {{ item.label }}
                </a-checkbox>
              </a-col>
            </a-row>
          </a-checkbox-group>
        </div>
      </a-spin>
    </a-modal>

    <bank-paper-editModal
      ref="editRef"
      :refresh="getPaper"
    />
  </main>
</template>

<style scoped></style>
