<script setup>
import { useAvatar } from '~/utils/user'

const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
})

const { avatar: avatarSrc } = useAvatar(props?.data?.commentator?.avatar)
</script>

<template>
  <div>
    <img
      class="w-8 h-8 rounded-full"
      :src="avatarSrc"
      alt="头像"
    >
  </div>
</template>

<style scoped></style>
