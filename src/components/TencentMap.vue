<template>
  <div>
    <!--    <input v-model="key" type="text">-->
    <!--    <button @click="search">search</button>-->

    <div>经纬度: {{ state.longitude }}, {{ state.latitude }}</div>
    <div id="container" style="width:100%;height:500px;" />
  </div>
</template>

<script setup>
// import qq from 'qq'
import { GetDeviceTrack } from '/@/api/index'
import { getMapApi } from '/@/api/map'
import { reactive, onMounted, getCurrentInstance, nextTick } from "vue"
const state = reactive({
  deviceId: 2,
  polylineLayer: null,
  map: {},
  key: '',
  longitude: 31.22014, // 经度
  latitude: 121.475227 // 纬度
})
onMounted(() => {
  init()
})

// function search() {
//   getMapApi({
//     name: state.key
//   }).then((ok) => {
//     console.log(ok.data.result.location)
//     state.latitude = ok.data.result.location.lat
//     state.longitude = ok.data.result.location.lng
//     const lat = new qq.maps.LatLng(state.latitude, state.longitude)
//     state.map.panTo(lat)
//   }, (err) => {
//     console.log(err)
//   })
// }
function init() {
  // initJS()
  const map = initGLJS()
  state.map = map
  addGeoJsonLayer(state.map)
  // addDonutLayer(state.map)
  // addClusterLayer(state.map)
  addDeviceTrackLayer(2)
}
function initGLJS() {
  // gljs
  const troot = document.getElementById('container')
  const item = document.createElement('div')
  item.id = 'mapContainer'
  troot.appendChild(item)
  // item.innerHTML = ''
  const map = new TMap.Map(item, {
    rotation: 0, // 设置地图旋转角度
    pitch: 0, // 设置俯仰角度（0~45）
    zoom: 12, // 设置地图缩放级别
    center: new TMap.LatLng(31.22014, 121.475227)// 设置地图中心点坐标
  })
  // TMap.event.addListener(map, 'click', function(event) {
  //   changeLat(event.latLng.getLat())
  //   changeLon(event.latLng.getLng())
  // })

  return map
}
// function initJS() {
//   // 步骤：定义map变量 调用 qq.maps.Map() 构造函数   获取地图显示容器
//   // 设置地图中心点
//   var myLatlng = new qq.maps.LatLng(state.longitude, state.latitude)
//   // 定义工厂模式函数
//   var myOptions = {
//     zoom: 8, // 设置地图缩放级别
//     center: myLatlng, // 设置中心点样式
//     mapTypeId: qq.maps.MapTypeId.ROADMAP // 设置地图样式详情参见MapType
//   }
//   // 获取dom元素添加地图信息
//   const map = new qq.maps.Map(document.getElementById('container'), myOptions)
//   // 给地图添加点击事件
//   // 并获取鼠标点击的经纬度
//   qq.maps.event.addListener(map, 'click', function (event) {
//     changeLat(event.latLng.getLat())
//     changeLon(event.latLng.getLng())
//   })
//   return map
// }
function addGeoJsonLayer(map) {
  // GetDevicesPosition().then(res => {
  //
  // })
  var data = null
  var xhr = new XMLHttpRequest()
  //
  xhr.open('get', '/shanghai.json', true)
  xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')
  xhr.send(null)
  xhr.onreadystatechange = function (e) {
    if (xhr.readyState === 4 && xhr.status === 200) {
      data = xhr.responseText
      var GeoJSONLayer = new TMap.vector.GeoJSONLayer({
        map: map,
        data: JSON.parse(data)
      })
    }
  }
}

