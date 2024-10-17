<script lang="ts" setup>
import { getInterviewQuestionApi, scoreQuestionApi } from '~/api/interviewEvaluation'
import { deleteQuestionApi } from '~/api/question';
import dayjs from 'dayjs'

const editRef = ref()
const createRef = ref()
const insertRef = ref()
const loading = ref(false)
const paperDetail = ref()
const props = defineProps({
  interviewId: {
    type: String,
    required: true,
  }
})
const showType = ref('编辑')

onMounted(() => {
  getPaper()
})

const getPaper = () => {
  if (!props.interviewId) return

  loading.value = true
  getInterviewQuestionApi(props.interviewId).then(res => {
    if (res.code === 200) {
      paperDetail.value = res.data
    }

    loading.value = false
  })
}

const handleDelete = async (questionId: number) => {
  loading.value = true
  const res = await deleteQuestionApi(questionId)
  if (res.code === 200) {
    message.success('删除成功')
    getPaper()
  } else {
    message.error(res.message)
  }

  loading.value = false
}

const onRateChange = async (item: any) => {
  loading.value = true
  const data = {
    interviewId: Number(props.interviewId),
    questionId: item.id,
    score: item.score === 11 ? -1 : item.score,
  }

  const res = await scoreQuestionApi(data)
  if (res.code === 200) {
    message.success('评分成功')
  } else {
    message.error(res.message)
  }

  loading.value = false
}

const handleEdit = (item: any) => {
  if(editRef.value) {
    editRef.value.openModal(item)
  }
}

const handleInsert = () => {
  if(insertRef.value) {
    insertRef.value.openModal()
  }
}

const handleCreate = () => {
  if(createRef.value) {
    createRef.value.openModal()
  }
}

</script>

<template>
  <div class="pl-6 text-[14px] text-gray-500">
    <div>试卷题目：{{ paperDetail?.title || '暂未设置' }}</div>
    <div>描述：{{ paperDetail?.description || '--' }}</div>
    <div>
      试卷类型：<a-segmented size="small" v-model:value="showType" :options="['编辑', '预览']" />
    </div>
  </div>

  <a-list :loading="loading" :grid="{ gutter: 4, column: 1 }" :data-source="paperDetail?.questions"
    class='flex-1 h-full bg-white mt-6'>
    <template #renderItem="{ item, index }">
      <a-list-item style="padding: 0 0; margin-bottom: 20px" :key="item.id">
        <div class="rounded-xl p-4 ">
          <!-- 顶部编辑区 -->
          <div v-show="showType === '编辑'" class="flex justify-between items-center">
            <div class="flex">
              <a-tag color="green" class="mr-12">ID: {{ item.id }}</a-tag>
            </div>
            <div>
              <a-space>
                <div class="text-gray-400">上次修改时间：{{ dayjs(item.createTime).format('YYYY-MM-DD HH:mm:ss') }}</div>
                <a-button @click="handleEdit(item)" size="small" class="ml-8">编辑</a-button>
                <a-popconfirm title="你确定要删除这道题目吗？" @confirm="handleDelete(item.id)">
                  <a-button size="small" class="ml-4" danger>删除</a-button>
                </a-popconfirm>
              </a-space>
            </div>
          </div>

          <div class="mt-2 font-bold text-lg"> {{ index + 1 + '.' }} <span class="ml-1">{{ item.title || '--' }}
            </span></div>
          <div class="mt-4 ml-4">
            <a-typography-paragraph :ellipsis="{rows: 4, expandable: true}" :content="'参考答案: ' + item.standard" />
          </div>
          <!-- 底部打分区 -->
          <div class="flex justify-between px-4">
            <div>
              历史评分：<a-rate :disabled="true" :count="11" v-model:value="item.average"></a-rate>
            </div>
            <div>
              用户回答：<a-rate :count="11" v-model:value="item.score" @change="onRateChange(item)"></a-rate>
            </div>
          </div>
        </div>
      </a-list-item>
    </template>
  </a-list>

  <div v-show="paperDetail?.questions?.length > 0 && showType === '编辑'" class="w-4/5 mx-auto mt-4">
    <a-button @click="handleInsert" class="flex justify-center items-center text-lg text-gray-400"
      style="width:100%; height: 50px" type="dashed">
      <template #icon>
        <PlusOutlined class="mr-2" />插入题目
      </template>
    </a-button>
  </div>

  <div v-show="paperDetail?.questions?.length > 0 && showType === '编辑'" class="w-4/5 mx-auto mt-4">
    <a-button @click="handleCreate" class="flex justify-center items-center text-lg text-gray-400"
      style="width:100%; height: 50px" type="dashed">
      <template #icon>
        <PlusOutlined class="mr-2" />创建题目
      </template>
    </a-button>
  </div>

  <workbench-interview-detail-editModal ref="editRef" :refresh="getPaper" />
  <workbench-interview-detail-createQModal ref="createRef" :refresh="getPaper" :paperId="paperDetail?.id" />
  <workbench-interview-detail-insertModal ref="insertRef" :refresh="getPaper" :paperId="paperDetail?.id" />
</template>

<style scoped></style>