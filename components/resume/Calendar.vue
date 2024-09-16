<template>
    <div :style="{ width: '300px', border: '1px solid #d9d9d9', borderRadius: '4px' }">
        <a-calendar v-model:value="value" :fullscreen="false" @panelChange="onPanelChange" />
    </div>
</template>
<script lang="ts" setup>
import { Dayjs } from 'dayjs';
import { ref } from 'vue';

const value = ref<Dayjs>();
const onPanelChange = (value: Dayjs, mode: string) => {
    console.log(value, mode);
};
onMounted(() => {
});

</script>