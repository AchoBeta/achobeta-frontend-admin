<script lang="ts" setup>
import { useRoute } from 'vue-router'
import { Modal } from 'ant-design-vue'
import { executeInterviewEventApi, getInterviewDetailApi } from '~/api/interview'
import type { InterviewDetail } from '~/api/interview/types'
import { INTERVIEW_EVENT, INTERVIEW_STATUS } from '~/constants/interview'

const loading = ref(false)
const router = useRoute()
const interviewId = router?.params.interviewId as string
const isDocumentAvailable = ref(false)
const anchorList = [
  {
    key: 'overview',
    href: '#overview',
    title: '面试概览',
  },
  {
    key: 'resume',
    href: '#resume',
    title: '面试者简历',
  },
  {
    key: 'questionnaire',
    href: '#questionnaire',
    title: '面试者问卷',
  },
  {
    key: 'paper',
    href: '#paper',
    title: '参考试卷',
  },
  {
    key: 'comment',
    href: '#comment',
    title: '评论区',
  },
  {
    key: 'summary',
    href: '#summary',
    title: '面试总结',
  },
]
const interviewDetail = ref<InterviewDetail>()

onMounted(() => {
  getInterview()
  isDocumentAvailable.value = true
})

const getInterview = async () => {
  loading.value = true
  const res = await getInterviewDetailApi(interviewId as string)
  if (res.code === 200)
    interviewDetail.value = res.data
  else
    message.error(res.message)

  loading.value = false
}

const handleInterviewEvent = (data: any) => {
  Modal.confirm({
    title: `你确定要执行${data.name}事件吗?`,
    content: data.key > 3 ? '此操作会向用户发送邮件通知，请谨慎执行，邮件推送可能会有延迟。部分事件具有前置条件，不满足前置条件无法执行' : '',
    onOk: () => {
      executeEvent(data.key)
    },
  })
}

const executeEvent = async (key: number) => {
  loading.value = true
  const res = await executeInterviewEventApi(key, interviewId)
  if (res.code === 200) {
    message.success('执行成功')
    getInterview()
  } else {
    if (res.message === '面试状态流转失败')
      message.error('请确保面试已经结束')
    else
      message.error(res.message)
  }

  loading.value = false
}

const info = () => {
  Modal.info({
    width: 500,
    title: '面试事件说明',
    content: h('div', {}, [
      h('p', '1. 面试开始、面试结束、面试重新开始是面试状态流转事件'),
      h('p', '2. 面试通知、面试总结、面试经历是邮件通知事件，触发后会给用户发送邮件'),
      h('p', '3. 面试经历是向用户发送试卷上每道题的回答情况，包括参考答案，供用户回顾反思'),
      h('p', '4. 面试官首先确认面试者信息，然后可以自行更改参考试卷内容。准备好以后通知面试者面试。面试结束后，填写完面试总结再执行面试总结事件。'),
    ]),
  })
}

const extractLinks = (text: string | undefined) => {
  if (!text)
    return []
  // 正则表达式匹配 http 或 https 链接
  const regex = /(https?:\/\/[^\s]+)/g
  // 使用 match 方法返回匹配的数组
  const links = text?.match(regex)
  return links || []
}
</script>

<template>
  <div style="background-color: #f5f5f5;">
    <a-anchor class="fixed w-40 top-20 right-10">
      <a-anchor-link
        v-for="item in anchorList"
        :key="item.key"
        :href="item.href"
        :title="item.title"
      />
    </a-anchor>

    <div class="fixed right-20 top-80">
      <a-affix
        v-for="item in Object.values(INTERVIEW_EVENT)"
        :key="item.key"
        class="mb-4"
      >
        <a-button
          type="dashed"
          @click="handleInterviewEvent(item)"
        >
          {{ item.name }}
        </a-button>
      </a-affix>
      <a-button
        class="flex justify-center items-center ml-6"
        type="dashed"
        shape="circle"
        @click="info"
      >
        <template #icon>
          <QuestionCircleOutlined style="font-size: 24px;" />
        </template>
      </a-button>
    </div>

    <div
      id="overview"
      class="w-[calc(100vw-27rem)] p-4"
    >
      <div class="w-[90%] bg-white mx-auto p-4 rounded-lg">
        <!-- 面试概览 -->
        <div class="mb-12 pt-2">
          <a-page-header
            style="width: 100%"
            @back="() => navigateTo({ path: '/workbench' })"
          >
            <template #title>
              <div class="flex items-center">
                <div class="mr-4">
                  {{ interviewDetail?.title }}
                </div>
                <a-tag :color="INTERVIEW_STATUS[interviewDetail?.status as keyof typeof INTERVIEW_STATUS]?.color">
                  {{ INTERVIEW_STATUS[interviewDetail?.status as keyof typeof INTERVIEW_STATUS]?.name }}
                </a-tag>
              </div>
            </template>
            <div class="text-gray-500 pl-4">
              <div class="text-sm mb-1">
                面试人：{{ interviewDetail?.simpleStudentVO.name }}
              </div>
              <div class="text-sm mb-1">
                专业：{{ interviewDetail?.simpleStudentVO.major }}
              </div>
              <div class="text-sm mb-1">
                班级：{{ interviewDetail?.simpleStudentVO.className }}
              </div>
              <div class="text-sm mb-1">
                地址：
                <a
                  :href="extractLinks(interviewDetail?.address)[0] || '#'"
                  target="_blank"
                >{{ interviewDetail?.address
                }}</a>
              </div>
              <div class="text-sm mb-1">
                描述：{{ interviewDetail?.description }}
              </div>
            </div>
          </a-page-header>
        </div>

        <!-- 简历 -->
        <a-divider
          id="resume"
          style="font-weight: bold; font-size: 20px; padding-top: 4rem;"
        >
          简历
        </a-divider>
        <div
          v-if="interviewDetail?.simpleStudentVO.resumeId"
          style="margin: 50px 0;"
        >
          <workbench-interview-resume
            :interview-id="interviewId"
            :resume-id="interviewDetail?.simpleStudentVO.resumeId"
          />
        </div>

        <!-- 问卷 -->
        <a-divider
          id="questionnaire"
          style="font-weight: bold; font-size: 20px; padding-top: 4rem;"
        >
          问卷
        </a-divider>
        <div
          v-if=" interviewDetail?.scheduleVO.participationId"
          style="margin: 50px 0;"
        >
          <workbench-interview-questionnaire :participation-id="interviewDetail?.scheduleVO.participationId" />
        </div>

        <!-- 试卷 -->
        <a-divider
          id="paper"
          style="font-weight: bold; font-size: 20px; padding-top: 4rem;"
        >
          参考试卷
        </a-divider>
        <div>
          <workbench-interview-paper :interview-id="interviewId" />
        </div>

        <!-- 评论区 -->
        <a-divider
          id="comment"
          style="font-weight: bold; font-size: 20px; padding-top: 4rem;"
        >
          评论区
        </a-divider>
        <div>
          <workbench-interview-comment :interview-id="interviewId" />
        </div>

        <!-- 面试总结 -->
        <a-divider
          id="summary"
          style="font-weight: bold; font-size: 20px;
        "
        >
          面试总结
        </a-divider>
        <div>
          <workbench-interview-summary :interview-id="interviewId" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
