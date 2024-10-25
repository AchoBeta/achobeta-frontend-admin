<script lang="ts" setup>
import { addQuesionApi } from '~/api/combineExamPaper'
import { selectQuestionApi } from '~/api/question'
import { getQuestionBankListApi } from '~/api/questionBank'
import type { List } from '~/api/question/types'

const props = defineProps({
  paperId: {
    type: String,
    required: true,
  },
  refresh: {
    type: Function,
    default: () => {},
  },
})
const loading = ref(false)
const modalVisible = ref(false)
const okText = ref('下一步')
const modalTitle = ref('请先选择题库')
const modalLoading = ref(false)
const selectedQBank = ref<any>(undefined)
const Qbank = ref<any>([])
const questionList = ref < { title: string, questions: List[] }[] > ([])
const selectedQuestions = ref<any>(undefined)

const onCancel = () => {
  questionList.value = []
  selectedQBank.value = undefined
  selectedQuestions.value = undefined
  okText.value = '下一步'
  modalTitle.value = '请选择题库'
  modalVisible.value = false
}

const addQuestions = async () => {
  if ((!selectedQuestions.value || Array.isArray(selectedQuestions.value)) && selectedQuestions.value.length <= 0) {
    message.error('请先选择题目')
    return
  }

  loading.value = true
  const data = {
    paperId: Number(props?.paperId),
    questionIds: selectedQuestions.value || [],
  }

  const res = await addQuesionApi(data)
  if (res.code === 200) {
    props?.refresh()
    message.success('添加成功')
  } else {
    message.error('添加失败')
  }

  loading.value = false
  onCancel() // 关闭弹窗
}

const onSave = () => {
  if (okText.value === '下一步') {
    if (Array.isArray(selectedQBank.value)) {
      modalLoading.value = true
      const request: Array<Promise<any>> = []
      selectedQBank.value.forEach((item: { value: number, label: string }) => {
        request.push(getQuestion(item.value, item.label))
      })
      Promise.all(request)
        .then(() => {
          okText.value = '插入'
          modalTitle.value = '请选择要插入的题目'
        })
        .catch(() => message.error('出错了！'))
        .finally(() => {
          modalLoading.value = false
        })
    } else {
      message.error('请先选择题库！')
    }
  } else {
    addQuestions()
  }
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
  } else {
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
    } else {
      message.error(res.message)
    }
  })
}

defineExpose({
  openModal,
})
</script>

<template>
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
            v-for="(item) in Qbank"
            :key="item.id"
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
</template>

<style scoped></style>
