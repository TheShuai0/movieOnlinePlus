import Vue from 'vue'
import store from './store'
import router from './router'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue'
import axios from 'axios'
//自定义icon图标
import './assets/icon/iconfont.css'
Vue.prototype.$axios= axios

axios.defaults.baseURL='movie'
Vue.config.productionTip = false

Vue.use(ElementUI);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
