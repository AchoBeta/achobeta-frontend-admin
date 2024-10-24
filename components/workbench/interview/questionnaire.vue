<script setup>
import dayjs from 'dayjs'
import { getUserSituationsApi } from '~/api/interviewAppointment'

const props = defineProps({
  participationId: {
    type: Number,
    required: true,
  },
})
const loading = ref(false)
const questionnaireDetail = ref()
onMounted(() => {
  getQuestionnaire()
})

const getQuestionnaire = () => {
  if (!props.participationId)
    return

  loading.value = true
  getUserSituationsApi(props.participationId).then((res) => {
    if (res.code === 200)
      questionnaireDetail.value = res.data.questionAnswerVOS
    else
      message.error(res.message)

    loading.value = false
  })
}
</script>

<template>
  <a-list
    :loading="loading"
    :grid="{ gutter: 4, column: 1 }"
    :data-source="questionnaireDetail"
    class="flex-1 h-full bg-white mt-6"
  >
    <template #renderItem="{ item, index }">
      <a-list-item
        :key="item.id"
        style="padding: 0 0; margin-bottom: 0"
      >
        <div class="rounded-xl p-4 ">
          <div class="flex justify-between items-center">
            <div class="flex">
              <a-tag
                color="green"
                class="mr-12"
              >
                ID: {{ item.id }}
              </a-tag>
            </div>
            <div>
              <a-space>
                <div class="text-gray-400">
                  上次修改时间：{{ dayjs(item.createTime).format('YYYY-MM-DD HH:mm:ss') }}
                </div>
              </a-space>
            </div>
          </div>
          <div class="mt-2 font-bold text-lg">
            {{ `${index + 1}.` }} <span class="ml-1">{{ item.title || '--' }}
            </span>
          </div>
          <div class="mt-4 ml-4">
            <a-typography-paragraph
              :ellipsis="{ rows: 4, expandable: true }"
              :content="item.answer || '--'"
            />
          </div>
        </div>
      </a-list-item>
    </template>
  </a-list>
</template>

<style scoped></style>
