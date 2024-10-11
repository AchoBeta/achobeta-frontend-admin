<script setup lang="ts">
import { getResumeAdminApi } from '~/api/resume';
import type { ResumeRequest } from '~/api/resume/types';
import { getResumeEventsApi } from '~/api/resumeStatus';
import { useAvatar } from '~/utils/user';
import { RESUME_STATUES } from '~/constants/resume';

type eventType = {
  event: number,
  description: string
}

const resumeData = ref();
const open = ref(false);//控制弹窗显示
const eventList = ref<eventType[]>([]);//事件列表
const resumeId = ref()
const userId = ref()
const batchId = ref()
const loading = ref(false)
let avatarSrc: string | Ref<string> = ''
let avatarLoading: boolean | Ref<boolean>  = false

const showModal = (resumeid: string, userid: string, batchid: string) => {
  resumeId.value = resumeid
  userId.value = userid
  batchId.value = batchid
  open.value = true;
  getResumeDetail()
};//弹窗显示函数

const handleOk = (e: MouseEvent) => {
  open.value = false;
};//弹窗确认函数

//获取事件列表
const getresumeEvent = async () => {
  const res = await getResumeEventsApi()
  if (res.code === 200) {
    eventList.value = res.data
  } else {
    message.error(res.message)
  }
}


const handleDownload = (url: string) => {
  window.open(url)
}

const getResumeDetail = async () => {
  loading.value = true

  let data: ResumeRequest = {
    resumeId: Number(resumeId.value),
    queryResumeOfUserDTO: {
      userId: Number(userId.value),
      batchId: Number(batchId.value)
    }
  }

  const res = await getResumeAdminApi(data)
  if(res.code === 200) {
    resumeData.value = res.data;
    const { avatar: imageUrl, loading: imgLoading } = useAvatar(res.data.stuSimpleResumeVO.image)
    avatarSrc = imageUrl
    avatarLoading = imgLoading
  } else {
    message.error(res.message)
  }

  loading.value = false
}
//获取当前屏幕宽度
const modalWidth = () => {
  // 使用 window.innerWidth 获取当前屏幕宽度
  const screenWidth = window.innerWidth;

  // 设置断点，例如：768px 通常被认为是平板和移动设备的分界线
  const breakpoint = 768;

  // 如果屏幕宽度小于断点，则返回100%，否则返回80%
  return screenWidth < breakpoint ? '100%' : '80%';
}


onMounted(async () => {
  getresumeEvent()
})

defineExpose({
  showModal,
  handleOk,
});

</script>

<template>
  <div>
    <a-modal class="custom-modal-width" :width="modalWidth()" footer="" v-model:open="open" title="简历" @ok="handleOk">
      <a-spin :spinning="loading">
        <a-descriptions bordered v-if='resumeData'>

          <a-descriptions-item label="姓名" :span="2">{{ resumeData.stuSimpleResumeVO.name
            }}</a-descriptions-item>

          <a-descriptions-item label="照片">
            <a-spin :spinning="avatarLoading">
              <a-image :width="120" class="h-24" :src="avatarSrc" alt="avatar" />
            </a-spin>
          </a-descriptions-item>
          <a-descriptions-item label="年级" :span="1">{{ resumeData.stuSimpleResumeVO.grade
            }}</a-descriptions-item>

          <a-descriptions-item label="学号">{{ resumeData.stuSimpleResumeVO.studentId }}</a-descriptions-item>

          <a-descriptions-item label="性别">{{ resumeData.stuSimpleResumeVO.gender == 0 ? '男' : '女'
            }}</a-descriptions-item>

          <a-descriptions-item label="专业">{{ resumeData.stuSimpleResumeVO.major }}</a-descriptions-item>
          <a-descriptions-item label="班级" :span="2">{{ resumeData.stuSimpleResumeVO.className
            }}</a-descriptions-item>

          <a-descriptions-item label="邮箱" :span="2">{{ resumeData.stuSimpleResumeVO.email
            }}</a-descriptions-item>
          <a-descriptions-item label="电话号码">{{ resumeData.stuSimpleResumeVO.phoneNumber
            }}</a-descriptions-item>
          <a-descriptions-item label="加入理由" :span="3">{{ resumeData.stuSimpleResumeVO.reason
            }}</a-descriptions-item>
          <a-descriptions-item label="简介" :span="3">{{ resumeData.stuSimpleResumeVO.introduce
            }}</a-descriptions-item>
          <a-descriptions-item label="经历" :span="3">{{ resumeData.stuSimpleResumeVO.experience
            }}</a-descriptions-item>

          <a-descriptions-item label="获奖情况" :span="3">{{ resumeData.stuSimpleResumeVO.awards
            }}</a-descriptions-item>
          <a-descriptions-item label="备注" :span="3">{{ resumeData.stuSimpleResumeVO.remark
            }}</a-descriptions-item>
          <a-descriptions-item label="附件" :span="3">
            <div class="w-full flex flex-col items-start">
              <template v-for="item in resumeData.stuAttachmentVOList">
                <a-button type="link" class="ml-2" @click="handleDownload(item.attachment)">{{ item.filename
                  }}</a-button>
              </template>
            </div>

          </a-descriptions-item>
          <a-descriptions-item label="状态">
            <div v-for="item in Object.values(RESUME_STATUES)" :key="item.value">
              <div v-if="resumeData.stuSimpleResumeVO.status === item.value">
                <a-tag :color="item.color">{{ item.name }}</a-tag>
              </div>
            </div>
          </a-descriptions-item>

        </a-descriptions>
        <a-divider type="horizontal">进程推进及说明</a-divider>
        <resume-status :resumeId="resumeId" :getResumeDetail="getResumeDetail" />
      </a-spin>
    </a-modal>
  </div>
</template>

<style scoped></style>
