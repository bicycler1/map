<template>
  <div>
    <div id="map" >
    </div>
    <div class="fold">
      <Fold type="normal" msg="政政&火火的星辰大海" @showImg="showImg($event)">
      </Fold>
    </div>
    <div class="show-img" @click="closeShowImg($event)">
      <div></div>
      <div></div>
      <div>
        <img :src=photoUrl :alt=photoAlt @click="stop($event)">
      </div>
      <div @click="stop($event)">
        {{photoAlt}}
      </div>
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
  .show-img{
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0,0,0,0.5);
    display: none;
    z-index: 2000;
  }
  .show-img>div:nth-child(3){
    position: absolute;
    top: 6%;
    left: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 80%;
    width: 900px;
    margin-left: -450px;
  }
  .show-img img{
    max-height: 100%;
  }
  .show-img>div:nth-child(4){
    position: absolute;
    bottom: 5%;
    left: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 300px;
    margin-left: -150px;
    height: 50px;
    font-size: 2rem;
    color:#fff;
    letter-spacing: .6rem;
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
      zoom: 6.5,
      photoUrl: '',
      photoAlt: ''
    }
  },
  methods: {
    stop: function (ev) {
      this.GLOBAL.Functions.stop(ev)
    },
    scrollFunc: function () {
      let that = this
      setTimeout(() => {
        that.GLOBAL.zoom = that.GLOBAL.map.getZoom()
      }, 800)
    },
    showImgKeys: function () {
      console.log('11')
    },
    closeShowImg: function (ev) {
      this.GLOBAL.Functions.stop(ev)
      $('.show-img').fadeOut(100)
    },
    showImg: function (element) {
      let photoOrder = $($(element).children()[0]).attr('order')
      let keys = Object.keys(this.GLOBAL.photos)
      let photo = this.GLOBAL.photos[keys[photoOrder]]
      this.photoUrl = photo.url
      this.photoAlt = photo.alt
      $('.show-img').fadeIn(100)
      console.log(document.getElementsByClassName('show-img'))
      this.GLOBAL.Functions.addEvent(document, 'keyup', this.showImgKeys)
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
