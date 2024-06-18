import App from './App'

// #ifndef VUE3
import Vue from 'vue'
import './uni.promisify.adaptor'
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
  ...App
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
// 全局配置withCredentails
uni.addInterceptor('request', {
  invoke(args) {
    // 设置 withCredentials 为 true
    args.withCredentials = true;
    return args;
  }
})
// #endif