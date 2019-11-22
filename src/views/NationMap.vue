<template>
  <div>
    <div id="map" >
    </div>
    <div class="fold">
      <Fold type="normal" msg="政政&火火的星辰大海" @showImg="showImg($event)">
      </Fold>
    </div>
    <div class="show-img" @click="closeShowImg($event)">
      <div>
        <div class="left-icon" @click="prePhoto($event,liElement)" @dblclick="stop($event)">
          <a-icon type="caret-left" />
        </div>
        <i class="fa fa-minus minus-icon" aria-hidden="true" @click="minusPhoto($event,0.05)"></i>
        <i class="fa fa-plus plus-icon" aria-hidden="true" @click="plusPhoto($event,0.05)"></i>
        <div class="right-icon" @click="nextPhoto($event,liElement)" @dblclick="stop($event)">
          <a-icon type="caret-right" />
        </div>
      </div>
      <div>
        <img :src=photoUrl :alt=photoAlt @click="stop($event)">
      </div>
      <div @click="stop($event)">
        {{photoAlt}}
      </div>
      <div></div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
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
  .show-img>div:nth-child(1){
    position: absolute;
    bottom: 5%;
    left: 50%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 300px;
    height: 60px;
    margin-left: -150px;
  }
  @mixin iconStyle(){
    display: flex;
    justify-content: center;
    align-items: center;
    width: 39px;
    height: 39px;
    color: #ddd;
    font-size: 3rem;
    border-radius: 50%;
    cursor: pointer;
    &:hover{
      background: rgba(0,0,0,0.6);
    }
  }
  .left-icon,.right-icon,.minus-icon,.plus-icon{
    @include iconStyle
  }
  .show-img>div:nth-child(2){
    position: absolute;
    top: 6%;
    left: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 73%;
    width: 900px;
    margin-left: -450px;
  }
  .show-img img{
    max-height: 100%;
  }
  .show-img>div:nth-child(3){
    position: absolute;
    bottom: 15%;
    left: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 600px;
    margin-left: -300px;
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
      photoAlt: '',
      liElement: Object
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
    showImgKeys: function (ev, currentElement) {
      ev = ev || window.ev
      this.stop(ev)
      switch (ev.key) {
        case 'ArrowRight':
          this.nextPhoto(ev, currentElement)
          break
        case 'ArrowLeft':
          this.prePhoto(ev, currentElement)
          break
        case 'Escape':
          this.closeShowImg(event)
          break
        default:
          break
      }
    },
    nextPhoto: function (ev, currentElement) {
      this.stop(ev)
      let Num = currentElement.parent().children().length
      let nextNum = parseInt($(currentElement.children()[0]).attr('order')) + 1
      if (nextNum >= Num) {
        nextNum = 0
      }
      this.updatePhoto(nextNum)
      this.liElement = $(currentElement.parent().children()[nextNum])
    },
    prePhoto: function (ev, currentElement) {
      this.stop(ev)
      let Num = currentElement.parent().children().length
      let preNum = parseInt($(currentElement.children()[0]).attr('order')) - 1
      if (preNum < 0) {
        preNum = Num - 1
      }
      this.updatePhoto(preNum)
      this.liElement = $(currentElement.parent().children()[preNum])
    },
    closeShowImg: function (ev) {
      this.GLOBAL.Functions.stop(ev)
      $('.show-img').fadeOut(100)
    },
    showImg: function (element) {
      let that = this
      this.liElement = element
      let photoOrder = $(element.children()[0]).attr('order')
      this.updatePhoto(photoOrder)
      $('.show-img').fadeIn(100)
      $(document).unbind('keyup')
      $(document).keyup(function (event) {
        that.showImgKeys(event, that.liElement)
      })
      // this.GLOBAL.Functions.addEvent(document, 'keyup', function (event) {
      //   console.log('11')
      // })
    },
    updatePhoto: function (photoOrder) {
      let keys = Object.keys(this.GLOBAL.photos)
      let photo = this.GLOBAL.photos[keys[photoOrder]]
      this.photoUrl = photo.url
      this.photoAlt = photo.alt
    },
    minusPhoto: function (ev, zoomTimes) {
      this.stop(ev)
      let photo = $($('.show-img').children()[1]).children()[0]
      let photoWidth = parseInt($(photo).css('width'))
      let photoHeight = parseInt($(photo).css('height'))
      let newPhotoWidth = photoWidth * (1 - zoomTimes)
      let newPhotoHeight = photoHeight * (1 - zoomTimes)
      console.log($(document).height())
      if (($(document).height() - (newPhotoHeight + 39 + 50)) < 500) {
        if (photoWidth > photoHeight) {
          $($('.show-img').children()[1]).css({'width': newPhotoWidth + 'px'})
          $($('.show-img').children()[1]).css({'marginLeft': -(newPhotoWidth / 2) + 'px'})
        } else if (photoHeight >= photoWidth) {
          $($('.show-img').children()[1]).css({'height': newPhotoHeight + 'px'})
        }
      }
    },
    plusPhoto: function (ev, zoomTimes) {
      this.stop(ev)
      let photo = $($('.show-img').children()[1]).children()[0]
      let photoWidth = parseInt($(photo).css('width'))
      let photoHeight = parseInt($(photo).css('height'))
      let newPhotoWidth = photoWidth * (1 + zoomTimes)
      let newPhotoHeight = photoHeight * (1 + zoomTimes)
      console.log($(document).height())
      if (($(document).height() - (newPhotoHeight + 39 + 50)) > 200) {
        if (photoWidth > photoHeight) {
          $($('.show-img').children()[1]).css({ 'width': newPhotoWidth + 'px' })
          $($('.show-img').children()[1]).css({ 'marginLeft': -(newPhotoWidth / 2) + 'px' })
        } else if (photoHeight >= photoWidth) {
          $($('.show-img').children()[1]).css({ 'height': newPhotoHeight + 'px' })
        }
      }

      console.log(photoWidth, photoHeight)
      console.log(newPhotoWidth, newPhotoHeight)
      console.log(parseInt($(photo).css('width')), parseInt($(photo).css('height')))
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
