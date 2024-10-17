<script lang="ts" setup>
import { getResumeAdminApi } from '~/api/resume'
import { RESUME_STATUES } from '~/constants/resume';
import { useAvatar } from '~/utils/user';

let avatarSrc: string | Ref<string> = ''
let avatarLoading: boolean | Ref<boolean> = false
const loading = ref(false)
const resumeDetail = ref()

onMounted(() => {
  getResumeDetail()
})

const props = defineProps({
  interviewId: {
    type: String,
    required: true,
  },
  resumeId: {
    type: Number,
    required: true,
  }
})

const getResumeDetail = () => {
  if(!props.resumeId) return
  loading.value = true
  getResumeAdminApi({ resumeId: props.resumeId }).then(res => {
    if (res.code === 200) {
      resumeDetail.value = res.data
      const { avatar: imageUrl, loading: imgLoading } = useAvatar(res.data.stuSimpleResumeVO.image)
      avatarSrc = imageUrl
      avatarLoading = imgLoading
    } else {
      message.error(res.message)
    }

    loading.value = false
  })
}


</script>

<template>

  <a-spin :spinning="loading">
    <a-descriptions bordered v-if='resumeDetail'>
      <a-descriptions-item label="姓名" :span="2">{{ resumeDetail.stuSimpleResumeVO.name
        }}</a-descriptions-item>

      <a-descriptions-item label="照片">
        <a-spin :spinning="avatarLoading">
          <a-image :width="120" class="h-24" :src="avatarSrc" alt="avatar" />
        </a-spin>
      </a-descriptions-item>
      <a-descriptions-item label="年级" :span="1">{{ resumeDetail.stuSimpleResumeVO.grade
        }}</a-descriptions-item>

      <a-descriptions-item label="学号">{{ resumeDetail.stuSimpleResumeVO.studentId }}</a-descriptions-item>

      <a-descriptions-item label="性别">{{ resumeDetail.stuSimpleResumeVO.gender == 0 ? '男' : '女'
        }}</a-descriptions-item>

      <a-descriptions-item label="专业">{{ resumeDetail.stuSimpleResumeVO.major }}</a-descriptions-item>
      <a-descriptions-item label="班级" :span="2">{{ resumeDetail.stuSimpleResumeVO.className
        }}</a-descriptions-item>

      <a-descriptions-item label="邮箱" :span="2">{{ resumeDetail.stuSimpleResumeVO.email
        }}</a-descriptions-item>
      <a-descriptions-item label="电话号码">{{ resumeDetail.stuSimpleResumeVO.phoneNumber
        }}</a-descriptions-item>
      <a-descriptions-item label="加入理由" :span="3">{{ resumeDetail.stuSimpleResumeVO.reason
        }}</a-descriptions-item>
      <a-descriptions-item label="简介" :span="3">{{ resumeDetail.stuSimpleResumeVO.introduce
        }}</a-descriptions-item>
      <a-descriptions-item label="经历" :span="3">{{ resumeDetail.stuSimpleResumeVO.experience
        }}</a-descriptions-item>

      <a-descriptions-item label="获奖情况" :span="3">{{ resumeDetail.stuSimpleResumeVO.awards
        }}</a-descriptions-item>
      <a-descriptions-item label="备注" :span="3">{{ resumeDetail.stuSimpleResumeVO.remark
        }}</a-descriptions-item>

      <a-descriptions-item label="状态">
        <div v-for="item in Object.values(RESUME_STATUES)" :key="item.value">
          <div v-if="resumeDetail.stuSimpleResumeVO.status === item.value">
            <a-tag :color="item.color">{{ item.name }}</a-tag>
          </div>
        </div>
      </a-descriptions-item>

    </a-descriptions>
  </a-spin>

</template>

<style scoped></style>