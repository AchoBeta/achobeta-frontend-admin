<script>
import * as echarts from 'echarts'

export default {
  name: 'EchartComponent',
  props: {
    // 接收父组件传递的数据
    chartData: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      echartInstance: null,
    }
  },
  watch: {
    chartData: {
      handler(newValue) {
        this.initChart(newValue)
      },
      deep: true,
    },
  },
  mounted() {
    this.initChart(this.chartData)
  },
  beforeUnmount() {
    if (this.echartInstance)
      this.echartInstance.dispose()
  },
  methods: {
    initChart(data) {
      if (this.echartInstance)
        this.echartInstance.dispose()

      const myChart = echarts.init(this.$refs.echartRef)
      // 使用 data 设置图表
      myChart.setOption(data)
      this.echartInstance = myChart
      window.addEventListener('resize', () => {
        myChart.resize()
      })
    },
  },
}
</script>

<template>
  <div ref="echartRef" style="width: 100%;height:100%" />
</template>
