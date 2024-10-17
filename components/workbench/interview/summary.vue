<script lang="ts" setup>
import { summarizeInterviewApi, getInterviewSummaryApi } from '~/api/interviewEvaluation'

const props = defineProps({
  interviewId: {
    type: String,
    required: true,
  }
})
const loading = ref(false)
const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
}
const formState = reactive<Record<string, any>>({
  basis: 0,
  coding: 0,
  thiking: 0,
  express: 0,
  evaluate: '', // 总评
  suggest: '', // 建议
  playback: '', // 面试回放
})

onMounted(()=> {
  getSummary()
})

const onFinish = async (values: any) => {
  if(!props.interviewId) return

  loading.value = true
  values.interviewId = props.interviewId
  const res = await summarizeInterviewApi(values)
  if (res.code === 200) {
    message.success('提交成功')
  } else {
    message.error(res.message)
  }

  loading.value = false
};

const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo);
};

const getSummary = async () => {
  if(!props.interviewId) return 

  loading.value = true
  const res = await getInterviewSummaryApi(props.interviewId)
  if (res.code === 200) {
    formState.basis = res.data.basis
    formState.coding = res.data.coding
    formState.thinking = res.data.thinking
    formState.express = res.data.express
    formState.evaluate = res.data.evaluate
    formState.suggest = res.data.suggest
    formState.playback = res.data.playback
  } 

  loading.value = false
}

</script>

<template>

  <a-form :model="formState" name="summary" v-bind="formItemLayout" @finishFailed="onFinishFailed" @finish="onFinish">
    <a-form-item name="basis" label="基础能力" required>
      <a-rate v-model:value="formState.basis" />
    </a-form-item>

    <a-form-item name="coding" label="代码能力" required>
      <a-rate v-model:value="formState.coding" />
    </a-form-item>
    <a-form-item name="thinking" label="思维能力" required>
      <a-rate v-model:value="formState.thinking" />
    </a-form-item>

    <a-form-item name="express" label="表达能力" required>
      <a-rate v-model:value="formState.express" />
    </a-form-item>

    <a-form-item name="playback" label="面试回放">
      <a-input placeholder="请填写面试回放链接" v-model:value="formState.playback" />
    </a-form-item>

    <a-form-item name="suggest" label="建议">
      <a-textarea placeholder="请填写给面试者的建议" :rows="3" v-model:value="formState.suggest" />
    </a-form-item>


    <a-form-item name="evaluate" label="总评" required>
      <a-textarea placeholder="请填写面试总评" :rows="3" v-model:value="formState.evaluate" />
    </a-form-item>

    <a-form-item :wrapper-col="{ span: 12, offset: 12 }">
      <a-button :loading="loading" type="primary" html-type="submit">提交</a-button>
    </a-form-item>
  </a-form>

</template>

<style scoped></style>