<template>
  <div class="platform-linkage-container">
    <a :href="item.href" v-for="(item, index) in itemMessage" :key="index" target="_blank">
      <div class="item" :style="`background:url(${item.imgUrl}) no-repeat center top;`">
        <span v-text="item.desc">社情名义</span>
      </div>
    </a>
  </div>
</template>
<script>
export default {
  data () {
    return {
      itemMessage: [{
        imgUrl: require('../../assets/platform01.png'),
        desc: '社情民意',
        href: 'http://www.baidu.com'
      }, {
        imgUrl: require('../../assets/platform02.png'),
        desc: '城市管理',
        href: 'http://www.baidu.com'
      }, {
        imgUrl: require('../../assets/platform03.png'),
        desc: '访情跟踪',
        href: 'javascript:;'
      }, {
        imgUrl: require('../../assets/platform04.png'),
        desc: '警情分析',
        href: 'javascript:;'
      }]
    }
  }
}
</script>
<style lang="scss">
.platform-linkage-container{
  width: 100%;
  height: 100%;
  // background:red;
  box-sizing: border-box;
  padding: 17px 48px 0px 50px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  .item{
    width: 130px;
    // background: yellow;
    box-sizing: border-box;
    span{
      font-size:16px;
      font-weight:400;
      color:rgba(255,255,255,1);
      line-height:24px;
    }
  }
  .item:nth-child(1), .item:nth-child(2){
    height: 91px;
    padding-top: 71px;
  }
  .item:nth-child(3), .item:nth-child(4){
    height: 95px;
    padding-top: 73px;
  }
}
</style>

