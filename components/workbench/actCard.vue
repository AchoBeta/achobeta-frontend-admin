<script lang="ts" setup>
import dayjs from 'dayjs'
import { getBatchListAdminApi } from '~/api/recruitBatch'
import type { batchlistResponse } from '~/api/recruitBatch/types'
import { getActivityApi } from '~/api/recruitActivity'

const loading = ref(false)
const batchList = ref<batchlistResponse[]>([])
const selectBatch = ref([false])
const selectedBatchId = ref()
const activities = ref<any>([])
onMounted(() => {
  init()
})

const init = async () => {
  await getBatch()
}

const getBatch = async () => {
  loading.value = true
  const res = await getBatchListAdminApi()
  if (res.code === 200) {
    batchList.value = [...res.data, {
      id: 2,
      batch: 7,
      title: 'AchoBeta 7.0 招新',
      deadline: '2024-11-25 23:59:59',
      isRun: true,
    }]
    selectedBatchId.value = batchList.value[0].id
  } else {
    message.error(res.message)
  }

  loading.value = false
}

const getActivity = async () => {
  loading.value = true
  const res = await getActivityApi(String(selectedBatchId.value))
  if (res.code === 200)
    activities.value = res.data
  else
    message.error(res.message)

  loading.value = false
}

const handleChange = (tag: any, checked: boolean) => {
  if (checked)
    selectedBatchId.value = tag.id
}

watch(selectedBatchId, async (val, oldVal) => {
  if (val === oldVal)
    return

  selectBatch.value = batchList.value.map((item: any) => item.id === val)
  await getActivity()
})
</script>

<template>
  <header>
    <div class="flex mt-4 ml-4">
      <div class="mr-4 text-[16px]">
        招新批次：
      </div>
      <a-space>
        <a-checkable-tag
          v-for="(item, index) in batchList"
          :key="item.id"
          style="font-size: 14px; padding: 2px 6px"
          :checked="selectBatch[index]"
          @change="checked => handleChange(item, checked)"
        >
          {{ item.title }}
        </a-checkable-tag>
      </a-space>
    </div>
  </header>

  <div>
    <a-list
      :loading="loading"
      :grid="{ gutter: 36, xs: 1, sm: 2, md: 2, lg: 3, xl: 3, xxl: 3 }"
      :data-source="activities"
      :pagination="{ hideOnSinglePage: true, pageSize: 6 }"
      class="mt-8 px-3"
    >
      <template #renderItem="{ item }">
        <a-list-item
          :key="item.id"
          style="padding: 0"
        >
          <a-card
            :head-style="{ padding: '0 12px' }"
            :body-style="{ padding: '12px', width: '100%' }"
            bordered
            hoverable
            class="flex h-48 w-full bg-slate-100 pl-2"
            @click="navigateTo({ path: `/workbench/appoint/${item.id}`, query: { title: item.title, batchId: selectedBatchId } })"
          >
            <div class="flex justify-between w-full mt-1">
              <a-typography-paragraph
                class="font-bold"
                style="margin-bottom: 0;font-size: 18px;"
                :content="item.title"
              />
            </div>

            <div class=" mt-4">
              <a-typography-paragraph
                :content="item.description"
                :ellipsis="{ rows: 2, tooltip: item.description }"
                class="text-gray-500"
              />
            </div>

            <div>
              <a-space direction="vertical">
                <div>创建时间: {{ dayjs(item.createTime).format('YYYY-MM-DD HH:mm:ss') }}</div>
                <div>截止时间: {{ dayjs(item.deadline).format('YYYY-MM-DD HH:mm:ss') }}</div>
              </a-space>
            </div>
          </a-card>
        </a-list-item>
      </template>
    </a-list>
  </div>
</template>

<style scoped></style>
