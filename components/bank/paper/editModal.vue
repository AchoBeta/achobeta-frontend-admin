<script lang="ts" setup>
import { getQuestionDetailApi, updateQuestionApi } from '~/api/question'
import { getQuestionBankListApi } from '~/api/questionBank'

const props = defineProps({
  refresh: {
    type: Function,
    default: () => {},
    require: true,
  },
})
const loading = ref(false)
const editRef = ref()
const questionId = ref()
const modalVisible = ref(false)
const libIds = ref<any>([])
const formState = reactive({
  libIds: [],
  title: '',
  standard: '',
})

const openModal = (item: any) => {
  questionId.value = item.id
  if (item) {
    formState.title = item.title
    formState.standard = item.standard
    getLibIds()
    getBindedLibIds(item.id)
  }

  modalVisible.value = true
}

const onCancel = () => {
  formState.libIds = []
  formState.title = ''
  formState.standard = ''
  libIds.value = []
  modalVisible.value = false
}

const onEdit = async (values: any) => {
  loading.value = true
  const res = await updateQuestionApi(questionId.value, values)
  if (res.code === 200) {
    message.success('更新成功!')
    props.refresh()
  } else {
    message.error(res.message)
  }

  loading.value = false
  modalVisible.value = false
}

// 获取题目关联的题库
const getLibIds = async () => {
  loading.value = true
  const res = await getQuestionBankListApi()
  if (res.code === 200)
    libIds.value = res.data
  else
    message.error(res.message)

  loading.value = false
}

// 获取题目已绑定的题库
const getBindedLibIds = async (questionId: number) => {
  loading.value = true
  const res = await getQuestionDetailApi(questionId)
  if (res.code === 200)
    formState.libIds = res.data.types.map((item: any) => item.id) as any
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
    title="编辑试题"
    :confirm-loading="loading"
    :footer="null"
    @cancel="onCancel"
  >
    <a-form
      ref="editRef"
      class="mt-12"
      name="basic"
      :model="formState"
      autocomplete="on"
      layout="vertical"
      @finish="onEdit"
    >
      <a-form-item
        label="所属题库"
        name="libIds"
        required
      >
        <a-select
          v-model:value="formState.libIds"
          placeholder="请选择所属题库"
          mode="multiple"
        >
          <a-select-option
            v-for="(item, index) in libIds"
            :key="index"
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
