<template>
  <div class="areal-distribution-container">
    <div id="areal-distribution-chart"></div>
  </div>
</template>
<script>
export default {
  data() {
    return {
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
    initCharts() {
      let myChart = this.$echarts.init(
        document.getElementById("areal-distribution-chart")
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
      console.log('datadata', data)
      const xAxisData = []
      for (let i=0; i<data.values.length; i++) {
        xAxisData.push(data.values[i].value)
      }
      console.log('xAxisData', xAxisData)
      let option = {
        grid: {
          top: 50,
          left: 30,
          bottom: 55,
          right: 10
        },
        xAxis: {
          data: data.keys,
          axisTick: {
            show: false
          },
          splitLine: {
            show: false
          },
          axisLabel: {
            color: "#6871b9",
            fontSize: "25px",
            interval: "0",
            formatter: function(value, index) {
              if (value.length > 2) {
                var newStr1 = value.slice(0, 2);
                var newStr2 = value.slice(2, 4);
                var a = [newStr1, newStr2];
                var b = a.join("\n");
              }
              return b;
            }
          }
        },
        yAxis: {
          // min: 0,
          // max: 900,
          // interval: 300,
          axisTick: {
            show: false
          },
          axisLine: {
            show: false
          },
          splitLine: {
            show: false,
            lineStyle: {
              color: ["#2e386c"]
            }
          },
          axisLabel: {
            color: "#6871b9"
          }
        },
        dataZoom: [
          {
            type: "inside",
            start: 0,
            end: (9 / xAxisData.length) * 100
          },
          {
            start: 0,
            end: 10,
            height: 8,
            bottom: 10,
            handleIcon:
              "M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z",
            handleSize: "70%",
            handleStyle: {
              color: "#fff",
              shadowBlur: 3,
              shadowColor: "rgba(0, 0, 0, 0.6)",
              shadowOffsetX: 2,
              shadowOffsetY: 2
            },
            backgroundColor: "#19203A"
          }
        ],
        series: [
          {
            // name: "销量",
            type: "bar",
            // data: [90, 120, 360, 870, 450, 320, 570, 350, 768, 360, 870, 450, 320],
            data: xAxisData,
            barWidth: 15,
            itemStyle: {
              normal: {
                //颜色渐变函数 前四个参数分别表示四个位置依次为左、下、右、上
                color: new this.$echarts.graphic.LinearGradient(0, 1, 0, 0, [
                  {
                    offset: 0,
                    color: "#799ff7"
                  },
                  {
                    offset: 1,
                    color: "#578afa"
                  }
                ])
              }
            }
          }
        ]
      };
      
      this.chart.setOption(option);
    }
  }
};
</script>

<style lang="scss">
.areal-distribution-container {
  width: 100%;
  height: 100%;
  // background: red;
  box-sizing: border-box;
  // padding: 24px 0 22px 24px;
  #areal-distribution-chart {
    width: 100%;
    height: 100%;
  }
}
</style>

