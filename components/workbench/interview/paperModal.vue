<script lang="ts" setup>
import { getPaeperBankListApi } from '~/api/examPaperBank';
import { getBankExamPaperApi } from '~/api/examPaper';
import { getInterviewQuestionApi } from '~/api/interviewEvaluation'
import { setInterviewPaperApi } from '~/api/interview'

const interviewId = ref()
const paperFormRef = ref()
let paperFormState = reactive<any>({
  paperId: undefined,
  paperBankId: undefined
})
const paperBank = ref<any>([])
const paperVisible = ref(false)
const paperList = ref([])

const openPaperModal = async (item:any) =>{
  interviewId.value = item.id
  getPaperBank()
  const res = await getInterviewQuestionApi(item.id)
  if(res.code === 200) {
    // 回显试卷
    if(res.data) {
        paperList.value.push({
        createTime: '',
        description: '',
        id: res.data.id,
        title: res.data.title,
        updateTime: '',
        label: res.data.title,
        value: res.data.id,
        key: res.data.id
      })
      paperFormState.paperId = res.data.id
    }

  } else {
    if(res.message !== '试卷不存在') message.error(res.message)
  }
  paperVisible.value = true
}

const getPaperBank = async () => {
  const res = await getPaeperBankListApi()
  if(res.code === 200) {
    paperBank.value = res.data
  } else {
    message.error(res.message)
  }
}

const getPaper = async (paperBankId:number) => {
  const condition = {
    current: 1,
    pageSize: 100,
    libId: [paperBankId]
  }

  const res = await getBankExamPaperApi(condition)
  if(res.code === 200) {
    paperList.value = res.data.list
  } else {
    message.error(res.message)
  }
}

const onPaperBankChange = (value: any) => {
  if(!value) return 
  paperFormState.paperId = undefined
  paperFormState.paperBankId = value
  getPaper(value)
}

const onPaperEditCancel = () => {
  paperFormState = { paperBankId: undefined, paperId: undefined }
  paperBank.value = []
  paperList.value = []
  paperVisible.value = false; 
}

const handlePaperEdit = async (values:any) => {
  const condition = {
    interviewId: Number(interviewId.value),
    paperId: values.paperId,
  }

  const res = await setInterviewPaperApi(condition)
  if(res.code === 200) {
    message.success('设置成功')
    paperVisible.value = false
  } else {
    message.error(res.message)
  }
}

defineExpose({
  openPaperModal
})

</script>

<template>

  <a-modal :width="500" v-model:open="paperVisible" @cancel="onPaperEditCancel" title="设置活动问卷"
      @ok="()=> paperVisible = false" ok-text="确定" cancel-text="取消" :footer="null">

      <a-form class="mt-6" ref="paperFormRef" :model="paperFormState" name="paper" :label-col="{span: 4}"
        :wrapper-col="{ span: 20 }" @finish="handlePaperEdit">
        <a-alert class="mb-8" message="重新设置试卷会覆盖原有的试卷，导致试题的打分消失" type="warning" />
        <a-form-item label="试卷库" name="paperBankId" :rules="[{ required: true, message: '请先选择试卷库'}]">
          <a-select v-model:value="paperFormState.paperBankId" placeholder="请选择试卷库" @change="onPaperBankChange">
            <a-select-option v-for="(item, index) in paperBank" :key="index" :value="item.id">
              {{ item.libType }}
            </a-select-option>
          </a-select>
        </a-form-item>

        <a-form-item label="试卷" name="paperId" :rules="[{ required: true, message: '请选择试卷'}]">
          <a-select :disabled="paperList?.length <= 0" v-model:value="paperFormState.paperId" placeholder="请选择试卷">
            <a-select-option v-for="(item, index) in paperList" :key="index" :value="item.id">
              {{ item.title }}
            </a-select-option>
          </a-select>
        </a-form-item>

        <a-row justify="end">
          <a-form-item>
            <a-space>
              <a-button @click="onPaperEditCancel">取消</a-button>
              <a-button type="primary" html-type="submit">设置</a-button>
            </a-space>
          </a-form-item>
        </a-row>

      </a-form>

    </a-modal>

  </template>

<style scoped> </style>