<script lang="ts" setup>
import { addQuesionApi } from '~/api/combineExamPaper'
import { createQuestionApi } from '~/api/question'
import { getQuestionBankListApi } from '~/api/questionBank'

const props = defineProps({
  refresh: {
    type: Function,
    default: () => {},
    required: true,
  },
  paperId: {
    type: Number,
    required: true,
  },
})

onMounted(() => {
  getQuestionBank()
})

const formRef = ref()
const loading = ref(false)
const modalVisible = ref(false)
const formState = ref({
  libIds: undefined,
  title: '',
  standard: '',
})
const bankList = ref()
const onCancel = () => {
  formState.value = {
    libIds: undefined,
    title: '',
    standard: '',
  }
  modalVisible.value = false
}

const onCreate = (values: any) => {
  console.log('创建')
  loading.value = true
  createQuestionApi(values).then((res) => {
    if (res.code === 200)
      addQuestion(res.data)
    else
      message.error(res.message)

    loading.value = false
  })
}

const openModal = () => {
  modalVisible.value = true
}

const addQuestion = (questionId: number) => {
  if (!questionId)
    return
  const data = {
    paperId: props.paperId,
    questionIds: [questionId],
  }

  loading.value = true
  addQuesionApi(data).then((res) => {
    if (res.code === 200) {
      message.success('添加成功')
      props.refresh()
      onCancel()
    }
    else {
      message.error(res.message)
    }
  })
}

const getQuestionBank = async () => {
  loading.value = true
  const res = await getQuestionBankListApi()
  if (res.code === 200)
    bankList.value = res.data
  else
    message.error(res.message)

  loading.value = false
}

defineExpose({
  openModal,
})
</script>

<template>
  <a-modal
    v-model:open="modalVisible"
    :width="820"
    title="创建"
    :confirm-loading="loading"
    :footer="null"
    @cancel="onCancel"
  >
    <a-form
      ref="formRef"
      class="mt-12"
      name="basic"
      :model="formState"
      layout="vertical"
      @finish="onCreate"
    >
      <a-form-item
        label="题库"
        name="libIds"
        required
      >
        <a-select
          v-model:value="formState.libIds"
          placeholder="请选择创建到的题库"
          mode="tags"
        >
          <a-select-option
            v-for="item in bankList"
            :key="item.id"
            :value="item.id"
          >
            {{ item.libType }}
          </a-select-option>
        </a-select>
      </a-form-item>

      <a-form-item
        label="题目"
        name="title"
        required
      >
        <a-input v-model:value="formState.title" />
      </a-form-item>

      <a-form-item
        label="标准答案"
        name="standard"
        required
      >
        <CommonMarkdownEditor v-model="formState.standard" />
      </a-form-item>

      <a-row justify="end">
        <a-form-item>
          <a-space>
            <a-button @click="onCancel">
              取消
            </a-button>
            <a-button
              :loading="loading"
              type="primary"
              html-type="submit"
            >
              确定
            </a-button>
          </a-space>
        </a-form-item>
      </a-row>
    </a-form>
  </a-modal>
</template>

<style scoped></style>
