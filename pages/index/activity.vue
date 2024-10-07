<script lang="ts" setup>
import { selectSentableUserApi } from '~/api/interviewMessage';
import { createActivityApi, updateActivityApi } from '~/api/recruitActivity';
import { getBatchListAdminApi } from '~/api/recruitBatch';
import type { batchlistResponse } from '~/api/recruitBatch/types';
import { RESUME_STATUES } from '~/constants/resume'

const activityRef = ref<any | {getActivity: Function}>(null)
const loading = ref(false)
const batchList = ref<batchlistResponse[]>([])
const activeKey = ref('1')
const editActivityId = ref()

const formRef = ref()
let formState = reactive({
  batchId: undefined,
  title: '',
  target: {
    anyMatch: {
      grade: [],
      userId: []
    },
    allMatch: {
      status: []
    }
  },
  description: '',
  deadline: ''
})
const modalVisible = ref(false)
const gradeList = ref(new Array(10).fill(2018).map( (item, index) => item + index + 1))
const userList = ref<any>([])

onMounted( () => {
  init()
})

const init = () => {
  getBatchList()
  getUserList()
}

const getBatchList = async () => {
  loading.value = true;
  const res = await getBatchListAdminApi()

  if(res.code === 200) {
    batchList.value = res.data.map( item => {
      return {
        ...item,
        label: item.title,
        value: item.id
      }
    })
  } else {
    message.error(res.message)
  }

  loading.value = false
}

const createActivity = async(values:any) => {
  if(values.target.allMatch === undefined) {
    values.target.allMatch = null
  }

  if(values.target.anyMatch === undefined) {
    values.target.anyMatch = null
  }

  values.deadline = new Date(values.deadline.$d).getTime()
  loading.value = true

  if(editActivityId) {
    delete values.batchId
    values.actId = editActivityId.value
    const res = await updateActivityApi(values)
    if(res.code === 200) {
      message.success('更新成功')
      if(activityRef.value) {
        activityRef.value[0].getActivity()
      }
      resetFormstate()
      editActivityId.value = undefined
      modalVisible.value = false
    } else {
      message.error(res.message)
    }

    loading.value = false
    return
  }

  const res = await createActivityApi(values)
  if(res.code === 200) {
    message.success('创建成功')
    init()
    resetFormstate()
    modalVisible.value = false
  } else {
    message.error(res.message)
  }

  loading.value = false
}

const openModal = async(values:any) => {
  if(values) {
    editActivityId.value = values.id
    values.deadline = undefined

    if(values.target.allMatch === null) {
      values.target.allMatch = {
        status: []
      }
    } else {
      if(values.target.allMatch.status === null) {
        values.target.allMatch.status = []
      }
    }

    if(values.target.anyMatch === null) {
      values.target.anyMatch = {
        grade: [],
        userId: []
      }
    } else {
      if(values.target.anyMatch.grade === null) {
        values.target.anyMatch.grade = []
      }

      if(values.target.anyMatch.userId === null) {
        values.target.anyMatch.userId = []
      }
    }
    delete values.createTime
    delete values.isRun
    delete values.paperId
    delete values.id

    formState = values
  }

  modalVisible.value = true
 }

const resetFormstate = () => {
  formState = {
    batchId: undefined,
    title: '',
    target: {
      anyMatch: {
        grade: [],
        userId: []
      },
      allMatch: {
        status: []
      }
    },
    description: '',
    deadline: ''
  }
}

const getUserList = async() => {
  loading.value = true
  // todo， 只查询第一批次的用户，后续需要调整
  const condition = {
    current: 1,
    pageSize: 100,
    batchId: 1,
  }
  const res = await selectSentableUserApi(condition)
  if(res.code === 200) {
    userList.value = res.data.list
  } else {
    message.error(res.message)
  }

  loading.value = false
}


</script>

