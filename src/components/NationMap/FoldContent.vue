<template>
  <div>
    <div class="header" @click="foldChild($event)">
      <a-button size="small" type="primary">{{type}}</a-button>
      <a-icon id="icon" :type=iconType />
    </div>
    <div class="content" :id=buttonContent>
    </div>
    <a-drawer
      title="海尔智慧小区"
      placement="right"
      :closable="false"
      @close="rightDrawerClose"
      :visible="rightDrawerVisible"
    >
      hhhhhhh
    </a-drawer>
  </div>
</template>

<style scoped>
.header{
  position: relative;
  display: flex;
  align-items: center;
  height: 36px;
  border-bottom: 1px solid #ddd;
  margin-top: 13px;
  cursor: pointer;
}
.header>button{
    margin-left: 10px;
  }
.header>i{
  position: absolute;
  right: 10px;
}
.content{
  transition:  height .7s linear;
  overflow: hidden;
}

</style>

<script>
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
        'trip': ['长沙', '武汉'],
        'eat': ['', '武汉'],
        'wh': ['武汉星海智慧小区', '武汉天地智慧小区'],
        'gz': ['广州智慧小区', '广州智慧小区'],
        'cs': ['长沙IFS智慧小区', '长沙IFS智慧小区']
      },
      butType: [' btn-primary', ' btn-success', ' btn-info', ' btn-warning', ' btn-danger', ' btn-default'],
      markerType: 'icon1',
      rightDrawerVisible: false
    }
  },
  methods: {
    foldChild: function (ev) {
      let element = ev.currentTarget || ev.srcElement
      let num = parseInt(element.nextSibling.getAttribute('id').replace(/[^0-9]/ig, ''))
      let foldElement = element.nextSibling
      if (this.GLOBAL.FoldChildVisib[num] == 0) {
        this.GLOBAL.FoldChildVisib[num] = 1
        this.iconType = 'up'
        $(foldElement).css({ 'height': this.GLOBAL.FoldChildHeight[num] })
      } else {
        this.GLOBAL.FoldChildVisib[num] = 0
        this.iconType = 'down'
        $(foldElement).css({ 'height': 0 + 'px' })
      }
      this.$emit('foldChild')
    },
    appendButton: function () {
      let that = this
      let contents = this.content[this.name]
      let parent = '#' + this.buttonContent
      for (let i = 0; i < contents.length; i++) {
        let className = 'btn btn-xs btn-primary'
        // 下面一行代码给出的是随机彩色的按钮
        // className += this.butType[Math.floor(Math.random() * this.butType.length)]
        $('#' + this.buttonContent).append('<button type="button" class="button-margin ' + className + '"' + 'id="button' + i + '"' + '>' + contents[i] + '</button>')
        $(parent + ' #button' + i).on('click', function () {
          that.detialInfo(that.buttonContent.replace(/[^0-9]/ig, ''), i)
        })
      }
      this.GLOBAL.FoldChildHeight.push($('#' + this.buttonContent).css('height'))
      this.GLOBAL.FoldChildVisib.push(1)
      $('#' + this.buttonContent).css({ 'height': this.GLOBAL.FoldChildHeight[this.GLOBAL.FoldChildHeight.length - 1] })
    },
    addButton: function () {
      if (this.name == 'trip') {
        this.appendButton()
      } else if (this.name == 'eat') {
        this.appendButton()
      } else if (this.name == 'wh') {
        this.appendButton()
      } else if (this.name == 'gz') {
        this.appendButton()
      } else if (this.name == 'cs') {
        this.appendButton()
      }
    },
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
    markerFun: function (map, point, iconType) {
      let that = this
      let marker = new BMap.Marker(point, {
        icon: iconType
      })
      this.GLOBAL.markerArr.push(marker)
      map.addOverlay(marker)
      marker.addEventListener('click', function () {
        that.GLOBAL.map.panTo(new BMap.Point(this.point.lng, this.point.lat))
        that.removeAllMarker(that.GLOBAL.map, that.GLOBAL.markerArr)
        for (let proprty in that.GLOBAL.siteList) {
          let site = that.GLOBAL.siteList[proprty]
          if (site.hasOwnProperty('positions')) {
            for (let i = 0; i < site.positions.length; i++) {
              if (site.positions[i].lng == this.point.lng && site.positions[i].lat == this.point.lat) {
                site.positions[i].active = true
              }
            }
          }
        }
        that.multMarker(that.GLOBAL.siteList)
        that.showDrawer()
      })
    },
    multMarker: function (obj) {
      for (let property in obj) {
        if (obj[property].hasOwnProperty('positions')) {
          let positions = obj[property].positions
          for (let i = 0; i < positions.length; i++) {
            // 创建坐标点
            let points = new BMap.Point(positions[i].lng, positions[i].lat)
            if (positions[i].active) {
              this.markerFun(this.GLOBAL.map, points, this.GLOBAL.icon1Active)
            } else {
              this.markerFun(this.GLOBAL.map, points, this.GLOBAL.icon1)
            }
          }
        }
      }
    },
    detialInfo: function (parentOrder, i) {
      let typeList = Object.keys(this.GLOBAL.siteList)
      let type = typeList[parentOrder]
      let typePosition = this.GLOBAL.siteList[type]
      if (typePosition.hasOwnProperty('positions')) {
        this.removeAllMarker(this.GLOBAL.map, this.GLOBAL.markerArr)
        typePosition.positions[i].active = !typePosition.positions[i].active
        this.multMarker(this.GLOBAL.siteList)
        this.GLOBAL.map.panTo(new BMap.Point(typePosition.positions[i].lng, typePosition.positions[i].lat))
        this.showDrawer()
      }
    },
    showDrawer: function () {
      let that = this
      setTimeout(function () {
        that.rightDrawerVisible = true
      })
    },
    rightDrawerClose: function () {
      this.rightDrawerVisible = false
      this.removeAllMarker(this.GLOBAL.map, this.GLOBAL.markerArr)
      this.multMarker(this.GLOBAL.siteList)
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
          that.addButton()
        }, 20)
        break
      case 'eat':
        this.type = '吃'
        this.buttonContent += this.GLOBAL.FoldContentMountedNum
        setTimeout(function () {
          that.addButton()
        }, 20)
        break
      case 'wh':
        this.type = '武汉'
        this.buttonContent += this.GLOBAL.FoldContentMountedNum
        setTimeout(function () {
          that.addButton()
        }, 20)
        break
      case 'gz':
        this.type = '广州'
        this.buttonContent += this.GLOBAL.FoldContentMountedNum
        setTimeout(function () {
          that.addButton()
        }, 20)
        break
      case 'cs':
        this.type = '长沙'
        this.buttonContent += this.GLOBAL.FoldContentMountedNum
        setTimeout(function () {
          that.addButton()
        }, 20)
        break
    }
    if (this.GLOBAL.FoldContentMountedNum == 2) {
      this.markerType = this.GLOBAL.icon1
      setTimeout(function () {
        that.multMarker(that.GLOBAL.siteList)
      }, 100)
    }
    this.GLOBAL.FoldContentMountedNum++
  }
}
</script>
