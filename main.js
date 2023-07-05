import App from './App'
import uView from 'uview-ui';
import store from './store'
import share from '@/api/share'  // 分享
Vue.use(uView);
// #ifndef VUE3
import Vue from 'vue'
Vue.config.productionTip = false
Vue.mixin(share)
App.mpType = 'app'

Vue.prototype.$store = store

const app = new Vue({
	store,
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
// #endif