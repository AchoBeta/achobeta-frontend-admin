<script lang="ts" setup>
import { reactive } from 'vue';
import { getBatchListAdminApi } from '~/api/recruitBatch';
import { getResumeStatusApi } from '~/api/resumeStatus';
import { selectSentableUserApi, sendEmailMessageApi } from '~/api/interviewMessage'

const loading = ref(false)
const sendLoading = ref(false)
const batchList = ref<any[]>([])
const statusList = ref<any[]>([])
const gradeList = ref<any[]>(new Array(15).fill(2015).map( (item, index) => item + index + 1))
const nameList = ref<any>([])
const formState = reactive({
    userId: null,
    name: undefined,
    email: '',
    title: '',
    content: '',
    file: undefined
});
const condition = ref({
  batchId: null,
  grade: null,
  status: null,
  name:'',
  pageNo: 1,
  pageSize: 10,
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
  const resStatus = await getResumeStatusApi()
  if(resStatus.code === 200) {
    statusList.value = resStatus.data
  } else {
    message.error(resStatus.message)
  }

  loading.value = false
}

const selectUser = async () => {
  sendLoading.value = true 
  const res = await selectSentableUserApi(condition.value)
  if(res.code === 200){
    nameList.value = res.data.records.map((item: any) => {
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
  condition.value.name = ''
  formState.userId = null
  formState.name = undefined
  formState.email = ''
}

const onFinish = (values: any) => {
  sendLoading.value = true
  try {
    const condition = {
  "stuInfoSendList[0].email": values.email,
  "stuInfoSendList[0].stuName": nameList.value[0].label,
  "stuInfoSendList[0].userId": values.name,
  tittle: formState.content,
  content: formState.content,
  }

  const files = formState.file || []
  const fileList = files.map((item: any) => item.originFileObj)
  sendEmailMessageApi(condition, fileList).then((res) => {
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

const onNameChange = (userId:any) => {
  if(!userId) {
    reset()
    return
  }
  formState.userId = userId
  // todo 后续支持多发
  const selected = nameList.value.filter( (i:any) => i.value === userId)[0]
  if(selected) {
    condition.value.grade = selected?.grade
    condition.value.status = selected?.status
    formState.email = selected?.email
  }

}

const handleSearch = async (input: string) => {
  if(input === '') {
    nameList.value = []
    return
  }

  condition.value.name = input
  selectUser()
}

</script>

<template>
  <div class="p-4 bg-[#f5f5f5]">
    <a-card :loading="loading" class="items-center">
      <a-form class="w-4/5 mx-auto" :model="formState" :label-col="{span: 4}" :wrapper-col="{span: 20 }"
        name="nest-messages" @finish="onFinish">
        <a-divider>
          选择用户
          <a-tooltip>
            <template #title>可通过条件筛选查找用户，也可直接根据用户名筛选用户。必须选择用户名才能发送邮件</template>
            <QuestionCircleOutlined />
          </a-tooltip>
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
                <a-select-option v-for="(item, index) in statusList" :key="item.code" :value="item.code">{{ item.message
                  }}</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>

          <a-col span="12">
            <a-form-item name="name" label="姓名" :rules="[{ required: true }]">
              <a-select allow-clear v-model:value="formState.name" :filter-option="false" show-search
                style="width: 100%" @search="handleSearch" placeholder="请输入用户姓名" :options="nameList"
                @change="onNameChange" />
            </a-form-item>
          </a-col>
        </a-row>

        <a-divider>邮件信息</a-divider>

        <a-row justify="center">
          <a-col span="12">
            <a-form-item name="email" label="邮箱" :rules="[{ required: true, type: 'email' }]">
              <a-input v-model:value="formState.email" placeholder="请输入用户邮箱地址" />
            </a-form-item>
          </a-col>
        </a-row>

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
