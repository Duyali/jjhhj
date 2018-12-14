/*
 随屏幕窗口调整,自动调整页面比例功能
 -------------------------------

 @el 根元素
 @width 宽度
 @height 高度
 */
function resetScreenSize (width, height) {
  var lazyFun
  function init () {
    var _el = document.getElementById('app')
    var hScale = window.innerHeight / height
    var wScale = window.innerWidth / width
    _el.style.transform = 'scale(' + wScale + ',' + hScale + ')'
  }
  window.onresize = () => {
    clearTimeout(lazyFun)
    lazyFun = setTimeout(() => {
      init()
    }, 600)
  }
  init()
}

export default resetScreenSize
