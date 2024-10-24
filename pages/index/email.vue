<script lang="ts" setup>
import { getBatchListAdminApi } from '~/api/recruitBatch'
import { addMessageTemplateApi, getMessageTemplateApi, removeMessageTemplateApi, selectSentableUserApi, sendEmailsMessageApi, updateMessageTemplateApi } from '~/api/interviewMessage'
import type { Template, messageFormat } from '~/api/interviewMessage/types'
import { RESUME_STATUES } from '~/constants/resume'

const loading = ref(false)
const sendLoading = ref(false)
const batchList = ref<any[]>([])
const gradeList = ref<any[]>(Array.from({ length: 15 }).fill(2018).map((item, index) => item + index))
const nameList = ref<any>([])
const formState = reactive({
  userIds: undefined,
  title: '',
  content: '',
  file: undefined,
  batchId: null,
})
const condition = ref({
  batchId: null,
  grade: null,
  status: null,
  pageNo: 1,
  pageSize: 100,
})
const templateList = ref<Template[]>([])
const selectedTemplate = ref()

onMounted(async () => {
  init()
})

const init = async () => {
  loading.value = true
  getTemplate()
  const resBatch = await getBatchListAdminApi()
  if (resBatch.code === 200)
    batchList.value = resBatch.data
  else
    message.error(resBatch.message)

  loading.value = false
}

const selectUser = async () => {
  sendLoading.value = true
  condition.value.batchId = formState.batchId
  const res = await selectSentableUserApi(condition.value)
  if (res.code === 200) {
    nameList.value = res.data.list.map((item: any) => {
      return {
        ...item,
        label: item.name,
        value: item.userId,
      }
    })
  }
  else {
    message.error(res.message)
  }

  sendLoading.value = false
}

const reset = () => {
  condition.value.batchId = null
  condition.value.grade = null
  condition.value.status = null
  formState.userIds = undefined
  formState.title = ''
  formState.content = ''
  formState.file = undefined
  formState.batchId = null
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
      batchId: formState.batchId as any,
    }

    sendEmailsMessageApi(data).then((res) => {
      if (res.code === 200) {
        message.success('发送成功')
        reset()
      }
      else {
        message.error(res.message)
      }

      sendLoading.value = false
    })
  }
  catch (error) {
    console.log(error)
  }
}

const filterOption = (input: string, option: any) => {
  return option.label.toLowerCase().includes(input.toLowerCase())
}

const onTemlateChange = (value: any, options: any) => {
  if (value) {
    formState.title = options.templateTitle
    formState.content = options.templateContent
    selectedTemplate.value = options
  }
  else {
    formState.title = ''
    formState.content = ''
    selectedTemplate.value = undefined
  }
}

const getTemplate = async () => {
  sendLoading.value = true
  const res = await getMessageTemplateApi()
  if (res.code === 200)
    templateList.value = res.data.map(i => ({ ...i, label: i.templateTitle, value: i.templateContent }))
  else
    message.error(res.message)

  sendLoading.value = false
}

const deleteTemplate = async () => {
  sendLoading.value = true
  const res = await removeMessageTemplateApi(selectedTemplate.value.id)
  if (res.code === 200) {
    resetTemplate()
    message.success('删除成功')
    getTemplate()
  }
  else {
    message.error(res.message)
  }

  sendLoading.value = false
}

const updateTemplate = async () => {
  sendLoading.value = true
  const data = {
    id: selectedTemplate.value.id,
    templateTitle: formState.title,
    templateContent: formState.content,
  }

  const res = await updateMessageTemplateApi(data)
  if (res.code === 200) {
    resetTemplate()
    message.success('更新成功')
    getTemplate()
  }
  else {
    message.error(res.message)
  }

  sendLoading.value = false
}

const addTemplate = async () => {
  if (!formState.title || !formState.content) {
    message.error('请填写标题和内容')
    return
  }

  sendLoading.value = true
  const data = {
    templateTitle: formState.title,
    templateContent: formState.content,
  }

  const res = await addMessageTemplateApi(data)
  if (res.code === 200) {
    resetTemplate()
    message.success('添加成功')
    getTemplate()
  }
  else {
    message.error(res.message)
  }

  sendLoading.value = false
}

const resetTemplate = () => {
  formState.title = ''
  formState.content = ''
  selectedTemplate.value = undefined
}
</script>