// 轨迹
function addDeviceTrackLayer(deviceId) {
  GetDeviceTrack({
    'deviceId': deviceId
  }).then(res => {
    var path = [
      // new TMap.LatLng(31.22481500648338, 121.47571126937866),
      // new TMap.LatLng(31.222266575222155, 121.47596876144409),
      // new TMap.LatLng(31.222348784165886, 121.4611400604248),
      // new TMap.LatLng(31.218813710266024, 121.4611400604248),
      // new TMap.LatLng(31.218813710266024, 121.46699800491333),
    ]
    for (const idx in res.LatLngArray) {
      path.push(new TMap.LatLng(res.LatLngArray[idx][0], res.LatLngArray[idx][1]))
    }

    let idx = res.LatLngArray.length - 1
    setCenter(res.LatLngArray[idx][0], res.LatLngArray[idx][1])

    state.polylineLayer && state.polylineLayer.remove()

    // 创建 MultiPolyline
    state.polylineLayer = new TMap.MultiPolyline({
      id: 'polyline-layer', // 图层唯一标识
      map: state.map, // 绘制到目标地图
      // 折线样式定义
      styles: {
        'style_blue': new TMap.PolylineStyle({
          'color': '#06ef00', // 线填充色
          'width': 6, // 折线宽度
          'borderWidth': 5, // 边线宽度
          'borderColor': '#FFF', // 边线颜色
          'lineCap': 'butt' // 线端头方式
        }),
        'style_red': new TMap.PolylineStyle({
          'color': '#CC0000', // 线填充色
          'width': 6, // 折线宽度
          'borderWidth': 5, // 边线宽度
          'borderColor': '#CCC', // 边线颜色
          'lineCap': 'round' // 线端头方式
        })
      },
      // 折线数据定义
      geometries: [
        { // 第1条线
          'id': 'pl_1', // 折线唯一标识，删除时使用
          'styleId': 'style_blue', // 绑定样式名
          'paths': path
        }
      ]
    })

    // 标记起终点marker
    var marker = new TMap.MultiMarker({
      id: 'marker-layer',
      map: state.map,
      styles: {
        'start': new TMap.MarkerStyle({
          'width': 25,
          'height': 35,
          'anchor': { x: 16, y: 32 },
          'src': 'https://mapapi.qq.com/web/lbs/javascriptGL/demo/img/start.png'
        }),
        'end': new TMap.MarkerStyle({
          'width': 25,
          'height': 35,
          'anchor': { x: 16, y: 32 },
          // 'src': 'https://mapapi.qq.com/web/lbs/javascriptGL/demo/img/end.png'
          'src': 'https://mapapi.qq.com/web/lbs/javascriptGL/demo/img/markerDefault.png'
        })
      },
      geometries: [
        // {
        //   'id': 'start',
        //   'styleId': 'start',
        //   'position': new TMap.LatLng(31.22481500648338, 121.47571126937866)
        // },
        {
          'id': 'end',
          'styleId': 'end',
          'position': new TMap.LatLng(res.LatLngArray[idx][0], res.LatLngArray[idx][1])
        }
      ]
    })
  })
}

// 数据点
function addDonutLayer(map) {
  const donutList = [
    new Donut({
      map,
      position: new TMap.LatLng(31.297182, 121.503204),
      data: [12, 24],
      minRadius: 13,
      maxRadius: 20
    }),
    new Donut({
      map,
      position: new TMap.LatLng(31.318802, 121.552193),
      data: [23, 99, 101, 400],
      minRadius: 25,
      maxRadius: 35
    }),
    new Donut({
      map,
      position: new TMap.LatLng(31.22014, 121.475227),
      data: [18, 41, 50],
      minRadius: 20,
      maxRadius: 28
    })
  ]

  donutList.forEach((donut, index) => {
    donut.on('click', () => {
      console.log(`第${index}个环形图被点击，位置为${donut.position}`)
    })
  })
  return donutList
}

// 点聚合
function addClusterLayer(map) {
  // 创建点聚合实例
  const points = [
    [31.220417, 121.273514],
    [31.220417, 121.373514],
    [31.220802, 121.397502],
    [31.220802, 121.497502],
    [31.220416, 121.380945],
    [31.220416, 121.480945],
    [31.220104, 121.307503],
    [31.220104, 121.407503]
  ]
  const geometries = []
  for (const idx in points) {
    geometries.push({ position: new TMap.LatLng(points[idx][0], points[idx][1]) })
  }
  const markerCluster = new TMap.MarkerCluster({
    id: 'cluster',
    map: map,
    enableDefaultStyle: true, // 启用默认样式
    minimumClusterSize: 2, // 形成聚合簇的最小个数
    zoomOnClick: true, // 点击簇时放大至簇内点分离
    gridSize: 60, // 聚合算法的可聚合距离
    averageCenter: false, // 每个聚和簇的中心是否应该是聚类中所有标记的平均值
    maxZoom: 10, // 采用聚合策略的最大缩放级别
    geometries: geometries // 点数组
  })
  return markerCluster
}

function setCenter(lat, lng) {
  state.map.setCenter(new TMap.LatLng(lat, lng))
}
function changeLon(e) {
  state.longitude = e
}
function changeLat(e) {
  state.latitude = e
}

