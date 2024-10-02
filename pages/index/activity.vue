<script lang="ts" setup>
import { getBatchListAdminApi } from '~/api/recruitBatch';
import type { batchlistResponse } from '~/api/recruitBatch/types';

const loading = ref(false)
const batchList = ref<batchlistResponse[]>([])

onMounted( () => {
  init()
})

const init = () => {
  getBatchList()
}

const getBatchList = async () => {
  loading.value = true;
  const res = await getBatchListAdminApi()

  if(res.code === 200) {
    batchList.value = res.data
  } else {
    message.error(res.message)
  }

  loading.value = false
}

const activeKey = ref('1')
</script>

<template>
  <div class="p-4">
    <a-page-header style="background-color: #fff; border: 1px solid rgb(235, 237, 240); padding-bottom: 12px;"
      title="活动管理" sub-title="管理某招新批次招新活动" :backIcon="false">
      <template #footer>
        <a-tabs size="small" v-model:activeKey="activeKey">
          <a-tab-pane v-for="(item, index) in batchList" :key="String(index + 1)" :tab="item.title">
            <activity-item :batchId="item.id"></activity-item>
          </a-tab-pane>
        </a-tabs>
      </template>
      <a-typography-paragraph>
        每个招新批次下可以有多个活动，比如说：某个方向的面试活动、收集某个方向的用户的基本信息，设定活动标题、说明、面向人群、截止时间及可选时间段。
      </a-typography-paragraph>
      <a-typography-paragraph>
        默认活动——学生基本简历信息收集，面向所有用户，无需试卷和时间限制。
      </a-typography-paragraph>
    </a-page-header>
  </div>
</template>
