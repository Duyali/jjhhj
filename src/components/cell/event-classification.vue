<template>
  <div class="event-classification-container">
    <div id="event-classification-chart"></div>
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
    source(newSource) {
      if (this.chart === null) {
        this.chart = this.initCharts();
      }
      this.updateCharts(newSource);
    }
  },
  mounted() {
    this.chart = this.initCharts();
    this.updateCharts(this.source);
  },
  methods: {
    initCharts() {
      let myChart = this.$echarts.init(
        document.getElementById("event-classification-chart")
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
      const mydata = this.initSourceData(source);
      let scaleData = [];
      for (let i=0; i<mydata.keys.length; i++) {
        scaleData.push({
          name: mydata.keys[i],
          value: mydata.values[i].value
        })
      }
      console.log('scaleData', scaleData)
      let placeHolderStyle = {
        normal: {
          label: {
            show: false
          },
          labelLine: {
            show: false
          },
          color: "rgba(0, 0, 0, 0)",
          borderColor: "rgba(0, 0, 0, 0)",
          borderWidth: 0
        }
      };
      let legendData = [];
      let data = [];
      let color = ["#F0F45F", "#8997F5", "#FACE87", "#51C9ED", "#64EFCA"];
      for (var i = 0; i < scaleData.length; i++) {
        data.push(
          {
            value: scaleData[i].value,
            name: scaleData[i].name,
            itemStyle: {
              normal: {
                borderWidth: 5,
                shadowBlur: 20,
                borderColor: color[i],
                shadowColor: color[i]
              }
            },
            textStyle: {
              color: color[i]
            }
          },
          {
            value: 2,
            name: "",
            itemStyle: placeHolderStyle
          }
        );
      }
      console.log(data);
      for (let n in scaleData) {
        scaleData[n]["name"] = scaleData[n]["name"];
        legendData.push({
          name: scaleData[n]["name"],
          textStyle: {
            color: color[n]
          }
        });
      }
      console.log("legendData", legendData);
      let seriesObj = [
        {
          name: "",
          type: "pie",
          radius: [80, 85],
          center: ["30%", "50%"],
          hoverAnimation: false,
          startAngle: 135,
          avoidLabelOverlap: false,
          itemStyle: {
            normal: {
              label: {
                show: false,
                position: "center",
                color: "#ddd"
                // formatter: "{b}: {d}"
              },
              labelLine: {
                length: 30,
                length2: 100,
                show: false,
                color: "#00ffff"
              }
            }
          },
          emphasis: {
            label: {
              show: true,
              align: "center",
              rich: {
                a: {
                  fontSize: 20,
                  lineHeight: 35,
                  color: "#fff"
                },
                b: {
                  fontSize: 36,
                  color: "#f2f375"
                }
              },
              formatter: function(data) {
                let arr = ["{a|" + data.name + "}", "{b|" + data.value + "}"];
                return arr[0] + "\n" + arr[1];
              }
            }
          },
          data: data
        }
      ];
      let option = {
        color: ["#EEF173", "#F3C990", "#71C7E8", "#8CF0CA"],
        // backgroundColor: '#04243E',
        tooltip: {
          show: true
        },
        legend: {
          show: true,
          right: "21px",
          top: "center",
          orient: "vertical",
          itemWidth: 14,
          itemHeight: 14,
          itemGap: 26,
          textStyle: {
            color: "#FBFBFB",
            rich: {
              a: {
                fontSize: 16
              },
              b: {
                fontSize: 16,
                color: "#fff",
                width: 88,
                // backgroundColor: 'green',
                align: "center"
              }
            }
          },
          data: legendData,
          formatter: function(name) {
            let total = 0;
            let target;
            for (let i = 0, l = data.length; i < l; i++) {
              total += data[i].value;
              if (data[i].name === name) {
                target = data[i].value;
              }
            }
            let arr = [
              "{b|" + name + "}",
              "{a|" + ((target / total) * 100).toFixed(2) + "%}"
            ];
            return arr.join("");
          }
        },
        toolbox: {
          show: true
        },
        series: seriesObj
      };

      this.chart.setOption(option);
    }
  }
};
</script>
<style lang="scss">
.event-classification-container {
  width: 100%;
  height: 100%;
  // background: red;
  box-sizing: border-box;
  // padding: 24px 0 22px 24px;
  #event-classification-chart {
    width: 100%;
    height: 100%;
  }
}
</style>


