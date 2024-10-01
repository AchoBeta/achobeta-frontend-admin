<script setup lang="ts">
import { useUserStore } from '@/stores/modules/userStore';
import { ref } from 'vue';
import { getResumeAdminApi } from '~/api/resume';
import type { ResumeRequest } from '~/api/resume/types';
import { executeResumeEventApi, getResumeEventsApi, getResumeStatusApi } from '~/api/resumeStatus';
const userStore = useUserStore()
const resumeData = ref();
const open = ref(false);//控制弹窗显示
const stateList = ref<any[]>([]);//状态列表
const eventList = ref<eventType[]>([]);//事件列表
const resumeId = ref()
const userId = ref()
const batchId = ref()
const loading = ref(false)
type eventType = {
    event: number,
    description: string
}
const showModal = (resumeid: string, userid: string, batchid: string) => {
    resumeId.value = resumeid
    userId.value = userid
    batchId.value = batchid
    open.value = true;
    let data: ResumeRequest = {
        resumeId: Number(resumeid),
        queryResumeOfUserDTO: {
            userId: Number(userid),
            batchId: Number(batchid)
        }
    }
    getResumeAdminApi(data).then(res => {
        resumeData.value = res.data;
    })
};//弹窗显示函数





//获取状态列表
const getresumeStatus = async () => {
    const res = await getResumeStatusApi()
    stateList.value = res.data
}

const handleOk = (e: MouseEvent) => {
    open.value = false;
};//弹窗确认函数

const getColor = (code: number) => {
    switch (code) {
        case 0:
            return 'blue'; // 草稿状态使用蓝色
        case 1:
            return 'green'; // 待筛选状态使用绿色
        case 2:
            return 'gray'; // 假设筛选不通过状态使用灰色
        case 3:
            return 'orange'; // 假设待安排初试状态使用橙色
        case 4:
            return 'purple'; // 假设待初试状态使用紫色
        case 5:
            return 'geekblue'; // 假设初试通过状态使用极客蓝
        case 6:
            return 'volcano'; // 假设初试不通过状态使用火山红
        case 7:
            return 'gold'; // 假设待安排复试状态使用金色
        case 8:
            return 'lime'; // 假设待复试状态使用青绿色
        case 9:
            return 'cyan'; // 假设复试通过状态使用青色
        case 10:
            return 'magenta'; // 假设复试不通过状态使用品红色
        case 11:
            return 'pink'; // 假设待安排终试状态使用粉色
        case 12:
            return 'crimson'; // 假设待终试状态使用深红色
        case 13:
            return 'blue'; // 假设终试通过状态使用蓝色
        case 14:
            return 'red'; // 假设终试不通过状态使用红色
        case 15:
            return 'yellow'; // 假设待处理状态使用黄色
        case 16:
            return 'red'; // 挂起状态使用红色
        case 17:
            return 'default'; // 所有状态使用默认颜色
        default:
            return 'default'; // 默认颜色
    }
};

//获取事件列表
const getresumeEvent = async () => {
    const res = await getResumeEventsApi()
    eventList.value = res.data
}

const getcolorCode = (message: string) => {
    switch (message) {
        case '草稿':
            return 0;
        case '待筛选':
            return 1;
        case '筛选不通过':
            return 2;
        case '待安排初试':
            return 3;
        case '待初试':
            return 4;
        case '初试通过':
            return 5;
        case '初试不通过':
            return 6;
        case '待安排复试':
            return 7;
        case '待复试':
            return 8;
        case '复试通过':
            return 9;
        case '复试不通过':
            return 10;
        case '待安排终试':
            return 11;
        case '待终试':
            return 12;
        case '终试通过':
            return 13;
        case '终试不通过':
            return 14;
        case '待处理':
            return 15;
        case '挂起':
            return 16;
        case 'ALL':
            return 17;
        default:
            return -1;
    }
}

const handleEvent = (event: number, description: string) => {
    loading.value = true
    let adminInfo = {
        "memberDTO": {
            "username": userStore.userInfo.username,
            "password": userStore.userInfo.password
        }
    }
    executeResumeEventApi(resumeId.value, event, adminInfo).then(res => {

        message.success(description + '成功')

        let data: ResumeRequest = {
            resumeId: Number(resumeId.value),
            queryResumeOfUserDTO: {
                userId: Number(userId.value),
                batchId: Number(batchId.value)
            }
        }
        getResumeAdminApi(data).then(res => {
            resumeData.value = res.data;
        }).finally(() => {
            loading.value = false
        })
    })
}

