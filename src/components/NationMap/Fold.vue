<template>
  <div class="fold-frame">
    <div class="fold-header" @click="fold($event)">
      <div>{{msg}}</div>
      <a-icon id="icon" :type=iconType />
    </div>
    <div class="fold-content">
      <FoldContent class="fold-child-frame" name="trip" @foldChild="foldChild" @showImg="showImg($event)"></FoldContent>
      <FoldContent class="fold-child-frame" name="eat" @foldChild="foldChild" @showImg="showImg($event)"></FoldContent>
    </div>
  </div>
</template>

<style scoped>
  .fold-frame{
    color: #fff;
  }
  .fold-header{
    position: relative;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    background: rgba(2,76,111,0.9);
    border-radius: 10px 10px 0 0;
    border-bottom: 2px solid #e2c029;
    cursor: pointer;
  }
  .fold-header>div{
    margin-left: 10px;
  }
  #icon{
    position: absolute;
    right: 10px;
    transition: all .7s linear;
  }
  .fold-content{
    position: relative;
    top: 0;
    left: 0;
    background: rgba(54,156,205,0.9);
    border-radius: 0 0 10px 10px;
    transition: height .7s linear;
    overflow: hidden;
  }
  .fold-child-frame{
    margin: 13px 0 13px 0;
  }
</style>

<script>
import fold from '@/components/NationMap/Fold'
import foldcontent from '@/components/NationMap/FoldContent'
export default {
  name: 'fold',
  components: {
    FoldContent: foldcontent
  },
  props: [
    'type',
    'msg'
  ],
  data () {
    return {
      visib: 1,
      iconType: 'up'
    }
  },
  methods: {
    computeHeight: function () {
      let height = 0
      for (let i = 0; i < this.GLOBAL.FoldChildButtonHeight.length; i++) {
        let h = parseInt(this.GLOBAL.FoldChildButtonHeight[i]) * parseInt(this.GLOBAL.FoldChildVisib[i])
        height += h
      }
      height += (13 + 40) * this.GLOBAL.FoldChildButtonHeight.length
      height += 13
      return height
    },
    foldChild: function () {
      let height = this.computeHeight()
      $('.fold-content').css({ 'height': height + 'px' })
    },
    fold: function (ev) {
      let element = ev.currentTarget || ev.srcElement
      let foldElement = $(element).next()
      let height = this.computeHeight()
      if (this.visib == 0) {
        this.visib = 1
        this.iconType = 'up'
        foldElement.css({ 'height': height + 'px' })
      } else {
        this.visib = 0
        this.iconType = 'down'
        foldElement.css({ 'height': 0 + 'px' })
      }
    },
    showImg: function (element) {
      this.$emit('showImg', element)
    },
    mountedFunction: function () {
      switch (this.type) {
        case 'large':
          $('.fold-frame').addClass('large')
          $('.fold-header').addClass('large-header')
          $('.fold-content').addClass('large-fold')
          break
        case 'normal':
          $('.fold-frame').addClass('normal')
          $('.fold-header').addClass('normal-header')
          $('.fold-content').addClass('normal-fold')
          break
        case 'small':
          $('.fold-frame').addClass('small')
          $('.fold-header').addClass('small-header')
          $('.fold-content').addClass('small-fold')
          break
      }
      setTimeout(function () {
        let height = $('.fold-content').css('height')
        $('.fold-content').css({ 'height': height })
      }, 20)
    }
  },
  mounted () {
    this.mountedFunction()
  }
}
</script>