var SVG_NS = 'http://www.w3.org/2000/svg'
// type TMapInitOption = {
//   rotation: number,//设置地图旋转角度
//   pitch:number, //设置俯仰角度（0~45）
//   zoom: number, // 设置地图缩放级别
//   center: Array<number> // new TMap.LatLng(31.22014, 121.475227)// 设置地图中心点坐标
// }
//
// type DonutOption = {
//   map:any // TMap
//   position // new TMap.LatLng(31.297182, 121.503204),
//   data: Array<number> // [12, 24],
//   minRadius: number
//   maxRadius: number
// }

// 自定义环状饼图 - 继承DOMOverlay
function Donut(options) {
  TMap.DOMOverlay.call(state, options)
}

Donut.prototype = new TMap.DOMOverlay()

// 初始化
Donut.prototype.onInit = function (options) {
  state.position = options.position
  state.data = options.data
  state.minRadius = options.minRadius || 0
  state.maxRadius = options.maxRadius || 50
}

// 销毁时需解绑事件监听
Donut.prototype.onDestroy = function () {
  if (state.onClick) {
    state.dom.removeEventListener(state.onClick)
  }
}

// 创建DOM元素，返回一个DOMElement，使用state.dom可以获取到这个元素
Donut.prototype.createDOM = function () {
  const svg = document.createElementNS(SVG_NS, 'svg')
  svg.setAttribute('version', '1.1')
  svg.setAttribute('baseProfile', 'full')

  const r = state.maxRadius
  svg.setAttribute('viewBox', [-r, -r, r * 2, r * 2].join(' '))
  svg.setAttribute('width', r * 2)
  svg.setAttribute('height', r * 2)
  svg.style.cssText = 'position:absolute;top:0px;left:0px;'

  const donut = createDonut(state.data, state.minRadius, state.maxRadius)
  svg.appendChild(donut)

  // click事件监听
  state.onClick = () => {
    // DOMOverlay继承自EventEmitter，可以使用emit触发事件
    state.emit('click')
  }
  // pc端注册click事件，移动端注册touchend事件
  svg.addEventListener('click', state.onClick)
  return svg
}

// 更新DOM元素，在地图移动/缩放后执行
Donut.prototype.updateDOM = function () {
  if (!state.map) {
    return
  }

  // 经纬度坐标转容器像素坐标
  const pixel = state.map.projectToContainer(state.position)

  // 使饼图中心点对齐经纬度坐标点
  const left = pixel.getX() - state.dom.clientWidth / 2 + 'px'
  const top = pixel.getY() - state.dom.clientHeight / 2 + 'px'
  state.dom.style.transform = `translate(${left}, ${top})`
}

// 使用SVG创建环状饼图
function createDonut(data, minRadius, maxRadius) {
  const colorList = [
    '#7AF4FF',
    '#67D7FF',
    '#52B5FF',
    '#295BFF'
  ]
  const sum = data.reduce((prev, curr) => prev + curr, 0)
  let angle = 0

  const group = document.createElementNS(SVG_NS, 'g')
  data.forEach((d, i) => {
    const delta = d / sum * Math.PI * 2
    const color = colorList[i]
    const r = maxRadius
    const startAngle = angle
    const endAngle = angle + delta
    angle += delta

    // 对每个数据创建一个扇形
    const fanShape = document.createElementNS(SVG_NS, 'path')
    fanShape.setAttribute('style', `fill: ${color};`)
    fanShape.setAttribute('d', [
      'M0 0',
      `L${r * Math.sin(startAngle)} ${-r * Math.cos(startAngle)}`,
      `A${r} ${r} 0 ${delta > Math.PI ? 1 : 0} 1 ${r * Math.sin(endAngle)} ${-r * Math.cos(endAngle)}`
    ].join(' ') + ' z')
    group.appendChild(fanShape)
  })

  // 在中心创建一个圆形
  const circleShape = document.createElementNS(SVG_NS, 'circle')
  circleShape.setAttribute('style', 'fill: #FFFFFF')
  circleShape.setAttribute('cx', 0)
  circleShape.setAttribute('cy', 0)
  circleShape.setAttribute('r', minRadius)
  group.appendChild(circleShape)

  // 绘制文字
  const textShape = document.createElementNS(SVG_NS, 'text')
  textShape.setAttribute('x', 0)
  textShape.setAttribute('y', '0.3em')
  textShape.setAttribute('text-anchor', 'middle')
  textShape.innerHTML = sum
  group.appendChild(textShape)

  return group
}
</script>

<style>
</style>
