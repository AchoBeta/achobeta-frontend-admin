<script lang="ts" setup>
import { getAllInterviewApi, getMyInterviewApi } from '~/api/interview'
import { INTERVIEW_STATUS } from '~/constants/interview';
import dayjs from 'dayjs'

const paperModalRef = ref()
const editModalRef = ref()
const loading = ref(false)
const interviewList = ref()
const interviewOptions = ref([{
  id: 1,
  title: '所有面试'
}, {
  id: 2,
  title: '与我相关'
}])
const selectedId = ref(1)
const selectedType = ref<boolean[]>([true,false])

watch(selectedId, async (val, oldVal) => {
  if (val === oldVal ) return

  selectedType.value =  interviewOptions.value.map((item: any) => item.id === val)
  if(selectedId.value === 2) {
    await getMyInterview()
  } else {
    await getAllInterview()
  }
})

onMounted(() => {
  init()
})

const init = async () => {
  await getAllInterview()
}

const handleChange = (tag: any, checked: boolean) => {
  if(checked) {
    selectedId.value = tag.id
  } else {
    return
  }
};

const getAllInterview = async () => {
  loading.value = true
  const res = await getAllInterviewApi()
  if (res.code === 200) {
    interviewList.value = res.data
  } else {
    message.error(res.message)
  }

  loading.value = false
}

const getMyInterview = async () => {
  loading.value = true
  const res = await getMyInterviewApi()
  if (res.code === 200) {
    interviewList.value = res.data
  } else {
    message.error(res.message)
  }

  loading.value = false
}

const openEditModal = (item: any) => {
  if(editModalRef.value) {
    editModalRef.value.openEditModal(item)
  }
}

const openPaperModal = (item: any) => {
  if(paperModalRef.value) {
    paperModalRef.value.openPaperModal(item)
  }
}

</script>

<template>

  <header>
    <div class="flex mt-4 ml-4">
      <div class="mr-4 text-[16px]">面试筛选：</div>
      <a-space>
        <a-checkable-tag style="font-size: 14px; padding: 2px 6px" v-for="(item, index) in interviewOptions"
          :key="item.id" :checked="selectedType[index]" @change="checked => handleChange(item, checked)">
          {{ item.title }}</a-checkable-tag>
      </a-space>
    </div>
  </header>

  <div>
    <a-list :loading="loading" :grid="{ gutter: 36, xs: 1, sm: 2, md: 2, lg: 3, xl: 3, xxl: 3 }"
      :data-source="interviewList" :pagination="{hideOnSinglePage: true}" class="mt-8 px-3">
      <template #renderItem="{item}">
        <a-list-item style="padding: 0" :key="item.id">
          <a-card @click="null" :headStyle="{padding: '0 12px' }" :body-style="{padding: '12px', width: '100%'}"
            bordered hoverable class="flex flex-col w-full bg-slate-100">

            <template #title>
              <div class="flex justify-between">
                <span>{{item?.title}}</span>
                <a-tag style="font-weight: normal;"
                  :color="INTERVIEW_STATUS[item?.status as keyof typeof INTERVIEW_STATUS].color">{{
                  INTERVIEW_STATUS[item?.status as keyof typeof INTERVIEW_STATUS].name }}</a-tag>
              </div>
            </template>

            <div>
              <div class="mb-1">姓名: <a-tag color="blue">{{ item?.simpleStudentVO?.name }}</a-tag></div>
              <div class="mb-1">学号: {{ item?.simpleStudentVO?.studentId }}</div>
              <div class="mb-1">专业: {{ item?.simpleStudentVO?.major }}</div>
            </div>

            <div class="flex justify-between w-full">
              <a-typography-paragraph style="min-height: 40.5px;margin-bottom: 10px"
                :ellipsis="{rows:2, tooltip: item?.description}" :content="'描述：' +  item?.description" />
            </div>

            <div class="flex mb-2">
              <div class="mr-2">地址: </div>
              <div>
                {{ item?.address}}
              </div>
            </div>

            <div>
              <div class="mb-1">开始时间: {{ dayjs(item.startTime).format('YYYY-MM-DD HH:MM') }}</div>
              <div>结束时间: {{ dayjs(item.endTime).format('YYYY-MM-DD HH:MM') }}</div>
            </div>

            <template #actions>
              <a-tooltip>
                <template #title>
                  <span>编辑面试信息</span>
                </template>
                <FormOutlined @click.stop="openEditModal(item)" />
              </a-tooltip>
              <a-tooltip>
                <template #title>
                  <span>设置面试试卷</span>
                </template>
                <ContainerOutlined @click.stop="openPaperModal(item)" />
              </a-tooltip>
            </template>
          </a-card>
        </a-list-item>
      </template>
    </a-list>

    <a-modal>

    </a-modal>

    <workbench-interview-editInterviewModal ref="editModalRef" />
    <workbench-interview-paperModal ref="paperModalRef" />

  </div>

</template>