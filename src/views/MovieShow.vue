





<template>
  <div class="beijing">
    <div style="width: 80%;margin: 29px 8% auto;margin-top: 24px">
      <el-carousel :interval="4000" type="card" height="240px;" style="overflow: hidden;">
        <el-carousel-item v-for="item in movieLock" :key="item.url" style="margin-top: 3%;">
          <img class="medium" :src="item.url" style="object-fit: fill;width: 100%;height: 100%" @click="imgDetail">
        </el-carousel-item>
      </el-carousel>
    </div>


    <!--电影列表-->
    <div class="movies">
      <el-col :span="4" v-for="(movie, index) in displayedMovies" :key="index">
        <div class="movie">
          <img :src="getImageUrl(movie.pic_name)" alt="Movie poster" class="movie-poster">
          <div class="movie-name">{{ movie.name }}</div>
        </div>
      </el-col>
      <div v-if="loading" class="loading">Loading...</div>
    </div>


  </div>
</template>
<script>

import Header from './Header.vue';
import Float from './Float.vue'
import { InfiniteScroll } from 'v-infinite-scroll';
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

export default {
  name: 'MovieList',
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
          name: '门锁',
          type: "爱情，奇幻",
          pic_name: 'pic_16天.jpg',
        },
        {
          name: '乌龙精神',
          type: '奇幻，冒险，动作',
          pic_name: 'pic_16天.jpg',
        }, {
          name: '古董局中局',
          type: '爱情，喜剧',
          pic_name: 'pic_16天.jpg',
        },
        {
          name: '印度功夫',
          type: '动作，喜剧，古装',
          pic_name: 'pic_16天.jpg',
        },
        {
          name: '独行月球',
          type: '爱情，喜剧',
          pic_name: 'pic_16天.jpg',
        }, {
          name: '天火',
          type: '奇幻，喜剧',
          pic_name: 'pic_16天.jpg',
        }, {
          name: '天降雄狮',
          type: '仙侠，动作',
          pic_name: 'pic_16天.jpg',
        },
        {
          name: '魔兽',
          type: '奇幻，动作',
          pic_name: 'pic_16天.jpg',
        },
        {
          name: '喜剧之王',
          type: '喜剧，冒险',
          pic_name: 'pic_16天.jpg',
        },
        {
          name: '影',
          type: '动作，古装',
          pic_name: 'pic_16天.jpg',
        }, {
          name: '杰夫',
          type: '惊悚，冒险',
          pic_name: 'pic_16天.jpg',
        },{
          name: '门锁',
          type: "爱情，奇幻",
          pic_name: 'pic_16天.jpg',
        },
        {
          name: '乌龙精神',
          type: '奇幻，冒险，动作',
          pic_name: 'pic_16天.jpg',
        }, {
          name: '古董局中局',
          type: '爱情，喜剧',
          pic_name: 'pic_16天.jpg',
        },
        {
          name: '印度功夫',
          type: '动作，喜剧，古装',
          pic_name: 'pic_16天.jpg',
        },
        {
          name: '独行月球',
          type: '爱情，喜剧',
          pic_name: 'pic_16天.jpg',
        }, {
          name: '天火',
          type: '奇幻，喜剧',
          pic_name: 'pic_16天.jpg',
        }, {
          name: '天降雄狮',
          type: '仙侠，动作',
          pic_name: 'pic_16天.jpg',
        },
        {
          name: '魔兽',
          type: '奇幻，动作',
          pic_name: 'pic_16天.jpg',
        },
        {
          name: '喜剧之王',
          type: '喜剧，冒险',
          pic_name: 'pic_16天.jpg',
        },
        {
          name: '影',
          type: '动作，古装',
          pic_name: 'pic_16天.jpg',
        }, {
          name: '杰夫',
          type: '惊悚，冒险',
          pic_name: 'pic_16天.jpg',
        },
      ]
    };
  },
  methods: {
    //动态加载
    loadMore() {
      this.loading = true;
      setTimeout(() => {
        this.page++;
        this.displayedMovies = this.movies.slice(0, this.page * this.pageSize);
        this.loading = false;
      }, 200);
    },
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
        url:"/local/getMovie",
        responseType: 'json',
        headers: {
          'Content-Type': "application/json;charset=UTF-8",
          'token': localStorage.getItem("token")
        },
      }).then(
        (response) => {
          console.log(response.data.data)
          this.datalist = response.data.data;
        })
    },
    getImageUrl(pic_name) {
      return require(`@/assets/images/${pic_name}`)
    },
  },
  mounted() {
    this.getMovie();
    window.addEventListener('scroll', () => {
      if (
        window.innerHeight + window.pageYOffset >= document.body.offsetHeight - 200 &&
        !this.loading &&
        this.displayedMovies.length < this.movies.length
      ) {
        this.loadMore();
      }
    });
  },
  components: {
    Header,
    Float
  },
  created() {
    this.displayedMovies = this.movies.slice(0, this.pageSize);
  },
}
</script>

<style>
@import '../views/views_css/main.css';
@import '../views/views_css/MovieShow.css';
</style>
