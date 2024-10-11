<template>
  <a-upload v-model:file-list="fileList" name="avatar" list-type="picture-card" class="avatar-uploader"
    :show-upload-list="false" action="" :before-upload="beforeUpload" @change="handleChange">
    <img v-if="imageUrl" :src="imageUrl" alt="avatar" />
    <div v-else>
      <loading-outlined v-if="loading"></loading-outlined>
      <plus-outlined v-else></plus-outlined>
      <div class="ant-upload-text">上传图片</div>
    </div>
  </a-upload>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import type { PropType } from 'vue';
import { message } from 'ant-design-vue';
import type { UploadChangeParam } from 'ant-design-vue';
import { DEFAULT_AVATAR } from '~/constants/global';
import { useAvatar } from '~/utils/user';
import { uploadImageApi } from '~/api/resource';

const props = defineProps({
  avatar: {
    type: Object as PropType<string | number | null>,
    default: DEFAULT_AVATAR
  },
  imgChange: {
    type: Function,
    default: () => {}
  }
})

function getBase64(img: Blob, callback: (base64Url: string) => void) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result as string));
  reader.readAsDataURL(img);
}

const fileList = ref([]);
const loading = ref<boolean>(false);
const { avatar: imageUrl, loading: avatarLoading } = useAvatar(props.avatar)


const handleChange = (info: UploadChangeParam) => {
  if (info.file.status === 'uploading') {
    loading.value = true;
    return;
  }
  if (info.file.status === 'done') {
    // Get this url from response in real world.
    getBase64(info.file.originFileObj as any, (base64Url: string) => {
      imageUrl.value = base64Url;
      loading.value = false;
    });

    uploadImageApi(info.file.originFileObj as any).then( res => {
      props.imgChange(res.data)
    })
  }
  if (info.file.status === 'error') {
    loading.value = false;
    message.error('upload error');
  }
};

const beforeUpload = (file:any) => {
  return file
};
</script>
<style scoped>
.avatar-uploader>.ant-upload {
  width: 128px;
  height: 128px;
}

.ant-upload-select-picture-card i {
  font-size: 32px;
  color: #999;
}

.ant-upload-select-picture-card .ant-upload-text {
  margin-top: 8px;
  color: #666;
}
</style>
