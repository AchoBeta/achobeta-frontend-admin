<script lang="ts" setup>
import dayjs from 'dayjs'
import { attendCreatedApmApi, deleteInterviewApmApi, exitCreatedApmApi, getAllAppointments, getCurInterviewApmApi, updateInterviewApmApi } from '~/api/interviewAppointment'
import { getBatchListAdminApi } from '~/api/recruitBatch'
import { getActivityApi } from '~/api/recruitActivity'
import { useUserStore } from '~/stores/modules/userStore'
import { RESUME_STATUES } from '~/constants/resume'

const createRef = ref()
const { userInfo } = useUserStore()
const loading = ref(false)
const interviewList = ref()
const editVisible = ref(false)
const selectedRow = ref()
const selectedTime = ref()
const editLoading = ref(false)
const appointOptions = ref([{
  id: 1,
  title: '所有面试',
}, {
  id: 2,
  title: '与我相关',
}])
const selectedAppointId = ref(1)
const selectedType = ref<boolean[]>([true, false])
const batchList = ref()
const actList = ref()
const condition = ref({
  batchId: undefined,
  actId: undefined,
})

watch(selectedAppointId, async (val, oldVal) => {
  if (val === oldVal)
    return

  selectedType.value = appointOptions.value.map((item: any) => item.id === val)
  if (selectedAppointId.value === 2)
    await getMyAppoint()
  else
    await getAllAppoint()
})

const handleTypeChange = (tag: any, checked: boolean) => {
  if (checked)
    selectedAppointId.value = tag.id
}

onMounted(() => {
  init()
})

const init = () => {
  getAllAppoint()
  getBatch()
}

const getMyAppoint = async () => {
  loading.value = true
  const res = await getCurInterviewApmApi(condition.value)
  if (res.code === 200)
    interviewList.value = res.data
  else
    message.error(res.message)

  loading.value = false
}

const getAllAppoint = async () => {
  loading.value = true
  const res = await getAllAppointments(condition.value)
  if (res.code === 200)
    interviewList.value = res.data
  else
    message.error(res.message)

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
  if (res.code === 200) {
    message.success('加入成功')
    selectedRow.value.interviewerVOList.push({
      username: userInfo.username,
    })
  }
  else {
    message.error(res.message)
  }

  editLoading.value = false
}

const exitInterview = async () => {
  editLoading.value = true

  const res = await exitCreatedApmApi(selectedRow.value.id)
  if (res.code === 200) {
    message.success('退出成功')
    selectedRow.value.interviewerVOList = selectedRow.value.interviewerVOList.filter((i: any) => i.username !== userInfo.username)
  }
  else {
    message.error(res.message)
  }

  editLoading.value = false
}

const deleteInterview = async (row: any) => {
  loading.value = true
  const res = await deleteInterviewApmApi(row.id)
  if (res.code === 200) {
    message.success('删除成功')
    interviewList.value = interviewList.value.filter((i: any) => i.id !== row.id)
  }
  else {
    message.error(res.message)
  }

  loading.value = false
}

const updateTimeRange = async (time: any) => {
  const data = {
    scheduleId: selectedRow.value.id,
    startTime: new Date(time[0].$d).getTime(),
    endTime: new Date(time[1].$d).getTime(),
  }
  editLoading.value = true
  const res = await updateInterviewApmApi(data)
  if (res.code === 200) {
    message.success('修改预约时间成功')
    selectedRow.value.startTime = data.startTime
    selectedRow.value.endTime = data.endTime
  }
  else {
    message.error(res.message)
  }

  editLoading.value = false
}

const closeEditModal = () => {
  selectedRow.value = undefined
  editVisible.value = false
}

const openCreateModal = (row: any) => {
  if (createRef.value)
    createRef.value.openModal(row)
}

const getBatch = async () => {
  loading.value = true
  const res = await getBatchListAdminApi()
  if (res.code === 200)
    batchList.value = res.data
  else
    message.error(res.message)

  loading.value = false
}

const onBatchChange = async (value: any) => {
  if (!value)
    return

  handleFilter()
  loading.value = true
  const res = await getActivityApi(value)
  if (res.code === 200)
    actList.value = res.data
  else
    message.error(res.message)

  loading.value = false
}

const handleFilter = () => {
  if (selectedAppointId.value === 1)
    getAllAppoint()
  else
    getMyAppoint()
}
</script>

