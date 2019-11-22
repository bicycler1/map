<script>
// 文件遍历
import fs from 'browserify-fs'

// home页面上动画
let isClose = 0
// Fold相关变量
let FoldContentMountedNum = 0
let FoldChildButtonHeight = []
let FoldChildVisib = []

// galleryInit在右侧栏图片更新时候使用
let gallery = Object
let galleryInit = 1
let photos = Object

// 百度地图相关变量
let map = Object
let markerArr = []
let zoom = 6.5

// 百度地图位置信息
let siteList = {
  'trip': {
    'photos': {
      HuNanMuseum:
        {
          'photo1': {
            url: require('../src/assets/nationMap/trip/HuNan/HuNanMuseum/1.jpg'),
            alt: '长沙马王堆'
          },
          'photo2': {
            url: require('../src/assets/nationMap/trip/HuNan/HuNanMuseum/2.jpg'),
            alt: '长沙马王堆'
          },
          'photo3': {
            url: require('../src/assets/nationMap/trip/HuNan/HuNanMuseum/3.jpg'),
            alt: '长沙马王堆'
          },
          'photo4': {
            url: require('../src/assets/nationMap/trip/HuNan/HuNanMuseum/4.jpg'),
            alt: '长沙马王堆'
          },
          'photo5': {
            url: require('../src/assets/nationMap/trip/HuNan/HuNanMuseum/5.jpg'),
            alt: '长沙马王堆'
          },
          'photo6': {
            url: require('../src/assets/nationMap/trip/HuNan/HuNanMuseum/6.jpg'),
            alt: '长沙马王堆'
          }
        },
      JuzizhouScenicArea:
        {
          'photo1': {
            url: require('../src/assets/nationMap/trip/HuNan/JuzizhouScenicArea/1.jpg'),
            alt: '长沙橘子洲'
          },
          'photo2': {
            url: require('../src/assets/nationMap/trip/HuNan/JuzizhouScenicArea/2.jpg'),
            alt: '长沙橘子洲'
          }
        },
      YueLuMountain:
        {
          'photo1': {
            url: require('../src/assets/nationMap/trip/HuNan/YueluMountain/1.jpg'),
            alt: '岳麓书院'
          },
          'photo2': {
            url: require('../src/assets/nationMap/trip/HuNan/YueluMountain/2.jpg'),
            alt: '岳麓书院'
          },
          'photo3': {
            url: require('../src/assets/nationMap/trip/HuNan/YueluMountain/3.jpg'),
            alt: '岳麓书院'
          },
          'photo4': {
            url: require('../src/assets/nationMap/trip/HuNan/YueluMountain/4.jpg'),
            alt: '岳麓书院'
          },
          'photo5': {
            url: require('../src/assets/nationMap/trip/HuNan/YueluMountain/5.jpg'),
            alt: '岳麓书院'
          },
          'photo6': {
            url: require('../src/assets/nationMap/trip/HuNan/YueluMountain/6.jpg'),
            alt: '岳麓书院'
          }
        },
      HuNanSnapshot:
        {
          'photo1': {
            url: require('../src/assets/nationMap/trip/HuNan/HuNanSnapshot/1.jpg'),
            alt: '湖南随拍'
          }
        }
    },
    describeContent: {
      HuNanMuseum: '2018年8月28号那天我们一起去了湖南省博物馆。在去湖南之前，师姐就和我说一定要去湖南省博物馆看看，她去湖南最大的遗憾就是没有去那，后来知道政政最不喜欢去的地方就是博物馆了，我内心的OS是那就依政政的想法吧，不过当然政政最疼我啦嘻嘻，促成了这一次的博物馆之旅，感谢政政一直以来的默默支持。湖南省博物馆的门票需要提前在网上预约好，一开始觉得还挺简单的，然后发现是需要提前三天的，看来长沙的旅游业考虑的很到位呀哈哈，像我这种来了时候预约的必须要在这里玩上3，4天哈哈哈，逛博物馆的时候都是下午三点多了，不过我们超级幸运，几乎是赶上了所有科技秀的最后一场，湖南省博物馆的展品放置精巧，各种灯光衔接的昏暗得当，给人一种置身古时候的感觉，很多的画布都采用了高科技让她们活起来，我更喜欢用她们来形容那些画布上的人，她们无论汉子还是姑娘总能给我一种恬静释然的感觉，或许是一种隔空的对话吧哈哈，和政政的博物馆一日游超级开星⭐',
      JuzizhouScenicArea: '2018年8月8号那天我们一起去了湖南省博物馆。在去湖南之前，师姐就和我说一定要去湖南省博物馆看看，她去湖南最大的遗憾就是没有去那，后来知道政政最不喜欢去的地方就是博物馆了，我内心的OS是那就依政政的想法吧，不过当然政政最疼我啦嘻嘻，促成了这一次的博物馆之旅，感谢政政一直以来的默默支持。湖南省博物馆的门票需要提前在网上预约好，一开始觉得还挺简单的，然后发现是需要提前三天的，看来长沙的旅游业考虑的很到位呀哈哈，像我这种来了时候预约的必须要在这里玩上3，4天哈哈哈',
      YueLuMountain: '2018年8月8号那天我们一起去了湖南省博物馆。在去湖南之前，师姐就和我说一定要去湖南省博物馆看看，她去湖南最大的遗憾就是没有去那，后来知道政政最不喜欢去的地方就是博物馆了，我内心的OS是那就依政政的想法吧，不过当然政政最疼我啦嘻嘻，促成了这一次的博物馆之旅，感谢政政一直以来的默默支持。湖南省博物馆的门票需要提前在网上预约好，一开始觉得还挺简单的，然后发现是需要提前三天的，看来长沙的旅游业考虑的很到位呀哈哈，像我这种来了时候预约的必须要在这里玩上3，4天哈哈哈',
      HuNanSnapshot: '2018年8月8号那天我们一起去了湖南省博物馆。在去湖南之前，师姐就和我说一定要去湖南省博物馆看看，她去湖南最大的遗憾就是没有去那，后来知道政政最不喜欢去的地方就是博物馆了，我内心的OS是那就依政政的想法吧，不过当然政政最疼我啦嘻嘻，促成了这一次的博物馆之旅，感谢政政一直以来的默默支持。湖南省博物馆的门票需要提前在网上预约好，一开始觉得还挺简单的，然后发现是需要提前三天的，看来长沙的旅游业考虑的很到位呀哈哈，像我这种来了时候预约的必须要在这里玩上3，4天哈哈哈'
    },
    'positions': [
      {// 湖南省博物馆
        lng: 113.000003,
        lat: 28.217827,
        active: false
      },
      {// 湖南橘子洲景区
        lng: 112.968743,
        lat: 28.192929,
        active: false
      },
      {// 湖南岳麓山国家重点风景名胜区
        lng: 112.943867,
        lat: 28.189122,
        active: false
      },
      {// 湖南随拍
        lng: 113.00637,
        lat: 28.206238,
        active: false
      }
    ]
  },
  'eat': {
    'photos': {
      SlopeSonStreet:
        {
          'photo1': {
            url: require('../src/assets/nationMap/eat/HuNan/characteristics/1.jpg'),
            alt: '湖南坡子街'
          }
        },
      characteristics:
        {
          'photo1': {
            url: require('../src/assets/nationMap/eat/HuNan/characteristics/1.jpg'),
            alt: '长沙马王堆'
          }
        },
      JingRuiTing:
        {
          'photo1': {
            url: require('../src/assets/nationMap/trip/HuNan/HuNanMuseum/1.jpg'),
            alt: '长沙马王堆'
          }
        }
    },
    describeContent: {
      SlopeSonStreet: '2018年8月8号那天我们一起去了湖南省博物馆。在去湖南之前，师姐就和我说一定要去湖南省博物馆看看，她去湖南最大的遗憾就是没有去那，后来知道政政最不喜欢去的地方就是博物馆了，我内心的OS是那就依政政的想法吧，不过当然政政最疼我啦嘻嘻，促成了这一次的博物馆之旅，感谢政政一直以来的默默支持。湖南省博物馆的门票需要提前在网上预约好，一开始觉得还挺简单的，然后发现是需要提前三天的，看来长沙的旅游业考虑的很到位呀哈哈，像我这种来了时候预约的必须要在这里玩上3，4天哈哈哈',
      characteristics: '2018年8月8号那天我们一起去了湖南省博物馆。在去湖南之前，师姐就和我说一定要去湖南省博物馆看看，她去湖南最大的遗憾就是没有去那，后来知道政政最不喜欢去的地方就是博物馆了，我内心的OS是那就依政政的想法吧，不过当然政政最疼我啦嘻嘻，促成了这一次的博物馆之旅，感谢政政一直以来的默默支持。湖南省博物馆的门票需要提前在网上预约好，一开始觉得还挺简单的，然后发现是需要提前三天的，看来长沙的旅游业考虑的很到位呀哈哈，像我这种来了时候预约的必须要在这里玩上3，4天哈哈哈',
      JingRuiTing: '2018年8月8号那天我们一起去了湖南省博物馆。在去湖南之前，'
    },
    'positions': [
      {// 湖南坡子街
        lng: 112.98044,
        lat: 28.195715,
        active: false
      },
      {// 湖南特色
        lng: 112.986422,
        lat: 28.197448,
        active: false
      },
      {// 武汉静瑞亭
        lng: 114.275623,
        lat: 30.591493,
        active: false
      }
    ]
  }
}

