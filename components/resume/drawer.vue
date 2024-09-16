<template>
    <!-- <a-button type="primary" @click="showDrawer">Open</a-button> -->
    <a-drawer :width="500" title="管理招新批次" :placement="placement" :open="open" @close="closeDrawer">
        <template #extra>
        </template>
        <a-list item-layout="horizontal" :data-source="data">
            <template #renderItem="{ item, index }">
                <a-list-item class="flex flex-col">
                    <a-list-item-meta class="w-full">
                        <template #title>
                            <div class="flex w-full justify-between items-center content-center">
                                <a-input class="w-auto" show-count :maxlength="15" size="small"
                                    v-if="item.status === 'editing'" :value="item.title" placeholder="请输入招新标题" />

                                <a v-else class="mr-7">{{ item.title }}</a>
                                <div class="flex-row flex justify-center items-center ">
                                    <FormOutlined @click="exitBatch(index)"
                                        style="font-size: large;margin-right: 15px;" />
                                    <a-switch v-model:checked="checked" />

                                </div>
                            </div>
                        </template>

                    </a-list-item-meta>
                    <br />
                    <resume-Calendar></resume-Calendar>
                    <template #extra class="flex justify-end items-center">
                        <div v-if="item.status === 'editing'" class="w-full flex justify-end items-center">
                            <a-button style="margin-right: 8px" value="small" @click="onClose(index)">取消</a-button>

                            <a-button type="primary" value="small" @click="onClose(index)">保存</a-button>
                        </div>
                    </template>

                </a-list-item>
            </template>
        </a-list>
    </a-drawer>
</template>
<script lang="ts" setup>
import type { DrawerProps } from 'ant-design-vue';
import { ref } from 'vue';
const checked = ref<boolean>(false);
const placement = ref<DrawerProps['placement']>('right');
const open = ref<boolean>(false);
interface DataItem {
    title: string;
    status: string
}
const showDrawer = () => {
    open.value = true;
};
const onClose = (index: number) => {
    data.value[index].status = 'normal';
    console.log(data.value)
};

const closeDrawer = () => {
    open.value = false;
};

const exitBatch = (index: number) => {
    // TODO: exit batch
    data.value[index].status = 'editing';
};

const data = ref<DataItem[]>(
    [
        {
            title: '26届招新',
            status: 'normal'
        },
        {
            title: '25届招新',
            status: 'normal'

        },
        {
            title: '24届招新',
            status: 'normal'
        },
        {
            title: '23届招新',
            status: 'normal'
        }
    ]
)

defineExpose({
    showDrawer,
    onClose
});
</script>