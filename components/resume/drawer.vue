<template>
    <!-- <a-button type="primary" @click="showDrawer">Open</a-button> -->
    <a-drawer :width="500" title="管理招新批次" :placement="placement" :open="open" @close="closeDrawer">
        <template #extra>
        </template>
        <a-spin v-if="loading" />

        <a-list v-else item-layout="horizontal" :data-source="data">
            <template #renderItem="{ item, index }">

                <a-list-item class="flex flex-col">
                    <a-list-item-meta class="w-full">
                        <template #title>
                            <div class="flex w-full justify-between items-center content-center">
                                <a-input class="w-auto text-xl" show-count :maxlength="20" size="small"
                                    v-if="item.status === 'editing'" v-model:value="edittitle" placeholder="请输入招新标题" />

                                <a v-else class="mr-7 text-xl">{{ item.title }}</a>
                                <div class="flex-row flex justify-center items-center ">
                                    <FormOutlined v-if="!item.isRun" @click="exitBatch(index)"
                                        style="font-size: large;margin-right: 15px;" />
                                    <a-switch @click="shiftStatus(index)" v-model:checked="item.isRun" />
                                </div>
                            </div>
                        </template>

                    </a-list-item-meta>
                    <br />
                    <div class="flex w-full  justify-start items-center">
                        <span class="text-lg mr-5">截止时间:</span>{{ item.deadline }}
                    </div>
                    <resume-Calendar ref="childRef" v-if="item.status === 'editing'"
                        :time="item.deadline"></resume-Calendar>
                    <template #extra class="flex justify-end items-center">
                        <div v-if="item.status === 'editing'" class="w-full flex justify-end items-center">
                            <a-button style="margin-right: 8px" value="small" @click="onClose(index)">取消</a-button>

                            <a-button type="primary" value="small" @click="onSave(index)">保存</a-button>
                        </div>
                    </template>

                </a-list-item>
            </template>
        </a-list>
        <div class="w-full mt-4">
            <a-button class="w-full" @click="handleModal()" size="large" type="dashed">创建招新批次</a-button>

        </div>

    </a-drawer>
    <a-modal v-model:open="showModal" title="创建新的招新批次" @ok="handleOk">
        <div class="modalInfo-item">

            <a-input class="w-auto text-xl" v-model:value="inputTitle" show-count :maxlength="20" size="small"
                placeholder="请输入招新标题" />
        </div>
        <div class="modalInfo-item"> 招新批次：
            <a-input-number size="small" type="number" v-model:value="inputBatch" />
            <span class="text-xs text-gray-500">（请输入数字，如6）</span>
        </div>
        <div class="modalInfo-item">
            <span class="">截止时间:</span>
            <resume-Calendar ref="childRef"></resume-Calendar>
        </div>

    </a-modal>
</template>
<script lang="ts" setup>
import { responseCode } from '@/constants/responseCode';
import type { DrawerProps } from 'ant-design-vue';
import { ref } from 'vue';
import { createRecruitBatchApi, endRecruitBatchApi, startRecruitBatchApi, updateRecruitBatchApi } from "~/api/recruitBatch";
import type { CreateRecruitBatch, UpdateRecruitBatch } from '~/api/recruitBatch/types';
import type { DataItem } from '~/components/resume/types';
const childRef = ref<any | null>(null);// 日历组件的ref
const placement = ref<DrawerProps['placement']>('right');// drawer的位置
const open = ref<boolean>(false);// drawer的状态
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
})//父组件传来的数据
const loading = ref<boolean>(false);// 加载状态
const data = ref(computed(() => props.Data));// 招新批次数据
const edittitle = ref<string>('');//编辑状态下的标题
const showModal = ref<boolean>(false);//modal的状态
const inputTitle = ref<string>('');//modal输入的标题
const inputBatch = ref<number>(0);//modal输入的批次
// 定义父组件的事件
const emit = defineEmits<{
    (event: 'getBatchlist'): boolean;
}>();
//处理drawer的逻辑
const showDrawer = () => {
    open.value = true;
};
//处理drawer的关闭逻辑
const closeDrawer = () => {
    open.value = false;
};
//更新取消按钮的逻辑
const onClose = (index: number) => {
    data.value[index].status = 'normal';
};
//保存按钮的逻辑
const onSave = (index: number) => {
    if (data.value[index].title.trim() === '') {
        message.error('请输入招新标题');
        return;
    } else {
        loading.value = true;
        let time
        if (childRef.value) {
            const timestamp = childRef.value.timestamp;
            if (timestamp) {
                time = timestamp;
            } else {
                time = formattedDateStringToTimestamp(data.value[index].deadline);
            }
        }
        // TODO: save data
        let postData: UpdateRecruitBatch = {
            batchId: data.value[index].id,
            title: edittitle.value,
            deadline: time,
        }
        updateRecruitBatchApi(postData).then((res) => {
            if (res) {
                if (res.code === responseCode.UNVALID_TIME.value) {
                    message.error('保存失败，招新时间已开始');
                } else {
                    message.success('保存成功');
                }


            } else {
                message.error('保存失败');
            }
        }).finally(() => {
            loading.value = false;
        });
        data.value[index].status = 'normal';
        data.value[index].title = edittitle.value;
        data.value[index].deadline = childRef.value.timeSring;
    }
};