// 百度地图marker样式

// Trip样式
const iconTrip = new BMap.Icon(require('../src/assets/nationMap/markerTrip.png'), new BMap.Size(30, 60), {
  anchor: new BMap.Size(30 / 2, 40),
  // 设置图片偏移
  imageOffset: new BMap.Size(0, 0)
})
const iconTripActive = new BMap.Icon(require('../src/assets/nationMap/markerTrip.png'), new BMap.Size(40, 70), {
  anchor: new BMap.Size(40 / 2, 53),
  // 设置图片偏移
  imageOffset: new BMap.Size(0, 0)
})

// Eat样式
const iconEat = new BMap.Icon(require('../src/assets/nationMap/markerEat.png'), new BMap.Size(30, 60), {
  anchor: new BMap.Size(30 / 2, 40),
  // 设置图片偏移
  imageOffset: new BMap.Size(0, 0)
})
const iconEatActive = new BMap.Icon(require('../src/assets/nationMap/markerEat.png'), new BMap.Size(40, 70), {
  anchor: new BMap.Size(40 / 2, 52),
  // 设置图片偏移
  imageOffset: new BMap.Size(0, 0)
})

const Functions = {
  addEvent: function (obj, xEvent, fn, eventType = false) {
    if (obj.attachEvent) {
      obj.attachEvent('on' + xEvent, fn)
    } else {
      obj.addEventListener(xEvent, fn, eventType)
    }
  },
  stop: function (ev) {
    console.log('qq')
    ev.stopPropagation()
    ev.preventDefault()
  },
  panAndZoom: function (point) {
    let that = this
    this.map.panTo(point)
    setTimeout(function () {
      if (that.zoom < 15) {
        that.map.centerAndZoom(point, 15)
        that.zoom = 15
      } else {}
    }, 700)
  },
  // 读取文件夹下面的文件
  readFileList: function (inputPath, filesList) {
    fs.readdir(inputPath, function (err, files) {
      if (err) throw err
      console.log(files)
      files.forEach((item, index) => {
        let stat = fs.stat(inputPath + item)
        if (stat.isDirectory()) {
          // 递归读取文件
          this.readFileList(inputPath + item + '/', filesList)
        } else {
          let obj = {}// 定义一个对象存放文件的路径和名字
          obj.path = inputPath// 路径
          obj.filename = item// 名字
          filesList.push(obj)
          console.log(filesList)
        }
      })
    })
  },
  // 获取文件夹下的所有文件
  getFileList: function (path) {
    let filesList = []
    this.readFileList(path, filesList)
    return filesList
  },
  // 获取文件夹下的所有图片并添加
  getImageFiles: function (path, obj) {
    this.getFileList(path).forEach((item, index) => {
      let imgPath = item.path + item.filename
      console.log(imgPath)
      let photo = 'photo' + index
      obj.trip.photos.HuNanMuseum[photo].url = require(imgPath)
      obj.trip.photos.HuNanMuseum[photo].alt = '长沙马王堆'
    })
  }
}

export default {
  name: 'global',
  isClose,
  FoldContentMountedNum,
  FoldChildButtonHeight,
  FoldChildVisib,
  photos,
  gallery,
  galleryInit,
  map,
  siteList,
  markerArr,
  zoom,
  iconTrip,
  iconTripActive,
  iconEat,
  iconEatActive,
  Functions
}
</script>
