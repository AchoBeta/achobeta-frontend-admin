<script lang="ts" setup>
import { useRoute } from 'vue-router'
import { selectUserSituationsApi } from '~/api/interviewAppointment'
import { RESUME_STATUES } from '~/constants/resume'
import type { ActivityJoinSituation } from '~/api/interviewAppointment/types'
import dayjs from 'dayjs'

const resumeRef = ref()
const answerRef = ref()
const appointRef = ref()
const route = useRoute()
const actId = route.params?.actId
const actTitle = route.query?.title
const batchId = route.query?.batchId
const loading = ref(false)
const actInfo = ref<ActivityJoinSituation>()
const columns = [
  {
    title: '姓名',
    dataIndex: ['simpleStudentVO','name'],
    key: 'name',
    width: 80,
    fixed: true
  },
  {
    title: '简历状态',
    key: 'status',
    dataIndex: ['simpleStudentVO','status'],
    width: 100
  },
  {
    title: '年级',
    key: 'grade',
    dataIndex:['simpleStudentVO','grade'],
    width: 80
  },
  {
    title: '性别',
    key: 'gender',
    dataIndex: ['simpleStudentVO','gender'],
    width: 70
  },
  {
    title: '专业',
    key: 'major',
    dataIndex: ['simpleStudentVO','major'],
    width: 100
  },
  {
    title: '班级',
    key: 'className',
    dataIndex: ['simpleStudentVO','className'],
    width: 120
  },
  {
    title: '已安排时间段',
    key: 'scheduleVOS',
    dataIndex: ['scheduleVOS'],
    width: 150
  },
  {
    title: '参考时间段',
    key: 'timePeriod',
    dataIndex: ['timePeriodVO'],
    width: 350
  },
  {
    title: '邮箱',
    dataIndex: ['simpleStudentVO','email'],
    key: 'email',
  },
  {
    title: '操作',
    key: 'action',
    width: 160,
    fixed: 'right'
  }
]
const condition = ref<{actId: number, statusList: number[] | undefined}>({
  actId: Number(actId),
  statusList: []
})
const statuFilter = ref([])

const getActAllInfo = async () => {
  loading.value = true
  const res = await selectUserSituationsApi(condition.value)
  if (res.code === 200) {
    actInfo.value = res.data
  } else {
    message.error(res.message)
  }

  loading.value = false
}

const openResumeModal = (record:any) => {
  if(resumeRef.value) {
    const {resumeId, userId } = record.simpleStudentVO
    resumeRef.value?.showModal(resumeId, userId, batchId)
  }
}

const openQuestionModal = (record:any) => {
  if(answerRef.value) {
    answerRef.value?.showModal(record.participationId)
  }
}

const openAppointModal = (record:any) => { 
  if(appointRef.value) {
    appointRef.value?.openModal(record)
  }
}

const handleStatuFilter = (value:any) => {
  condition.value.statusList = value.map(Number)
  getActAllInfo()
}

onMounted(() => {
  getActAllInfo()
})
</script>

<template>
  <div class="p-4 bg-[#f5f5f5]">
    <a-page-header style="background-color: #fff;border: 1px solid rgb(235, 237, 240)" :title="actTitle"
      sub-title="管理员先创建面试预约，再根据面试预约创建面试(确定开启面试)" @back="navigateTo('/workbench')">
      <template #extra>
        <a-select v-model:value="statuFilter" mode="multiple" style="width: 200px" placeholder="筛选简历状态"
          @change="handleStatuFilter">
          <a-select-option v-for="item in Object.values(RESUME_STATUES)" :value="item.value">{{ item.name
            }}</a-select-option>
        </a-select>
        <a-button @click="getActAllInfo" type="primary" key="3">刷新</a-button>
      </template>

      <div class="flex w-full mt-4">
        <div class="min-w-[130px]">该活动可选时间段：</div>
        <a-row :gutter="12" class="w-full">
          <a-col class="mb-4" :span="8" v-for="(item, index) in actInfo?.timePeriodCountVOS" :key="index">
            <div class="indicator">
              <a-tag>{{dayjs(item.startTime).format('YYYY-MM-DD HH:mm:ss') }}</a-tag>
              <span class="mr-2">到</span>
              <span class="indicator-item badge badge-secondary">{{ item.count }}</span>
              <a-tag> {{ dayjs(item.endTime).format('YYYY-MM-DD HH:mm:ss') }}</a-tag>
            </div>
          </a-col>
        </a-row>
      </div>
    </a-page-header>

    <a-table class="mt-4" :loading="loading" :columns="columns as any" :data-source="actInfo?.userParticipationVOS"
      :scroll="{ x: 1500 }">
      <template #bodyCell="{ column, record }">

        <template v-if="column.key === 'gender'">
          <a-tag color="pink" v-if="record.simpleStudentVO.gender === 1">女</a-tag>
          <a-tag color="blue" v-else>男</a-tag>
        </template>

        <template v-if="column.key === 'status'">
          <a-tag :color="RESUME_STATUES[record.simpleStudentVO.status].color">{{
            RESUME_STATUES[record.simpleStudentVO.status].name }}</a-tag>
        </template>

        <template v-if="column.key === 'timePeriod'">
          <a-space class="mb-2" v-for="(item,index) in record.timePeriodVOS" :key="index">
            <a-tag>{{ item.startTime }}</a-tag>
            <span>到</span>
            <a-tag>{{ item.endTime }}</a-tag>
          </a-space>
        </template>

        <template v-if="column.key === 'scheduleVOS'">
          <div class="mb-4" v-for="(item,index) in record.scheduleVOS">
            <a-space :wrap="true" :key="index">
              <a-tag :color="RESUME_STATUES[index].color">{{ item.startTime }}</a-tag>
              <a-tag :color="RESUME_STATUES[index].color">{{ item.endTime }}</a-tag>
            </a-space>
          </div>
        </template>

        <template v-if="column.key === 'action'">
          <a-space>
            <a style="color: #1890ff" @click="openQuestionModal(record)">问卷</a>
            <a style="color: #1890ff" @click="openResumeModal(record)">简历</a>
            <a style="color: #1890ff" @click="openAppointModal(record)">预约管理</a>
          </a-space>
        </template>

      </template>
    </a-table>

    <resume-editModal ref="resumeRef" />
    <workbench-answerModal ref="answerRef" />
    <workbench-appointModal ref="appointRef" />
  </div>

</template>

<style scoped></style>