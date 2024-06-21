<script lang="ts" setup>
const imgSrc = 'https://obscloud.ulearning.cn/resources/web/1715413452402826.png'
</script>

<template>
  <div class="flex-1 bg-pink-200 w-full flex mx-auto ">
    <!-- 卡片区域 -->
    <div class="left-container w-1/2 h-full">
      <div class="p-5 data-cards flex flex-wrap items-start content-start justify-around bg-[#fbfbfb] w-full  pb-10">
        <index-singlecard title="3902" text="面试人数" subtext="334do333333333 " :icon="imgSrc" />
        <index-singlecard text="面试官人数" color="#093cbd" />
        <index-ringcard />
        <index-ringcard ringcolor="#ff7b6f" />
      </div>
      <!-- 日历 -->
      <div class="calendar px-4 py-5 w-full h-3/5">
        <div class="calendar-header flex p-3 justify-between items-center">
          <index-calendar />
          <!-- <no-ssr>
            <a-calendar fullscreen v-model:value="value" @panelChange="onPanelChange" />
          </no-ssr> -->
          <!-- <no-ssr>
            <index-calendar />
          </no-ssr> -->
        </div>
      </div>
      <!-- <div class="Situation-user p-5 bg-green-200 w-full h-1/5"> </div> -->
    </div>
    <!-- 平滑折线图 -->
    <div class="right-container w-1/2 h-full px-5  bg-[#fbfbfb]">
      <div class="p-5 bg-white h-2/5 w-full mb-5">
        <index-recruitdata />
      </div>
      <div class="p-5 bg-white h-2/5   w-full flex flex-row flex-wrap">
        <index-piechart />
      </div>
    </div>
  </div>
</template>

<style scoped>
.events {
  list-style: none;
  margin: 0;
  padding: 0;
}

.events .ant-badge-status {
  overflow: hidden;
  white-space: nowrap;
  width: 100%;
  text-overflow: ellipsis;
  font-size: 12px;
}

.notes-month {
  text-align: center;
  font-size: 28px;
}

.notes-month section {
  font-size: 28px;
}
</style>
