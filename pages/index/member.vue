<script setup>
import { onMounted } from 'vue'
import { getMemInfoListApi } from '~/api/fullMember';

const loading = ref(false)
onMounted(() => {
  init()
})

let memberList = ref([])

const init = async () => {
  loading.value = true
  const res = await getMemInfoListApi()
  if (res.code === 200) {
    memberList.value = res.data
  } else {
    message.error(res.msg)
  }

  loading.value = false
}

</script>

<template>
  <div class="flex-1 flex flex-col p-4 bg-bg-base min-h-full">
    <a-list :grid="{ gutter: 16, xs: 1, sm: 2, md: 3, lg: 4, xl: 4, xxl: 4 }" :data-source="memberList"
      :pagination="{hideOnSinglePage: true, pageSize: 8}" class='flex-1 h-full'>
      <template #renderItem="{ item }">
        <a-list-item :key="item?.userVO?.username" style="padding: 12px 0; margin-bottom: 0;">
          <viewer-userCard :info="item" />
        </a-list-item>
      </template>
      <!-- <template #header>
        <header class="flex justify-between items-center">
          <label class="input input-bordered flex items-center gap-2">
            <input type="text" class="grow" placeholder="Search">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="w-4 h-4 opacity-70">
              <path fill-rule="evenodd"
                d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                clip-rule="evenodd" />
            </svg>
          </label>
          <div class="flex">
            <select class="select select-bordered w-full max-w-xs mr-8">
              <option disabled selected>
                Who shot first?
              </option>
              <option>Han Solo</option>
              <option>Greedo</option>
            </select>
            <button class="btn mr-5 btn-secondary">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                <path d="M4 11 L18 11 M11 4 L11 18" stroke-linecap="round" fill="none" stroke="#" stroke-width="4" />
              </svg>
              添加人员
            </button>
          </div>
        </header>
      </template> -->
    </a-list>
  </div>
</template>

<style scoped lang="less"></style>
