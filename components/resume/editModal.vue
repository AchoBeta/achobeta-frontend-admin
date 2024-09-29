<script setup lang="ts">
import { ref } from 'vue';
import { getResumeAdminApi } from '~/api/resume';
import type { ResumeRequest } from '~/api/resume/types';
const resumeData = ref();
const open = ref(false);//控制弹窗显示
const showModal = (resumeid: string, userid: string, batchid: string) => {
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
        console.log(resumeData.value)
    })
};//弹窗显示函数

const handleOk = (e: MouseEvent) => {
    console.log(e);
    open.value = false;
};//弹窗确认函数

defineExpose({
    showModal,
    handleOk,
});

</script>

<template>

  <div>
    <a-modal v-model:open="open" width="1000px" title="简历" @ok="handleOk">

      <a-descriptions bordered v-if='resumeData'>

        <a-descriptions-item label="姓名" :span="2">{{ resumeData.stuSimpleResumeVO.name }}</a-descriptions-item>

        <a-descriptions-item label="照片"><img class=" h-24" :src="resumeData.stuSimpleResumeVO.image"
            alt="avatar" /></a-descriptions-item>
        <a-descriptions-item label="年级" :span="1">{{ resumeData.stuSimpleResumeVO.grade }}</a-descriptions-item>

        <a-descriptions-item label="学号">{{ resumeData.stuSimpleResumeVO.studentId }}</a-descriptions-item>

        <a-descriptions-item label="性别">{{ resumeData.stuSimpleResumeVO.gender == 0 ? '男' : '女'
          }}</a-descriptions-item>

        <a-descriptions-item label="专业">{{ resumeData.stuSimpleResumeVO.major }}</a-descriptions-item>
        <a-descriptions-item label="班级" :span="2">{{ resumeData.stuSimpleResumeVO.className
          }}</a-descriptions-item>

        <a-descriptions-item label="邮箱" :span="2">{{ resumeData.stuSimpleResumeVO.email }}</a-descriptions-item>
        <a-descriptions-item label="电话号码">{{ resumeData.stuSimpleResumeVO.phoneNumber }}</a-descriptions-item>
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
        <a-descriptions-item label="状态">{{ resumeData.stuSimpleResumeVO.status }}</a-descriptions-item>

      </a-descriptions>
    </a-modal>
  </div>
</template>
