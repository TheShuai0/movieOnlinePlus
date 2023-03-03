import LoginView from '../views/LoginView.vue'
import VueRouter from 'vue-router'
import Vue from 'vue'
import Index from '../views/Index.vue'
import Register from "@/views/Register.vue";
import $ from "jquery";

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/index',
    name: 'index',
    component: Index
  },
  {
    path: "/register",
    name: "register", //是这个路由的名字
    component: Register
  },
]
Vue.use(VueRouter)
const router = new VueRouter({
  routes
})
//挂载路由导航守卫
//如果没有登录，就跳转到登陆页面
router.beforeEach((to, from, next) => {
  //to将要访问的页面
  //from从哪个路径跳转而来
  //next是一个函数，表示放行
  //next() 放行  next('/login')强制跳转
  if (to.path === '/login'||to.path === '/register') {
    return next();
  }
  //获取token
  const tokenStr = window.sessionStorage.getItem('token');
  if (!tokenStr) {
    return next('/login');
  } else {
    next();
  }
})
export default router

