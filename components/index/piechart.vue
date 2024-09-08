<script setup lang="ts">
const chartData1 = {
  title: {
    text: '待初试',
    left: 'center',
    bottom: '10%',
    textStyle: {
      fontSize: 16,
    },
  },
  tooltip: {
    trigger: 'item',
  },
  series: [
    {
      name: 'Access From',
      type: 'pie',
      radius: ['40%', '70%'],
      avoidLabelOverlap: false,
      label: {
        show: true,
        position: 'center',
        fontSize: '25',
        fontWeight: 'bold',
        formatter: ' {c}% ',
      },
      emphasis: {
        label: {
          show: true,
          fontSize: '30',
          fontWeight: 'bold',
          formatter: ' {c}% ',
        },
      },
      labelLine: {
        show: false,
      },
      data: [
        { value: 70 },
        { value: 30 },
      ],
      color: ['#fb5252', '#f5edfe'],
      animationType: 'scale',
      animationEasing: 'elasticOut',
    },
  ],
}

const chartData2 = {
  title: {
    text: '待面试',
    left: 'center',
    bottom: '10%',
    textStyle: {
      fontSize: 18,
    },
  },
  tooltip: {
    trigger: 'item',
  },
  series: [
    {
      name: 'Access From',
      type: 'pie',
      radius: ['40%', '70%'],
      avoidLabelOverlap: false,
      label: {
        show: true,
        position: 'center',
        fontSize: '25',
        fontWeight: 'bold',
        formatter: ' {c}% ',
      },
      emphasis: {
        label: {
          show: true,
          fontSize: '30',
          fontWeight: 'bold',
          formatter: ' {c}% ',
        },
      },
      labelLine: {
        show: false,
      },
      data: [
        { value: 50 },
        { value: 50 },
      ],
      color: ['#2bc055', '#f5edfe'],
      animationType: 'scale',
      animationEasing: 'elasticOut',
    },
  ],
}
const chartData3 = {
  title: {
    text: '待复试',
    left: 'center',
    bottom: '10%',
    textStyle: {
      fontSize: 18,
    },
  },
  tooltip: {
    trigger: 'item',
  },
  series: [
    {
      name: 'Access From',
      type: 'pie',
      radius: ['40%', '70%'],
      avoidLabelOverlap: false,
      label: {
        show: true,
        position: 'center',
        fontSize: '25',
        fontWeight: 'bold',
        formatter: ' {c}% ',
      },
      emphasis: {
        label: {
          show: true,
          fontSize: '30',
          fontWeight: 'bold',
          formatter: ' {c}% ',
        },
      },
      labelLine: {
        show: false,
      },
      data: [
        { value: 81 },
        { value: 19 },
      ],
      color: ['#093cbd', '#f5edfe'],
      animationType: 'scale',
      animationEasing: 'elasticOut',
    },
  ],
}
</script>

<template>
  <div class="text-black text-2xl font-bold w-full tracking-widest">
    饼图
  </div>
  <div class="w-1/3 h-full">
    <index-totalRevenue :chart-data="chartData1" />
  </div>
  <div class="w-1/3 h-full">
    <index-totalRevenue :chart-data="chartData2" />
  </div>
  <div class="w-1/3 h-full">
    <index-totalRevenue :chart-data="chartData3" />
  </div>
</template>
