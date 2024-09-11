<template>
  <div class="flex flex-col justify-center w-1/3 bg-blue-100 rounded-lg items-center p-4">
    <a-avatar :size="{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }"
      src="https://raw.githubusercontent.com/singleeeee/imgStorage/main/img/202405121150054.jpg" class="object-contain">
    </a-avatar>
    <div className="badge badge-accent text-white mt-2">管理员</div>
    <h2 class="pt-4 pb-1 text-xl font-bold text-center">半糖小子
    </h2>
    <span class="pb-4">要么卷，要么卷铺盖</span>
    <ul>
      <li class="flex items-center pb-1">
        <HomeOutlined class="mr-2" />广东 东莞
      </li>
      <li class="flex items-center pb-1">
        <PhoneOutlined class="mr-2" />+12 345 6789 0
      </li>
      <li class="flex items-center pb-1">
        <MailOutlined class="mr-2" />bantang123@mail.com
      </li>
    </ul>
  </div>
</template>
<script lang="ts" setup>
const props = defineProps({
  userInfo: {
    type: Object,
    required: true
  }
})

console.log(props.userInfo)
</script>