<template>
  <div class="p-4">
    <a-page-header style="background-color: #fff; border: 1px solid rgb(235, 237, 240); padding-bottom: 12px;"
      title="活动管理" sub-title="管理某招新批次招新活动" :backIcon="false">
      <template #footer>
        <a-tabs size="small" v-model:activeKey="activeKey">
          <a-tab-pane v-for="(item, index) in batchList" :key="String(index + 1)" :tab="item.title">
            <activity-item ref="activityRef" :openModal="openModal" :batchId="item.id"
              :userList="userList"></activity-item>
          </a-tab-pane>
        </a-tabs>
      </template>
      <template #extra>
        <div class="my-4 pl-2">
          <a-button :loading="loading" @click="openModal(null)" class="flex items-center" type="primary">
            <PlusOutlined />创建
          </a-button>
        </div>
      </template>
      <a-typography-paragraph>
        每个招新批次下可以有多个活动，比如说：某个方向的面试活动、收集某个方向的用户的基本信息，设定活动标题、说明、面向人群、截止时间及可选时间段。
      </a-typography-paragraph>
      <a-typography-paragraph>
        默认活动——学生基本简历信息收集，面向所有用户，无需试卷和时间限制。
      </a-typography-paragraph>
    </a-page-header>
  </div>

  <a-modal :width="600" v-model:open="modalVisible" @cancel="() => modalVisible = false"
    :title="editActivityId ? '活动编辑' : '创建活动'" :confirm-loading="loading" :footer="false">
    <a-form class="mt-6" :ref="formRef" :model="formState" name="activity" :label-col="{span: 4}"
      :wrapper-col="{ span: 20 }" @finish="createActivity">

      <a-form-item label="招新批次" name="batchId" :rules="[{ required: true, message: '请选择招新批次'}]">
        <a-select v-model:value="formState.batchId" placeholder="请选择招新批次" :options="batchList">
        </a-select>
      </a-form-item>

      <a-form-item label="活动标题" name="title" :rules="[{ required: true, message: '请填写活动标题'}]">
        <a-input v-model:value="formState.title" placeholder="请填写活动标题" />
      </a-form-item>

      <a-form-item label="活动描述" name="description" :rules="[{ required: true, message: '请填写活动描述'}]">
        <a-textarea v-model:value="formState.description" :rows="3" placeholder="请填写活动描述" />
      </a-form-item>

      <a-form-item style="width: 100%;" label="截止时间" name="deadline" :rules="[{ required: true, message: '请选择活动截止时间'}]">
        <a-date-picker v-model:value="formState.deadline" show-time type="date" placeholder="请选择活动截止时间" />
      </a-form-item>

      <a-divider style="margin: 32px 0;">面向人群</a-divider>

      <a-form-item label="简历状态" :name="['target', 'allMatch', 'status']"
        :rules="[{ required: false, message: '请选择简历状态'}]">
        <a-select v-model:value="formState.target.allMatch.status" placeholder="请选择简历状态" mode="multiple">
          <a-select-option v-for="(item, index) in Object.values(RESUME_STATUES)" :key="index" :value="item.value">{{
            item.name
            }}</a-select-option>
        </a-select>
      </a-form-item>

      <a-divider style="margin: 32px 0;">特殊人群</a-divider>

      <a-form-item label="年级" :name="['target', 'anyMatch', 'grade']" :rules="[{ required: false, message: '请选择面向年级'}]">
        <a-select v-model:value="formState.target.anyMatch.grade" placeholder="请选择面向年级" mode="multiple">
          <a-select-option v-for="(item, index) in gradeList" :key="index" :value="item">{{
            item
            }}</a-select-option>
        </a-select>
      </a-form-item>

      <a-form-item label="用户" :name="['target', 'anyMatch', 'userId']"
        :rules="[{ required: false, message: '请选择特殊用户'}]">
        <a-select v-model:value="formState.target.anyMatch.userId" placeholder="请选择特殊用户" mode="multiple">
          <a-select-option v-for="(item, index) in userList" :key="index" :value="item.userId">{{
            item.name
            }}</a-select-option>
        </a-select>
      </a-form-item>

      <a-row justify="end">
        <a-form-item>
          <a-space>
            <a-button @click="() => modalVisible = false">取消</a-button>
            <a-button :loading="loading" type="primary" html-type="submit">{{ editActivityId ? '更新' : '创建' }}</a-button>
          </a-space>
        </a-form-item>
      </a-row>

    </a-form>
  </a-modal>
</template>
