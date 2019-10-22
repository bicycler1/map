<template>
  <div>
    <div id="map">

    </div>
    <div class="fold">
      <Fold type="normal" msg="海尔智慧小区">
      </Fold>
    </div>
  </div>
</template>

<style scoped>
  #map{
    width: 100vw;
    height: 100vh;
  }
  .fold{
    position: absolute;
    top: 30px;
    left: 30px;
  }
</style>

<script>
import fold from '@/components/NationMap/Fold'
import foldcontent from '@/components/NationMap/FoldContent'
let map
export default {
  name: 'nationMap',
  components: {
    Fold: fold,
    FoldContent: foldcontent
  },
  data () {
    return {
      center: { lng: 112.20, lat: 31.03 },
      zoom: 6.5
    }
  },
  methods: {

  },
  mounted () {
    let map = new BMap.Map('map')
    this.GLOBAL.map = map
    // 设置地图样式
    // map.setMapStyle({ style: 'googlelite' })
    // 自定义设置地图样式
    // map.setMapStyleV2({ styleJson: styleJson })

    // 初始化地图,设置中心点坐标和地图级别
    map.centerAndZoom(new BMap.Point(this.center.lng, this.center.lat), this.zoom)
    // 添加地图类型控件
    let opts = { offset: new BMap.Size(50, 20) }
    map.addControl(new BMap.MapTypeControl(opts))
    map.setCurrentCity('北京')
    map.enableScrollWheelZoom(true) // 开启鼠标滚轮缩放
    // 创建坐标点
  }
}
</script>
