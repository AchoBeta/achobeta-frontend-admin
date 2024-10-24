<script lang="ts" setup>
import { getBatchListAdminApi } from '~/api/recruitBatch'
import { getActivityApi } from '~/api/recruitActivity'
import { getInterviewSituationApi } from '~/api/interviewEvaluation'
import { INTERVIEW_STATUS } from '~/constants/interview'

const loading = ref(false)
const interviewList = ref()
const batchList = ref()
const actList = ref()
const condition = ref({
  batchId: undefined,
  actId: undefined,
})

onMounted(() => {
  init()
})

const init = () => {
  getInterview()
  getBatch()
}

const getInterview = async () => {
  loading.value = true
  const res = await getInterviewSituationApi(condition.value)
  if (res.code === 200)
    interviewList.value = res.data
  else
    message.error(res.message)

  loading.value = false
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

  getInterview()
  loading.value = true
  const res = await getActivityApi(value)
  if (res.code === 200)
    actList.value = res.data
  else
    message.error(res.message)

  loading.value = false
}
</script>

<template>
  <header class="flex mt-4 mx-4">
    <div />
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
        @change="getInterview"
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
                :content="item?.title"
              />
              <a-tag :color="INTERVIEW_STATUS[item?.status].color">
                {{
                  INTERVIEW_STATUS[item?.status].name }}
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
              <div class="mb-1">
                邮箱: {{ item?.simpleStudentVO?.email }}
              </div>
            </div>

            <div class="text-md font-bold">
              综合得分：{{ item.sum || '暂未评分' }}
            </div>
          </a-card>
        </a-list-item>
      </template>
    </a-list>
  </div>
</template>

<style scoped></style>
