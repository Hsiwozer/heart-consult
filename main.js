import App from './App'

// #ifndef VUE3
import Vue from 'vue'

import store from './store/store.js'


// import LazyRender from 'vue-lazy-render'
// Vue.use(LazyRender)

// 配置网络请求
// 导入 $http 对象
import { $http } from '@escook/request-miniprogram'
// 在 uni-app 项目中，可以把 $http 挂载到 uni 顶级对象之上，方便全局调用
uni.$http = $http
// 配置请求根路径
$http.baseUrl = 'http://localhost:8080'
$http.beforeRequest = function (options) {
  uni.showLoading({
    title: '数据加载中...',
  })
}
$http.afterRequest = function () {
  uni.hideLoading()
}

// 封装弹窗方法
uni.$showMsg = function(title = '数据请求失败!', duration = 1500) {
  uni.showToast({
    title,
    duration,
    icon: 'none'
  })
}

Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
    ...App,
    store
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif