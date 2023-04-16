<template>
  <div>
    <el-menu :default-active="activeIndex" class="dhl header" mode="horizontal"  style="">
      <el-menu-item index="1" style="margin-left: -20%" @click="MovieByType('')">首页</el-menu-item>
      <el-submenu index="2">
        <template slot="title">影片库</template>
        <el-menu-item style ="height: 10px" v-for="(type, index) in typeList" :key="index" :index="'2-' + (index + 1)"
                      @click="MovieByType(type.type)">{{type.type}}</el-menu-item>
      </el-submenu>
      <el-menu-item index="3" @click="gotoForum()">论坛</el-menu-item>
      <el-menu-item index="4" @click="gotoRank()">排行榜</el-menu-item>
      <el-menu-item v-if="menuShow" index="5" @click="gotoControl()">管理</el-menu-item>
      <div id="select" class="jsx-1273643155 search-box show-suggestion">
        <input type="text" placeholder="喜剧 / 科幻 / 奇幻 / 古装 ..."
               class="jsx-1273643155 search-field" value="" v-model="searchMovie">
        <div class="jsx-1273643155 search-button"><span class="jsx-1273643155 iconfont icon-search"
                                                        @click="MovieByName(searchMovie)">
          <i class="iconfont icon-sousuo">&#xe64a;</i></span>
        </div>
      </div>

      <div style=" margin-left: 460px;margin-right: -29%;width: 70px;">
        <el-dropdown placement="bottom">
          <span class="el-dropdown-link">
            <img :src="getImageUrl(userList.USER_IMG)" style="margin-top:6px;height: 50px;width: 50px;border-radius:50%;">
          </span>
          <template>
            <el-dropdown-menu>
              <el-dropdown-item >
                <div @click="userHome">个人主页</div>
              </el-dropdown-item>
              <el-dropdown-item>
                <el-popconfirm title="确定退出吗？"
                               @confirm="loginOut"
                               icon="icon-info"
                               style="top: 70%">
                  <template #reference>
                    <div>退出账号</div>
                  </template>
                </el-popconfirm>
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </el-menu>
  </div>

</template>

<script>
import $ from "jquery";
import {throttle} from "@/lib/utils";
import { EventBus } from '@/Utils/EventBus';
import Vcode from "vue-puzzle-vcode";
import Cookies from "js-cookie";
export default {
  name: "Header",
  data() {
    return {
      menuShow:false,
      searchMovie: '',
      activeIndex: '1',
      typeList:[
        { id: 1 ,
          type:  "爱情"},
        { id: 1 ,
          type:  "动作"},
        { id: 1 ,
          type:  "剧情"},
        { id: 1 ,
          type:  "纪录片"},
        { id: 1 ,
          type:  "惊恐"},
        { id: 1 ,
          type:  "奇幻"}
        ],
      userList:{EMAIL: "1019818712@qq.com",
        ID: 1,
        NAME: "麻辣兔头13957071523",
        PASSWORD: "123456",
        PHONE_NUMBER: "13957071523",
        USER_AGE: 22,
        USER_HOBBY: "喜剧，动作，奇幻，科幻",
        USER_IMG: "img_4.png",
        USER_NAME: "admin",
        USER_ROLE: "管理员",
      }
    }
  },
  methods:{
    gotoControl(){
      this.$router.push('/control')
    },
    gotoForum(){
      this.$router.push('/forum')
    },
    gotoRank(){
      this.$router.push('/movieRank')
    },
    //退出登录
    loginOut(){
      this.$router.push('/login')
      localStorage.removeItem("token")
    },
    userHome(){
      this.$router.push('/User')
    },
    searchAction: throttle(function (e) {
      const inputValue = e.target.value
      this.searchResult = this.datalist.filter((item) => {
        if (item.name.includes(inputValue)) {
          return item
        }
      })
    }, 1000),

    MovieByType(type){
      if(this.$route.path != '/index'){
        this.$router.push('/index')
      }else {
        this.$axios({
          // 默认请求方式为get
          method: 'post',
          url:"/movie/getMovieByType",
          responseType: 'json',
          params:{type:type},
          headers: {
            'Content-Type': "application/json;charset=UTF-8",
            'token': localStorage.getItem("token")
          },
        }).then(
          (response) => {
            if(response.data.code === "1101"){
              alert(response.data.msg)
              localStorage.removeItem("token")
            }
            this.movies =  response.data.data
            EventBus.$emit('movies-updated', this.movies);
          })
      }

    },
    MovieByName(searchMovie){
      console.log("dasda "+searchMovie)
      this.$axios({
        // 默认请求方式为get
        method: 'post',
        url:"/movie/getMovieByName",
        responseType: 'json',
        params:{movieName:searchMovie},
        headers: {
          'Content-Type': "application/json;charset=UTF-8",
          'token': localStorage.getItem("token")
        },
      }).then(
        (response) => {
          if(response.data.code === "1101"){
            alert(response.data.msg)
            localStorage.removeItem("token")
          }
          this.movies =  response.data.data
          EventBus.$emit('movies-updated', this.movies);
        })
    },
    getMovieType(){
      this.$axios({
        // 默认请求方式为get
        method: 'post',
        url:"/movie/getMovieType",
        responseType: 'json',
        headers: {
          'Content-Type': "application/json;charset=UTF-8",
          'token': localStorage.getItem("token")
        },
      }).then(
        (response) => {
          if(response.data.code === "1101"){
            alert(response.data.msg)
            localStorage.removeItem("token")
          }
          this.typeList =  response.data.data
        })
    },
    getUserData(){
      this.$axios({
        // 默认请求方式为get
        method: 'post',
        url:"/user/getUserData",
        responseType: 'json',
        params:{token:localStorage.getItem("token")},
        headers: {
          'Content-Type': "application/json;charset=UTF-8",
          'token': localStorage.getItem("token")
        },
      }).then(
        (response) => {
          if(response.data.code === "1101"){
            alert(response.data.msg)
            localStorage.removeItem("token")
          }
          this.userList =  response.data.data
        })
    },
    getImageUrl(user_img) {
      return require(`@/assets/user_img/${user_img}`)
    },

  },
  mounted() {
    this.getMovieType();
    this.getUserData();
    if(Cookies.get("role") == 1){
      this.menuShow = true;
    }
  },
  computed: {
  },
  created() {

  }
}
</script>

<style>
@import '../views/views_css/main.css';
</style>
