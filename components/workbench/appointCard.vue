<script lang="ts" setup>
import { getAllAppointments, getInterviewApmDetailApi, attendCreatedApmApi, exitCreatedApmApi, updateInterviewApmApi, deleteInterviewApmApi } from '~/api/interviewAppointment'
import { createInterviewApi } from '~/api/interview';
import { useUserStore } from '~/stores/modules/userStore'
import { RESUME_STATUES } from '~/constants/resume'
import dayjs from 'dayjs'

const formRef = ref()
const { userInfo } = useUserStore()
const loading = ref(false)
const interviewList = ref()
const editVisible = ref(false)
const selectedRow = ref()
const selectedTime = ref()
const editLoading = ref(false)
const createModalVisible = ref(false)
const formState = ref({
  title: '',
  description: '',
  address: ''
})

onMounted(() => {
  init()
})

const init = async () => {
  await getInterview()
}

const getInterview = async () => {
  loading.value = true
  const res = await getAllAppointments()
  if (res.code === 200) {
    interviewList.value = res.data
  } else {
    message.error(res.message)
  }

  loading.value = false
}

const openEditModal = (row: any) => {
  selectedRow.value = row
  selectedTime.value = [dayjs(row.startTime), dayjs(row.endTime)]
  editVisible.value = true
}

const joinInInterview = async () => {
  editLoading.value = true
  const res = await attendCreatedApmApi(selectedRow.value.id) 
  if(res.code === 200) {
    message.success('加入成功')
    selectedRow.value.interviewerVOList.push({
      username: userInfo.username,
    })
  } else {
    message.error(res.message)
  }

  editLoading.value = false
}

const exitInterview = async () => {
  editLoading.value = true

  const res = await exitCreatedApmApi(selectedRow.value.id)
  if(res.code === 200) {
    message.success('退出成功')
    selectedRow.value.interviewerVOList = selectedRow.value.interviewerVOList.filter(i => i.username!== userInfo.username)
  } else {
    message.error(res.message)
  }

  editLoading.value = false
}

const deleteInterview = async (row: any) => {
  loading.value = true
  const res = await deleteInterviewApmApi(row.id)
  if(res.code === 200) {
    message.success('删除成功')
    interviewList.value = interviewList.value.filter(i => i.id!== row.id)
  } else {
    message.error(res.message)
  }

  loading.value = false
}

const updateTimeRange = async (time:any) => {
  const data = {
    scheduleId: selectedRow.value.id,
    startTime: new Date(time[0].$d).getTime(),
    endTime: new Date(time[1].$d).getTime()
  }
  editLoading.value = true
  const res = await updateInterviewApmApi(data)
  if(res.code === 200) {
    message.success('修改预约时间成功')
    selectedRow.value.startTime = data.startTime
    selectedRow.value.endTime = data.endTime
  } else {
    message.error(res.message)
  }

  editLoading.value = false
}

const closeEditModal = () => {
  selectedRow.value = undefined
  editVisible.value = false
}

const openCreateModal = (row: any) => {
  selectedRow.value = row
  createModalVisible .value = true
}

const createInterview = async (values:any) => {
  const data = {
    scheduleId: selectedRow.value.id,
    title: values.title,
    address: values.address,
    description: values.description
  }

  loading.value = true
  const res = await createInterviewApi(data)
  if(res.code === 200) {
    message.success('创建成功')
    reset()
    createModalVisible .value = false
    init()
  } else {
    message.error(res.message)
  }

  loading.value = false
}

const reset = () => {
  formState.value.title = '',
  formState.value.address = '',
  formState.value.description = ''
}

</script>

