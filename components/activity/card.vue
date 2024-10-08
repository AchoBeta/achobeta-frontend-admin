<script lang="ts" setup>
import dayjs from 'dayjs'
import type { ActivityDetail } from '~/api/recruitActivity/types'
import { RESUME_STATUES } from '~/constants/resume'
import { startActivityApi, endActivityApi } from '~/api/recruitActivity';

onMounted(() => {
  init()
})

const props = defineProps({
  data: {
    type: Object as PropType<ActivityDetail>,
    require: true
  },
  batchId: {
    type: Number,
    require: true
  },
  userList: {
    type: Array,
    require: true
  },
  loading: {
    type: Boolean,
    require: true
  },
  openModal: {
    type: Function,
    require: true
  }
})

const anyMatch = ref<string[]>([]) // 特殊条件
const allMatch = ref<any[]>([]) // 基本条件
const isActivityRun = ref<boolean>(props.data?.isRun || false)
const modalVisible = ref(false)

const handleAnyMatch = () => {
  const anyCondition = props.data?.target.anyMatch
  console.log(anyCondition, '任何条件')
  if( anyCondition === null) {
    anyMatch.value = ['无']
    return
  }

  if( anyCondition?.grade === null && anyCondition?.userId === null ) {
    anyMatch.value = ['条件矛盾']
  } else if (anyCondition?.grade?.length === 0 && anyCondition?.userId?.length === 0) {
    anyMatch.value = ['无']
  } else {
    anyCondition?.grade && anyCondition?.grade.forEach( grade => {
      anyMatch.value?.push(String(grade) + '级')
    })

    anyCondition?.userId && anyCondition?.userId.forEach( userId => {
      const name = getUserName(userId)
      name && anyMatch.value?.push(name)
    })
  }

}

const handleAllMatch = () => {
  const allCondition = props.data?.target.allMatch
  if( allCondition === null || allCondition?.status === null || allCondition?.status?.length === 0) {
    allMatch.value = ['所有']
  } else {
    allCondition?.status && allCondition?.status.forEach( (status:number) => {
      allMatch.value?.push(status)
    })
  }

}

const navigateToDetail = () => {
  // return navigateTo({
  //   path: `${props.type}/${props.data?.id}`,
  //   query: {
  //     parent: JSON.stringify(props.data as any) 
  //   }
  // })
}

const getUserName = (userId: number) => {
  let name = null
  if(Array.isArray(props.userList)) {
    props.userList?.forEach((item: any) => { 
      if(item.userId === userId){
        name = item.name
        return
      }
    })
  }

  return name
}

const onStatusChange = () => {
  modalVisible.value = true
}

const changeActicityStatu = async () => {
  if(!isActivityRun.value) {
    const res = await startActivityApi(String(props.data?.id))
    if(res.code === 200) {
      message.success('开启成功')
      isActivityRun.value = true
    } else {
      message.error(res.message)
      isActivityRun.value = false
    }

    modalVisible.value = false
  } else {
    const res = await endActivityApi(String(props.data?.id))
    if(res.code === 200) {
      message.success('关闭成功')
      isActivityRun.value = false
    } else {
      message.error(res.message)
      isActivityRun.value = true
    }
  }

  modalVisible.value = false
}

const init = () => {
  anyMatch.value = []
  allMatch.value = []
  handleAnyMatch()
  handleAllMatch()
}

defineExpose({
  init
})

</script>

<template>
  <a-card @click="navigateToDetail()" :headStyle="{padding: '0 12px' }" :body-style="{padding: '12px', width: '100%'}"
    bordered hoverable class="h-42 w-full bg-slate-100">
    <div class="flex justify-between w-full mt-1">
      <a-typography-paragraph class="font-bold" style="margin-bottom: 0;font-size: 18px;">{{ props.data?.title }}
      </a-typography-paragraph>
    </div>
    <div class=" mt-4">
      <a-typography-paragraph :content="props.data?.description" :ellipsis="{rows: 2, tooltip: props.data?.description}"
        class="text-gray-500" />
    </div>
    <div class="mt-3">
      <a-space direction="vertical">
        <div>简历状态：
          <a-tag v-for="(condition, index) in allMatch" :key="index" :color="RESUME_STATUES[condition]?.color">{{
            RESUME_STATUES[condition]?.name || condition }}</a-tag>
        </div>
        <div>特殊条件：
          <a-tag v-for="(condition, index) in anyMatch" :key="index" :color="RESUME_STATUES[index + 1].color">{{
            condition
            }}</a-tag>
        </div>
        <div>创建时间：{{ dayjs(props.data?.createTime).format('YYYY-MM-DD HH:mm') }}</div>
        <div>截止时间：{{ dayjs(props.data?.deadline).format('YYYY-MM-DD HH:mm:ss') }}</div>
      </a-space>
    </div>
    <template #actions>
      <a-tooltip>
        <template #title>试卷管理</template>
        <ContainerOutlined style="font-size: 16px;" />
      </a-tooltip>
      <a-tooltip>
        <template #title>活动编辑</template>
        <edit-outlined @click="openModal?.({...props.data, batchId: props.batchId})" style="font-size: 16px;"
          key="edit" />
      </a-tooltip>
      <a-tooltip>
        <template #title>活动开启</template>
        <a-switch :loading="props.loading" :checked="isActivityRun" @change="onStatusChange" size="small" />
      </a-tooltip>
    </template>
  </a-card>

  <a-modal>

  </a-modal>

  <a-modal :width="400" v-model:open="modalVisible" @cancel="() => modalVisible = false"
    :title="`你确定要${isActivityRun ? '关闭' : '开启'}该活动吗`" :confirm-loading="loading" @ok="changeActicityStatu" ok-text="确定"
    cancel-text="取消">
    活动开启后不再允许对活动进行编辑
  </a-modal>
</template>

<style scoped></style>