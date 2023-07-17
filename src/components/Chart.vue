<template>
  <div class="h-[28rem] overflow-x-auto p-5">
    <div ref="dotGraph" style="width: 100%; height: 100%; "></div>
  </div>
</template>

<script lang="ts">
import * as echarts from 'echarts';
import type { ECharts } from 'echarts';


export default {
  name: 'DotGraph',
  props: {
    horizontalLine: {
      type: Number,
      default: 25,
    },
    titleColor: {
      type: String,
      default: 'black',
    },
    showHorizontalLine: {
      type: Boolean,
      default: true,
    },
    time: {
      type: Array,
      default: () => [],
      required: true
    },
    tempValue: {
      type: Array,
      default: () => [],
      required: true
    },
    startTime: {
      type: String,
      default: '-1d',
      required: true
    },
    graph_name:{
      type: String,
      default: 'Graph',
      required: true
    },

  },
  data() {
    return {
      // Other data properties...
      chart: null as ECharts | null,
      // Other data properties...
    };
  },
  mounted() {
    window.addEventListener('resize', this.handleResize);
    this.renderGraph();
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.handleResize);
  },
  watch: {
    startTime: {
      handler() {
        this.renderGraph();
      },
      deep: true
    },
    time: {
      handler() {
        this.renderGraph();
      },
      deep: true
    },
    tempValue: {
      handler() {
        this.renderGraph();
      },
      deep: true
    },
    showHorizontalLine: {
      handler() {
        this.renderGraph();
      },
      deep: true
    },
    horizontalLine: {
      handler() {
        this.renderGraph();
      },
      deep: true
    },
  },
  methods: {
    handleResize() {
      this.renderGraph();
    },
    renderGraph() {
      const startTime = this.startTime;
      if (!this.chart) {
        this.chart = echarts.init(this.$refs.dotGraph as HTMLElement);
      }

      const option = {
        title: {
          text: this.graph_name,
          left: 'center',
          textStyle: {
            color: this.titleColor,
            textAlign: 'center',
          },
        },
        tooltip: {
            show : true,
            trigger: 'item',
          axisPointer: {
            type: 'shadow'
          },
        },
        textStyle: {
          color: this.titleColor,
        },
        xAxis: { type: 'time',
              name: 'Time',
              nameLocation:'center',
              nameGap: 35,
              axisLabel: {
                formatter: function (value: any) {
                  const date = new Date(value);
                  const hours = date.getHours();
                  const minutes = date.getMinutes();
                  const seconds = date.getSeconds();
                  const formattedHours = hours.toString().padStart(2, '0');
                  const formattedMinutes = minutes.toString().padStart(2, '0');
                  const formattedSeconds = seconds.toString().padStart(2, '0');

                  if (startTime === '-3m' || startTime === '-1m') {
                    // Display hours, minutes, and seconds
                    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
                  } else {
                    // console.log("else",  startTime)
                    // Display only hours and minutes
                    return `${formattedHours}:${formattedMinutes}`;
                  }
                },
              },

              },
        yAxis: {type: 'value',
              name: 'Celsius (°C)',
              nameLocation:'center',
              nameGap: 35,
              min:0,
              max: 60,
              },
        series: [
          {
            type: 'line',
            symbolSize: 4,
            color: 'lightGreen',
            data: this.time.map((value, index) => [value, this.tempValue[index]]),
          },
          {
            type: 'line',
            show: false,
            markLine: {
              symbol: 'none',
              label: {
                show: false,
              },
              lineStyle: { color: 'red', type: 'dashed', width: 2 },
              data: this.showHorizontalLine ? [{ yAxis: this.horizontalLine }] : [],
            },
          },
        ],
      };

      if (this.chart.getOption()) {
        this.chart.setOption(option);
      } else {
        this.chart = echarts.init(this.$refs.dotGraph as HTMLElement);
        this.chart.setOption(option);
      }
    },
  },
};
</script>

<style>
#dotGraph {
  width: 100%;
  height: 400px;
}
</style>