const handleDownload = (url: string) => {
    window.open(url)
}
onMounted(async () => {
    getresumeStatus()
    getresumeEvent()
})


defineExpose({
    showModal,
    handleOk,
});

</script>

<template>

    <div>
        <a-modal class="" footer="" v-model:open="open" width="80%" title="简历" @ok="handleOk">
            <a-descriptions bordered v-if='resumeData'>

                <a-descriptions-item label="姓名" :span="2">{{ resumeData.stuSimpleResumeVO.name
                    }}</a-descriptions-item>

                <a-descriptions-item label="照片"><img class=" h-24" :src="resumeData.stuSimpleResumeVO.image"
                        alt="avatar" /></a-descriptions-item>
                <a-descriptions-item label="年级" :span="1">{{ resumeData.stuSimpleResumeVO.grade
                    }}</a-descriptions-item>

                <a-descriptions-item label="学号">{{ resumeData.stuSimpleResumeVO.studentId }}</a-descriptions-item>

                <a-descriptions-item label="性别">{{ resumeData.stuSimpleResumeVO.gender == 0 ? '男' : '女'
                    }}</a-descriptions-item>

                <a-descriptions-item label="专业">{{ resumeData.stuSimpleResumeVO.major }}</a-descriptions-item>
                <a-descriptions-item label="班级" :span="2">{{ resumeData.stuSimpleResumeVO.className
                    }}</a-descriptions-item>

                <a-descriptions-item label="邮箱" :span="2">{{ resumeData.stuSimpleResumeVO.email
                    }}</a-descriptions-item>
                <a-descriptions-item label="电话号码">{{ resumeData.stuSimpleResumeVO.phoneNumber
                    }}</a-descriptions-item>
                <a-descriptions-item label="想加入的原因" :span="3">{{ resumeData.stuSimpleResumeVO.reason
                    }}</a-descriptions-item>
                <a-descriptions-item label="自我描述" :span="3">{{ resumeData.stuSimpleResumeVO.introduce
                    }}</a-descriptions-item>
                <a-descriptions-item label="经历" :span="3">{{ resumeData.stuSimpleResumeVO.experience
                    }}</a-descriptions-item>

                <a-descriptions-item label="获奖情况" :span="3">{{ resumeData.stuSimpleResumeVO.awards
                    }}</a-descriptions-item>
                <a-descriptions-item label="自我评价" :span="3">{{ resumeData.stuSimpleResumeVO.remark
                    }}</a-descriptions-item>
                <a-descriptions-item label="附件" :span="3">
                    <div class="w-full flex flex-col items-start">
                        <template v-for="item in resumeData.stuAttachmentVOList">
                            <a-button type="link" class="ml-2" @click="handleDownload(item.attachment)">{{ item.filename
                                }}</a-button>
                        </template>

                    </div>

                </a-descriptions-item>
                <a-descriptions-item label="状态">


                    <div v-for="item in stateList" :key="item.code">
                        <div v-if="resumeData.stuSimpleResumeVO.status === item.code">
                            <a-tag :color="getColor(item.code)">{{ item.message }}</a-tag>
                        </div>
                    </div>
                </a-descriptions-item>

            </a-descriptions>
            <a-divider type="horizontal">进程推进及说明</a-divider>
            <div class="w-full flex justify-between">
                <a-space class="flex-col flex items-start" wrap>
                    <div class="event-line">
                        <a-tag color="blue">推进</a-tag>
                        <span class="mr-2">:</span>
                        <div class="event-line-content">
                            <a-tag :color="getColor(getcolorCode('待筛选'))">待筛选</a-tag>
                            →
                            <a-tag :color="getColor(getcolorCode('待安排初试'))">待安排初试</a-tag>
                            →
                            <a-tag :color="getColor(getcolorCode('待初试'))">待初试</a-tag>
                            →
                            <a-tag :color="getColor(getcolorCode('待安排复试'))">待安排复试</a-tag>
                            →
                            <a-tag :color="getColor(getcolorCode('待复试'))">待复试</a-tag>
                            →
                            <a-tag :color="getColor(getcolorCode('待安排终试'))">待安排终试</a-tag>
                            →
                            <a-tag :color="getColor(getcolorCode('待终试'))">待终试</a-tag>
                        </div>
                    </div>
                    <div class="event-line">
                        <a-tag color="blue">通过</a-tag>
                        <span class="mr-2">:</span>
                        <div class="event-line-content">
                            <a-tag :color="getColor(getcolorCode('待初试'))">待初试</a-tag>
                            →
                            <a-tag :color="getColor(getcolorCode('初试通过'))">初试通过</a-tag>
                            →
                            <a-tag :color="getColor(getcolorCode('待复试'))">待复试</a-tag>
                            →
                            <a-tag :color="getColor(getcolorCode('复试通过'))">复试通过</a-tag>
                            →
                            <a-tag :color="getColor(getcolorCode('待终试'))">待终试</a-tag>
                            →
                            <a-tag :color="getColor(getcolorCode('终试通过'))">终试通过</a-tag>
                        </div>
                    </div>
                    <div class="event-line">
                        <a-tag color="blue" class="h-6"> 不通过</a-tag>
                        <span class="mr-2">:</span>

                        <div class="event-line-content">
                            <a-tag :color="getColor(getcolorCode('待筛选'))">待筛选</a-tag>
                            →
                            <a-tag :color="getColor(getcolorCode('筛选不通过'))">筛选不通过</a-tag>
                            <div class="w-full h-2"></div>
                            <a-tag :color="getColor(getcolorCode('待初试'))">待初试</a-tag>
                            →
                            <a-tag :color="getColor(getcolorCode('初试不通过'))">初试不通过</a-tag>
                            <div class="w-full h-2"></div>

                            <a-tag :color="getColor(getcolorCode('待复试'))">待复试</a-tag>
                            →
                            <a-tag :color="getColor(getcolorCode('复试不通过'))">复试不通过</a-tag>
                            <div class="w-full h-2"></div>

                            <a-tag :color="getColor(getcolorCode('待终试'))">待终试</a-tag>
                            →
                            <a-tag :color="getColor(getcolorCode('终试不通过'))">终试不通过</a-tag>
                        </div>
                    </div>
                    <div class="event-line">
                        <a-tag color="blue">重置</a-tag>
                        <span class="mr-2">:</span>
                        <div class="event-line-content">
                            <a-tag :color="getColor(getcolorCode('ALL'))">ALL</a-tag>
                            →
                            <a-tag :color="getColor(getcolorCode('草稿'))">草稿</a-tag>
                        </div>
                    </div>
                    <div class="event-line">
                        <a-tag color="blue">待处理</a-tag>
                        <span class="mr-2">:</span>
                        <div class="event-line-content">
                            <a-tag :color="getColor(getcolorCode('ALL'))">ALL</a-tag>
                            →
                            <a-tag :color="getColor(getcolorCode('待处理'))">待处理</a-tag>
                        </div>
                    </div>
                    <div class="event-line">
                        <a-tag color="blue">挂起</a-tag>
                        <span class="mr-2">:</span>

                        <div class="event-line-content">
                            <a-tag :color="getColor(getcolorCode('ALL'))">ALL</a-tag>
                            →
                            <a-tag :color="getColor(getcolorCode('挂起'))">挂起</a-tag>
                        </div>
                    </div>
                    <div class="event-line">
                        <a-tag color="blue">转正</a-tag>
                        <span class="mr-2">:</span>
                        <div class="event-line-content">
                            <a-space>


                                <a-tag :color="getColor(getcolorCode('初试通过'))">初试通过</a-tag>
                                <br />
                                <a-tag :color="getColor(getcolorCode('复试通过'))">复试通过</a-tag>
                                <br />
                                <a-tag :color="getColor(getcolorCode('终试通过'))">终试通过</a-tag>
                            </a-space>
                        </div>
                    </div>

                </a-space>


                <a-dropdown :trigger="['click']">
                    <a-button :loading="loading" type="primary" @click.prevent>
                        处理
                        <DownOutlined />
                        <!-- <UpOutlined /> -->
                    </a-button>
                    <template #overlay>
                        <a-menu>

                            <a-menu-item v-for="item in eventList" :key="item.event"
                                @click="handleEvent(item.event, item.description)">{{
            item.description }}</a-menu-item>


                        </a-menu>

                    </template>
                </a-dropdown>
            </div>
        </a-modal>
    </div>
</template>

<style scoped>
.event-line {
    padding: 10px;
    display: flex;
    flex-direction: row;
}

.active {
    background-color: red;

}
</style>
