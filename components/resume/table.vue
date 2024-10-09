<script setup lang="ts">
// @ts-ignore
import { SmileOutlined } from '@ant-design/icons-vue';
import { getResumeStatusApi } from '~/api/resumeStatus';
import { getColor } from './utils';
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
    width: 120,
    fixed: 'right'
  },
]

const getresumeStatus = async () => {
  const res = await getResumeStatusApi()
  stateList.value = res.data
}



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
          <a-tag v-if="record.gender === 1" color="pink">女</a-tag>
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
