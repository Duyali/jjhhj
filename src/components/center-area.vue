<template>
  <div class="center-area">
    <div class="basic-information">
      <div class="border-box-title">
        <p class="title">辖区基本情况</p>
      </div>
      <ul class="information-cont">
        <li>
          <span>网格员数</span>
          <span>123人</span>
        </li>
        <li>
          <span>网格员数</span>
          <span>123人</span>
        </li>
        <li>
          <span>网格员数</span>
          <span>123人</span>
        </li>
      </ul>
    </div>
    <div class="map">
      <c-map v-if="showStreet" :mapInfo="currentDataMap" :mapTipInfo="mapTipInfoData"></c-map>
    </div>
    <div class="realtime-dynamic">
      <border-box :title="'实时动态'" :imgUrl="secondimgUrl">
        <realtime-dynamic
          :header="scrollListHeader"
          @click="showPopoverHandler"
          :source="scrollInfoData"
        ></realtime-dynamic>
      </border-box>
    </div>
    <popover-info v-if="popoverShowable" @close="hidePopoverHandler" :source="popoverInfoData"></popover-info>
  </div>
</template>
<script>
import BorderBox from "./cell/border-box.vue";
import RealtimeDynamic from "./cell/realtime-dynamic.vue";
import PopoverInfo from "./cell/popover-info.vue";
import CMap from "./cell/c-map.vue";

