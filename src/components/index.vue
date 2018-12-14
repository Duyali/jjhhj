<template>
  <div class="main">
    <left-area></left-area>
    <center-area></center-area>
    <right-area></right-area>
  </div>
</template>

<script>
import LeftArea from './left-area'
import RightArea from './right-area'
import CenterArea from './center-area'

export default {
  name: 'HelloWorld',
  data () {
    return {
    }
  },
  components: {
    LeftArea,
    RightArea,
    CenterArea
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.main{
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 98px 30px 30px;
  display: flex;
  justify-content: space-between;
}
</style>
