import Login from "@/views/Login.vue";
import VueRouter from 'vue-router'
import Vue from 'vue'
import Index from "@/views/Index.vue";
import Register from "@/views/Register.vue";
import User from "@/views/User.vue";
import MovieDetail from "@/views/MovieDetail.vue";
import MovieUrl from "@/views/MovieUrl.vue";
import MovieCollect from "@/views/MovieCollect.vue";
import MovieRank from "@/views/MovieRank.vue";
import Forum from "@/views/Forum.vue";
import ForumDetail from "@/views/ForumDetail.vue";
import Control from "@/views/Control.vue";
import ForumControl from "@/views/ForumControl.vue";

import $ from "jquery";


Vue.use(VueRouter)

const routes = [

  {
    path: '/login',
    name: 'login',
    component: Login
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
  {
    path: '/user',
    name: 'user',
    component: User
  },
  {
    path: '/movieDetail',
    name: 'movieDetail',
    component: MovieDetail
  },
  {
    path: '/movieUrl',
    name: 'movieUrl',
    component: MovieUrl
  },{
    path: '/movieCollect',
    name: 'movieCollect',
    component: MovieCollect
  },
  {
    path: '/movieRank',
    name: 'movieRank',
    component: MovieRank
  },{
    path: '/forum',
    name: 'forum',
    component: Forum
  },{
    path: '/forumDetail',
    name: 'forumDetail',
    component: ForumDetail
  },{
    path: '/control',
    name: 'control',
    component: Control
  },{
    path: '/forumControl',
    name: 'forumControl',
    component: ForumControl
  }

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
  if (to.path === '/'){
    return next('/login');
  }
  //获取token
  const f = localStorage.getItem("token")
  console.log("iii"+f)
  if (f === null || f === "") {
    return next('/login');
  } else {
    next();
  }
})
export default router