import ScrollMockData from "../../static/mock/real.json";
import InfoStepMockData from "../../static/mock/findIssueInfoStep.json";
import { mapData } from "../../static/index";
export default {
  data() {
    return {
      secondimgUrl: require("../assets/box-bg_04.png"),
      scrollListHeader: [
        {
          des: "类型",
          flex: 20
        },
        {
          des: "标题",
          flex: 45
        },
        {
          des: "状态",
          flex: 40
        },
        {
          des: "区域",
          flex: 20
        }
      ],
      scrollInfoData: [],
      popoverInfoData: {
        baseInfo: [],
        dealStatus: []
      },
      popoverShowable: false,
      showStreet: true,
      currentDataMap: null,
      mapTipInfoData: {}
    };
  },
  watch: {
    // orgId(newVal) {
    //   this.fetchRealSource()
    // }
  },
  created() {
    this.fetchRealSource(), this.level1MapShowHandler(mapData, "启东市");
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
    getDefalutValue2(url, key, name) {
      fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        }
      })
        .then(res => res.json())
        .then(data => {
          switch (name) {
            case "map":
              this[key] = this.initTipInfoData(data);
              break;
            case "tip":
              this[key] = this.initEventInfoData(data);
              break;
            default:
              this[key] = data;
          }
        })
        .catch(err => console.error(err));
    },
    fetchRealSource() {
      this.$axios
        .get(`xxx`)
        .then(res => {
          let rst = [];
          res.data.forEach(item => {
            rst.push({
              textArr: [
                item.issueTypeName,
                item.title,
                item.receptStatus,
                item.createOrg.fullOrgName
              ],
              id: item.id,
              data: item
            });
            this.scrollInfoData = rst;
          });
        })
        .catch(err => {
          let rst = [];
          let data = ScrollMockData;
          // let data
          // if(this.orgId===5633) {
          //   data = ScrollMockData
          // } else {
          //   data = ScrollMockDataHp
          // }

          data.forEach(item => {
            rst.push({
              textArr: [
                item.issueTypeName,
                item.title,
                item.receptStatus,
                item.createOrg.fullOrgName
              ],
              id: item.id,
              data: item
            });
          });
          this.scrollInfoData = rst;
        });
    },
    showPopoverHandler(item) {
      this.popoverInfoData.baseInfo = [
        { name: "事件名称", value: item.data.title || "" },
        { name: "创建时间", value: item.data.createDateStr },
        { name: "事件来源", value: item.data.sourceName },
        { name: "事件类型", value: item.data.issueTypeName },
        { name: "发生时间", value: item.data.occurDateStr },
        { name: "发生网格", value: item.data.createOrg.fullOrgName },
        { name: "详细地址", value: item.data.occurLocation },
        { name: "事件内容", value: item.data.content }
      ];
      this.$axios
        .get(`xxx`)
        .then(res => {
          let rst = [];
          res.data.forEach(item => {
            rst.push({
              time: item.TIME,
              grid: item.TITLE
            });
          });
          this.popoverInfoData.dealStatus = rst;
        })
        .catch(err => {
          let rst = [];
          InfoStepMockData.forEach(item => {
            rst.push({
              time: item.TIME,
              grid: item.TITLE
            });
          });
          this.popoverInfoData.dealStatus = rst;
        });
      this.popoverShowable = true;
    },
    hidePopoverHandler() {
      this.popoverShowable = false;
    },
    level1MapShowHandler(map, title) {
      this.currentDataMap = map;
      // this.mapTipInfoData = this.initTipInfoData(tip)
      this.downState && this.downList.push(title);
      this.showStreet = true;
      this.showTown = false;
      this.showCommunity = false;
    },
    fetchMapTipInfo() {
      this.$axios
        .get(`/cloudMap/cloudMapManager/buildQDSMap.action?orgId=${this.orgId}`)
        .then(res => {
          this.mapTipInfoData = this.initTipInfoData(res.data);
        })
        .catch(err => {
          this.getDefalutValue2(
            "static/mock/map-tip.json",
            "mapTipInfoData",
            "map"
          );
        });
    },
    initTipInfoData(data) {
      if (Object.prototype.toString.call(data) === "[object Object]") {
        let rst = {};
        console.log("rst", rst);
        console.log("rst", data);

        Object.entries(data).forEach(([key, value]) => {
          let _data = [
            // { name: '实有人口', value: key == '惠萍镇' ? 64977 : key == '鸿西村' ? 3310 : value['实有人口']},
            // { name: '实有房屋', value: key == '惠萍镇' ? 28272 : key == '鸿西村' ? 1379 : value['实有房屋']},
            { name: "实有人口", value: value["实有人口"] },
            { name: "实有房屋", value: value["实有房屋"] },
            { name: "重点人员", value: value["重点人员"] },
            { name: "关怀对象", value: value["关怀对象"] },
            { name: "事件上报数", value: value["事件上报数"] },
            { name: "在线网格长数", value: value["在线网格长数"] }
          ];
          // if (this.orgId == 5728 && value['网格长']) {
          //   this.griderList[key] = value['网格长']
          // }
          rst[key] = {
            name: key,
            data: _data
          };
        });
        return rst;
      }
    }
  },
  components: {
    BorderBox,
    RealtimeDynamic,
    PopoverInfo,
    CMap
  },
  mounted() {
    this.fetchMapTipInfo();
  }
};
</script>
<style scoped lang="scss">
.border-box-title:before {
  content: "";
  width: 10px;
  height: 40px;
  position: absolute;
  top: 0;
  left: 0;
  background-image: url(../assets/map-title-bg-left.png);
}
.border-box-title:after {
  content: "";
  float: right;
  width: 10px;
  height: 40px;
  position: absolute;
  top: 0;
  right: 0;
  background-image: url(../assets/map-title-bg-right.png);
}
.center-area {
  width: 840px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-sizing: border-box;
  padding-top: 52px;
  position: relative;
  .basic-information {
    width: 240px;
    // background: plum;
    position: absolute;
    top: 73px;
    left: 21px;
    z-index: 999;
    .border-box-title {
      height: 40px;
      background: rgba(67, 154, 218, 0.5);
      position: relative;
      line-height: 40px;
      box-sizing: border-box;
      margin-bottom: 6px;
      p {
        font-size: 18px;
        font-weight: bold;
        color: rgba(255, 255, 255, 1);
      }
    }
    .information-cont {
      width: 240px;
      height: 132px;
      background: rgba(67, 154, 218, 0.5);
      box-sizing: border-box;
      padding: 13px 20px;
      li {
        text-align: left;
        span:nth-child(1) {
          width: 143px;
          display: inline-block;
          font-size: 18px;
          font-weight: 400;
          color: rgba(255, 255, 255, 1);
          line-height: 34px;
        }
        span:nth-child(2) {
          font-size:18px;
          font-weight:400;
          color:rgba(114,234,246,1);
          line-height:34px;
        }
      }
    }
  }
  .map,
  .realtime-dynamic {
    width: 100%;
  }
  .map {
    height: 568px;
    background: url(../assets/map-bg.png) no-repeat;
    // background: pink;
  }
  .realtime-dynamic {
    height: 312px;
  }
}
</style>
