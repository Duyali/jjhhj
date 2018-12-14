<template>
  <div class="events-handle-container">
    <div class="events-item" v-for="(item, index) in itemMessage" :key="index">
      <div class="img">
        <img :src="item.itemImg" alt="">
      </div>
      <div class="desc" v-text="item.itemDesc"></div>
      <p class="data" v-text="item.itemData"></p>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      itemMessage: [{
        itemDesc: '待办',
        itemImg: require('../../assets/event_01.png'),
        itemData: 4556
      }, {
        itemDesc: '待反馈',
        itemImg: require('../../assets/event_02.png'),
        itemData: 4556
      }, {
        itemDesc: '累计受理',
        itemImg: require('../../assets/event_03.png'),
        itemData: 4556
      }, {
        itemDesc: '今日办结',
        itemImg: require('../../assets/event_04.png'),
        itemData: 4556
      }, {
        itemDesc: '待受理',
        itemImg: require('../../assets/event_05.png'),
        itemData: 4556
      }, {
        itemDesc: '待办结',
        itemImg: require('../../assets/event_05.png'),
        itemData: 4556
      }, {
        itemDesc: '累计办结',
        itemImg: require('../../assets/event_04.png'),
        itemData: 4556
      }, {
        itemDesc: '今日受理',
        itemImg: require('../../assets/event_03.png'),
        itemData: 4556
      }]
    }
  }
}
</script>
<style lang="scss">
.events-handle-container{
  width: 100%;
  height: 100%;
  // background:red;
  box-sizing: border-box;
  padding: 10px 11px;
  display: flex;
  /* flex-direction: column; */
  justify-content: space-between;
  flex-wrap: wrap;
  .events-item{
    width: 102px;
    height: 115px;
    background-color: rgba(91,165,187,.1);;
    padding-top: 12px;
    box-sizing: border-box;
    .img{
      width: 49px;
      height: 37px;
      // background: yellow;
      margin: 0 auto 3px;
      img{
        display: block;
        width: 100%;
        height: 100%;
      }
    }
    .desc{
      width: 76px;
      height: 32px;
      border:1px solid rgba(104,193,201,1);
      border-radius:4px;
      text-align: center;
      line-height: 32px;
      font-size:16px;
      font-weight:400;
      color:rgba(255,255,255,1);
      margin: 0 auto 6px;
    }
    .data{
      font-size:18px;
      font-weight:600;
      color:rgba(246,192,90,1);
      line-height:13px;
    }
  }
}
</style>
