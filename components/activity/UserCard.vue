<script lang="ts" setup>
import type { PropType } from 'vue'
import type { UserParticipationVO } from '~/api/interviewAppointment/types'
import { RESUME_STATUES } from '~/constants/resume'

const props = defineProps({
  info: {
    type: Object as PropType<UserParticipationVO>,
    default: () => ({}),
    required: true,
  },
  title: {
    type: String,
    default: () => '',
    required: true,
  },
  actId: {
    type: String,
    default: () => '',
    required: true,
  },
})
onMounted(() => {
  init()
})

const userInfo = ref(props?.info.simpleStudentVO)
const init = async () => {
}
</script>

<template>
  <main>
    <div
      class="card py-4 relative flex flex-col items-center min-w-40 h-68 bg-white shadow-lg rounded-2xl m-2 hover:scale-105 transition-all duration-300 ease-in-out"
      @click="navigateTo({ path: `user/${props.info?.participationId}`, query: { title: props.title, actId: props.actId } })"
    >
      <!-- 信息 -->
      <div class="flex flex-col info flex-wrap items-center ">
        <div class="avatar placeholder">
          <div
            class="bg-neutral text-gray-300 w-16 rounded-full"
            :class="{ 'bg-pink-400': userInfo?.gender === 1 }"
            :style="{ color: userInfo?.gender === 1 ? '#fff' : '' }"
          >
            <span class="text-3xl">{{ userInfo?.name[0] }}</span>
          </div>
        </div>
        <h1 class="mb-1 mt-2 font-bold text-xlpo">
          {{ userInfo?.name || '姓名' }}
        </h1>
        <span>
          <a-tag
            style="margin-right: 0px;margin-bottom: 4px;"
            :color="RESUME_STATUES[userInfo?.status].color"
          > {{
            RESUME_STATUES[userInfo?.status].name }} </a-tag>
        </span>
        <span class="text-slate-500 text-sm">{{ `${userInfo?.grade.toString().slice(2)}级${
          userInfo?.major}` || '专业' }}</span>
      </div>
      <!-- bottom -->
      <div class="px-3">
        <!-- 班级 -->
        <div class="my-2">
          <i class="fa-solid fa-briefcase bg-[#ffe7ea] p-2 rounded-full text-pink-500 mr-2" />
          <span class="font-bold text-[13px]">{{ userInfo?.className || '班级' }}</span>
        </div>
        <!-- 学号 -->
        <div class="my-2">
          <i class="fa-solid fa-user bg-[#ffe7ea] p-2 rounded-full text-pink-500 mr-2" />
          <span class="font-bold text-[13px]">{{ userInfo?.studentId || '学号' }}</span>
        </div>
        <!-- email -->
        <div class="my-2">
          <i class="fa-solid fa-envelope bg-[#ffe7ea] p-2 rounded-full text-pink-500 mr-2" />
          <span class="font-bold text-[13px]">{{ userInfo?.email || 'bantang123@mail.com' }}</span>
        </div>
      </div>
    </div>
  </main>
</template>
