<template>
  <div>
    <Header></Header>
    <Float></Float>
  <div class="beijing">
    <div style="width: 80%;margin: 29px 8% auto;margin-top: 24px">
      <div class="PersonTop" style="margin-top: -7%;height: 94px;background-color: #ffffffb5">
      <h1 style="font-size:40px;height: 73px; margin: auto; text-align: center;" class="person_body_list">我的收藏夾</h1>
      </div>
    </div>
    <!--电影列表-->
    <div class="movies">
      <el-col :span="4" v-for="(movie, index) in movies" :key="index">
        <div class="movie" @click="goToDetailPage(movie.id)" style="cursor: pointer;">
            <img :src="getImageUrl(movie.pic_name)" alt="Movie poster" class="movie-poster">
          <div class="movie-name">{{ movie.name }}</div>
          <div style="float:left"><el-rate :value="movie.score" :disabled="true" :max="5" class="star" /></div>
          <div>{{ movie.score }}</div>
        </div>
      </el-col>
    <div v-if="loading" class="loading">Loading...</div>
    </div>
  </div>
  </div>
</template>
<script>


import { InfiniteScroll } from 'v-infinite-scroll';
import 'element-ui/lib/theme-chalk/index.css'
import { EventBus } from '@/Utils/EventBus';
import Cookies from 'js-cookie'
import Header from "@/views/Header.vue";
import Float from "@/views/Float.vue";
import MovieShow from "@/views/MovieShow.vue";
export default {
  name: 'MovieCollect',
  directives: {
    InfiniteScroll
  },
  data() {
    return {
      count: 0,
      movieLock: [
        {url: require("../assets/img/img_3.png")},
        {url: require("../assets/img/img_4.png")},
        {url: require("../assets/img/img_8.png")},
      ],
      activeIndex: '1',
      searchResult: [],

      displayedMovies: [],
      loading: false,
      page: 1,
      pageSize: 10,
      movies: [
        {
          id:'1',
          name: '门锁',
          type: "爱情，奇幻",
          pic_name: 'pic_16天.jpg',
        },
        {
          id:'1',
          name: '乌龙精神',
          type: '奇幻，冒险，动作',
          pic_name: 'pic_16天.jpg',
        }, {
          id:'1',
          name: '古董局中局',
          type: '爱情，喜剧',
          pic_name: 'pic_16天.jpg',
        },
        {
          id:'1',
          name: '印度功夫',
          type: '动作，喜剧，古装',
          pic_name: 'pic_16天.jpg',
        },
        {
          id:'1',
          name: '独行月球',
          type: '爱情，喜剧',
          pic_name: 'pic_16天.jpg',
        }, {
          id:'1',
          name: '天火',
          type: '奇幻，喜剧',
          pic_name: 'pic_16天.jpg',
        },
      ],
    };
  },
  methods: {
    goToDetailPage(movieId){
      Cookies.set('movieId', movieId, { expires: 0.02 })
      this.$router.push('/movieDetail')
    },
    //动态加载
    cancelEvent() {
      console.log('cancel!')
    },
    imgDetail(){
      this.$axios({
        // 默认请求方式为get
        method: 'post',
        url:"/local/trytry",
        responseType: 'json'
      }).then(
        (response) => {
          if(response.data.code === "1101"){
            console.log(response); // 用户已过期
            alert(response.data.msg)
            localStorage.removeItem("token")
          }
        })
    },
    getMovie(){
      this.$axios({
        // 默认请求方式为get
        method: 'post',
        url:"/user/getUserCollect",
        responseType: 'json',
        params:{token:localStorage.getItem("token")},
        headers: {
          'Content-Type': "application/json;charset=UTF-8",
          'token': localStorage.getItem("token")
        },
      }).then(
        (response) => {
          if(response.data.code === "1101"){
            console.log(response); // 用户已过期
            alert(response.data.msg)
            localStorage.removeItem("token")
          }
          this.movies = response.data.data;
        })
    },
    getImageUrl(pic_name) {
      return require(`@/assets/images/${pic_name}`)
    },
  },

  mounted() {
    document.getElementById('select').style.display='none';
    this.getMovie();
  },
  created() {
  },
  components: {
    Header,
    Float,
  },
}
</script>

<style>
@import '../views/views_css/main.css';
@import '../views/views_css/MovieShow.css';
</style>
