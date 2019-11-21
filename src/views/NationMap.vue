<template>
  <div>
    <div id="map" >
    </div>
    <div class="fold">
      <Fold type="normal" msg="政政&火火的星辰大海">
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
import path from 'path'

export default {
  name: 'nationMap',
  components: {
    Fold: fold
  },
  data () {
    return {
      center: { lng: 112.20, lat: 31.03 },
      zoom: 6.5
    }
  },
  methods: {
    scrollFunc: function () {
      let that = this
      setTimeout(() => {
        that.GLOBAL.zoom = that.GLOBAL.map.getZoom()
      }, 800)
    }
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

    // for Chrome and IE
    this.GLOBAL.Functions.addEvent(document, 'mousewheel', this.scrollFunc)
    // for FireFox
    this.GLOBAL.Functions.addEvent(document, 'DOMMouseScroll', this.scrollFunc)
  }
}
</script>
