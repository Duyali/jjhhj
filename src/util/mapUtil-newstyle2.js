import CMap from './cmap/index.js'
console.log('CMap2', CMap)

function setMap (contentId, json, mouseMoveCallback) {
  // console.log('setMap-------------')
  // let mapTipBox = document.getElementById(tipId)
  // let oldDiv = document.querySelector('#map-box')
  // let newDiv = document.createElement('div')
  // newDiv.id = 'map-box'
  // oldDiv.parentNode.replaceChild(newDiv, oldDiv)

  console.log(json)
  let myMap = new CMap({
    el: contentId,
    // usrData: {
    //   mapName: 'china',
    //   id: 1,
    //   points: {
    //     安徽: {
    //       r: 10,
    //       color: 'yellow'
    //       // position: ['25px','15px']
    //     }
    //   }
    // },
    map: {
      // 边界
      boundary: {
        // 边界数据
        data: json.areaData,
        // 样式
        style: {
          lineWidth: 4,
          strokeStyle: '#3E92C4',
          fillStyle: 'transparent'
        }
      },
      // 块
      blocks: {
        // 块数据
        data: json.citysArr,
        // 是否可以选择 [multiple|single|false(默认)]
        selectedMode: 'multiple',
        point: {
          // 个数
          size: {
            min: 1,
            max: 2
          },
          // 大小，半径
          r: [2, 2],
          // 是否要有波纹（todo）
          pop: true,
          // 点的颜色
          color: ['#fff', '#fff'],
          // 处理函数
          fun: function (index, block, usrData) {
            // console.log(
            //   'index==>' +
            //     index +
            //     ';block==>' +
            //     block +
            //     ';useradata==>' +
            //     usrData
            // )
            console.log(block)
            // 对单个点进行控制
            if (block.name === '安徽') {
              return usrData.points['安徽']
            }
          }
          // 是否要有迁徙效果, all 都有, auto 随机
          // * 设置了此，则默认会有点 (todo)
          // migration: 'all'
        },
        // 区块名字效果设置
        cityName: {
          normal: {
            fillStyle: 'rgba(255, 255, 255, .8)',
            font: `14px 'Microsoft Yahei'`
          },
          hover: {
            fillStyle: 'rgba(255, 255, 255, 1)',
            font: `16px 'Microsoft Yahei'`
          },
          // 定位
          move: {
            x: 0,
            y: 0
          },
          // 文字与宽度比例
          txtVSWidth: 3
        },
        style: {
          lineWidth: 3,
          strokeStyle: '#243e6a',
          fillStyle: 'rgba(38,129,191,1)',
          hoverColor: 'rgba(11,57,96,.5)',
          holdColor: 'yellow'
        },

        // 自定义颜色
        // color: [
        //     '#8BC34A',
        //     '#FFC107',
        //     '#3F51B5',
        //     '#2196F3'
        // ],
        // 随机颜色
        color: false
      }

      // 镜像
      // mirror: {
      //     // 水平镜像
      //     horizontal: true,
      //     // 垂直镜像
      //     vertical: false
      // }
    },
    // 迁徙设置（todo）
    // migration: {
    //     direction: 'get', // 流向 [send|get]
    //     willback: {
    //         status: true,     // 是否返回
    //         backColor: '#f90' // 返回时颜色
    //     },
    //     // 中心
    //     center: {
    //         x: 370,
    //         y: 170
    //     },
    //     // 轨道
    //     track: {
    //         lineWidth: 1,
    //         strokeStyle: 'rgba(83, 141, 247, .4)'
    //     },
    //     // 移动点
    //     point: {
    //         speed: 200, // 速度
    //         length: 15, // 信息条的长度比
    //         style: {
    //             lineWidth: 2, // 信息条的宽
    //             strokeStyle: '#408cff' // 信息条的颜色
    //         }
    //     }
    // },
    callback: {
      // click: function (evt, data) {
      //   // console.log( index, data )

      //   myMap.history.push({
      //     key: data.index,
      //     // 新边界
      //     boundary: huaian.areaData,
      //     // 新区块
      //     blocks: huaian.citysArr,
      //     // 新的地图专有信息
      //     usrData: {
      //       mapName: Math.random()
      //         .toString(16)
      //         .slice(2),
      //       id: +new Date()
      //     }
      //   })
      // },
      // 鼠标移动事件
      mousemove: function (evt, data) {
        // console.log('evtevt',evt, data)
        mouseMoveCallback && mouseMoveCallback(evt, data)
      }
    }
  })
  // myMap.clear()
  myMap.init()
  myMap.fadeIn()

  console.log('myMap', myMap)
}

export { setMap }
