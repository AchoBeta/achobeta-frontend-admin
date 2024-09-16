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
                                <a-input class="w-auto" show-count :maxlength="20" size="small"
                                    v-if="item.status === 'editing'" v-model:value="item.title" placeholder="请输入招新标题" />

                                <a v-else class="mr-7">{{ item.title }}</a>
                                <div class="flex-row flex justify-center items-center ">
                                    <FormOutlined @click="exitBatch(index)"
                                        style="font-size: large;margin-right: 15px;" />
                                    <a-switch v-model:checked="item.isRun" />
                                </div>
                            </div>
                        </template>

                    </a-list-item-meta>
                    <br />
                    <div class="flex justify-between items-center"><span>截止时间:</span>{{ item.deadline }}</div>
                    <resume-Calendar :time="item.deadline"></resume-Calendar>
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
import type { DataItem } from '~/components/resume/types';
const placement = ref<DrawerProps['placement']>('right');
const open = ref<boolean>(false);
const props = defineProps({
    Data: {
        type: Array as PropType<DataItem[]>,    // 数据类型
        default: () => [{
            title: '26届招新',
            status: 'normal',
            isRun: false
        },
        {
            title: '25届招新',
            status: 'normal',
            isRun: false

        }

        ] // 默认值
    }
})
const data = ref(computed(() => props.Data));
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


defineExpose({
    showDrawer,
    onClose
});
</script>