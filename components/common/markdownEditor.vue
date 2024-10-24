<script setup>
const props = defineProps({
  modelValue: {
    type: String,
    default: '',
    required: true,
  },
})

const emits = defineEmits(['update:modelValue'])

const localValue = ref(props.modelValue)

const toolbarsOptions = {
  bold: true, // 粗体
  italic: true, // 斜体
  header: true, // 标题
  mark: true, // 标记
  quote: true, // 引用
  ol: true, // 有序列表
  ul: true, // 无序列表
  link: true, // 链接
  imagelink: true, // 图片链接
  code: true, // code
  table: true, // 表格
  fullscreen: true, // 全屏编辑
  readmodel: true, // 沉浸式阅读
  help: true, // 帮助
  undo: true, // 上一步
  redo: true, // 下一步
  trash: true, // 清空
  navigation: true, // 导航目录
  alignleft: true, // 左对齐
  aligncenter: true, // 居中
  alignright: true, // 右对齐
  subfield: true, // 单双栏模式
  preview: true, // 预览
}

const handleChange = (value) => {
  localValue.value = value
  emits('update:modelValue', value)
}

watch(() => props.modelValue, (newVal) => {
  localValue.value = newVal
})
</script>

<template>
  <ClientOnly>
    <mavon-editor
      v-bind="$attrs"
      v-model="localValue"
      :toolbars="toolbarsOptions"
      :subfield="false"
      @change="handleChange"
    />
  </ClientOnly>
</template>

<style scoped></style>
