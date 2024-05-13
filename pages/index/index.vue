<script lang="ts" setup>
const imgSrc = 'https://obscloud.ulearning.cn/resources/web/1715413452402826.png'
const chartData = {
  legend: {
    // Try 'horizontal'
    orient: 'horizontal',
    left: 10,
    top: 30,

  },
  dataset: {
    source: [
      ['时间', '招新人数1', '招新人数2'],
      ['周一', 300, 500],
      ['周二', 932, 1932],
      ['周三', 200, 300],
      ['周四', 1000, 100],
      ['周五', 1290, 190],
      ['周六', 1330, 1230],
      ['周日', 200, 100],
    ],

  },
  // 配置你的 ECharts 选项
  title: {
    text: '招新数据', // 标题文本
    left: 'left', // 标题位置，居中
    textStyle: {
      fontSize: 18, // 标题字体大小
      fontWeight: 'bold', // 标题字体粗细
    },
  },
  xAxis: {
    type: 'category',
    // data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
    axisLine: {
      show: false, // 不显示 x 轴线条
    },
    axisTick: {
      show: false, // 不显示刻度线
    },
    axisLabel: {
      color: '#333',
      fontSize: 12,
      formatter(value) {
        // 使用 Unicode 空心圆字符
        return `{o|}\n{a| ${value}}`
      },
      rich: {
        a: {
          lineHeight: 20, // 调整行高以实现换行效果
        },
        o: {
          // 定义空心圆的样式
          backgroundColor: 'transparent',
          borderColor: '#d7d7d7',
          borderWidth: 2,
          width: 10,
          height: 10,
          borderRadius: 10,
          lineHeight: 20,
          align: 'center',
        },
      },
    },

    axisPointer: {
      // type: 'shadow',
      color: '#333',
      fontSize: 12,
      label: {
        show: true,
        backgroundColor: '#fff', // 提示框背景颜色
        textStyle: {
          color: '#171b1e', // 提示框文字颜色
        },

        formatter(params) {
          // 使用 Unicode 空心圆字符
          return `{o|}\n{a| ${params.value}}`
        },
        rich: {
          a: {
            lineHeight: 20, // 调整行高以实现换行效果
          },
          o: {
            // 定义空心圆的样式
            backgroundColor: '#d7d7d7',
            borderColor: '#d7d7d7',
            borderWidth: 2,
            width: 10,
            height: 10,
            borderRadius: 10,
            lineHeight: 20,
            align: 'center',
          },
        },
      },
    },

    splitLine: {
      show: true, // 显示网格线
      lineStyle: {
        color: ['#e7e7e7'], // 设置网格线颜色
        type: 'solid', // 设置网格线为虚线
      },
    },

  },
  yAxis: {
    type: 'value',
    axisLine: {
      show: false, // 不显示 y 轴线条
    },
    axisTick: {
      show: false, // 不显示刻度线
    },
    axisLabel: {
      color: '#787878', // 设置标签颜色
      fontSize: 12, // 设置标签字体大小
    },
    splitLine: {
      lineStyle: {
        color: '#e7e7e7', // 设置网格线颜色
        type: 'solid', // 设置网格线为虚线
      },
    },
  },
  tooltip: {
    trigger: 'axis', // 触发类型，默认数据触发，可选为：'item' | 'axis'
    formatter: '{c}</br> {b}', // 提示框格式，{b}表示系列名称，{c}表示数据值
    backgroundColor: '#fff', // 提示框背景颜色
    textStyle: {
      color: '#171b1e', // 提示框文字颜色
    },
    axisPointer: {
      type: 'line', // 默认为直线，可选为：'line' | 'shadow' | 'cross'
      crossStyle: {
        color: '#999', // 设置十字准线的颜色
      },
    },
  },

  series: [
    {
      name: '面试', // 系列名称，会显示在图例中
      type: 'line',
      smooth: true,
      lineStyle: {
        width: 8,
        color: '#09bd3c',
      },
      symbol: 'circle',
      symbolSize: 15,
      itemStyle: {
        borderColor: '#fff',
        borderWidth: 3,
        color: '#0cff51',
      },
      // 指定 series 数据从 dataset 中的哪个维度获取
      encode: {
        xAxis: '周一',
        yAxis: 1,
      },
    },
    {
      name: '录取', // 系列名称，会显示在图例中
      type: 'line',
      smooth: true,
      lineStyle: {
        width: 8,
        color: '#ffaa2b',
      },
      symbol: 'circle',
      symbolSize: 15,
      itemStyle: {
        color: '#ffaa2b',
        borderColor: '#fff',
        borderWidth: 3,
      },
      // 指定 series 数据从 dataset 中的哪个维度获取
      encode: {
        xAxis: '周一',
        yAxis: 2,
      },
    },
  ],
}
</script>

<template>
  <div class="h-full w-full flex mx-auto ">
    <!-- <div class="text-xl">
      首页
    </div> -->

    <div class="left-container w-1/2 h-full ">
      <!-- 四个卡片 -->
      <div
        class="p-5 data-cards flex flex-wrap items-start content-start justify-around bg-[#fbfbfb] w-full h-2/5 pb-10"
      >
        <index-singlecard title="3902" text="面试人数" subtext="334do333333333 " :icon="imgSrc" />
        <index-singlecard text="面试官人数" color="#093cbd" />
        <index-ringcard />
        <index-ringcard ringcolor="#ff7b6f" />
      </div>
      <div class=" calendar px-4 py-5 w-full h-3/5">
        <div class="calendar-header flex p-3 justify-between items-center">
          <!-- 日历 -->
          <index-calendar />
          <!-- <no-ssr>
            <a-calendar fullscreen v-model:value="value" @panelChange="onPanelChange" />
          </no-ssr> -->
          <!-- <no-ssr>
            <index-calendar />
          </no-ssr> -->
        </div>
      </div>
      <!-- <div class="Situation-user p-5 bg-green-200 w-full h-1/5"> </div> -->
    </div>
    <div class="right-container w-1/2 h-full bg-red-700">
      <!-- 平滑折线图 -->
      <div class="p-5 bg-white h-2/5 w-full">
        <index-totalRevenue :chart-data="chartData" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.events {
  list-style: none;
  margin: 0;
  padding: 0;
}

.events .ant-badge-status {
  overflow: hidden;
  white-space: nowrap;
  width: 100%;
  text-overflow: ellipsis;
  font-size: 12px;
}

.notes-month {
  text-align: center;
  font-size: 28px;
}

.notes-month section {
  font-size: 28px;
}
</style>
