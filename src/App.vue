<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import resetScreenSize from './util/resetScreenSize'
export default {
  name: 'App',
  mounted () {
    resetScreenSize(1920, 1080)
  }
}
</script>

<style>
@import './style/reset.scss';
body{
    position:absolute;
    top:0;
    left:0;
    bottom:0;
    right:0;
}
#app {
  width: 1920px;
  height: 1080px;
  position: fixed;
  top: 0;
  left: 0;
  background:url('./assets/bg.png') no-repeat;
  transform-origin: 0 0;
  transition: All 0.4s ease-out;
  -webkit-transition: All 0.4s ease-out;
  -moz-transition: All 0.4s ease-out;
  -o-transition: All 0.4s ease-out;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  user-select: none;
}
</style>