//处理招新批次的逻辑
const exitBatch = (index: number) => {
    // TODO: exit batch
    data.value[index].status = 'editing';
    edittitle.value = data.value[index].title;
    data.value.map((item, i) => {
        if (i !== index) {
            item.status = 'normal';
        }
    });
};
const shiftStatus = (index: number) => {
    if (!data.value[index].isRun) {
        endRecruitBatchApi(String(data.value[index].id)).then((res) => {
            if (res) {
                if (res.code === responseCode.SUCCESS.value) {
                    message.success('结束招新成功');
                } else {
                    message.error('结束招新失败');
                }
            }
        });
    } else {
        startRecruitBatchApi(String(data.value[index].id)).then((res) => {
            if (res) {
                if (res.code === responseCode.SUCCESS.value) {
                    message.success('开始招新成功');
                } else {
                    message.error('开始招新失败');
                }
            }
        });
    }
};

//这里处理modal的逻辑
const handleModal = () => {
    showModal.value = true;
    inputTitle.value = '';
    inputBatch.value = 0;
};
//验证inputBatch的输入
const validateBatch = (value: number): boolean => {
    if (value < 0) {
        message.error('请输入正确的批次');
        return false;
    }

    for (const element of data.value) {
        if (element.batch === value) {
            message.error('批次号已存在');
            return false;
        }
    }

    return true;
};




const handleOk = () => {
    if (inputTitle.value.trim() === '') {
        message.error('请输入招新标题');
        return;
    } else if (!validateBatch(inputBatch.value)) {

        return;
    } else if (!childRef.value.timestamp) {
        message.error('请选择正确的截止时间');
    }
    else {
        loading.value = true;
        let time
        showModal.value = false;

        if (childRef.value) {
            const timestamp = childRef.value.timestamp;
            if (timestamp) {
                time = timestamp;
            } else {
                time = formattedDateStringToTimestamp(inputTitle.value);
            }
            // TODO: save data
            let postData: CreateRecruitBatch = {
                title: inputTitle.value,
                batch: inputBatch.value,
                deadline: time,
            }
            createRecruitBatchApi(postData).then((res: any) => {
                if (res) {
                    if (res.code === responseCode.UNVALID_TIME.value) {
                        message.error('创建失败，招新时间已开始');
                    } else {
                        message.success('创建成功');

                        emit('getBatchlist')
                        loading.value = false;


                    }
                } else {
                    message.error('创建失败');
                }
            }).finally(() => {


            });


        }
    };
};

// 格式化日期字符串为时间戳
function formattedDateStringToTimestamp(formattedString: string) {
    // 使用Date对象解析格式化的日期字符串，并指定GMT+8时区
    const date = new Date(formattedString.replace(' ', 'T') + '+08:00');
    // 使用getTime()方法获取时间戳
    const timestamp = date.getTime();
    return timestamp;
}

defineExpose({
    showDrawer,
    onClose
});
</script>
<style lang="less" scoped>
.modalInfo-item {
    margin-bottom: 10px;
}
</style>