<script lang="ts" setup>
import { getMemInfoListApi } from '~/api/fullMember'
import type { AdminMemInfoData } from '~/api/fullMember/types'
import { getBatchStudentResumeApi } from '~/api/recruitBatch'
import type { ResumeData } from '~/api/recruitBatch/types'

const imgSrc = 'https://obscloud.ulearning.cn/resources/web/1715413452402826.png'
const loading = ref(false)
const interviewers = ref<AdminMemInfoData[]>([])
const interviewee = ref<ResumeData[]>([])
const batchId = ref('1') // 批次id, todo

onMounted(() => {
  init()
})

const init = () => {
  getMember()
  getInterviewers()
}

const getMember = async () => {
  loading.value = true
  const res = await getMemInfoListApi()
  if (res.code === 200)
    interviewers.value = res.data
  else
    message.error(res.message)

  loading.value = false
}

const getInterviewers = async () => {
  loading.value = true
  const res = await getBatchStudentResumeApi(batchId.value)
  if (res.code === 200)
    interviewee.value = res.data
  else
    message.error(res.message)

  loading.value = false
}
</script>

<template>
  <a-spin :spinning="loading">
    <div class="flex-1 min-h-screen bg-[#fbfbfb] w-full flex">
      <!-- 卡片区域 -->
      <div class="left-container w-1/2">
        <div class="p-5 data-cards flex flex-wrap items-start content-start justify-around bg-[#fbfbfb] w-full  pb-10">
          <index-singlecard
            :title="interviewee.length"
            text="面试人数"
            subtext="比去年增长 -100%"
            :icon="imgSrc"
          />
          <index-singlecard
            :title="interviewers.length"
            subtext="比去年增长 +100%"
            text="面试官人数"
            color="#093cbd"
          />
          <index-ringcard />
          <index-ringcard ringcolor="#ff7b6f" />
        </div>
        <!-- 日历 -->
        <div class="calendar px-4 py-5 w-full h-3/5">
          <div class="calendar-header flex justify-between items-center">
            <index-calendar />
          </div>
        </div>
        <!-- <div class="Situation-user p-5 bg-green-200 w-full h-1/5"> </div> -->
      </div>

      <!-- 平滑折线图 -->
      <div class="right-container w-1/2 h-full px-5 my-4 bg-[#fbfbfb]">
        <a-card class="shadow-sm mb-4">
          <div class="bg-white h-2/5 w-full mb-5">
            <index-recruitdata />
          </div>
        </a-card>

        <a-card class="shadow-sm mb-4">
          <div class="bg-white h-2/5 w-full flex flex-row flex-wrap">
            <index-piechart />
          </div>
        </a-card>
      </div>
    </div>
  </a-spin>
</template>

<style scoped>
.events {
  list-style: none;
  margin: 0;
  padding: 0;
}

.events .ant-badge-status {
  overflow: hidden;
  white-space: nowrap;
  width: 100%;
  text-overflow: ellipsis;
  font-size: 12px;
}

.notes-month {
  text-align: center;
  font-size: 28px;
}

.notes-month section {
  font-size: 28px;
}
</style>
