<template>
  <div class="left-area">
    <div class="basic-information">
      <border-box :title="'基础信息'" :imgUrl="firstimgUrl">
        <!-- <Chart1 :source="source"></Chart1> -->
        <basic-info :source="basicInformationSource"></basic-info>
      </border-box>
    </div>
    <div class="events-handle">
      <border-box :title="'事件受理/办理'" :imgUrl="secondimgUrl">
        <events-handle></events-handle>
      </border-box>
    </div>
    <div class="key-personnel">
      <border-box :title="'重点人员'" :imgUrl="secondimgUrl">
        <key-personnel :source="keyPersonnelSource" @listenType="getType"></key-personnel>
      </border-box>
    </div>
  </div>
</template>
<script>
import BorderBox from './cell/border-box.vue'
// import Chart1 from './cell/chart1.vue'
import BasicInfo from './cell/basic-information.vue'
import EventsHandle from './cell/events-handle.vue'
import KeyPersonnel from './cell/key-personnel.vue'


export default {
  data () {
    return {
      source: {},
      firstimgUrl: require('../assets/box-bg_01.png'),
      secondimgUrl: require('../assets/box-bg_02.png'),
      basicInformationSource: {},
      keyPersonnelSource:{},
      focusObject: {},
      specialPopulations: {},
      type: '特殊人群'
    }
  },
  watch: {
    type　() {
      this.getkeyPersonnelSource()
    }
  },
  methods: {
    getDefaultValue (url, key) {
      fetch(url, {method: 'GET', headers: {'Content-Type': 'application/json', 'Accept': 'application/json'}})
        .then(res => res.json())
        .then(data => {
          console.log('ssssss')
          console.log(data)
          this[key] = data
        })
        .catch(err => console.log(err))
    },
    getBasicInformationSource () {
      this.$axios.get('xxx')
        .then(res => {
          this.basicInformationSource = {
            'a': res.data['a'],
            'b': res.data['b'],
            'c': res.data['c'],
            'd': res.data['d']
          }
        })
        .catch(err => {
          console.log(err)
          this.getDefaultValue('static/mock/basic-info.json', 'basicInformationSource')
        })
    },
    getFocusObjectSource () {
      this.$axios.get('xxx')
        .then(res => {
          this.keyPersonnelSource = this.focusObject = {
            'a': res.data['a'],
            'b': res.data['b'],
            'c': res.data['c'],
            'd': res.data['d']
          }
        })
        .catch(err => {
          console.log(err)
          this.getDefaultValue('static/mock/basic-info.json', 'keyPersonnelSource')
        })
    },
    getSpecialPopulationsSource () {
      this.$axios.get('xxx')
        .then(res => {
          this.keyPersonnelSource = this.specialPopulations = {
            'a': res.data['a'],
            'b': res.data['b'],
            'c': res.data['c'],
            'd': res.data['d']
          }
        })
        .catch(err => {
          console.log(err)
          this.getDefaultValue('static/mock/basic-info-zj.json', 'keyPersonnelSource')
        })
    },
    getkeyPersonnelSource () {
      if (this.type === '特殊人群') {
        this.getSpecialPopulationsSource()
      } else {
        this.getFocusObjectSource()
      }
    },
    getType (type) {
      this.type = type;
      console.log('type', this.type, type)
      if (type === '关怀对象') {
        this.keyPersonnelSource = this.focusObject
      } else {
        this.keyPersonnelSource = this.specialPopulations
      }
    }
  },
  created () {
    this.getBasicInformationSource()
    this.getkeyPersonnelSource()
  },
  components: {
    BorderBox,
    // Chart1,
    BasicInfo,
    EventsHandle,
    KeyPersonnel
  }
}
</script>
<style scoped lang="scss">
/*
 container-top,container-bottom
 这些名字应该根据具体的名字来定义
 比如：有一个模块是【服务团队】，那么类名就写成service-team
 总之是不嫌类名长，但要求清晰
 */
  .left-area{
    width: 460px;
    height: 100%;
    // background: yellow;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .basic-information, .events-handle, .key-personnel{
      width:100%;
      // background: pink;
    }
    .basic-information{
      height: 288px;
    }
    .events-handle, .key-personnel{
      height: 312px;
    }
  }
</style>
