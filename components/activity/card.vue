<script lang="ts" setup>
import dayjs from 'dayjs'
import type { ActivityDetail } from '~/api/recruitActivity/types'
import { RESUME_STATUES } from '~/constants/resume'
import { startActivityApi, endActivityApi, setActivityPapaerApi, getActivityDetailApi, deleteActivityPeriodApi, addActivityPeriodApi } from '~/api/recruitActivity';
import { getPaeperBankListApi } from '~/api/examPaperBank';
import { getBankExamPaperApi } from '~/api/examPaper';
import type { List } from '~/api/examPaper/types';
import type { FormInstance } from 'ant-design-vue';

interface Domain {
  value: any;
  disabled: boolean;
  key: number;
}

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

const loading = ref(false)
const paperFormRef = ref<FormInstance>()
let paperFormState = reactive({
  paperId: undefined,
  paperBankId: undefined
})
const paperBank = ref<any>([])
const anyMatch = ref<string[]>([]) // 特殊条件
const allMatch = ref<any[]>([]) // 基本条件
const isActivityRun = ref<boolean>(props.data?.isRun || false)
let modalVisible = ref(false)
let paperVisible = ref(false)
const paperList = ref<List[]>([])
const timeFormRef = ref<FormInstance>()
const timeVisible = ref<boolean>(false)
let timeState = ref<{ timeRanges: Domain[] }>({
  timeRanges: []
})
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 4 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 20 },
  },
};
const formItemLayoutWithOutLabel = {
  wrapperCol: {
    xs: { span: 24, offset: 0 },
    sm: { span: 20, offset: 4 },
  },
};

const init = () => {
  anyMatch.value = []
  allMatch.value = []
  handleAnyMatch()
  handleAllMatch()
}

