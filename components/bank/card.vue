<script lang="ts" setup>
import dayjs from 'dayjs'
const props = defineProps({
  data: {
    type: Object as PropType<{id: number, libType: string, createTime: string}>,
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

const editValue = ref(props.data?.libType || '')

const onEdit = () => {
  if(!editValue.value.trim()) {
    return message.error('名称不能为空')
  }

  const updateInfo = {
    libId: props.data?.id,
    libType: editValue.value
  }

  props?.updateData(updateInfo)
}

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
  <a-card @click="navigateToDetail" :headStyle="{padding: '0 12px' }" :body-style="{padding: '12px', width: '100%'}"
    bordered hoverable class="flex h-28 w-full bg-slate-100 pl-2">
    <div class="flex justify-between w-full mt-1">
      <a-typography-paragraph @click.stop="() => {}" class="font-bold" style="margin-bottom: 0;font-size: 18px;"
        v-model:content="editValue" :editable="{ tooltip: false, onEnd: onEdit, triggerType: ['icon']}" />
      <div class="flex items-center justify-between text-[16px]">
        <FieldNumberOutlined style="font-size: 18px; margin-right: 2px; margin-top: 2px;" />
        .{{ props.data?.id }}
      </div>
    </div>
    <div class="mt-5">创建时间: {{ dayjs(props.data?.createTime).format('YYYY-MM-DD HH:mm:ss') }}</div>
  </a-card>
</template>

<style scoped></style>