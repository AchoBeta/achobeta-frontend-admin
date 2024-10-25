<script lang="ts" setup>
import { DownOutlined } from '@ant-design/icons-vue'
import { getColor, getcolorCode } from './utils'
import { useUserStore } from '@/stores/modules/userStore'
import { executeResumeEventApi, getResumeEventsApi } from '~/api/resumeStatus'

const props = defineProps({
  resumeId: {
    type: String,
    required: true,
  },
  getResumeDetail: {
    type: Function,
    required: true,
  },
})

const loading = ref(false)
const eventList = ref<eventType[]>([])// 事件列表
const userStore = useUserStore()

onMounted(() => {
  getresumeEvent()
})

const handleEvent = (event: number, description: string) => {
  loading.value = true
  const adminInfo = {
    memberDTO: {
      username: userStore.userInfo.username,
      password: userStore.userInfo.password,
    },
  }

  executeResumeEventApi(props.resumeId, event, adminInfo)
    .then((res) => {
      if (res.code === 200) {
        message.success(`${description}成功`)
        props.getResumeDetail()
      } else {
        message.error(res.message)
      }
    })
    .catch((err) => {
      console.error(err)
    })
    .finally(() => {
      loading.value = false
    })
}

// 获取事件列表
const getresumeEvent = async () => {
  const res = await getResumeEventsApi()
  if (res.code === 200)
    eventList.value = res.data
  else
    message.error(res.message)
}
</script>

<template>
  <div class="w-full flex justify-between">
    <a-space
      class="flex-col flex items-start"
      wrap
    >
      <div class="event-line">
        <a-tag color="blue">
          推进
        </a-tag>
        <span class="mr-2">:</span>
        <div class="event-line-content">
          <a-tag :color="getColor(getcolorCode('待筛选'))">
            待筛选
          </a-tag>
          →
          <a-tag :color="getColor(getcolorCode('待安排初试'))">
            待安排初试
          </a-tag>
          →
          <a-tag :color="getColor(getcolorCode('待初试'))">
            待初试
          </a-tag>
          →
          <a-tag :color="getColor(getcolorCode('待安排复试'))">
            待安排复试
          </a-tag>
          →
          <a-tag :color="getColor(getcolorCode('待复试'))">
            待复试
          </a-tag>
          →
          <a-tag :color="getColor(getcolorCode('待安排终试'))">
            待安排终试
          </a-tag>
          →
          <a-tag :color="getColor(getcolorCode('待终试'))">
            待终试
          </a-tag>
        </div>
      </div>
      <div class="event-line">
        <a-tag
          color="blue"
          class="h-6"
        >
          通过
        </a-tag>
        <span class="mr-2">:</span>
        <div class="event-line-content">
          <a-tag :color="getColor(getcolorCode('待初试'))">
            待初试
          </a-tag>
          →
          <a-tag :color="getColor(getcolorCode('初试通过'))">
            初试通过
          </a-tag>
          <div class="w-full h-2" />
          <a-tag :color="getColor(getcolorCode('待复试'))">
            待复试
          </a-tag>
          →
          <a-tag :color="getColor(getcolorCode('复试通过'))">
            复试通过
          </a-tag>
          <div class="w-full h-2" />
          <a-tag :color="getColor(getcolorCode('待终试'))">
            待终试
          </a-tag>
          →
          <a-tag :color="getColor(getcolorCode('终试通过'))">
            终试通过
          </a-tag>
        </div>
      </div>
      <div class="event-line">
        <a-tag
          color="blue"
          class="h-6"
        >
          不通过
        </a-tag>
        <span class="mr-2">:</span>

        <div class="event-line-content">
          <a-tag :color="getColor(getcolorCode('待筛选'))">
            待筛选
          </a-tag>
          →
          <a-tag :color="getColor(getcolorCode('筛选不通过'))">
            筛选不通过
          </a-tag>
          <div class="w-full h-2" />
          <a-tag :color="getColor(getcolorCode('待初试'))">
            待初试
          </a-tag>
          →
          <a-tag :color="getColor(getcolorCode('初试不通过'))">
            初试不通过
          </a-tag>
          <div class="w-full h-2" />

          <a-tag :color="getColor(getcolorCode('待复试'))">
            待复试
          </a-tag>
          →
          <a-tag :color="getColor(getcolorCode('复试不通过'))">
            复试不通过
          </a-tag>
          <div class="w-full h-2" />

          <a-tag :color="getColor(getcolorCode('待终试'))">
            待终试
          </a-tag>
          →
          <a-tag :color="getColor(getcolorCode('终试不通过'))">
            终试不通过
          </a-tag>
        </div>
      </div>
      <div class="event-line">
        <a-tag color="blue">
          重置
        </a-tag>
        <span class="mr-2">:</span>
        <div class="event-line-content">
          <a-tag :color="getColor(getcolorCode('ALL'))">
            ALL
          </a-tag>
          →
          <a-tag :color="getColor(getcolorCode('草稿'))">
            草稿
          </a-tag>
        </div>
      </div>
      <div class="event-line">
        <a-tag color="blue">
          待处理
        </a-tag>
        <span class="mr-2">:</span>
        <div class="event-line-content">
          <a-tag :color="getColor(getcolorCode('ALL'))">
            ALL
          </a-tag>
          →
          <a-tag :color="getColor(getcolorCode('待处理'))">
            待处理
          </a-tag>
        </div>
      </div>
      <div class="event-line">
        <a-tag color="blue">
          挂起
        </a-tag>
        <span class="mr-2">:</span>

        <div class="event-line-content">
          <a-tag :color="getColor(getcolorCode('ALL'))">
            ALL
          </a-tag>
          →
          <a-tag :color="getColor(getcolorCode('挂起'))">
            挂起
          </a-tag>
        </div>
      </div>
      <div class="event-line">
        <a-tag color="blue">
          转正
        </a-tag>
        <span class="mr-2">:</span>
        <div class="event-line-content">
          <a-space>
            <a-tag :color="getColor(getcolorCode('初试通过'))">
              初试通过
            </a-tag>
            <br>
            <a-tag :color="getColor(getcolorCode('复试通过'))">
              复试通过
            </a-tag>
            <br>
            <a-tag :color="getColor(getcolorCode('终试通过'))">
              终试通过
            </a-tag>
          </a-space>
        </div>
      </div>
    </a-space>

    <a-dropdown :trigger="['click']">
      <a-button
        :loading="loading"
        type="primary"
        @click.prevent
      >
        处理
        <DownOutlined />
        <!-- <UpOutlined /> -->
      </a-button>
      <template #overlay>
        <a-menu>
          <a-menu-item
            v-for="item in eventList"
            :key="item.event"
            @click="handleEvent(item.event, item.description)"
          >
            {{
              item.description }}
          </a-menu-item>
        </a-menu>
      </template>
    </a-dropdown>
  </div>
</template>

<style scoped>
.event-line {
  padding: 10px;
  display: flex;
  flex-direction: row;
}

.active {
  background-color: red;

}
</style>
