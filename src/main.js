import Vue from 'vue'
import store from './store'
import router from './router'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue'
import axios from 'axios'
//自定义icon图标
import './assets/icon/iconfont1/iconfont.css'
import './assets/icon/iconfont2/iconfont.css'
Vue.prototype.$axios= axios

axios.defaults.baseURL='movie'
Vue.config.productionTip = false
/*//把axois绑定给vue
Vue.prototype.$http=axios;*/
Vue.use(ElementUI);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

/*后置拦截器*/

/*前置拦截器*/
/*axios.interceptors.request.use(config=>{
  //取出token
  let token = localStorage.getItem("token");
  //如果不为空
  if(!token){
    config.headers['token']=token;//注意格式
  }
  return config;
},error => {
  Promise.reject(error);
});*/
/*
axios.interceptors.response.use(result=>{
  let data = result.data;
  if(!data.success && data.code==="1101")
    console.log("vdfdg:")
    location.href = "/Login";//跳转到首页
  return result;
},error => {
  Promise.reject(error);
});
*/


