<script lang="ts" setup>
import { Form } from 'ant-design-vue';
import { getBankExamPaperApi, deletePaperApi, updatePaperApi, createPaperApi } from '~/api/examPaper';
import type { List } from '~/api/examPaper/types'
import { Modal } from 'ant-design-vue';

const route = useRoute()
const examBankId = route.params?.examBankId
const parent = ref(JSON.parse(route.query?.parent || ''))
const condition = {
  libId: [Number(examBankId)],
  current: 1,
  pageSize: 20
}
const loading = ref(false)
const paperList = ref<List[]>([])
const modalVisible = ref(false)
const useForm = Form.useForm;
const selectedExamPaper = ref<List>()
const formRef = reactive({
  libId: [examBankId],
  title: '',
  description: '',
});
const rulesRef = reactive({
  title: [
    {
      required: true,
      message: '请输入试卷名称',
    },
  ],
  description: [
    {
      required: true,
      message: '输入试卷描述',
    },
  ],
});
const { resetFields, validate, } = useForm(formRef, rulesRef);

onMounted(() => {
  init()
})

const init = () => {
  getPaper()
}

const getPaper = async () => {
  loading.value = true
  const res = await getBankExamPaperApi(condition)
  if (res.code === 200) {
    paperList.value = res.data.list
  } else {
    message.error(res.message)
  }

  loading.value = false
}

const openModal = (data: any) => {
  selectedExamPaper.value = data
  if (data) {
    formRef.description = data.description
    formRef.title = data.title
  }

  modalVisible.value = true
}

const onCancel = () => { 
  resetFields()
  modalVisible.value = false

}

const updateOrAdd = async () => {
  loading.value = true
  const data = {
    libIds: [Number(examBankId)],
    title: formRef.title,
    description: formRef.description
  }
  if (selectedExamPaper.value?.id) {
    const res = await updatePaperApi(selectedExamPaper.value.id, data)
    if (res.code === 200) {
      getPaper()
      modalVisible.value = false
      resetFields()
      message.success('更新成功')
    } else {
      message.error(res.message)
    }
  } else {
    const res = await createPaperApi(data)
    if (res.code === 200) {
      getPaper()
      modalVisible.value = false
      resetFields()
      message.success('创建成功')
    } else {
      message.error(res.message)
    }
  }

  loading.value = false
}

const onSave = () => {
  validate()
    .then(res => {
      updateOrAdd()
    })
    .catch(e => {
      console.error(e)
      e.errorFields.forEach(i => {
        i.errors.forEach(err => {
          message.error(err)
        })
      })
    })

}

const onDelete = (id: string) => {
  Modal.warning({
    title: '删除?',
    content: '你确定要删除该试卷吗?',
    closable: true,
    okText: '确定',
    okType: 'danger',
    cancelText: '取消',
    onOk: () => handleDelete(id),
    onCancel: () => {}
  })
}

const handleDelete = async (paperId: string) => {
  loading.value = true
  const res = await deletePaperApi(paperId)
  if (res.code === 200) {
    message.success('删除成功')
    getPaper()
  } else {
    message.error(res.message)
  }

  loading.value = false
}

const navigateToDetail = (item:any) => {
  return navigateTo({
    path: `detail/${item.id}`,
    query: {
      parent: JSON.stringify(item),
      examBankId: examBankId,
    }
  })
}

const onEdit = (item:any) => {
  openModal(item)
}

</script>

<template>
  <main class="flex-1 flex flex-col p-4 bg-bg-base min-h-full">
    <a-page-header style="border: 1px solid rgb(235, 237, 240)" :title="parent?.libType"
      :sub-title="'ID: ' + parent?.id + ' ' + '创建时间： ' + parent?.createTime" @back="() => navigateTo('/exampaperBank')">
      <template #extra>
        <a-button @click="openModal(null)" type="primary" key="3">创建</a-button>
      </template>
    </a-page-header>

    <a-list :loading="loading" :grid="{ gutter: 4, column: 4 }" :data-source="paperList" class='flex-1 h-full mt-6'>
      <template #renderItem="{ item, index }">
        <a-list-item>
          <a-card @click="navigateToDetail( item )" :headStyle="{padding: '0 12px' }" bordered hoverable
            :body-style="{padding: '24px 12px'}" class="w-full bg-slate-100">
            <template #title>
              <div class="flex justify-between w-full mt-1">
                <a-typography-paragraph class="font-bold" style="margin-bottom: 0;font-size: 18px;"
                  v-model:content="item.title" />
                <!-- <div class=" flex items-center justify-between text-[16px]">
                  <FieldNumberOutlined style="font-size: 18px; margin-right: 2px; margin-top: 2px;" />
                  .{{ item.id }}
                </div> -->
              </div>
            </template>

            <div>{{ item.description }}</div>
            <template #actions>
              <edit-outlined key="edit" @click="onEdit(item)" />
              <DeleteOutlined style="color: red;" key="delete" @click="onDelete(item.id)" />
            </template>
          </a-card>
        </a-list-item>

      </template>
    </a-list>

    <a-modal :width="500" v-model:open="modalVisible" @cancel="onCancel" :title="selectedExamPaper ? '更新试卷' : '创建试卷'"
      :confirm-loading="loading" @ok="onSave" ok-text="确定" cancel-text="取消">
      <a-form :model="formRef" class="mt-12" name="basic" :label-col="{ span: 4 }" :wrapper-col="{ span: 20 }"
        autocomplete="on">
        <a-form-item label="名称" name="title" required>
          <a-input v-model:value="formRef.title" />
        </a-form-item>

        <a-form-item label="描述" name="description" required>
          <a-textarea style="max-height: 300px;" v-model:value="formRef.description" />
        </a-form-item>
      </a-form>
    </a-modal>
  </main>

</template>

<style scoped></style>