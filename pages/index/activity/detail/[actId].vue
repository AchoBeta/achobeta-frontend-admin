<script lang="ts" setup>
import { ref } from 'vue'
import { useRoute } from '#vue-router';
import { selectUserSituationsApi } from '~/api/interviewAppointment'
import type { ActivityJoinSituation } from '~/api/interviewAppointment/types'

const route = useRoute()
const actId = ref<any>(route.params?.actId)
const actTitle = ref(route.query?.title)
const actDetail = ref<ActivityJoinSituation>()
const loading = ref(false)

onMounted(() => {
  getActDetail()
})

const getActDetail = async () => {
  loading.value = true;
  const res = await selectUserSituationsApi({actId: actId.value})
  if (res.code === 200) {
    actDetail.value = res.data
  } else {
    message.error(res.message)
  }

  loading.value = false
}

</script>


<template>
  <div class="flex-1 flex flex-col p-4 bg-bg-base min-h-full">
    <a-page-header style="border: 1px solid rgb(235, 237, 240)" :title="actTitle"
      @back="() => navigateTo({path: '/activity'})">
      <template #extra>
        <a-button @click="getActDetail" type="primary" key="3">刷新</a-button>
      </template>
    </a-page-header>

    <a-spin :spinning="loading">
      <a-list :grid="{ gutter: 16, xs: 1, sm: 2, md: 3, lg: 4, xl: 4, xxl: 4 }"
        :data-source="actDetail?.userParticipationVOS" :pagination="{hideOnSinglePage: true, pageSize: 8}"
        class='flex-1 h-full'>
        <template #renderItem="{ item }">
          <a-list-item :key="item.participationId" style="padding: 12px 0; margin-bottom: 0;">
            <activity-userCard :actId="actId" :title="actTitle" :info="item" />
          </a-list-item>
        </template>
      </a-list>
    </a-spin>
  </div>

</template>

<style scoped></style>