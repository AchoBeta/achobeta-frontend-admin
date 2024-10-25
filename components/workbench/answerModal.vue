<script setup lang="ts">
import { getUserSituationsApi } from '~/api/interviewAppointment'

const answerList = ref<{ id: number, title: string, answer: string }[]>([])
const open = ref(false)// 控制弹窗显示
const pctId = ref()
const loading = ref(false)
const userName = ref('')

const showModal = (id: string) => {
  pctId.value = id
  open.value = true
  getQuestionDetail()
}

const handleOk = () => {
  answerList.value = []
  open.value = false
}

const getQuestionDetail = async () => {
  loading.value = true
  const res = await getUserSituationsApi(pctId.value)
  if (res.code === 200) {
    answerList.value = res.data.questionAnswerVOS
    userName.value = res.data.simpleStudentVO.name
  } else {
    message.error(res.message)
  }

  loading.value = false
}

const modalWidth = () => {
  // 使用 window.innerWidth 获取当前屏幕宽度
  const screenWidth = window.innerWidth

  // 设置断点，例如：768px 通常被认为是平板和移动设备的分界线
  const breakpoint = 768

  // 如果屏幕宽度小于断点，则返回100%，否则返回80%
  return screenWidth < breakpoint ? '80%' : '30%'
}

onMounted(async () => {
})

defineExpose({
  showModal,
  handleOk,
})
</script>

<template>
  <div>
    <a-modal
      v-model:open="open"
      class="custom-modal-width"
      :width="modalWidth()"
      :footer="null"
      @ok="handleOk"
    >
      <template #title>
        <span class="mr-4">问卷填写情况</span><a-tag color="green">
          {{ userName }}
        </a-tag>
      </template>
      <a-spin :spinning="loading">
        <div class="flex flex-col">
          <div
            v-for="(item, index) in answerList"
            :key="index"
            class="w-full mb-2"
          >
            <div class="mb-2 font-bold">
              {{ `${index + 1}.${item.title}` }}
            </div>
            <div>答案：{{ item.answer }}</div>
          </div>
        </div>
      </a-spin>
    </a-modal>
  </div>
</template>

<style scoped></style>
