<template>
  <div class="p-4 ">
    <div class="mb-4 flex  flex-wrap justify-between ">

      <a-segmented block v-model:value="tabValue" :options="batchlist"></a-segmented>
      <a-button type="primary" @click="mangerbatch">管理招新批次</a-button>

    </div>
    <br />
    <br />

    <resume-table :data="tabledata"></resume-table>
  </div>
  <resume-drawer @getBatchlist="getbatchlist" :Data="drawData" ref="childRef"
    v-model:showDrawer="showDrawer"></resume-drawer>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { getBatchListAdminApi } from "~/api/recruitBatch";

import type { DataItem } from '~/components/resume/types';
const childRef = ref<any | null>(null);
const showDrawer = ref(false);
const batchlist = ref(['26届招新']);
const tabValue = ref(batchlist.value[0]);
const tabledata = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer'],
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    tags: ['loser'],
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  },
];

const drawData = ref<DataItem[]>();
const mangerbatch = () => {
  //调用子组件的方法展开
  childRef.value.showDrawer()
  // isDisabled.value = true;
};
const getbatchlist = async () => {
  const res = await getBatchListAdminApi();
  console.log(res.data);
  batchlist.value = res.data.map((item: any) => item.title);
  drawData.value = res.data.map((item: any) => ({
    id: item.id,
    batch: item.batch,
    title: item.title,
    status: 'normal',
    isRun: item.isRun,
    deadline: item.deadline,
  }));
  tabValue.value = batchlist.value[0];

}
onMounted(() => {
  getbatchlist()
})


</script>

<style scoped></style>
