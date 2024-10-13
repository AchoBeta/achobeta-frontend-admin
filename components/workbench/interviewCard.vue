<script lang="ts" setup>
import { getAllInterviewApi, getInterviewDetailApi } from '~/api/interview'
import dayjs from 'dayjs'

const loading = ref(false)
const interviewList = ref()
onMounted(() => {
  init()
})

const init = async () => {
  await getInterview()
}

const getInterview = async () => {
  loading.value = true
  const res = await getAllInterviewApi()
  if (res.code === 200) {
    interviewList.value = res.data
    let index = 0;
     for(let i of res.data) {
       const res = await getInterviewDetailApi(String(i.id))
       interviewList.value[index] = {...interviewList.value[index], ...res.data}
       index++
     }

  } else {
    message.error(res.message)
  }

  loading.value = false
}

</script>

<template>

  <div>
    <a-list :loading="loading" :grid="{ gutter: 36, xs: 1, sm: 2, md: 2, lg: 3, xl: 3, xxl: 3 }"
      :data-source="interviewList" :pagination="{hideOnSinglePage: true}" class="mt-8 px-3">
      <template #renderItem="{item}">
        <a-list-item style="padding: 0" :key="item.id">
          <a-card @click="null" :headStyle="{padding: '0 12px' }" :body-style="{padding: '12px', width: '100%'}"
            bordered hoverable class="flex flex-col w-full bg-slate-100 pl-2">
            <template #title>{{item?.title}}</template>
            <div class="flex justify-between w-full">
              <a-typography-paragraph :ellipsis="{rows:3, tooltip: item?.description}" :content="item?.description" />
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

            </template>
          </a-card>
        </a-list-item>
      </template>
    </a-list>
  </div>

</template>