import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 自己引入的库
// 引入normalizeCSS文件
import 'normalize.css/normalize.css'
// 引入boostrap的css文件
import 'bootstrap/dist/css/bootstrap.min.css'
// 引入viewerjs的css文件
import 'viewerjs/dist/viewer.min.css'
// 引入fontawesome
import 'font-awesome/css/font-awesome.min.css'
// 引入antDesign
import antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.min.css'
import $ from 'jquery'
// 引入global全局变量
import global from '../public/global'

// simpleLightbox导入
import 'simplelightbox/dist/simplelightbox.min.css'
import 'simplelightbox/dist/simple-lightbox.min'

Vue.config.productionTip = false
Vue.use(antd)
Vue.use($)
Vue.prototype.GLOBAL = global

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
