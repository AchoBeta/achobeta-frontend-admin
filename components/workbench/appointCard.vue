<script lang="ts" setup>
import { getAllAppointments, getInterviewApmDetailApi, attendCreatedApmApi, exitCreatedApmApi, updateInterviewApmApi } from '~/api/interviewAppointment'
import { useUserStore } from '~/stores/modules/userStore'
import { RESUME_STATUES } from '~/constants/resume';

import dayjs from 'dayjs'

const { userInfo } = useUserStore()
const loading = ref(false)
const interviewList = ref()
const editVisible = ref(false)
const selectedRow = ref()
const selectedTime = ref()
const editLoading = ref(false)
const createModal= ref(false)

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
    let index = 0;
     for(let i of res.data) {
       const res = await getInterviewApmDetailApi(String(i.id))
       interviewList.value[index] = {...interviewList.value[index], ...res.data}
       index++
     }

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
  createModal.value = true
}

</script>

<template>

  <div>
    <a-list :loading="loading" :grid="{ gutter: 36, xs: 1, sm: 2, md: 2, lg: 3, xl: 3, xxl: 3 }"
      :data-source="interviewList" :pagination="{hideOnSinglePage: true}" class="mt-8 px-3">
      <template #renderItem="{item}">
        <a-list-item style="padding: 0" :key="item.id">
          <a-card @click="null" :headStyle="{padding: '0 12px' }" :body-style="{padding: '12px', width: '100%'}"
            bordered hoverable class="flex flex-col w-full bg-slate-100">
            <div class="flex items-center w-full mb-4">
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
              <div class="mr-2">关联面试: </div>
              <div>
                <a-space v-if="item?.interviewVOList?.length > 0" direction="vertical">
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

    <a-modal :width="600" v-model:open="createModal" @cancel="() => createModal = false" title="创建面试"
      @ok="() => createModal = false" :footer="null">

    </a-modal>

  </div>

</template>
<style scoped></style>