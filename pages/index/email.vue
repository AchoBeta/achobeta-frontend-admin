<script lang="ts" setup>
import { reactive } from 'vue';
import { getBatchListAdminApi } from '~/api/recruitBatch';
import { selectSentableUserApi, sendEmailsMessageApi } from '~/api/interviewMessage'
import type { messageFormat } from '~/api/interviewMessage/types'
import { RESUME_STATUES } from '~/constants/resume';

const loading = ref(false)
const sendLoading = ref(false)
const batchList = ref<any[]>([])
const gradeList = ref<any[]>(new Array(15).fill(2018).map( (item, index) => item + index))
const nameList = ref<any>([])
const formState = reactive({
    userIds: undefined,
    title: '',
    content: '',
    file: undefined
});
const condition = ref({
  batchId: null,
  grade: null,
  status: null,
  pageNo: 1,
  pageSize: 20,
})

onMounted(async ()=> {
  init()
})

const init = async () => {
  loading.value = true
  const resBatch = await getBatchListAdminApi()
  if(resBatch.code === 200) {
    batchList.value = resBatch.data
  } else {
    message.error(resBatch.message)
  }

  loading.value = false
}

const selectUser = async () => {
  sendLoading.value = true 
  const res = await selectSentableUserApi(condition.value)
  if(res.code === 200){
    nameList.value = res.data.list.map((item: any) => {
      return {
        ...item, 
        label: item.name,
        value: item.userId,
      }
    })
  } else {
    message.error(res.message)
  }

  sendLoading.value = false
}

const reset = () =>{
  condition.value.batchId = null
  condition.value.grade = null
  condition.value.status = null
  formState.userIds = undefined
  formState.title = ''
  formState.content = ''
  formState.file = undefined
  nameList.value = []
}

const onFinish = () => {
  sendLoading.value = true
  try {
    const files = formState.file || []
    const fileList = files.map((item: any) => item.originFileObj)
    const data: messageFormat = {
      userIds: formState.userIds as any,
      attachments: fileList,
      tittle: formState.title,
      content: formState.content,
    }

    sendEmailsMessageApi(data).then((res) => {
      if(res.code === 200) {
        message.success('发送成功')
        reset()
      } else {
        message.error(res.message)
      }

      sendLoading.value = false
    })

  } catch (error) {
    console.log(error)
  }
};

</script>

<template>
  <div class="p-4 bg-[#f5f5f5]">
    <a-card :loading="loading" class="items-center">
      <a-form class="w-4/5 mx-auto" :model="formState" :label-col="{span: 4}" :wrapper-col="{span: 20 }"
        name="nest-messages" @finish="onFinish">
        <a-divider>
          筛选用户
        </a-divider>
        <a-row :gutter="24">
          <a-col span="12">
            <a-form-item label="招新批次">
              <a-select allow-clear v-model:value="condition.batchId" style="width: 100%" placeholder="请选择招新批次"
                @change="selectUser">
                <a-select-option v-for="(item, index) in batchList" :key="item.id" :value="item.id">{{ item.title
                  }}</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>

          <a-col span="12">
            <a-form-item label="年级">
              <a-select allow-clear v-model:value="condition.grade" style="width: 100%" placeholder="请选择用户的年级"
                @change="selectUser">
                <a-select-option v-for="(item, index) in gradeList" :key="index" :value="item">{{
                  item}}</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>

          <a-col span="12">
            <a-form-item label="简历状态">
              <a-select allow-clear v-model:value="condition.status" style="width: 100%" placeholder="请选择用户简历状态"
                @change="selectUser">
                <a-select-option v-for="(item, index) in Object.values(RESUME_STATUES)" :key="item.value"
                  :value="item.value">{{
                  item.name
                  }}</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>

          <a-col span="12">
            <a-form-item name="userIds" label="用户" :rules="[{ required: true, message: '请选择用户' }]">
              <a-select v-model:value="formState.userIds" allow-clear :filter-option="false" mode="multiple"
                style="width: 100%" placeholder="请选择用户" :options="nameList" />
            </a-form-item>
          </a-col>
        </a-row>

        <a-divider>邮件信息</a-divider>

        <a-row justify="center">
          <a-col span="12">
            <a-form-item name="title" :rules="[{ required: true }]" label="标题">
              <a-input v-model:value="formState.title" placeholder="请输入邮件标题" />
            </a-form-item>
          </a-col>
        </a-row>

        <a-row justify="center">
          <a-col span="12">
            <a-form-item name="file" :rules="[{ required: false }]" label="附件">
              <a-upload v-model:fileList="formState.file">
                <a-button class="flex items-center">
                  <upload-outlined></upload-outlined>
                  上传附件
                </a-button>
              </a-upload>
            </a-form-item>
          </a-col>
        </a-row>

        <a-row justify="center">
          <a-col span="12">
            <a-form-item name="content" :rules="[{ required: true }]" label="内容">
              <a-textarea style="max-height: 400;" :rows="4" v-model:value="formState.content" placeholder="请输入邮件内容" />
            </a-form-item>
          </a-col>
        </a-row>

        <a-row justify="center">
          <a-form-item>
            <a-button :loading="sendLoading" class="ml-20 w-[100px]" type="primary" html-type="submit">发送</a-button>
          </a-form-item>
        </a-row>

      </a-form>
    </a-card>
  </div>
</template>
