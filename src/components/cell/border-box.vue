<template>
  <div class="border-box">
    <div class="title-box">
      <div class="border-box-title">
        <p class="title" v-text="title"></p>
      </div>
    </div>
    <div class="border-box-content" :style="`background:url(${imgUrl}) no-repeat;`">
      <slot></slot>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {}
  },
  props: {
    title: {
      type: String
    },
    imgUrl: {
      type: String
      // default: ''
    }
  }
}
</script>
<style scoped lang="scss">
.border-box-title:before {
  content: "";
  float: left;
  width: 10px;
  height: 42px;
  margin-top: -6px;
  margin-left: -8px;
  background-image: url(../../assets/titlebg-left.png);
}
.border-box-title:after {
  content: "";
  float: right;
  width: 10px;
  height: 42px;
  background-image: url(../../assets/titlebg-right.png);
  margin-top: -36px;
  margin-right: -8px;
}
.border-box {
  height: 100%;
  position: relative;
  .title-box{
    height: 42px;
    // background: red;
    margin-bottom: 10px;
  }
  .border-box-title {
    float: left;
    margin-right: 29px;
    margin-left: 8px;
    height: 42px;
    padding-top: 6px;
    box-sizing: border-box;
    p {
      font-size: 20px;
      color: #75d3fd;
      font-weight: bold;
      line-height: 30px;
      background-color: rgba(116, 204, 206, 0.2);
      padding: 0 20px;
      box-sizing: border-box;
    }
  }
  .border-box-content {
    height: calc(100% - 52px);
    // background: green;
    background-size: 100% 100%;
    box-sizing: border-box;
  }
}
</style>
