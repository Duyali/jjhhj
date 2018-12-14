
<template>
	<!-- 地图 -->
	<section class="cmap-mod">
		<div id="map-box"></div>
		<aside class="tip-box" v-if="tipPostion && !noTip" :style="tipPostion ? `top:${tipPostion.y - 40}px; left:${tipPostion.x + 40}px;`: ''">
			<header>
        {{tipInfo.name}}
      </header>
      <ul class="tip-info">
        <li class="tip-item" v-for="item in tipInfo.data" :key="item.name">
          <span>{{item.name}}:</span>
          <span>{{item.value}}</span>
        </li>
      </ul>
		</aside>
	</section>
</template>


<script>
import { setMap } from "../../util/mapUtil-newstyle2"


export default {
  data() {
    return {
      tipPostion: null,
      tipInfo: {
        name: '',
        data: []
      }
    };
  },
  props: {
    mapInfo: Object,
    noTip: {
      type: Boolean,
      default: false
    },
    mapTipInfo: {
      type: Object,
    },
  },
  watch: {
    mapInfo: function(newMapInfo) {
      setMap(
        "#map-box",
        // "map-tip-box",
        newMapInfo,
        (evt, data) => {
          alert(1)
          console.log(evt.offsetX);
          if (!this.mapTipInfo[data['name']]) {
            this.tipPostion = null;
            return;
          } else {
            this.tipPostion = Object.assign(
              {},
              {
                x: evt.offsetX - 50,
                y: evt.offsetY - 200,
              }
            );
            this.tipInfo = this.mapTipInfo[data['name']] ? this.mapTipInfo[data['name']] : null
          }
        },
        // (index, data) => {
        //   this.$emit("areaClick", { index, data });
        // },
      );
    },
    mapTipInfo: function(newMapInfo) {
      // console.log('mapTipInfo', newMapInfo)
    }
  },
  mounted: function() {
    setMap(
      "#map-box",
      // "map-tip-box",
      this.mapInfo,
      (evt, data) => {
        console.log(1)
        console.log(evt);
        if (!this.mapTipInfo[data['name']]) {
          this.tipPostion = null;
          return;
        } else {
          this.tipPostion = Object.assign(
            {},
            {
              x: evt.offsetX - 50,
              y: evt.offsetY - 220,
            }
          );
          this.tipInfo = this.mapTipInfo[data['name']] ? this.mapTipInfo[data['name']] : null
          console.log(222)
         console.log(this.tipInfo)
        }
        
      },
      // (index, data) => {
      //   this.$emit("areaClick", { index, data });
      // },
    )
  }
};
</script>


<style>
#map-box,
.cmap-mod {
  position: relative;
  height: 100%;
}
#map-box canvas{
  left:0 !important;
  top:0 !important;
}
/* #map-box{
  width: 598px;
  height: 508px;
  margin: 0 auto;
  background:red;
} */
.tip-box {
  position: absolute;
  pointer-events: none;
  white-space: nowrap;
  width: 320px;
  /* height: 186px; */
  box-shadow: 0px 0px 10px 1px #214087;
  z-index: 99;
  padding:20px 20px 13px 20px;
  box-sizing: border-box;
  background-repeat: no-repeat;
  background-size: 100% 100%; 
  background-color: rgba(22, 23, 28, .7);
  border-bottom-right-radius: 20px;
}
.tip-box > header{
  width: 100%;
  text-align: left;
  /* text-indent: 1em; */
  box-sizing: border-box;
  font-size:18px;
  font-weight:bold;
  color:rgba(114,234,246,1);
  line-height:18px;
  margin-bottom: 11px;
}
.tip-info {
  width: 100%;
  /* min-height: 106px; */
  /* margin-top: 6px; */
  overflow-y: auto;
  /* margin-bottom: 20px; */
  
}
.tip-item{
  width: 50%;
  height: 30px;
  line-height: 30px;
  float: left;
  text-align: left;
  color: #cee1ff;
  /* font-size: 16px; */
  /* padding-left: 20px; */
  box-sizing: border-box;
  /* margin-left: 5px; */
}
.tip-item span:nth-child(1){
  display: inline-block;
  width: 70px;
}
.tip-item span:nth-child(2){
  /* font-weight:400; */
  color:rgba(114,234,246,1);
  float: right;
  
}
.tip-item:nth-child(2n+1) span:nth-child(2){
  margin-right: 15px;
}
.tip-item:nth-child(2n) span:nth-child(1){
  margin-left: 15px;
}
</style>