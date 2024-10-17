<script lang="ts" setup>
import { updateInterviewApi } from '~/api/interview'

const loading = ref(false)
const formRef = ref()
const interviewId = ref()
const modalVisible = ref(false)
const formState = ref({
  title: '',
  description: '',
  address: ''
})

const openEditModal = (row: any) => {
  if(row) {
    formState.value.title = row.title,
    formState.value.address = row.address,
    formState.value.description = row.description
    interviewId.value = row.id
  }

  modalVisible .value = true
}

const reset = () => {
  formState.value.title = '',
  formState.value.address = '',
  formState.value.description = ''
}

const onCancel = () => {
  reset()
  modalVisible.value = false
}

const handleFinish = async (values:any) => {
  if(!interviewId.value) {
    message.error('请选择面试')
    return
  }

  values.interviewId = interviewId.value
  const res = await updateInterviewApi(values)
  if(res.code === 200) {
    message.success('更新成功')
    onCancel()
  } else {
    message.error(res.message)
  }
}

defineExpose({
  openEditModal,
})

</script>

<template>

  <a-modal :width="600" v-model:open="modalVisible" @cancel="onCancel" title="编辑面试信息" :footer="null" destroyOnClose>
    <a-form class="mt-6" ref="formRef" :model="formState" name="interview" :label-col="{span: 4}"
      :wrapper-col="{ span: 20 }" @finish="handleFinish">
      <a-form-item label="标题" name="title" :rules="[{ required: true, message: '请填写面试标题'}]">
        <a-input v-model:value="formState.title" placeholder="请填写面试标题"></a-input>
      </a-form-item>

      <a-form-item label="地点" name="address" :rules="[{ required: true, message: '请填写面试地点'}]">
        <a-input v-model:value="formState.address" placeholder="请填写面试地点"></a-input>
      </a-form-item>

      <a-form-item label="描述" name="description" :rules="[{ required: true, message: '请填写面试描述'}]">
        <a-textarea v-model:value="formState.description" :rows="3" placeholder="请填写面试描述" />
      </a-form-item>

      <a-row justify="end">
        <a-form-item>
          <a-space>
            <a-button @click="onCancel">取消</a-button>
            <a-button :loading="loading" type="primary" html-type="submit">确认</a-button>
          </a-space>
        </a-form-item>
      </a-row>

    </a-form>
  </a-modal>

</template>

<style scoped></style>