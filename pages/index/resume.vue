<template>
  <div class="p-4 ">
    <div class="mb-4 flex  flex-wrap justify-between ">


      <a-segmented @change="changeTab" v-model:value="tabValue" :options="batchList">
        <template #label="{ payload }">
          <div style="padding: 4px 4px">
            <div>{{ payload.title }}</div>
          </div>
        </template>
      </a-segmented>

      <a-button type="primary" @click="mangerbatch">管理招新批次</a-button>

    </div>

    <a-spin v-show="loading" size="large" />

    <resume-table v-show="!loading" :Data="tabledata"></resume-table>
    <a-empty v-show="!loading && tabledata.length === 0" />

  </div>
  <resume-drawer @getBatchlist="getbatchlist" :Data="drawData" ref="childRef"
    v-model:showDrawer="showDrawer"></resume-drawer>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { getBatchListAdminApi, getBatchStudentResumeApi } from "~/api/recruitBatch";
import type { DataItem } from '~/components/resume/types';
const childRef = ref<any | null>(null);//子组件实例
const showDrawer = ref(false);//控制抽屉显示
const batchList = ref([
  {
    value: '26',
    payload: {
      title: 'Spring',

    },
  },

]);
const tabValue = ref(batchList.value[0].value);//默认显示第一个批次
const tabledata = ref([
]);//表格数据
const drawData = ref<DataItem[]>();//抽屉数据
const mangerbatch = () => {
  //调用子组件的方法展开
  childRef.value.showDrawer()
  // isDisabled.value = true;
};//管理招新批次按钮点击事件
const getbatchlist = async () => {
  loading.value = true;
  const res = await getBatchListAdminApi();
  console.log(res.data);
  batchList.value = res.data.map((item: any) => ({
    value: item.id,
    payload: {
      title: item.title,

    },
  }));
  drawData.value = res.data.map((item: any) => ({
    id: item.id,
    batch: item.batch,
    title: item.title,
    status: 'normal',
    isRun: item.isRun,
    deadline: item.deadline,
  }));
  tabValue.value = batchList.value[0].value;

  //获取表格数据
  if (drawData.value) {
    getBatchStudentResumeApi(drawData.value[0].id).then((res) => {
      tabledata.value = res.data.map((item: any) => ({
        resumeId: item.resumeId,
        userId: item.userId,
        studentId: item.studentId,
        username: item.username,
        email: item.email,
        gender: item.gender,
        grade: item.grade,
        major: item.major,
        className: item.className,
        status: item.status,
        name: item.name,
      }));
      console.log(tabledata.value);
      loading.value = false;
    });
  }
}//获取招新批次列表
const loading = ref(false);//控制loading
//切换批次
const changeTab = (value: string) => {
  console.log(value);
  loading.value = true;
  getBatchStudentResumeApi(Number(value)).then((res) => {
    tabledata.value = res.data.map((item: any) => ({
      resumeId: item.resumeId,
      userId: item.userId,
      studentId: item.studentId,
      username: item.username,
      email: item.email,
      gender: item.gender,
      grade: item.grade,
      major: item.major,
      className: item.className,
      status: item.status,
      name: item.name,
    }));
    console.log(tabledata.value);
    loading.value = false;
  });




}
onMounted(() => {
  getbatchlist()
})


</script>

<style scoped></style>
