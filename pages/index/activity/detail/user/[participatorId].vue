<script setup>
import { ref, reactive } from 'vue'
import { useRoute } from '#vue-router';
import { getUserSituationsApi } from '~/api/interviewAppointment'
import dayjs from 'dayjs'

const route = useRoute()
const participatorId = route.params?.participatorId
const title = ref(route.query?.title)
const actId = route.query?.actId
const ptcData = ref()

onMounted(() => {
  getUserSituation()
})


const getUserSituation = async () => {
  const res = await getUserSituationsApi(participatorId)
  if (res.code === 200) {
    ptcData.value = res.data
  } else {
    message.error(res.message)
  }
}
</script>

<template>
  <div class="p-4 bg-[#f5f5f5]">
    <a-page-header style="background-color: #fff ;border: 1px solid rgb(235, 237, 240)" :title="title"
      @back="() => navigateTo({path: `/activity/detail/${actId}`, query:{ title: title}})">
      <template #subTitle>
        <a-tag color="green">{{ ptcData?.simpleStudentVO.name }}</a-tag>
      </template>
    </a-page-header>

    <a-list :loading="loading" :grid="{ gutter: 4, column: 1 }" :data-source="ptcData?.questionAnswerVOS"
      class='flex-1 h-full bg-white mt-6 px-5'>
      <template #renderItem="{ item, index }">
        <a-list-item :key="item.id" style="padding: 0 0; margin-bottom: 0; ">
          <div class="rounded-xl p-4 h-[150px]">
            <div v-show="showType === '编辑'" class="flex justify-between items-center">
              <div class="flex">
                <a-tag color="green" class="mr-12">ID: {{ item.id }}</a-tag>
              </div>
              <div>
                <a-space>
                  <div class="text-gray-400">上次修改时间：{{ dayjs(item.createTime).format('YYYY-MM-DD HH:mm:ss') }}</div>
                  <a-popconfirm title="你确定要删除这道题目吗？" @confirm="handleDelete(item.id)">
                    <a-button class="ml-8" danger>删除</a-button>
                  </a-popconfirm>
                </a-space>
              </div>
            </div>
            <div class="mt-2 font-bold text-lg"> {{ index + 1 + '.' }}
              <span class="ml-1">{{ item.title || '--' }}</span>
            </div>
            <div class="mt-4 ml-4">
              <a-typography-paragraph :ellipsis="{rows: 2}" :content="'答案: ' + item.answer" />
            </div>
          </div>
        </a-list-item>
      </template>
    </a-list>
  </div>
</template>

<style scoped></style>