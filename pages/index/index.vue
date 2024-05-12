<script lang="ts" setup>

</script>

<template>
  <div class="h-full w-full flex mx-auto py-5 px-5">
    <!-- <div class="text-xl">
      首页
    </div> -->

    <div class="left-container w-1/2 h-full bg-slate-600">
      <div class="p-5 data-cards flex flex-wrap items-start content-start justify-around bg-[#fbfbfb] w-full h-1/2">
        <index-singlecard
          title="3902" text="面试人数" subtext="334do333333333 " icon="https://obscloud.ulearning.cn/resources/web/1715413452402826.png
"
        />
        <index-singlecard text="面试官人数" color="#093cbd" />
        <index-ringcard />
        <index-ringcard ringcolor="#ff7b6f" />
      </div>
      <div class="p-5 calendar bg-slate-100 w-full h-1/3">
        <div class="calendar-header flex justify-between items-center">
          <!-- <no-ssr>
            <a-calendar fullscreen v-model:value="value" @panelChange="onPanelChange" />
          </no-ssr> -->
          <no-ssr>
            <index-calendar />
          </no-ssr>
        </div>
      </div>
      <!-- <div class="Situation-user p-5 bg-green-200 w-full h-1/5"> </div> -->
    </div>
    <div class="right-container w-1/2 h-full bg-red-700" />
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
