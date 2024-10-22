<script lang="ts" setup>
import { createInterviewApi } from '~/api/interview'
import { applyMeetingApi } from '~/api/interviewAppointment'

const FORMSTATE_DEFAULT_VALUE = {
  title: '',
  description: '本场面试采取飞书会议进行，如有不便请及时联系我们，在面试开始之前，提前熟悉会议环境，保证摄像头，麦克风以及屏幕共享没有问题，期待与你交流！',
  address: ['线上面试']
}

const loading = ref(false)
const scheduleId = ref()
const formState = ref(FORMSTATE_DEFAULT_VALUE)
const meetingState = ref({
  meetingId: '',
  url: '',
  appUrl: ''
})
const modalVisible = ref(false)

const reset = () => {
  formState.value.title = FORMSTATE_DEFAULT_VALUE.title,
  formState.value.description = FORMSTATE_DEFAULT_VALUE.description,
  formState.value.address = FORMSTATE_DEFAULT_VALUE.address,
  meetingState.value.meetingId = '',
  meetingState.value.url = '',
  meetingState.value.appUrl = ''
}

const openModal = (row: any) => {
  scheduleId.value = row.id
  modalVisible .value = true
}

const createInterview = async (values:any) => {
  const data = {
    scheduleId: scheduleId.value,
    title: values.title,
    address: values.address?.join(),
    description: values.description
  }

  loading.value = true
  const res = await createInterviewApi(data)
  if(res.code === 200) {
    message.success('创建成功')
    reset()
    loading.value = false
    modalVisible.value = false
  } else {
    message.error(res.message)
  }

  loading.value = false
}

const applyMeeting = async () => {
  if(!formState.value.title) {
    message.error('请填写面试名称')
    return
  }

  const data = {
    title: formState.value.title
  }

  loading.value = true
  const res = await applyMeetingApi(scheduleId.value, data)
  if(res.code === 200) {
    message.success('申请成功')
    meetingState.value.meetingId = res.data.meetingNo
    meetingState.value.url = res.data.url
    meetingState.value.appUrl = res.data.appLink
  } else {
    message.error(res.message)
  }

  loading.value = false
}

const onCancel = () => {
  reset()
  modalVisible.value = false
}

defineExpose({
  openModal
})


</script>

<template>

  <a-modal :width="600" v-model:open="modalVisible" @cancel="onCancel" title="创建面试" :footer="null">
    <a-form class="mt-6" ref="formRef" :model="formState" name="interview" :label-col="{span: 4}"
      :wrapper-col="{ span: 20 }" @finish="createInterview">
      <a-form-item label="标题" name="title" :rules="[{ required: true, message: '请填写面试标题'}]">
        <a-input v-model:value="formState.title" placeholder="请填写面试标题"></a-input>
      </a-form-item>

      <a-form-item label="地点" name="address" :rules="[{ required: true, message: '请填写面试地点'}]"
        help="线上面试建议将飞书链接放在这里，可供用户查看">
        <!-- <a-input v-model:value="formState.address" placeholder="请填写面试地点"></a-input> -->
        <a-select v-model:value="formState.address" mode="tags" placeholder="请填写面试地点"
          :options="[{ label: '线上面试', value: '线上面试'}, { label: '网安楼9A206', value: '网安楼9A206'}]"></a-select>
      </a-form-item>

      <a-form-item label="描述" name="description" :rules="[{ required: true, message: '请填写面试描述'}]">
        <a-textarea v-model:value="formState.description" :rows="3" placeholder="请填写面试描述" />
      </a-form-item>

      <a-divider>
        预约会议
        <a-tooltip>
          <template #title>
            必须先填写面试名称才能申请会议<br />
            暂不支持自定义会议
          </template>
          <QuestionCircleOutlined />
        </a-tooltip></a-divider>

      <a-form-item label="会议号">
        <a-input :disabled="!formState.title" v-model:value="meetingState.meetingId" placeholder="请填写会议号"></a-input>
      </a-form-item>

      <a-form-item label="URL" help="请自行保存，会议链接有效期至面试预约结束日期">
        <a-input :disabled="!formState.title" v-model:value="meetingState.url" placeholder="请填写跳转地址"></a-input>
      </a-form-item>

      <a-form-item label="APP链接">
        <a-input :disabled="!formState.title" v-model:value="meetingState.appUrl" placeholder="请填写跳转地址"></a-input>
      </a-form-item>

      <a-row justify="end">
        <a-form-item>
          <a-space>
            <a-button :loading="loading" @click="onCancel">取消</a-button>
            <a-button :loading="loading" @click="applyMeeting">申请会议</a-button>
            <a-button :loading="loading" type="primary" html-type="submit">创建</a-button>
          </a-space>
        </a-form-item>
      </a-row>

    </a-form>
  </a-modal>

</template>

<style scoped></style>