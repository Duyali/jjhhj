<template>
  <div class="right-area">
    <div class="platform-linkage">
      <border-box :title="'平台联动'" :imgUrl="firstimgUrl">
        <platform-linkage></platform-linkage>
      </border-box>
    </div>
    <div class="event-classification">
      <border-box :title="'事件分类统计'" :imgUrl="secondimgUrl">
        <event-classification :source="eventClassificationSource"></event-classification>
      </border-box>
    </div>
    <div class="areal-distribution">
      <border-box :title="'事件区域分布'" :imgUrl="secondimgUrl">
        <areal-distribution :source="arealDistributionSource"></areal-distribution>
      </border-box>
    </div>
  </div>
</template>
<script>
import BorderBox from "./cell/border-box.vue";
import PlatformLinkage from "./cell/platform-linkage.vue";
import EventClassification from "./cell/event-classification.vue";
import ArealDistribution from "./cell/areal-distribution.vue";

export default {
  data() {
    return {
      firstimgUrl: require("../assets/box-bg_01.png"),
      secondimgUrl: require("../assets/box-bg_02.png"),
      eventClassificationSource: {},
      arealDistributionSource: {}
    };
  },
  components: {
    BorderBox,
    PlatformLinkage,
    EventClassification,
    ArealDistribution
  },
  methods: {
    getDefaultValue(url, key) {
      fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        }
      })
        .then(res => res.json())
        .then(data => {
          console.log("ssssss");
          console.log(data);
          this[key] = data;
        })
        .catch(err => console.log(err));
    },
    getEventClassificationSource() {
      this.$axios
        .get("xxx")
        .then(res => {
          this.eventClassificationSource = {
            a: res.data["a"],
            b: res.data["b"],
            c: res.data["c"],
            d: res.data["d"]
          };
        })
        .catch(err => {
          console.log(err);
          this.getDefaultValue("static/ll.json", "eventClassificationSource");
        });
    },
    getarealDistributionSource () {
      this.$axios
        .get("xxx")
        .then(res => {
          this.arealDistributionSource = {
            a: res.data["a"],
            b: res.data["b"],
            c: res.data["c"],
            d: res.data["d"]
          };
        })
        .catch(err => {
          console.log(err);
          this.getDefaultValue("static/ll.json", "arealDistributionSource");
        });
    }
  },
  created() {
    this.getEventClassificationSource();
    this.getarealDistributionSource();
  }
};
</script>
<style scoped lang="scss">
.right-area {
  width: 460px;
  height: 100%;
  // background: yellow;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .platform-linkage,
  .event-classification,
  .areal-distribution {
    width: 100%;
    // background: pink;
  }
  .platform-linkage {
    height: 288px;
  }
  .event-classification,
  .areal-distribution {
    height: 312px;
  }
  h1 {
    font-size: 14px;
  }
}
</style>
