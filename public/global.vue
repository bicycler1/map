<script>
// Fold相关变量
let FoldContentMountedNum = 0
let FoldChildHeight = []
let FoldChildVisib = []

// 百度地图Object
let map = Object

let markerArr = []

// 百度地图位置信息
let siteList = {
  'trip': {
    'positions': [
      {// 长沙的经纬度
        lng: 114.335666,
        lat: 30.557024,
        active: false
      },
      {// 武汉的经纬度
        lng: 114.317984,
        lat: 30.613122,
        active: false
      }
    ]
  },
  'eat': {
    'positions': [
      {// 武汉的经纬度
        lng: 113.270815,
        lat: 23.133405
      },
      {// 长沙的经纬度
        lng: 113.272097,
        lat: 23.144241
      }]
  },
  'eat1': {
    'positions': [
      {// 武汉的经纬度
        lng: 112.986422,
        lat: 28.197448
      },
      {// 长沙的经纬度
        lng: 113.000003,
        lat: 28.217827
      }]
  }
}

// 百度地图marker样式
let icon1 = new BMap.Icon(require('../src/assets/nationMap/marker1.png'), new BMap.Size(16, 40), {
  anchor: new BMap.Size(8, 28),
  // 设置图片偏移
  imageOffset: new BMap.Size(0, 0)
})
let icon1Active = new BMap.Icon(require('../src/assets/nationMap/marker1.png'), new BMap.Size(23, 70), {
  anchor: new BMap.Size(23 / 2, 40),
  // 设置图片偏移
  imageOffset: new BMap.Size(0, 0)
})
export default {
  name: 'global',
  FoldContentMountedNum,
  FoldChildHeight,
  FoldChildVisib,
  map,
  siteList,
  markerArr,
  icon1,
  icon1Active
}
</script>
