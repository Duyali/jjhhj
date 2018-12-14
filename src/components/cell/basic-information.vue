<template>
  <div class="basic-information-container">
    <div class="item" v-for="(value, key) in source" :key="key">
      <span v-text="key"></span>
      <div class="progress-bar">
        <div class="progress" :style="`width: ${value/100}%`"></div>
      </div>
      <span v-text="value"></span>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
    }
  },
  props: {
    source: {
      type: Object
    }
  }
}
</script>
<style lang="scss">
.basic-information-container{
  width: 100%;
  height: 100%;
  // background:red;
  box-sizing: border-box;
  padding: 24px 0 22px 24px;
  text-align: left;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  span, .progress-bar{
    display:inline-block;
  }
  span:nth-child(1){
    width: 65px;
    font-size:16px;
    font-weight:400;
    color:rgba(253,253,253,1);
    line-height:24px;
  }
  .progress-bar{
    margin:0 9px 0 10px;
    width: 269px;
    height: 10px;
    background:rgba(109,197,225,0.2);
    border-radius:5px;
  }
  span:nth-child(3){
    font-size:16px;
    font-weight:400;
    color:rgba(109,197,225,1);
    line-height:24px;
  }
  .progress{
    height: 100%;
    background:rgba(109,197,225,1);
    border-radius:5px;
  }
}
</style>
