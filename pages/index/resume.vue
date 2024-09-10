<template>
    <div class="p-4 ">
        <a-segmented v-model:value="value" :options="data"></a-segmented>
        <br />
        <br />
        <a-button type="primary" :disabled="isDisabled" @click="loadMore">Load More</a-button>

        <resume-table :data="tabledata"></resume-table>
    </div>
</template>
<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";
import { batchlistApi } from "../../api/resume/index";
const data = reactive(['Daily', 'Weekly', 'Monthly']);
const isDisabled = ref(false);
const loadMore = () => {
    data.push(...['Quarterly', 'Yearly']);
    isDisabled.value = true;
};
const value = ref(data[0]);
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


const getbatchlist = async () => {
    const res = await batchlistApi();
    console.log(res);
}
onMounted(() => {
    getbatchlist();
});

</script>
<style scoped></style>
