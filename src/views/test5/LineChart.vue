<!--
 * @Author: v_alunchen
 * @Date: 2020-09-16 15:41:14
 * @LastEditTime: 2020-12-18 15:41:58
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \instance-deploy\develop\instance-deploy\src\components\echarts\LineCharts.vue
-->
<template>
	<div
	class="chart-wrapper"
	ref="chart-wrapper"
	>
		<div
		:id="DomId"
		:ref="DomId"
		class="line-chart"
		>
		</div>
	</div>
</template>
<script>
export default {
  name: 'LineChart',
  props: {
    axisData: {
      type: Array,
      default() {
        return [];
      }
    },
    id: {
      type: String,
      default: 'Hk'
    }
  },
  data() {
    return {
      DomId: `chart-container-${this.id}`,
      echarts: require('echarts'),
      myChart: null,
      options: {
        tooltip: {
          trigger: 'axis',
          show: true,
          formatter(params) {
            const html = `<p>日期：${params[0].name}</p><p>数量：${params[0].data}</p>`;
            return html;
          }
        },
        xAxis: {
          type: 'category',
          axisLine: {
            lineStyle: {
              color: '#9F9F9F'
            }
          },
          data: []
        },
        yAxis: {
          type: 'value',
          axisLine: {
            lineStyle: {
              color: '#9F9F9F'
            }
          }
        },
        grid: {
          top: 30
          // left: ,
        },
        series: [{
          data: [],
          smooth: true,
          lineStyle: {
            color: '#1990FF'
          },
          itemStyle: {
            normal: {
              color: '#1990FF' // 折线点的颜色
            }
          },
          type: 'line'
        }]
      }
    };
  },
  computed: {
    xAxisData() {
      const x = this.axisData.map(item => item.date);
      return x;
    },
    yAxisData() {
      const y = this.axisData.map(item => item.quantity);
      return y;
    }
  },
  watch: {
    axisData: {
      deep: true,
      handler() {
        this.loadEChartsData();
      }
    }
  },
  created() {
    // console.log('xAxisData', this.xAxisData)
    // console.log('yAxisData', this.yAxisData)
  },
  mounted() {
    this.initEcharts();
  },
  methods: {
    initEcharts() {
      // 基于准备好的dom，初始化echarts实例
      this.myChart = this.echarts.init(document.getElementById(`${this.DomId}`));
      this.loadEChartsData();
    },
    loadEChartsData() {
      this.options.xAxis.data = this.xAxisData;
      this.options.series[0].data = this.yAxisData;
      // console.log(this.options);
      this.myChart.setOption(this.options);
    }
  }
};
</script>
<style scoped lang="scss">
  .chart-wrapper {
    //width: 100%;
  }
  .line-chart {
    // width: 340px;
    height: 300px;
  }
</style>