<template>
  <div class="p-4 bg-[#f5f5f5]">
    <a-card
      :loading="loading"
      class="items-center"
    >
      <a-form
        class="w-4/5 mx-auto"
        :model="formState"
        :label-col="{ span: 4 }"
        :wrapper-col="{ span: 20 }"
        name="nest-messages"
        @finish="onFinish"
      >
        <a-divider>
          筛选用户
        </a-divider>
        <a-row :gutter="24">
          <a-col span="12">
            <a-form-item
              name="batchId"
              label="招新批次"
              :rules="[{ required: true, message: '请选择招新批次' }]"
            >
              <a-select
                v-model:value="formState.batchId as any"
                allow-clear
                style="width: 100%"
                placeholder="请选择招新批次"
                @change="selectUser"
              >
                <a-select-option
                  v-for="(item) in batchList"
                  :key="item.id"
                  :value="item.id"
                >
                  {{ item.title
                  }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>

          <a-col span="12">
            <a-form-item label="年级">
              <a-select
                v-model:value="condition.grade as any"
                allow-clear
                style="width: 100%"
                placeholder="请选择用户的年级"
                @change="selectUser"
              >
                <a-select-option
                  v-for="(item, index) in gradeList"
                  :key="index"
                  :value="item"
                >
                  {{
                    item }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>

          <a-col span="12">
            <a-form-item label="简历状态">
              <a-select
                v-model:value="condition.status as any"
                allow-clear
                style="width: 100%"
                placeholder="请选择用户简历状态"
                @change="selectUser"
              >
                <a-select-option
                  v-for="(item) in Object.values(RESUME_STATUES)"
                  :key="item.value"
                  :value="item.value"
                >
                  {{
                    item.name
                  }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>

          <a-col span="12">
            <a-form-item
              name="userIds"
              label="用户"
              :rules="[{ required: true, message: '请选择用户' }]"
            >
              <a-select
                v-model:value="formState.userIds"
                allow-clear
                :filter-option="filterOption"
                mode="multiple"
                style="width: 100%"
                placeholder="请选择用户"
                :options="nameList"
              />
            </a-form-item>
          </a-col>

          <a-col span="12">
            <a-form-item label="内容模版">
              <a-select
                :value="selectedTemplate?.templateContent"
                allow-clear
                :filter-option="filterOption"
                style="width: 100%"
                placeholder="请挑选内容模板"
                :options="templateList"
                @change="onTemlateChange"
              />
            </a-form-item>
          </a-col>
        </a-row>

        <a-divider>邮件信息</a-divider>

        <a-row justify="center">
          <a-col span="24">
            <a-form-item
              name="title"
              :rules="[{ required: true }]"
              label="标题"
            >
              <a-input
                v-model:value="formState.title"
                placeholder="请输入邮件标题"
                style="width: 50%"
              />
            </a-form-item>
          </a-col>
        </a-row>

        <a-row justify="center">
          <a-col span="24">
            <a-form-item
              name="file"
              :rules="[{ required: false }]"
              label="附件"
            >
              <a-upload v-model:fileList="formState.file">
                <a-button class="flex items-center">
                  <upload-outlined />
                  上传附件
                </a-button>
              </a-upload>
            </a-form-item>
          </a-col>
        </a-row>

        <a-row justify="center">
          <a-col span="24">
            <a-form-item
              name="content"
              :rules="[{ required: true }]"
              label="内容"
            >
              <CommonMarkdownEditor
                v-model="formState.content"
                placeholder="请输入邮件内容"
              />
            </a-form-item>
          </a-col>
        </a-row>

        <a-row justify="center">
          <a-form-item>
            <div class="flex">
              <a-button
                v-show="selectedTemplate"
                :loading="sendLoading"
                danger
                class="mr-4"
                @click="deleteTemplate"
              >
                删除模板
              </a-button>
              <a-button
                v-show="selectedTemplate"
                :loading="sendLoading"
                class="mr-4"
                @click="updateTemplate"
              >
                更新模板
              </a-button>
              <a-button
                :loading="sendLoading"
                class="mr-4"
                @click="addTemplate"
              >
                存为模板
              </a-button>
              <a-button
                :loading="sendLoading"
                class="w-[140px]"
                type="primary"
                html-type="submit"
              >
                发送
              </a-button>
            </div>
          </a-form-item>
        </a-row>
      </a-form>
    </a-card>
  </div>
</template>
