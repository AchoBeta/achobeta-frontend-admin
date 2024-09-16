<template>
    <div class="my-3">


        <a-space direction="vertical" :size="12">
            <a-date-picker show-time placeholder="更改截止日期" @change="onChange" @ok="onOk" />

        </a-space>
    </div>
</template>
<script lang="ts" setup>
import { Dayjs } from 'dayjs';
const timestamp = ref<number>()
const timeSring = ref<string>()
const onChange = (value: Dayjs, dateString: string) => {

    timestamp.value = formattedDateStringToTimestamp(dateString);
    console.log('onChange: ', value, dateString, timestamp.value);
    timeSring.value = dateString
};

const onOk = (value: Dayjs) => {
    console.log('onOk: ', value);
};

// 格式化日期字符串为时间戳
function formattedDateStringToTimestamp(formattedString: string) {
    // 使用Date对象解析格式化的日期字符串，并指定GMT+8时区
    const date = new Date(formattedString.replace(' ', 'T') + '+08:00');

    // 使用getTime()方法获取时间戳
    const timestamp = date.getTime();

    return timestamp;
}

// 格式化时间戳为格式化的日期字符串，并指定GMT+8时区
function timestampToFormattedStringChina(timestamp: number) {
    // 使用Date对象解析时间戳
    const date = new Date(timestamp);

    // 构建格式化的日期字符串（中国时区）
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // 月份是从0开始的，所以加1
    const day = date.getDate().toString().padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');

    // 拼接日期字符串
    const formattedString = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    return formattedString;
}

// 使用示例
defineExpose({
    timestamp,
    timeSring
})

</script>