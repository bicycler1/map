<template>
  <div>
    <div class="header" @click="foldChild($event)">
      <button>{{type}}</button>
      <div></div>
      <a-icon id="icon" :type=iconType />
    </div>
    <div class="content" :id=buttonContent>
    </div>
    <a-drawer
      title="政政&火火的星辰大海"
      placement="right"
      :closable="false"
      @close="rightDrawerClose"
      :visible="rightDrawerVisible"
    >
      <p>
        &ensp;&ensp;{{describeContent}}
      </p>
      <div>
        <ul id="images">
          <li v-for="(value,key,index) in photos">
            <img :src=value.url :alt=value.alt>
          </li>
        </ul>
      </div>
    </a-drawer>
  </div>
</template>

<style lang="scss" scoped>
.header{
  position: relative;
  display: flex;
  align-items: center;
  height: 40px;
  border-bottom: 1px solid #fff;
  cursor: pointer;
}
.header>button{
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: rgba(2, 80, 111, 0.6);
  margin-left: 10px;
  &:hover{
    background: rgba(2, 80, 111, 0.9);
  }
}
@mixin headerIcon($order){
  @if($order == 1){
    background: url("../../assets/nationMap/markerTrip.png") center center no-repeat;
  }
  @else if($order == 2){
    background: url("../../assets/nationMap/markerEat.png") center center no-repeat;
  }
  width: 30px;
  height: 30px;
  background-size: auto 100%;
}
.header-first-icon{
  @include headerIcon(1)
}
.header-second-icon{
  @include headerIcon(2)
}
.header>i{
  position: absolute;
  right: 10px;
}
.content{
  transition:  height .7s linear;
  overflow: hidden;
}
p{
  text-align:justify;
  text-justify: inter-character
}
#images{
  padding: 0;
}
#images li{
  display: inline-block;
  margin: 10px 10px 0 0;
}
#images img{
  max-height: 120px;
  cursor: pointer;
}
</style>

<script>
import echarts from 'echarts'
// 图片浏览
import Viewer from 'viewerjs'

