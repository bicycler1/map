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
        lng: 112.945358,
        lat: 28.234451,
        active: false
      },
      {// 武汉的经纬度
        lng: 114.311754,
        lat: 30.598604,
        active: false
      }
    ]
  },
  'eat': {
    // 'positions': [
    //   {// 武汉的经纬度
    //     lng: 114.31,
    //     lat: 30.52
    //   },
    //   {// 长沙的经纬度
    //     lng: 112.59,
    //     lat: 28.16
    //   }]
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
