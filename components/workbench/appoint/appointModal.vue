<script lang="ts" setup>
import dayjs from 'dayjs'
import { createInterviewApmApi, deleteInterviewApmApi, getUserSituationsApi, updateInterviewApmApi } from '~/api/interviewAppointment'

onMounted(() => {
  getData()
})

const loading = ref(false)
const pctId = ref()
const scheduleVOS = ref()
const pctData = ref()
const timePeriodVOS = ref()
const timeFormRef = ref()
const modalVisible = ref(false)
const timeState = ref < { timeRanges: any } > ({
  timeRanges: [],
})
const formItemLayoutWithOutLabel = {
  wrapperCol: {
    xs: { span: 24, offset: 0 },
    sm: { span: 20, offset: 4 },
  },
}
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 4 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 20 },
  },
}

const openModal = (record: any) => {
  pctId.value = record.participationId
  scheduleVOS.value = record.scheduleVOS
  timePeriodVOS.value = record.timePeriodVOS
  modalVisible.value = true
  timeState.value = scheduleVOS.value.map((item: any) => {
    return {
      value: [dayjs(item.startTime), dayjs(item.endTime)],
      key: item.id,
    }
  })

  getData()
}

const closeModal = () => {
  reset()
  modalVisible.value = false
}

const reset = () => {
  timeFormRef.value?.resetFields()
  pctId.value = undefined
  scheduleVOS.value = undefined
  timePeriodVOS.value = undefined
  timeState.value = {
    timeRanges: [],
  }
}

const addTimeRange = () => {
  timeState.value.timeRanges.push({
    value: [
      dayjs(timePeriodVOS.value[0].startTime),
      dayjs(timePeriodVOS.value[0].endTime),
    ],
    key: Date.now(),
  })
}

const removeTimeRange = async (item: any) => {
  const index = timeState.value.timeRanges.indexOf(item)
  if (index !== -1) {
    loading.value = true

    // 如果是新增的，它的key为new Date(), 直接删除
    if (item.key > 100000) {
      timeState.value.timeRanges.splice(index, 1)
      loading.value = false
      return
    }

    const res = await deleteInterviewApmApi(String(item.key))
    if (res.code === 200) {
      message.success('删除成功')
      timeState.value.timeRanges.splice(index, 1)
    } else {
      message.error(res.message)
    }

    loading.value = false
  }
}

const updateTimeRange = async (record: any) => {
  // 说明是修改的是新增的，不做处理
  if (record.key > 100000000)
    return
  loading.value = true
  const data = {
    scheduleId: record.key,
    startTime: new Date(record.value[0].$d).getTime(),
    endTime: new Date(record.value[1].$d).getTime(),
  }

  const res = await updateInterviewApmApi(data)
  if (res.code === 200) {
    message.success('更新成功')
    getData()
  } else {
    message.error(res.message)
  }

  loading.value = false
}

const getData = async () => {
  if (!pctId.value)
    return
  loading.value = true
  const res = await getUserSituationsApi(pctId.value)
  if (res.code === 200) {
    pctData.value = res.data
    timeState.value.timeRanges = res.data.scheduleVOS.map((_) => {
      return {
        value: [dayjs(_.startTime), dayjs(_.endTime)],
        key: _.id,
      }
    })
  } else {
    message.error(res.message)
  }

  loading.value = false
}

const confirmAppointment = async () => {
  timeFormRef.value
    ?.validate()
    .then(() => {
      const request: any = []
      timeState.value.timeRanges.forEach((item: any) => {
        if (item.key > 1000000) {
          const condition = {
            participationId: pctId.value,
            startTime: new Date(item.value[0].$d).getTime(),
            endTime: new Date(item.value[1].$d).getTime(),
          }
          request.push(createInterviewApmApi(condition))

          Promise.all(request)
            .then((values) => {
              values.forEach((item) => {
                if (item.code === 200)
                  message.success('创建成功')
                else
                  message.error(item.message)
              })
              getData()
            })
            .catch(() => message.error('创建失败'))
            .finally(() => loading.value = false)
        }
      })

      if (request.length === 0) {
        reset()
        modalVisible.value = false
      }
    })
    .catch((error: any) => {
      console.log('error', error)
    })
}

defineExpose({
  openModal,
})
</script>

<template>
  <a-modal
    :width="820"
    :open="modalVisible"
    :footer="null"
    title="预约管理"
    @cancel="closeModal"
    @ok="confirmAppointment"
  >
    <a-spin :spinning="loading">
      <div class="flex flex-col w-full mt-4">
        <div class="flex">
          <div class="min-w-[100px]">
            参考时间段：
          </div>
          <a-row
            v-if="timePeriodVOS?.length > 0"
            :gutter="12"
            class="w-full"
          >
            <a-col
              v-for="(item, index) in timePeriodVOS"
              :key="index"
              class="mb-4"
              :span="12"
            >
              <div class="flex">
                <a-tag>{{ dayjs(item.startTime).format('YYYY-MM-DD HH:mm:ss') }}</a-tag>
                <span class="mr-2">到</span>
                <a-tag> {{ dayjs(item.endTime).format('YYYY-MM-DD HH:mm:ss') }}</a-tag>
              </div>
            </a-col>
          </a-row>
          <a-row v-else>
            <a-tag>用户未选择</a-tag>
          </a-row>
        </div>
        <a-row justify="center">
          <a-col :span="24">
            <a-form
              ref="timeFormRef"
              class="mt-8"
              name="timeForm"
              :model="timeState"
              v-bind="formItemLayoutWithOutLabel"
            >
              <a-form-item
                v-for="(domain, index) in timeState.timeRanges"
                :key="domain.key"
                v-bind="formItemLayout"
                :name="['timeRanges', index, 'value']"
                :label="`面试时间${index + 1}`"
                help="不低于半小时，不超过两小时"
                :rules="{
                  required: true,
                  message: '请选择时间段',
                }"
              >
                <a-range-picker
                  v-model:value="domain.value"
                  show-time
                  style="margin-right: 8px;"
                  @change="updateTimeRange(domain)"
                />
                <MinusCircleOutlined
                  class="dynamic-delete-button"
                  @click="removeTimeRange(domain)"
                />
              </a-form-item>
              <a-form-item :wrapper-col="{ span: 24 }">
                <a-button
                  type="dashed"
                  style="display: flex; align-items: center; justify-content: center; margin: 10px auto 0; width: 80%"
                  @click="addTimeRange"
                >
                  <PlusOutlined />
                  新增
                </a-button>
              </a-form-item>

              <a-form-item
                v-bind="formItemLayoutWithOutLabel"
                :wrapper-col="{ span: 24, offset: 20 }"
              >
                <div class="flex">
                  <a-button
                    class="mr-2"
                    @click="() => { reset(); modalVisible = false }"
                  >
                    取消
                  </a-button>
                  <a-button
                    type="primary"
                    html-type="submit"
                    @click="confirmAppointment"
                  >
                    确认
                  </a-button>
                </div>
              </a-form-item>
            </a-form>
          </a-col>
        </a-row>
      </div>
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
</style>