export default {
  name: 'foldcontent',
  props: [
    'name'
  ],
  data () {
    return {
      type: '',
      iconType: 'up',
      buttonContent: 'buttonContent',
      content: {
        'trip': ['湖南省博物馆', '湖南橘子洲', '湖南岳麓山', '湖南随拍'],
        'eat': ['湖南坡子街', '湖南特色', '武汉静瑞亭']
      },
      typeProps: Array,
      butType: [' btn-primary', ' btn-success', ' btn-info', ' btn-warning', ' btn-danger', ' btn-default'],
      rightDrawerVisible: false,
      photos: Object,
      describeContent: String,
      gallery: Object,
      galleryInit: 1
    }
  },
  methods: {
    // 折叠操作，传入参数是事件绑定的对象
    foldChild: function (ev) {
      let element = ev.currentTarget || ev.srcElement
      let num = parseInt($(element).next().attr('id').replace(/[^0-9]/ig, ''))
      let foldElement = $(element).next()
      if (this.GLOBAL.FoldChildVisib[num] === 0) {
        this.GLOBAL.FoldChildVisib[num] = 1
        this.iconType = 'up'
        foldElement.css({ 'height': this.GLOBAL.FoldChildButtonHeight[num] })
      } else {
        this.GLOBAL.FoldChildVisib[num] = 0
        this.iconType = 'down'
        foldElement.css({ 'height': 0 + 'px' })
      }
      this.$emit('foldChild')
    },
    // 添加header中的Icon图片
    addHeaderIcon: function () {
      switch (this.name) {
        case 'trip':
          $($('.header').children()[1]).addClass('header-first-icon')
          break
        case 'eat':
          $($('.header').children()[4]).addClass('header-second-icon')
          break
      }
    },
    // 添加trip类和eat类下面的buttons
    addButton: function () {
      let that = this
      let contents = this.content[this.name]
      let parent = '#' + this.buttonContent
      for (let i = 0; i < contents.length; i++) {
        let className = 'btn btn-xs btn-primary'
        // 下面一行代码给出的是随机彩色的按钮
        // className += this.butType[Math.floor(Math.random() * this.butType.length)]
        $(parent).append('<button type="button" class="button-margin ' + className + '"' + 'id="button' + i + '"' + '>' + contents[i] + '</button>')
        $(parent + ' #button' + i).on('click', function () {
          that.deletAndMarker(that.buttonContent.replace(/[^0-9]/ig, ''), i)
          that.showDrawer(that.buttonContent.replace(/[^0-9]/ig, ''), i)
        })
      }
      this.GLOBAL.FoldChildButtonHeight.push($('#' + this.buttonContent).css('height'))
      this.GLOBAL.FoldChildVisib.push(1)
      $('#' + this.buttonContent).css({ 'height': this.GLOBAL.FoldChildButtonHeight[this.GLOBAL.FoldChildButtonHeight.length - 1] })
    },
    // 添加多个标注点，传入的参数是包含坐标的类
    multMarker: function (obj) {
      for (let property in obj) {
        switch (property) {
          case 'trip':
            // 给标注点设置不同的样式
            this.multStyle(obj[property], 'trip')
            break
          case 'eat':
            this.multStyle(obj[property], 'eat')
            break
        }
      }
    },
    // 给标注点设置不同的样式，传入的参数是包含坐标的类、type：trip/eat
    multStyle: function (obj, type) {
      let active, normal
      switch (type) {
        case 'trip':
          active = this.GLOBAL.iconTripActive
          normal = this.GLOBAL.iconTrip
          break
        case 'eat':
          active = this.GLOBAL.iconEatActive
          normal = this.GLOBAL.iconEat
          break
      }
      if (obj.hasOwnProperty('positions')) {
        let positions = obj.positions
        for (let i = 0; i < positions.length; i++) {
          // 创建坐标点
          let points = new BMap.Point(positions[i].lng, positions[i].lat)
          if (positions[i].active) {
            // 添加一个标注点
            this.markerFun(this.GLOBAL.map, points, active)
          } else {
            this.markerFun(this.GLOBAL.map, points, normal)
          }
        }
      }
    },
    // 添加一个标注点，传入的参数是地图对象、标注点对象、标注类型对象
    markerFun: function (map, point, iconType) {
      let that = this
      let marker = new BMap.Marker(point, {
        icon: iconType
      })
      // 新增一个this.GLOBAL.markerArr全局数组用于后来的removeMarker
      this.GLOBAL.markerArr.push(marker)
      let typeOrder, listOrder
      map.addOverlay(marker)
      marker.addEventListener('click', function () {
        // 去除map上的所有标注点
        that.removeAllMarker(that.GLOBAL.map, that.GLOBAL.markerArr)
        that.GLOBAL.Functions.panAndZoom.call(that.GLOBAL, (new BMap.Point(this.point.lng, this.point.lat)))
        for (let proprty in that.GLOBAL.siteList) {
          let site = that.GLOBAL.siteList[proprty]
          if (site.hasOwnProperty('positions')) {
            for (let i = 0; i < site.positions.length; i++) {
              if (site.positions[i].lng === this.point.lng && site.positions[i].lat === this.point.lat) {
                // 1.获取所点击点的typeOrder：trip/eat，其中0=trip，1=eat。2.获取所点击点是typeOrder中的第几个
                typeOrder = that.typeProps.indexOf(proprty)
                if (typeOrder === -1) {
                  typeOrder = 'undefined'
                }
                listOrder = i
              }
            }
          }
        }
        // that.multMarker(that.GLOBAL.siteList)
        that.deletAndMarker(typeOrder, listOrder)
        that.showDrawer(typeOrder, listOrder)
      })
    },
    // 去除map上所有标注点并且所有标注点的样式为非active，传入的参数是map对象、标注点的数组
    removeAllMarker: function (map, markerArr) {
      for (let proprty in this.GLOBAL.siteList) {
        let site = this.GLOBAL.siteList[proprty]
        if (site.hasOwnProperty('positions')) {
          for (let i = 0; i < site.positions.length; i++) {
            site.positions[i].active = false
          }
        }
      }
      for (let i = 0; i < markerArr.length; i++) {
        map.removeOverlay(markerArr[i])
      }
    },
    deletAndMarker: function (typeOrder, listOrder) {
      let type = this.typeProps[typeOrder]
      let typePosition = this.GLOBAL.siteList[type]
      if (typePosition.hasOwnProperty('positions')) {
        // 去除map上多有标注点
        this.removeAllMarker(this.GLOBAL.map, this.GLOBAL.markerArr)
        typePosition.positions[listOrder].active = !typePosition.positions[listOrder].active
        // 更新标注点
        this.multMarker(this.GLOBAL.siteList)
        // 移动视角
        this.GLOBAL.Functions.panAndZoom.call(this.GLOBAL, (new BMap.Point(typePosition.positions[listOrder].lng, typePosition.positions[listOrder].lat)))
      }
    },
    // 展示右边栏
    showDrawer: function (typeOrder, listOrder) {
      let that = this
      this.rightDrawerVisible = true
      setTimeout(function () {
        that.initRightDrawer()
        that.addPhotos(typeOrder, listOrder)
      }, 100)
    },
    initRightDrawer: function () {
      let that = this
      let element = $('.ant-drawer-content-wrapper')
      element.css({ width: '430px' })
      if (this.galleryInit === 1) {
        // 初始化viewerjs，同时setTimeOut保证接下来的函数在that.addPhotos(parentOrder, i)函数之后执行
        setTimeout(() => {
          that.gallery = new Viewer(document.getElementById('images'), {
            toolbar: true,
            tooltip: false,
            movable: true,
            rotatable: true,
            scalable: false,
            fullscreen: false,
            minZoomRatio: 0.03, // 最小缩放比例
            maxZoomRatio: 3 // 最大缩放比例
          })
          that.galleryInit++
        }, 0)
      } else {
        setTimeout(() => {
          that.gallery.update()
        }, 0)
      }
      // this.drawPie()
    },
    addPhotos: function (typeOrder, listOrder) {
      if (typeof (typeOrder) === 'string' && typeOrder !== 'undefined') {
        typeOrder = parseInt(typeOrder)
      }
      if (this.GLOBAL.siteList[this.typeProps[typeOrder]].hasOwnProperty('photos')) {
        let photoAll = this.GLOBAL.siteList[this.typeProps[typeOrder]].photos
        let propsChild = Object.keys(photoAll)
        this.photos = photoAll[propsChild[listOrder]]
      }
      if (this.GLOBAL.siteList[this.typeProps[typeOrder]].hasOwnProperty('describeContent')) {
        let describeAll = this.GLOBAL.siteList[this.typeProps[typeOrder]].describeContent
        let propsChild = Object.keys(describeAll)
        this.describeContent = describeAll[propsChild[listOrder]]
      }
    },
    rightDrawerClose: function () {
      this.rightDrawerVisible = false
      this.removeAllMarker(this.GLOBAL.map, this.GLOBAL.markerArr)
      this.multMarker(this.GLOBAL.siteList)
    },
    drawPie: function () {
      let echartsPie = echarts.init(document.getElementById('echartsPie'))
      let option = {
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: '55%',
            center: ['50%', '50%'],
            data: [
              { value: 335, name: '直接访问' },
              { value: 310, name: '邮件营销' },
              { value: 274, name: '联盟广告' },
              { value: 235, name: '视频广告' },
              { value: 400, name: '搜索引擎' }
            ]
          }
        ]
      }
      echartsPie.setOption(option)
    }
  },
  mounted () {
    let that = this
    this.type = this.name
    switch (this.type) {
      case 'trip':
        this.type = '玩'
        this.buttonContent += this.GLOBAL.FoldContentMountedNum
        setTimeout(function () {
          that.addHeaderIcon()
          that.addButton()
        }, 20)
        break
      case 'eat':
        this.type = '吃'
        this.buttonContent += this.GLOBAL.FoldContentMountedNum
        setTimeout(function () {
          that.addHeaderIcon()
          that.addButton()
        }, 20)
        break
    }
    // 添加按钮种类完成之后
    if (this.GLOBAL.FoldContentMountedNum === 1) {
      setTimeout(function () {
        that.multMarker(that.GLOBAL.siteList)
      }, 100)
    }
    this.typeProps = Object.keys(this.GLOBAL.siteList)
    this.GLOBAL.FoldContentMountedNum++
  }
}
</script>
