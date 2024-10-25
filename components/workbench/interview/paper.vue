<script lang="ts" setup>
import dayjs from 'dayjs'
import { getInterviewQuestionApi, scoreQuestionApi } from '~/api/interviewEvaluation'
import { removeQuesionApi } from '~/api/combineExamPaper'

const props = defineProps({
  interviewId: {
    type: String,
    required: true,
  },
})
const editRef = ref()
const createRef = ref()
const insertRef = ref()
const loading = ref(false)
const paperDetail = ref()
const showType = ref('编辑')

onMounted(() => {
  getPaper()
})

const getPaper = () => {
  if (!props.interviewId)
    return

  loading.value = true
  getInterviewQuestionApi(props.interviewId).then((res) => {
    if (res.code === 200)
      paperDetail.value = res.data

    loading.value = false
  })
}

const handleDelete = async (questionId: number) => {
  loading.value = true
  const data = {
    paperId: paperDetail.value.id,
    questionIds: [questionId],
  }
  const res = await removeQuesionApi(data)
  if (res.code === 200) {
    message.success('移除成功')
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
    score: item.score,
  }

  const res = await scoreQuestionApi(data)
  if (res.code === 200)
    message.success('评分成功')
  else
    message.error(res.message)

  loading.value = false
}

const handleEdit = (item: any) => {
  if (editRef.value)
    editRef.value.openModal(item)
}

const handleInsert = () => {
  if (insertRef.value)
    insertRef.value.openModal()
}

const handleCreate = () => {
  if (createRef.value)
    createRef.value.openModal()
}
</script>

<template>
  <div class="pl-6 text-[14px] text-gray-500">
    <div>试卷题目：{{ paperDetail?.title || '暂未设置' }}</div>
    <div>描述：{{ paperDetail?.description || '--' }}</div>
    <div>
      试卷类型：<a-segmented
        v-model:value="showType"
        size="small"
        :options="['编辑', '预览']"
      />
    </div>
  </div>

  <a-list
    :loading="loading"
    :grid="{ gutter: 4, column: 1 }"
    :data-source="paperDetail?.questions"
    class="flex-1 h-full bg-white mt-6"
  >
    <template #renderItem="{ item, index }">
      <a-list-item
        :key="item.id"
        style="padding: 0 0; margin-bottom: 20px"
      >
        <div class="rounded-xl p-4 ">
          <!-- 顶部编辑区 -->
          <div
            v-show="showType === '编辑'"
            class="flex justify-between items-center"
          >
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
                <a-button
                  size="small"
                  class="ml-8"
                  @click="handleEdit(item)"
                >
                  编辑
                </a-button>
                <a-popconfirm
                  title="你确定要删除这道题目吗？"
                  @confirm="handleDelete(item.id)"
                >
                  <a-button
                    size="small"
                    class="ml-2"
                    danger
                  >
                    删除
                  </a-button>
                </a-popconfirm>
              </a-space>
            </div>
          </div>

          <div class="mt-2 font-bold text-lg">
            {{ `${index + 1}.` }} <span class="ml-1">{{ item.title || '--' }}
            </span>
          </div>
          <div class="mt-4 ml-4">
            <CommonMarkdownEditor
              v-model="item.standard"
              :box-shadow="false"
              default-open="preview"
              :toolbars-flag="false"
            />
          </div>
          <!-- 底部打分区 -->
          <div class="flex justify-between px-4 mt-2">
            <div class="flex items-center">
              历史评分：<a-rate
                v-model:value="item.average"
                class="mb-1"
                :disabled="true"
                :count="10"
              />
            </div>
            <div class="flex items-center">
              <div class="flex items-center min-w-[350px]">
                用户回答：
                <a-rate
                  v-model:value="item.score"
                  class="mr-4 mb-1"
                  :count="10"
                  @change="onRateChange(item)"
                />
              </div>
              <span
                v-if="item.score === -1"
                class="py-.5 rounded-sm cursor-default px-3 border border-red-700 text-red-700 font-bold"
              >超纲</span>
              <a-button
                v-else
                size="small"
                @click="() => { item.score = -1; onRateChange(item) }"
              >
                超纲
              </a-button>
            </div>
          </div>
        </div>
      </a-list-item>
    </template>
  </a-list>

  <div
    v-show="paperDetail?.questions?.length > 0 && showType === '编辑'"
    class="w-4/5 mx-auto mt-4"
  >
    <a-button
      class="flex justify-center items-center text-lg text-gray-400"
      style="width:100%; height: 50px"
      type="dashed"
      @click="handleInsert"
    >
      <template #icon>
        <PlusOutlined class="mr-2" />插入题目
      </template>
    </a-button>
  </div>

  <div
    v-show="paperDetail?.questions?.length > 0 && showType === '编辑'"
    class="w-4/5 mx-auto mt-4"
  >
    <a-button
      class="flex justify-center items-center text-lg text-gray-400"
      style="width:100%; height: 50px"
      type="dashed"
      @click="handleCreate"
    >
      <template #icon>
        <PlusOutlined class="mr-2" />创建题目
      </template>
    </a-button>
  </div>

  <workbench-interview-detail-editModal
    ref="editRef"
    :refresh="getPaper"
  />
  <workbench-interview-detail-createQModal
    ref="createRef"
    :refresh="getPaper"
    :paper-id="paperDetail?.id"
  />
  <workbench-interview-detail-insertModal
    ref="insertRef"
    :refresh="getPaper"
    :paper-id="paperDetail?.id"
  />
</template>

<style scoped></style>
