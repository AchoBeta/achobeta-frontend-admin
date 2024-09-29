<script setup>
import { getBankExamPaperApi } from '~/api/examPaper'
const route = useRoute()
const examId = ref(route.params.examId)

onMounted(() => {
  init()
})
const loading = ref(false)
const init = () => {
  getExamPaper()
}

const examPaperList = ref([])
const getExamPaper = async () => {
  loading.value = true
  const res = await getBankExamPaperApi(examId.value)
  if (res.code === 200) {
    examPaperList.value = res.data
  } else {
    message.error(res.message)
  }

  loading.value = false
}

</script>

<template>
  <main class="flex-1 flex flex-col p-4 bg-bg-base min-h-full">
    <a-list :loading="loaidng" :grid="{ gutter: 4, column: 1 }" :data-source="examPaperList"
      :pagination="{hideOnSinglePage: true}" class='flex-1 h-full'>
      <template #renderItem="{ item }">
        <a-list-item style="padding: 12px 0; margin-bottom: 0; ">
          <div class="rounded-xl p-4 bg-pink-100 h-36">
            <div class="flex">
              <span class="mr-12">ID: {{ item.id }}</span>
              <span>题目： {{ item.libType || '--' }}</span>
            </div>
            <div>
              {{ item.createdTime }}
            </div>
          </div>
        </a-list-item>
      </template>
    </a-list>
  </main>

</template>

<style scoped></style>