<template>

  <div>
    <a-list :loading="loading" :grid="{ gutter: 36, xs: 1, sm: 2, md: 2, lg: 3, xl: 3, xxl: 3 }"
      :data-source="interviewList" :pagination="{hideOnSinglePage: true, pageSize: 6}" class="mt-8 px-3">
      <template #renderItem="{item}">
        <a-list-item style="padding: 0" :key="item.id">
          <a-card @click="null" :headStyle="{padding: '0 12px' }" :body-style="{padding: '12px', width: '100%'}"
            bordered hoverable class="flex flex-col w-full bg-slate-100">
            <div class="flex items-center justify-between w-full mb-4">
              <a-typography-paragraph class="font-bold mr-2" style="margin-bottom: 0;font-size: 18px;"
                :content="item?.simpleStudentVO?.name" />
              <a-tag :color="RESUME_STATUES[item?.simpleStudentVO?.status].color">{{
                RESUME_STATUES[item?.simpleStudentVO?.status].name }}</a-tag>
            </div>
            <div>
              <div class="mb-1">学号: {{ item?.simpleStudentVO?.studentId }}</div>
              <div class="mb-1">专业: {{ item?.simpleStudentVO?.major }}</div>
              <div class="mb-1">班级: {{ item?.simpleStudentVO?.className }}</div>
            </div>

            <div class="flex mb-2">
              <div class="mr-2">面试官: </div>
              <div>
                <a-space>
                  <a-tag color="blue" v-for="interviewer in item.interviewerVOList" :key="interviewer.id">{{
                    interviewer.username }}</a-tag>
                </a-space>
              </div>
            </div>

            <div class="flex mb-2">
              <div class="mr-2 min-w-[60px]">关联面试: </div>
              <div class="flex-1 overflow-scroll">
                <a-space v-if="item?.interviewVOList?.length > 0">
                  <a-tag color="success" v-for="interview in item?.interviewVOList" :key="interview.id">{{
                    interview.title }}</a-tag>
                </a-space>
                <a-tag v-else>
                  暂无
                </a-tag>
              </div>
            </div>

            <div>
              <div class="mb-1">开始时间: {{ dayjs(item.startTime).format('YYYY-MM-DD HH:mm:ss') }}</div>
              <div>结束时间: {{ dayjs(item.endTime).format('YYYY-MM-DD HH:mm:ss') }}</div>
            </div>

            <template #actions>
              <a-tooltip>
                <template #title>
                  <span>编辑</span>
                </template>
                <FormOutlined @click.stop="openEditModal(item)" />
              </a-tooltip>
              <a-tooltip>
                <template #title>
                  <span>创建一场面试</span>
                </template>
                <SolutionOutlined @click.stop="openCreateModal(item)" />
              </a-tooltip>

              <a-tooltip>
                <template #title>
                  <span>删除</span>
                </template>
                <a-popconfirm title="你确定要删除该面试预约吗？" description="不是自己负责的面试预约无法删除" @confirm="deleteInterview(item)">
                  <DeleteOutlined style="color: red" />
                </a-popconfirm>
              </a-tooltip>
            </template>
          </a-card>
        </a-list-item>
      </template>
    </a-list>

    <a-modal :width="600" v-model:open="editVisible" @cancel="closeEditModal" title="编辑" :confirm-loading="loading"
      :footer="null">
      <a-spin :spinning="editLoading">
        <div class="flex my-4">
          <div>面试官：</div>
          <div class="flex">
            <div v-if="selectedRow?.interviewerVOList?.length > 0"
              v-for="interviewer in selectedRow?.interviewerVOList">
              <a-tag :closable="interviewer?.username === userInfo?.username" @close="exitInterview" color="blue"
                :key="interviewer?.managerId">{{
                interviewer.username
                }}</a-tag>
            </div>
            <a-tag v-else>暂无</a-tag>
            <a-button @click.stop="joinInInterview"
              v-show="selectedRow?.interviewerVOList.filter( i => i.username === userInfo.username)?.length === 0"
              class="flex items-center justify-center" type="dashed" size="small">
              <span style="font-size: 12px;">加入</span>
              <PlusOutlined style="font-size: 12px;" />
            </a-button>
          </div>
        </div>

        <div class="flex items-center">
          <div class="mr-2">时间段:</div>
          <div>
            <a-range-picker @change="updateTimeRange" v-model:value="selectedTime" show-time />
          </div>
        </div>
      </a-spin>
    </a-modal>

    <a-modal :width="600" v-model:open="createModalVisible " @cancel="() => {reset(); createModalVisible  = false}"
      title="创建面试" @ok="() => createModalVisible  = false" :footer="null" destroyOnClose>
      <a-form class="mt-6" ref="formRef" :model="formState" name="interview" :label-col="{span: 4}"
        :wrapper-col="{ span: 20 }" @finish="createInterview">
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
              <a-button @click="() => {reset(); createModalVisible  = false}">取消</a-button>
              <a-button :loading="loading" type="primary" html-type="submit">创建</a-button>
            </a-space>
          </a-form-item>
        </a-row>

      </a-form>
    </a-modal>

  </div>

</template>
<style scoped></style>