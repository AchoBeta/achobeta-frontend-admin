<script setup lang="ts">
// @ts-ignore
import { SmileOutlined } from '@ant-design/icons-vue'

const props = defineProps({
  data: {
    type: Array,
    default: () => [],
  },

})

const columns = [
  {
    name: '姓名',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '年级',
    dataIndex: 'grade',
    key: 'grade',
  },
  {
    title: '班级',
    dataIndex: 'className',
    key: 'className',
  },
  {
    title: '性别',
    key: 'gender',
    dataIndex: 'gender',
  },
  {
    title: '附件',
    key: 'stuAttachmentVOList',
    dataIndex: 'stuAttachmentVOList',
  },
  {
    title: '操作',
    key: 'action',
  },
]
</script>

<template>
  <div class="p-4 ">
    <a-table :columns="columns" :data-source="props.data">
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
        <template v-else-if="column.key === 'tags'">
          <span>
            <a-tag
              v-for="tag in record.tags" :key="tag"
              :color="tag === 'loser' ? 'volcano' : tag.length > 5 ? 'geekblue' : 'green'"
            >
              {{ tag.toUpperCase() }}
            </a-tag>
          </span>
        </template>
        <template v-else-if="column.key === 'action'">
          <span>
            <a-button type="primary">详情</a-button>

            <a-divider type="vertical" />
            <a-button type="primary" danger>删除</a-button>
            <a-divider type="vertical" />
            <!-- <a class="ant-dropdown-link">
                            More actions
                            <down-outlined />
                        </a> -->
          </span>
        </template>
      </template>
    </a-table>
  </div>
</template>

<style scoped></style>
