<template>
  <div class="scroll-list">
    <ul class="list-wrapper" style="height: 40px;background-color: rgba(91,165,187,.2);">
      <li class="header-wrapper">
        <div class="header-tab" v-for="(ele, index) in header" :style="`flex:${ele.flex};color:${ele.color}`" :key="index">
          {{ele.des}}
        </div>
      </li>
    </ul>
    <ul class="list-wrapper" :id="formId" @mousemove="stopScroll" @mouseout="doScroll">
      <li class="list-item" v-for="(item, index) in source" :key="index" @click="recordClick(item)">
        <!-- <div :title="des" class="header-tab list-row" v-for="(des, cIndex) in item.textArr" :key="cIndex" :style="`flex:${header[cIndex].flex};background:${index % 2 > 0 ? '#11439d' : 'transparent'};color:${item.level ? colorDic[item.level] : '#fff'}`"> -->
        <div :title="des" class="header-tab list-row" v-for="(des, cIndex) in item.textArr" :key="cIndex" :style="`flex:${header[cIndex].flex};`">
          {{formatValue(cIndex,des)}}
        </div>
      </li>
    </ul>
  </div>
</template>

<script>

export default {
  name: 'scroll-list',
  props: {
    formId:{
      type: String,
      default: 'list-body'
    },
    colorDic: {
      type: Object,
      default: () => {
        return {
          '1': '#a3152e',
          '2': '#ff5bf5',
          '3': '#ffdd60'
        }
      }
    },
    header: {
      type: Array,
      default: () => {
        return [
          { des: '事件类型', flex: 20 },
          { des: '事件名称', flex: 45 },
          { des: '地址', flex: 40 },
          { des: '来源', flex: 20 },
        ]
      }
    },
    source: {
      type: Array,
    },
    nopadding: {
      type: Boolean,
      default: false
    },
    formatValue: {
      type: Function,
      default: (index, value) => {
        return value
      }
    }
  },
  data() {
    return {
      allowScroll: true,
      hasScroll: false
    }
  },
  methods: {
    recordClick(item) {
      this.$emit('click', item)
    },
    stopScroll() {
      this.allowScroll = false
    },
    doScroll() {
      this.allowScroll = true
    },
    autoScroll(startTimeTemp, listWrapper, flag = true) {
      let maxHeight = listWrapper.scrollHeight
      let currentTimeTemp = new Date().getTime()
      if (currentTimeTemp - startTimeTemp > 50 && flag) {
        if ((listWrapper.scrollTop + listWrapper.offsetHeight) < (maxHeight - 1)) {
          listWrapper.scrollTop += 1
        } else {
          listWrapper.scrollTop = 0
        }
        startTimeTemp = new Date().getTime()
      }
      requestAnimationFrame(() => this.autoScroll(startTimeTemp, listWrapper, this.allowScroll))
    }
  },
  mounted() {
    let startTimeTemp = new Date().getTime()
    const listWrapper = document.getElementById(this.formId)
    setTimeout(() =>requestAnimationFrame(() => this.autoScroll(startTimeTemp, listWrapper, this.allowScroll)), 500)
  }
  
}
</script>

<style scoped>
.scroll-list {
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 10px;
  box-sizing: border-box;
  overflow: hidden;
}

.list-wrapper {
  height: 100%;
  overflow: hidden;
}

.header-wrapper {
  display: flex;
  width: 100%;
  height: 100%;
}

.header-tab {
  background-color: transparent;
  margin-left: 5px;
  color: #fff;
  line-height: 34px;
  text-align: center;
  align-items: center; 
  justify-content: center; 
  font-size:16px;
  font-weight:bold;
  color:rgba(117,211,253,1);
}

.list-item {
  display: flex;
  height: 40px;
  line-height: 40px;
}

.list-item:hover {
  cursor: pointer;
}

.list-row {
  background: transparent;
  overflow: hidden;
  text-overflow:ellipsis;
  white-space: nowrap;
  font-size:16px;
  font-weight:400;
  color:rgba(221,222,223,1);
  line-height:40px;
}
.list-item:nth-child(even){
  color: #d4def6;
  background-color: rgba(91,165,187,.1);
}
.list-item:nth-child(even) .list-row{
  color: #d4def6;
}
.list-item:nth-child(odd) .list-row{
  color: #2278ec;
}
</style>