<template>
  <header class="flex mt-4 mx-4">
    <div class="flex min-w-[380px]">
      <div class="mr-4 text-[16px]">
        预约筛选：
      </div>
      <a-space>
        <a-checkable-tag
          v-for="(item, index) in appointOptions"
          :key="item.id"
          style="font-size: 14px; padding: 2px 6px"
          :checked="selectedType[index]"
          @change="checked => handleTypeChange(item, checked)"
        >
          {{ item.title }}
        </a-checkable-tag>
      </a-space>
    </div>

    <div class="flex-1">
      <a-select
        v-model:value="condition.batchId"
        allow-clear
        placeholder="请选择招新批次"
        style="width: 90%"
        @change="onBatchChange"
      >
        <a-select-option
          v-for="item in batchList"
          :key="item.id"
          :value="item.id"
        >
          {{ item.title }}
        </a-select-option>
      </a-select>
    </div>
    <div class="flex-1">
      <a-select
        v-model:value="condition.actId"
        allow-clear
        :disabled="batchList?.length <= 0"
        placeholder="请选择活动"
        style="width: 90%"
        @change="handleFilter"
      >
        <a-select-option
          v-for="item in actList"
          :key="item.id"
          :value="item.id"
        >
          {{ item.title }}
        </a-select-option>
      </a-select>
    </div>
  </header>

  <div>
    <a-list
      :loading="loading"
      :grid="{ gutter: 36, xs: 1, sm: 2, md: 2, lg: 3, xl: 3, xxl: 3 }"
      :data-source="interviewList"
      :pagination="{ hideOnSinglePage: true, pageSize: 6 }"
      class="mt-8 px-3"
    >
      <template #renderItem="{ item }">
        <a-list-item
          :key="item.id"
          style="padding: 0"
        >
          <a-card
            :head-style="{ padding: '0 12px' }"
            :body-style="{ padding: '12px', width: '100%' }"
            bordered
            hoverable
            class="flex flex-col w-full bg-slate-100"
            @click="null"
          >
            <div class="flex items-center justify-between w-full mb-4">
              <a-typography-paragraph
                class="font-bold mr-2"
                style="margin-bottom: 0;font-size: 18px;"
                :content="item?.simpleStudentVO?.name"
              />
              <a-tag :color="RESUME_STATUES[item?.simpleStudentVO?.status].color">
                {{
                  RESUME_STATUES[item?.simpleStudentVO?.status].name }}
              </a-tag>
            </div>
            <div>
              <div class="mb-1">
                学号: {{ item?.simpleStudentVO?.studentId }}
              </div>
              <div class="mb-1">
                专业: {{ item?.simpleStudentVO?.major }}
              </div>
              <div class="mb-1">
                班级: {{ item?.simpleStudentVO?.className }}
              </div>
            </div>

            <div class="flex mb-2">
              <div class="mr-2">
                面试官:
              </div>
              <div class="overflow-scroll">
                <a-space>
                  <a-tag
                    v-for="interviewer in item.interviewerVOList"
                    :key="interviewer.id"
                    color="blue"
                  >
                    {{
                      interviewer.username }}
                  </a-tag>
                </a-space>
              </div>
            </div>

            <div class="flex mb-2">
              <div class="mr-2 min-w-[60px]">
                关联面试:
              </div>
              <div class="flex-1 overflow-scroll">
                <a-space v-if="item?.interviewVOList?.length > 0">
                  <a-tag
                    v-for="interview in item?.interviewVOList"
                    :key="interview.id"
                    color="success"
                  >
                    {{
                      interview.title }}
                  </a-tag>
                </a-space>
                <a-tag v-else>
                  暂无
                </a-tag>
              </div>
            </div>

            <div>
              <div class="mb-1">
                开始时间: {{ dayjs(item.startTime).format('YYYY-MM-DD HH:mm:ss') }}
              </div>
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
                <a-popconfirm
                  title="你确定要删除该面试预约吗？"
                  description="不是自己负责的面试预约无法删除"
                  @confirm="deleteInterview(item)"
                >
                  <DeleteOutlined style="color: red" />
                </a-popconfirm>
              </a-tooltip>
            </template>
          </a-card>
        </a-list-item>
      </template>
    </a-list>

    <a-modal
      v-model:open="editVisible"
      :width="600"
      title="编辑"
      :confirm-loading="loading"
      :footer="null"
      @cancel="closeEditModal"
    >
      <a-spin :spinning="editLoading">
        <div class="flex my-4">
          <div>面试官：</div>
          <div class="flex">
            <div
              v-for="interviewer in selectedRow?.interviewerVOList"
              :key="interviewer?.managerId"
            >
              <template v-if="selectedRow?.interviewerVOList?.length > 0">
                <a-tag
                  :key="interviewer?.managerId"
                  :closable="interviewer?.username === userInfo?.username"
                  color="blue"
                  @close="exitInterview"
                >
                  {{
                    interviewer.username
                  }}
                </a-tag>
              </template>
              <a-tag v-else>
                暂无
              </a-tag>
            </div>

            <a-button
              v-show="selectedRow?.interviewerVOList.filter((i:any) => i.username === userInfo.username)?.length === 0"
              class="flex items-center justify-center"
              type="dashed"
              size="small"
              @click.stop="joinInInterview"
            >
              <span style="font-size: 12px;">加入</span>
              <PlusOutlined style="font-size: 12px;" />
            </a-button>
          </div>
        </div>

        <div class="flex items-center">
          <div class="mr-2">
            时间段:
          </div>
          <div>
            <a-range-picker
              v-model:value="selectedTime"
              show-time
              @change="updateTimeRange"
            />
          </div>
        </div>
      </a-spin>
    </a-modal>

    <workbench-appoint-createModal ref="createRef" />
  </div>
</template>

<style scoped></style>
