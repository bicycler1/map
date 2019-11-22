<template>
  <div>
    <div class="background" @mousemove="movezzhhMove($event)" @mouseup="movezzhhUp($event)">
    </div>
    <div class="list-frame">
      <div>
        <router-link target="_blank" :to="{ name: 'nationwide-map' } ">
          <a-button type="primary" size="large">政政&火火一起去看星辰大海</a-button>
        </router-link>
        <router-link target="_blank" :to="{ name: 'nationwide-map' }">
          <a-button type="primary" size="large">政政&火火一起去看星辰大海</a-button>
        </router-link>
      </div>
    </div>
    <div class="zz-img" @mousedown="movezzhhDown($event)" @mousemove="movezzhhMove($event)" @mouseup="movezzhhUp($event)">
      <img src="../assets/index/zz.png" alt="按下鼠标，移动我们试试看(＾Ｕ＾)">
    </div>
    <div class="hh-img" @mousedown="movezzhhDown($event)" @mousemove="movezzhhMove($event)" @mouseup="movezzhhUp($event)">
      <img src="../assets/index/hh.png" alt="按下鼠标，移动我们试试看(＾Ｕ＾)">
    </div>
    <div class="kong-ming-video">
    </div>
    <div class="hand-in-hand-video">
    </div>
    <div class="let-go-video">

    </div>
  </div>
</template>

<style scoped>
  .background{
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: black;
  }
  .list-frame{
    position: absolute;
    top: 80vh;
    left: 50vw;
    width: 300px;
    height: 90px;
    z-index: 1;
  }
  .list-frame>div{
    position: relative;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    margin-top: -45px;
    margin-left: -50%;
  }
  .list-frame button{
    width: 100%;
    height: 46px;
    margin: 10px;
    border-radius: 20px;
  }
  .zz-img{
    position: absolute;
    top: 30vh;
    left: 30vw;
    width: 300px;
  }
  .hh-img{
    position: absolute;
    top: 30vh;
    right: 30vw;
    width: 300px;
    margin-top: -38px;
  }
  .zz-img,.hh-img{
    cursor: pointer;
    z-index: 0;
  }
  .hand-in-hand-video{
    position: absolute;
    top: 5%;
    left: 50%;
    width: 160px;
    height: 160px;
    margin-left: -100px;
    text-align: center;
    color: #fff;
    background: url("../assets/index/loveHeart.png") center center no-repeat;
    background-size: 100% auto;
    display: none;
  }
  .kong-ming-video{
    position: absolute;
    top: 0;
    left: 50%;
    width:1000px;
    height: 300px;
    margin-left: -500px;
    text-align: center;
    color: #fff;
    background: url("../assets/index/Kongming-Lantern.gif") center center no-repeat;
    background-size: auto 100%;
    display: none;
  }
</style>

<script>
// @ is an alias to /src

export default {
  name: 'home',
  components: {
  },
  data () {
    return {
      ifMouseDown: false,
      zzorhh: 0,
      elementzz: Object,
      elementhh: Object,
      zzLeft: Number,
      hhRight: Number,
      zzImgWidth: Number,
      hhImgWidth: Number,
      screenWidth: Number,
      xCurrent: Number,
      number: 1
    }
  },
  methods: {
    movezzhhDown: function (ev) {
      this.GLOBAL.Functions.stop(ev)
      this.ifMouseDown = true
      let elementClass = (ev.target || ev.srcElement).parentNode.className
      if (elementClass.indexOf('hh') != -1) {
        this.zzorhh = 1
      } else {
        this.zzorhh = 0
      }
      this.xCurrent = ev.pageX
    },
    movezzhhMove: function (ev) {
      if (this.ifMouseDown) {
        let xNext = ev.pageX
        let differ = (xNext - this.xCurrent) / 3
        this.xCurrent = xNext
        let elementzzLeft = parseInt(this.elementzz.css('left'))
        let elementhhRight = parseInt(this.elementhh.css('right'))
        if (this.zzorhh) {
          let hhRight = elementhhRight + differ
          let zzLeft = elementzzLeft + differ
          let allLength = hhRight + zzLeft + this.zzImgWidth + this.hhImgWidth
          if ((allLength - this.screenWidth) > 31) {
            zzLeft = elementzzLeft
            hhRight = elementhhRight
            this.GLOBAL.isClose += 1
            if (this.GLOBAL.isClose == 1) {
              $('.hand-in-hand-video').fadeIn(500)
              $('.hand-in-hand-video').promise().done(function () {
                $('.kong-ming-video').fadeIn(0)
              })
            }
          } else {
            if (hhRight < 20) {
              hhRight = 20
            }
            if (zzLeft < 20) {
              zzLeft = 20
            }
          }
          this.elementhh.css({ 'right': hhRight + 'px' })
          this.elementzz.css({ 'left': zzLeft + 'px' })
        } else {
          let hhRight = elementhhRight - differ
          let zzLeft = elementzzLeft - differ
          let allLength = hhRight + zzLeft + this.zzImgWidth + this.hhImgWidth
          if ((allLength - this.screenWidth) > 31) {
            zzLeft = elementzzLeft
            hhRight = elementhhRight
            this.GLOBAL.isClose += 1
            if (this.GLOBAL.isClose == 1) {
              $('.hand-in-hand-video').fadeIn(500)
              $('.hand-in-hand-video').promise().done(function () {
                $('.kong-ming-video').fadeIn(0)
              })
            }
          } else {
            if (hhRight < 20) {
              hhRight = 20
            }
            if (zzLeft < 20) {
              zzLeft = 20
            }
          }
          this.elementhh.css({ 'right': hhRight + 'px' })
          this.elementzz.css({ 'left': zzLeft + 'px' })
        }
      } else {}
    },
    movezzhhUp: function () {
      if (this.ifMouseDown) {
        this.GLOBAL.isClose = 0
        $('.hand-in-hand-video').fadeOut(200)
        $('.kong-ming-video').fadeOut(300)
        this.ifMouseDown = 0
        this.elementzz.css({ 'left': this.zzLeft + 'px' })
        this.elementhh.css({ 'right': this.hhRight + 'px' })
      } else {}
    }
  },
  mounted: function () {
    let that = this
    setTimeout(function () {
      that.elementzz = $('.zz-img')
      that.elementhh = $('.hh-img')
      that.zzLeft = parseInt(that.elementzz.css('left'))
      that.hhRight = parseInt(that.elementhh.css('right'))
      that.hhImgWidth = parseFloat(that.elementhh.css('width'))
      that.zzImgWidth = parseFloat(that.elementhh.css('width'))
      that.screenWidth = $(document).width()
    }, 50)
  }
}
</script>
