<script lang="ts" setup>
import { ref } from 'vue'
import { useRoute } from '#vue-router';
import { getAllUserSituations } from '~/api/interviewAppointment'
import type { ActivityJoinSituation } from '~/api/interviewAppointment/types'

const route = useRoute()
const actId = ref<any>(route.params?.actId)
const actTitle = ref(route.query?.title)
const actDetail = ref<ActivityJoinSituation>()
const loading = ref(false)

onMounted(() => {
  getTimeRange()
})

const getTimeRange = async () => {
  loading.value = true;
  const res = await getAllUserSituations(actId.value)
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
        <!-- <a-button @click="openModal(null)" type="primary" key="3">创建</a-button> -->
      </template>
    </a-page-header>
    <a-list :grid="{ gutter: 16, xs: 1, sm: 2, md: 3, lg: 4, xl: 4, xxl: 4 }"
      :data-source="actDetail?.userParticipationVOS" :pagination="{hideOnSinglePage: true}" class='flex-1 h-full'>
      <template #renderItem="{ item }">
        <a-list-item style="padding: 12px 0;margin-bottom: 0;">
          <activity-userCard :actId="actId" :title="actTitle" :info="item" />
        </a-list-item>
      </template>
    </a-list>
  </div>

</template>

<style scoped></style>