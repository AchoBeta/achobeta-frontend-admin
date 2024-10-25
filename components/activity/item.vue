<script lang="ts" setup>
import { getActivityApi } from '~/api/recruitActivity'

const props = defineProps({
  batchId: {
    type: Number,
    default: 0,
  },
  userList: {
    type: Array,
    default: () => [],
  },
  openModal: {
    type: Function,
    default: () => {},
    require: true,
  },
})
const loading = ref(false)
const activities: any = ref([])
const cardRef = ref<any | { init: Function }>()

onMounted(() => {
  init()
})

const init = () => {
  getActivity()
}

const getActivity = async () => {
  if (!props.batchId)
    return
  loading.value = true
  const res = await getActivityApi(String(props.batchId))

  if (res.code === 200) {
    activities.value = res.data
    if (cardRef.value)
      cardRef.value.init()
  } else {
    message.error(res.message)
  }

  loading.value = false
}

defineExpose({
  getActivity,
})
</script>

<template>
  <a-list
    :loading="loading"
    :grid="{ gutter: 16, xs: 1, sm: 2, md: 3, lg: 3, xl: 3, xxl: 3 }"
    :data-source="activities"
    :pagination="{ hideOnSinglePage: true }"
    class="mt-5 flex-1"
  >
    <template #renderItem="{ item }">
      <a-list-item style="padding: 0 12px;">
        <activity-card
          ref="cardRef"
          :loading="loading"
          :data="item"
          :batch-id="props.batchId"
          :user-list="props.userList"
          :open-modal="props.openModal"
        />
      </a-list-item>
    </template>
  </a-list>
</template>

<style scoped></style>
