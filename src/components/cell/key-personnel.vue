<template>
  <div class="key-personnel-container">
    <div class="button">
      <span :class="active" @click="getTarget">特殊人群</span>
      <span :class="active2" @click="getTarget">关注对象</span>
    </div>
    <div id="key-personnel-chart"></div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      active: "blue",
      active2: "",
      chart: null
    };
  },
  props: {
    source: {
      type: Object
    }
  },
  watch: {
    source(newsource) {
      if (this.chart === null) {
        this.chart = this.initCharts();
      }
      this.updateCharts(newsource);
    }
  },
  mounted() {
    this.chart = this.initCharts();
    this.updateCharts(this.source);
  },
  methods: {
    getTarget(e) {
      console.log(e);
      console.log(e.target.textContent);
      this.active = e.target.textContent === "特殊人群" ? "blue" : ""
      this.active2 = e.target.textContent === "关注对象" ? "blue" : ""
      this.$emit('listenType', e.target.textContent)
    },
    initCharts() {
      let myChart = this.$echarts.init(
        document.getElementById("key-personnel-chart")
      );
      return myChart;
    },
    initSourceData(source) {
      let keys = [];
      let values = [];
      let obj = Object.assign({}, source);
      Object.entries(obj).forEach(([key, value]) => {
        keys.push(key);
        values.push({
          value
        });
      });
      return { keys, values };
    },
    updateCharts(source) {
      const data = this.initSourceData(source);
      const xAxisData = []
      for (let i=0; i<data.values.length; i++) {
        xAxisData.push(data.values[i].value)
      }
      console.log('xAxisDatallllllllllllllllllll', xAxisData)
      var option = {
        grid: {
          top: 10,
          left: 50,
          bottom: 25,
          right: 0
          // show: true,
          // backgroundColor: 'yellow',
        },
        symbolSize: 60,
        tooltip: {
          trigger: "axis"
        },
        legend: {
          show: false
        },
        xAxis: [
          {
            type: "category",
            data: data.keys,
            axisTick: {
              show: false
            },
            splitLine: {
              show: false
            },
            axisLabel: {
              color: "#6871b9",
              fontSize: 12,
              interval: 0
            },
            axisLine: {
              lineStyle: {
                color: "#73c6fa"
              }
            }
          }
        ],
        yAxis: [
          {
            type: "value",
            name: "",
            // min: 80,
            // max: 100,
            // interval: 3,
            axisLabel: {
              formatter: "{value}"
            },
            axisTick: {
              show: false
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: "rgba(187, 173, 91, 0.3)"
              }
            },
            axisLabel: {
              color: "#6871b9"
            },
            nameTextStyle: {
              color: "#939bd8"
            },
            axisLine: {
              show: false,
              lineStyle: {
                color: "#73c6fa"
              }
            }
          }
        ],
        series: [
          {
            name: "应急联动事件（近7日）",
            type: "line",
            data: xAxisData,
            // data: [22.21, 16.21, 45.47, 19.56, 12.11, 16.53, 14.88, 39.36, 50.11, 10.21],
            barWidth: 5,
            itemStyle: {
              normal: {
                color: "#70C286"
              }
            },
            lineStyle: {
              color: "#70C286",
              width: 3,
              type: "solid"
            },
            symbolSize: 8,
            symbol: "circle"
          }
        ]
      };

      this.chart.setOption(option);
    }
  }
};
</script>
<style lang="scss">
.blue {
  background-color: #4887b6 !important;
  color: rgba(255, 255, 255, 1) !important;
}
.key-personnel-container {
  width: 100%;
  height: 100%;
  // background: red;
  box-sizing: border-box;
  .button {
    font-size: 0;
    position: absolute;
    top: 14px;
    right: 0;
    span {
      font-size: 16px;
      line-height: 16px;
      font-weight: 400;
      color: rgba(255, 255, 255, 0.6);
      padding: 5px 18px 6px;
      // background: green;
      border: 1px solid rgba(72, 135, 182, 1);
    }
    span:nth-child(1) {
      border-radius: 13px 0px 0px 13px;
    }
    span:nth-child(2) {
      border-radius: 0px 13px 13px 0px;
    }
  }

  #key-personnel-chart {
    width: 100%;
    height: 100%;
    // background: plum;
  }
}
</style>