const handleAnyMatch = () => {
  const anyCondition = props.data?.target.anyMatch
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

const openPaperModal = async () =>{
  await getPaperBank()
  paperVisible.value = true
}

const getPaperBank = async () => {
  loading.value = true;
  const res = await getPaeperBankListApi()
  if(res.code === 200) {
    paperBank.value = res.data
  } else {
    message.error(res.message)
  }

  loading.value = false
}

const getPaper = async (paperBankId:number) => {
  const condition = {
    current: 1,
    pageSize: 100,
    libId: [paperBankId]
  }

  loading.value = true;
  const res = await getBankExamPaperApi(condition)
  if(res.code === 200) {
    paperList.value = res.data.list
  } else {
    message.error(res.message)
  }

  loading.value = false
}

const onPaperBankChange = (value: any) => {
  if(!value) return 
  paperFormState.paperBankId = value
  getPaper(value)
}

const handlePaperEdit = async (values:any) => {
  const condition = {
    actId: Number(props.data?.id),
    paperId: values.paperId,
  }

  loading.value = true;
  const res = await setActivityPapaerApi(condition)
  if(res.code === 200) {
    message.success('设置成功')
    paperVisible.value = false
  } else {
    message.error(res.message)
  }
  
  loading.value = false
}

const onPaperEditCancel = () => {
  paperFormState = { paperBankId: undefined, paperId: undefined }
  paperVisible.value = false; 
}

const onTimeEditCancel = () => {
  timeState.value = { timeRanges: [] }
  timeVisible.value = false;
}

const removeTimeRange = async (item: Domain) => {
  const index = timeState.value.timeRanges.indexOf(item);
  if (index !== -1) {
    loading.value = true;
    if(item.key > 100000) {
      timeState.value.timeRanges.splice(index, 1);
      loading.value = false
      return
    }

    const res = await deleteActivityPeriodApi(String(item.key))
    if(res.code === 200) {
      message.success('删除成功')
      timeState.value.timeRanges.splice(index, 1);
    } else {
      message.error(res.message)
    }

    loading.value = false
  }
}

const addTimeRange  = () => {
  console.log('点击了新增')
  timeState.value.timeRanges.push({
    value: undefined,
    key: Date.now(),
    disabled: false,
  });
}

const updateTimeRange = () => {
  loading.value = true;

  timeFormRef.value
    ?.validate()
    .then(() => {
      const request: any = []
      timeState.value.timeRanges.forEach( item => {
        if(item.key > 1000000) {
          const condition = {
            actId: Number(props.data?.id),
            startTime: new Date(item.value[0].$d).getTime() ,
            endTime: new Date(item.value[1].$d).getTime(),
          }
          request.push(addActivityPeriodApi(condition))

          Promise.all(request)
          .then((values) => {
            values.forEach( item => {
              if(item.code === 200) {
                message.success('设置成功')
              } else {
                message.error(item.message)
              }
            })
            getTimeRange()
          })
          .catch(() => message.error('设置失败'))
          .finally(() => loading.value = false)
        }
      })
    })
    .catch(error => {
      console.log('error', error);
    });
}

const getTimeRange = async () => {
  loading.value = true;
  const res = await getActivityDetailApi(String(props.data?.id))
  if(res.code === 200) {
    const timeRangeBack = res.data.timePeriodVOS.map( item => {
      return {
        value: [dayjs(item.startTime), dayjs(item.endTime)],
        key: item.id,
        disabled: true,
      }
    })
    timeState.value.timeRanges = timeRangeBack
  } else {
    message.error(res.message)
  }

  loading.value = false

}

const openTimeModal = async () => {
  await getTimeRange()
  timeVisible.value = true
}

defineExpose({
  init
})

</script>

<template>
  <a-card :headStyle="{padding: '0 12px' }" :body-style="{padding: '12px', width: '100%'}" bordered hoverable
    class="h-42 w-full bg-slate-100">
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
        <ContainerOutlined @click="openPaperModal" style="font-size: 16px;" />
      </a-tooltip>
      <a-tooltip>
        <template #title>活动编辑</template>
        <edit-outlined @click="openModal?.({...props.data, batchId: props.batchId})" style="font-size: 16px;"
          key="edit" />
      </a-tooltip>
      <a-tooltip>
        <template #title>时间段设置</template>
        <a-spin :spinning="loading">
          <ClockCircleOutlined @click="openTimeModal" style="font-size: 16px;" key="edit" />
        </a-spin>
      </a-tooltip>
      <a-tooltip>
        <template #title>活动开启</template>
        <a-switch :loading="props.loading" :checked="isActivityRun" @change="() => modalVisible = true" size="small" />
      </a-tooltip>
    </template>
  </a-card>

  <a-modal :width="500" v-model:open="paperVisible" @cancel="onPaperEditCancel" title="设置活动问卷"
    :confirm-loading="loading" @ok="()=> paperVisible = false" ok-text="确定" cancel-text="取消" :footer="null">

    <a-form class="mt-6" ref="paperFormRef" :model="paperFormState" name="paper" :label-col="{span: 4}"
      :wrapper-col="{ span: 20 }" @finish="handlePaperEdit">
      <a-alert class="mb-8" message="活动开启时，不允许设置问卷" type="warning" />
      <a-form-item label="试卷库" name="paperBankId" :rules="[{ required: true, message: '请先选择试卷库'}]">
        <a-select v-model:value="paperFormState.paperBankId" placeholder="请选择试卷库" @change="onPaperBankChange">
          <a-select-option v-for="(item, index) in paperBank" :key="index" :value="item.id">
            {{ item.libType }}
          </a-select-option>
        </a-select>
      </a-form-item>

      <a-form-item label="试卷" name="paperId" :rules="[{ required: true, message: '请选择试卷'}]">
        <a-select :disabled="paperList.length <= 0" v-model:value="paperFormState.paperId" placeholder="请选择试卷">
          <a-select-option v-for="(item, index) in paperList" :key="index" :value="item.id">
            {{ item.title }}
          </a-select-option>
        </a-select>
      </a-form-item>

      <a-row justify="end">
        <a-form-item>
          <a-space>
            <a-button @click="onPaperEditCancel">取消</a-button>
            <a-button :loading="loading" type="primary" html-type="submit">设置</a-button>
          </a-space>
        </a-form-item>
      </a-row>

    </a-form>

  </a-modal>

  <a-modal :width="400" v-model:open="modalVisible" @cancel="() => modalVisible = false"
    :title="`你确定要${isActivityRun ? '关闭' : '开启'}该活动吗`" :confirm-loading="loading" @ok="changeActicityStatu" ok-text="确定"
    cancel-text="取消">
    活动开启后不再允许对活动进行编辑
  </a-modal>

  <a-modal :width="600" v-model:open="timeVisible" @cancel="onTimeEditCancel" title="设置可选时间段" :confirm-loading="loading"
    @ok="()=> timeVisible = false" ok-text="确定" cancel-text="取消" :footer="null">
    <a-spin :spinning="loading">
      <a-alert class="mt-6" type="warning" message="时间段至少要设置一小时，最长不超过两小时。活动开启后不允许再修改。"></a-alert>
      <a-form class="mt-8" ref="timeFormRef" name="timeForm" :model="timeState" v-bind="formItemLayoutWithOutLabel">
        <a-form-item v-for="(domain, index) in timeState.timeRanges" :key="domain.key" v-bind="formItemLayout"
          :name="['timeRanges', index, 'value']" :label="`时间段${index + 1}`" :rules="{
        required: false,
        message: '请选择时间段',
      }">
          <a-range-picker :disabled="domain.disabled" v-model:value="domain.value" show-time
            style="margin-right: 8px;" />
          <MinusCircleOutlined class="dynamic-delete-button" @click="removeTimeRange(domain)" />
        </a-form-item>
        <a-form-item :wrapper-col="{span: 24}">
          <a-button type="dashed"
            style="display: flex; align-items: center; justify-content: center; margin: 10px auto 0; width: 80%"
            @click="addTimeRange">
            <PlusOutlined />
            新增
          </a-button>
        </a-form-item>
        <a-form-item v-bind="formItemLayoutWithOutLabel" :wrapper-col="{span:24, offset:20}">
          <a-button type="primary" html-type="submit" @click="updateTimeRange">确认</a-button>
        </a-form-item>
      </a-form>
    </a-spin>

  </a-modal>

</template>

<style scoped>
.dynamic-delete-button {
  cursor: pointer;
  position: relative;
  top: 4px;
  font-size: 24px;
  color: red;
  transition: all 0.3s;
}

.dynamic-delete-button:hover {
  color: #777;
}

.dynamic-delete-button[disabled] {
  cursor: not-allowed;
  opacity: 0.5;
}
</style>