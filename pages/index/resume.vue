<script setup lang="ts">
import type { SegmentedValue } from 'ant-design-vue/es/segmented/src/segmented'
import { onMounted, ref } from 'vue'
import { getBatchListAdminApi, getBatchStudentResumeApi } from '~/api/recruitBatch'
import type { ResumeData } from '~/api/recruitBatch/types'
import type { DataItem } from '~/components/resume/types'

const loading = ref(false)// 控制loading
const childRef = ref<any | null>(null)// 子组件实例
const showDrawer = ref(false)// 控制抽屉显示
const batchList = ref([
  {
    value: '26',
    payload: {
      title: 'Spring',
    },
  },

])
const tabValue = ref(batchList.value[0].value)// 默认显示第一个批次
const tabledata = ref<ResumeData[]>([
])// 表格数据
const drawData = ref<DataItem[]>()// 抽屉数据
const mangerbatch = () => {
  // 调用子组件的方法展开
  childRef.value.showDrawer()
  // isDisabled.value = true;
}// 管理招新批次按钮点击事件
const getbatchlist = async () => {
  loading.value = true
  const res = await getBatchListAdminApi()
  batchList.value = res.data.map((item: any) => ({
    value: item.id,
    payload: {
      title: item.title,

    },
  }))
  drawData.value = res.data.map((item: any) => ({
    id: item.id,
    batch: item.batch,
    title: item.title,
    status: 'normal',
    isRun: item.isRun,
    deadline: item.deadline,
  }))
  tabValue.value = batchList.value[0].value

  // 获取表格数据
  if (drawData.value) {
    getBatchStudentResumeApi(drawData.value[0].id).then((res) => {
      tabledata.value = res.data.map((item: any) => ({
        resumeId: item.resumeId,
        userId: item.userId,
        studentId: item.studentId,
        username: item.username,
        email: item.email,
        gender: item.gender,
        grade: item.grade,
        major: item.major,
        className: item.className,
        status: item.status,
        name: item.name,
      }))
    })
  }

  loading.value = false
}// 获取招新批次列表
// 切换批次
const changeTab = (value: SegmentedValue) => {
  loading.value = true
  getBatchStudentResumeApi(value).then((res) => {
    tabledata.value = res.data.map((item: any) => ({
      resumeId: item.resumeId,
      userId: item.userId,
      studentId: item.studentId,
      username: item.username,
      email: item.email,
      gender: item.gender,
      grade: item.grade,
      major: item.major,
      className: item.className,
      status: item.status,
      name: item.name,
    }))
  })
    .finally(() => {
      loading.value = false
    })
}
onMounted(() => {
  getbatchlist()
})
</script>

<template>
  <div class="p-4 bg-[#f5f5f5] ">
    <div class="py-1 flex overflow-scroll">
      <a-segmented
        v-model:value="tabValue"
        :options="batchList"
        @change="changeTab"
      >
        <template #label="{ payload }">
          <div style="padding: 4px 4px">
            <div>{{ payload.title }}</div>
          </div>
        </template>
      </a-segmented>
    </div>
    <a-button
      class="my-3 hidden md:block"
      type="primary"
      @click="mangerbatch"
    >
      管理招新批次
    </a-button>
    <resume-table
      :loading="loading"
      :batch-id="tabValue"
      :data="tabledata"
    />
  </div>
  <resume-drawer
    ref="childRef"
    v-model:showDrawer="showDrawer"
    :data="drawData"
    @get-batchlist="getbatchlist"
  />
</template>

<style scoped>
.ant-segmented-group {
  width: 100%;
  display: flex;
  flex-wrap: wrap !important;
  overflow-x: auto !important;
  /* 当内容超出宽度时，显示水平滚动条 */

}

.ant-segmented-item {
  min-width: none !important;
}
</style>
