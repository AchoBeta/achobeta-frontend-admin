<script lang="ts" setup>
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { createInterviewCommentApi, deleteInterviewCommentApi, getInterviewCommentApi, updataInterviewCommentApi } from '~/api/interviewEvaluation'
import type { CommentDetail } from '~/api/interviewEvaluation/types'
import { useUserStore } from '~/stores'
import { useAvatar } from '~/utils/user'

const props = defineProps({
  interviewId: {
    type: String,
    required: true,
  },
})

dayjs.extend(relativeTime)

const loading = ref(false)
const commentList = ref<CommentDetail[]>()
const newComment = ref('')
const userStore = useUserStore()
const selectedId = ref<number>()
const { avatar: avatarSrc } = useAvatar(userStore.userInfo.avatar)

onMounted(() => {
  init()
})

const init = () => {
  getComment()
}

const getComment = async () => {
  if (!props.interviewId)
    return

  loading.value = true
  const res = await getInterviewCommentApi(props.interviewId)
  if (res.code === 200)
    commentList.value = res.data
  else
    message.error(res.message)

  loading.value = false
}

const editComment = async (id: number, content: string) => {
  if (!id || !content)
    return

  if (selectedId.value) {
    selectedId.value = undefined
    newComment.value = ''
    return
  }

  newComment.value = content
  selectedId.value = id
}

const deleteComment = async (id: number) => {
  if (!id)
    return

  loading.value = true
  const res = await deleteInterviewCommentApi(String(id))
  if (res.code === 200) {
    message.success('删除成功')
    getComment()
  }
  else {
    message.error(res.message)
  }

  loading.value = false
}

const addComment = async () => {
  if (!newComment.value)
    return

  loading.value = true
  if (selectedId.value) {
    const data = {
      commentId: selectedId.value,
      content: newComment.value,
    }
    const res = await updataInterviewCommentApi(data)
    if (res.code === 200) {
      message.success('更新成功')
      newComment.value = ''
      selectedId.value = undefined
      getComment()
    }
    else {
      message.error(res.message)
    }
  }
  else {
    const data = {
      interviewId: Number(props.interviewId),
      content: newComment.value,
    }

    const res = await createInterviewCommentApi(data)
    if (res.code === 200) {
      message.success('评论成功')
      newComment.value = ''
      getComment()
    }
    else {
      message.error(res.message)
    }
  }

  loading.value = false
}
</script>

<template>
  <a-list
    :loading="loading"
    item-layout="horizontal"
    :data-source="commentList"
  >
    <template #renderItem="{ item }">
      <a-list-item>
        <a-list-item-meta :description="item.content">
          <template #title>
            <div class="flex">
              <a>{{ item.commentator.nickname }}</a>
              <div class="ml-4 text-gray-400">
                {{ dayjs(item.updateTime).fromNow() }}
              </div>
            </div>
          </template>
          <template #avatar>
            <workbench-interview-commentAvatar :data="item" />
          </template>
        </a-list-item-meta>

        <template
          v-if="item.commentator.username === userStore.userInfo.username"
          #actions
        >
          <a
            key="list-loadmore-more"
            style="color: #1890ff"
            @click="editComment(item.id, item.content)"
          >{{ selectedId
            ? '取消编辑' : '编辑' }}</a>
          <a-popconfirm
            title="你确定要删除这条评论吗？"
            @confirm="deleteComment(item.id)"
          >
            <a
              key="list-loadmore-more"
              style="color: red"
            >删除</a>
          </a-popconfirm>
        </template>
      </a-list-item>
    </template>
  </a-list>

  <a-comment style="padding: 0 25px">
    <template #avatar>
      <img
        :src="avatarSrc"
        alt="avatar"
      >
    </template>
    <template #content>
      <a-form-item>
        <a-textarea
          v-model:value="newComment"
          :rows="3"
        />
      </a-form-item>
      <a-form-item>
        <a-button
          class="mr-4"
          html-type="submit"
          :loading="loading"
          @click="getComment"
        >
          刷新
        </a-button>
        <a-button
          html-type="submit"
          :loading="loading"
          type="primary"
          @click="addComment"
        >
          {{ selectedId ? '更新' : '评论' }}
        </a-button>
      </a-form-item>
    </template>
  </a-comment>
</template>

<style scoped></style>
