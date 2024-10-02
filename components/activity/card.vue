<script lang="ts" setup>
import dayjs from 'dayjs'
import type { ActivityDetail } from '~/api/recruitActivity/types'
const props = defineProps({
  data: {
    type: Object as PropType<ActivityDetail>,
    require: true
  },
  updateData: {
    type: Function,
    require: true,
    default: () => {}
  },
  type: {
    type: String,
    require: true,
    default: 'exam'
  }
})
console.log(props.data,'@@@@')
const editValue = ref(props.data?.title || '')

const navigateToDetail = () => {
  return navigateTo({
    path: `${props.type}/${props.data?.id}`,
    query: {
      parent: JSON.stringify(props.data as any) 
    }
  })
}

</script>

<template>
  <a-card @click="navigateToDetail()" :headStyle="{padding: '0 12px' }" :body-style="{padding: '12px', width: '100%'}"
    bordered hoverable class="flex h-28 w-full bg-slate-100 pl-2">
    <div class="flex justify-between w-full mt-1">
      <a-typography-paragraph class="font-bold" style="margin-bottom: 0;font-size: 18px;" v-model:content="editValue" />
    </div>
    <div class="mt-5">创建时间: {{ dayjs(props.data?.createTime).format('YYYY-MM-DD HH:MM') }}</div>
  </a-card>
</template>

<style scoped></style>