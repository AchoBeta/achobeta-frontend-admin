<script lang="ts" setup>
import { getActivityApi } from '~/api/recruitActivity';

const props = defineProps({
  batchId: {
    type: Number,
    default: 0
  },
  userList: {
    type: Array,
    default: []
  },
  openModal: {
    type: Function,
    default: () => {},
    require: true
  }
})
const loading = ref(false)
const activities: any = ref([])

onMounted(()=> {
  init()
})
 
const init = () => {
  getActivity()
}

const getActivity = async () => {
  if(!props.batchId) return
  loading.value = true;
  const res = await getActivityApi(String(props.batchId))

  if(res.code === 200) {
    activities.value = res.data
  } else {
    message.error(res.message)
  }

  loading.value = false
}

defineExpose({
  getActivity
})

</script>

<template>
  <a-list :loading="loading" :grid="{ gutter: 0, column: 3 }" :data-source="activities"
    :pagination="{hideOnSinglePage: true}" class='mt-5 flex-1'>
    <template #renderItem="{ item }">
      <a-list-item style="padding: 0 12px;">
        <activity-card :loading="loading" :data="item" :batchId="props.batchId" :userList="props.userList"
          :openModal="props.openModal"></activity-card>
      </a-list-item>
    </template>
  </a-list>
</template>

<style scoped></style>