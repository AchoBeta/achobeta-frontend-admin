<script setup lang="ts">
// @ts-ignore
import { SmileOutlined } from '@ant-design/icons-vue';
import { getResumeStatusApi } from '~/api/resumeStatus';
const childModal = ref<any | null>(null);// 子组件的引用
const stateList = ref()
const props = defineProps({
  Data: {
    type: Array,
    default: () => [],
  },
  batchId: {
    type: String,
    default: '',
  },
  loading: {
    type: Boolean,
    default: false,
    require: true
  }
})

const columnData = ref(computed(() => props.Data))

const columns = [
  {
    name: '姓名',
    dataIndex: 'name',
    key: 'name',
    width: 100,
    fixed: 'left'
  },
  {
    title: '年级',
    dataIndex: 'grade',
    key: 'grade',
    width: 100
  },
  {
    title: '专业',
    dataIndex: 'major',
    key: 'major',
    width: 150
  },
  {
    title: '班级',
    dataIndex: 'className',
    key: 'className',
    width: 150
  },
  {
    title: '性别',
    key: 'gender',
    dataIndex: 'gender',
    width: 80
  },
  {
    title: '学号',
    dataIndex: 'studentId',
    key: 'studentId',
    width: 150
  },
  {
    title: '简历状态',
    key: 'tags',
    dataIndex: 'status',
    width: 100,
  },
  {
    title: '用户名',
    dataIndex: 'username',
    key: 'username',
  },
  {
    title: '邮箱',
    dataIndex: 'email',
    key: 'email',
  },
  {
    title: '简历',
    key: 'resume',
    dataIndex: 'resumeId'
  },
  {
    title: '操作',
    key: 'action',
    width: 200,
    fixed: 'right'
  },
]

const getresumeStatus = async () => {
  const res = await getResumeStatusApi()
  stateList.value = res.data
}

const getColor = (code: number) => {
  switch (code) {
    case 0:
      return 'blue'; // 草稿状态使用蓝色
    case 1:
      return 'green'; // 待筛选状态使用绿色
    case 2:
      return 'gray'; // 假设筛选不通过状态使用灰色
    case 3:
      return 'orange'; // 假设待安排初试状态使用橙色
    case 4:
      return 'purple'; // 假设待初试状态使用紫色
    case 5:
      return 'geekblue'; // 假设初试通过状态使用极客蓝
    case 6:
      return 'volcano'; // 假设初试不通过状态使用火山红
    case 7:
      return 'gold'; // 假设待安排复试状态使用金色
    case 8:
      return 'lime'; // 假设待复试状态使用青绿色
    case 9:
      return 'cyan'; // 假设复试通过状态使用青色
    case 10:
      return 'magenta'; // 假设复试不通过状态使用品红色
    case 11:
      return 'pink'; // 假设待安排终试状态使用粉色
    case 12:
      return 'crimson'; // 假设待终试状态使用深红色
    case 13:
      return 'blue'; // 假设终试通过状态使用蓝色
    case 14:
      return 'red'; // 假设终试不通过状态使用红色
    case 15:
      return 'yellow'; // 假设待处理状态使用黄色
    case 16:
      return 'red'; // 挂起状态使用红色
    default:
      return 'default'; // 默认颜色
  }
};

const getresumeDetail = (batchid: string, userid: string) => {
  childModal.value.showModal(batchid, userid, props.batchId)
}

onMounted(() => {
  getresumeStatus()
})
</script>

<template>
  <div class="p-2">
    <a-table :loading="props.loading" :columns="columns" :data-source="columnData" :scroll="{ x: 1700 }">
      <template #headerCell="{ column }">
        <template v-if="column.key === 'name'">
          <span>
            <SmileOutlined />
            姓名
          </span>
        </template>
      </template>

      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'name'">
          <a>
            {{ record.name }}
          </a>
        </template>

        <template v-if="column.key === 'gender'">
          <a-tag v-if="record.gender === '1'" color="pink">女</a-tag>
          <a-tag v-else color="blue">男</a-tag>
        </template>
        <template v-if="column.key === 'resume'">
          <a-button @click="getresumeDetail(record.resumeId, record.userId)" type="link">查看简历</a-button>
        </template>

        <template v-else-if="column.key === 'tags'">
          <span>
            <div v-for="item in stateList" :key="item.code">
              <div v-if="record.status === item.code">
                <a-tag :color="getColor(item.code)">{{ item.message }}</a-tag>
              </div>
            </div>

          </span>
        </template>
        <template v-else-if="column.key === 'action'">
          <span>
            <a-button @click="getresumeDetail(record.resumeId, record.userId)" type="primary">详情</a-button>

            <a-divider type="vertical" />
          </span>
        </template>
      </template>
    </a-table>
  </div>
  <resume-editModal ref="childModal">

  </resume-editModal>
</template>

<style scoped></style>
