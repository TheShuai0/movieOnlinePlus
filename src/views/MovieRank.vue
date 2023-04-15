<template>
  <div>
    <Header></Header>
    <Float></Float>
  <div class="beijing">
    <el-tabs type="border-card" @tab-click="handleClick">
      <el-tab-pane name="全部" label="全部" > </el-tab-pane>
      <el-tab-pane name="动作" label="动作" ></el-tab-pane>
      <el-tab-pane name="爱情" label="爱情" > </el-tab-pane>
      <el-tab-pane name="惊悚" label="惊悚" > </el-tab-pane>
      <el-tab-pane name="奇幻" label="奇幻" > </el-tab-pane>
      <el-tab-pane name="战争" label="战争" > </el-tab-pane>
      <el-tab-pane name="悬疑" label="悬疑" > </el-tab-pane>
      <el-tab-pane name="纪录片" label="纪录片"> </el-tab-pane>
      <el-tab-pane name="家庭" label="家庭"></el-tab-pane>
      <el-tab-pane name="动画" label="动画"></el-tab-pane>
      <el-tab-pane name="冒险" label="冒险"> </el-tab-pane>
      <el-tab-pane name="音乐" label="音乐"> </el-tab-pane>
      <el-tab-pane name="歌舞" label="歌舞"> </el-tab-pane>
      <el-tab-pane name="科幻" label="科幻"> </el-tab-pane>
      <el-tab-pane name="喜剧" label="喜剧"> </el-tab-pane>
      <el-tab-pane name="犯罪" label="犯罪"> </el-tab-pane>
      <el-tab-pane name="情色" label="情色"> </el-tab-pane>
      <el-tab-pane name="剧情" label="剧情"> </el-tab-pane>
      <el-tab-pane name="武侠" label="武侠"> </el-tab-pane>
      <el-tab-pane name="历史" label="历史"> </el-tab-pane>
    </el-tabs>



<!--  收藏    -->
      <el-col :span="8" class="rank">
        <div  style="padding:20px;">
          <h1 class="QuestionHeader-title" style="">收藏数前三十</h1>
          <ul class="infinite-list" v-infinite-scroll="load1" style="overflow:auto;height: 534px;">
            <li v-for="(movie,index) in collectMovies" style="height: 145px;box-shadow: 5px 5px 10px black;">
              <div @click="goToDetailPage(movie.id)" style="cursor: pointer;">
                <el-col :span="8"  style="height: 145px;" >
                  <img :src="getImageUrl(movie.PIC_URL)" style="height: 150px;padding: 13px;border-radius: 15px;">
                </el-col>
                <el-col :span="14" >
                  <div class="movie-name" style="margin-top: 10%;font-weight: 500;font-size: 24px;">{{ movie.NAME }}</div>
                </el-col>
                <el-col :span="2" class="paiming">
                  {{index+1}}
                </el-col>
                <el-col :span="10">
                  <div style="margin-top: 5%;"><el-rate :value="movie.SCORE" :disabled="true" :max="5" class="star" /></div>
                </el-col>
                <el-col :span="6">
                <div style="margin-top: 5%;">评分：{{ movie.SCORE }}</div>
                </el-col>
                <el-col :span="8">
                  <div style="margin-top: 10%;">收藏数：{{ movie.COLLECT }}</div>
                </el-col>
                <el-col :span="8">
                  <div style="margin-top: 10%;">观看数：{{ movie.WATCH }}</div>
                </el-col>
              </div>
            </li>
          </ul>
        </div>
      </el-col>
<!--   点击   -->
      <el-col :span="8" class="rank">
        <div  style="padding:20px;">
          <h1 class="QuestionHeader-title" style="">观看数前三十</h1>
          <ul class="infinite-list" v-infinite-scroll="load1" style="overflow:auto;height: 534px;">
            <li v-for="(movie,index) in watchMovies" style="height: 145px;box-shadow: 5px 5px 10px black;">
              <div @click="goToDetailPage(movie.id)" style="cursor: pointer;">
                <el-col :span="8"  style="height: 145px;" >
                  <img :src="getImageUrl(movie.PIC_URL)" style="height: 150px;padding: 13px;border-radius: 15px;">
                </el-col>
                <el-col :span="14" >
                  <div class="movie-name" style="margin-top: 10%;font-weight: 500;font-size: 24px;">{{ movie.NAME }}</div>
                </el-col>
                <el-col :span="2" class="paiming">
                  {{index+1}}
                </el-col>
                <el-col :span="10">
                  <div style="margin-top: 5%;"><el-rate :value="movie.SCORE" :disabled="true" :max="5" class="star" /></div>
                </el-col>
                <el-col :span="6">
                  <div style="margin-top: 5%;">评分：{{ movie.SCORE }}</div>
                </el-col>
                <el-col :span="8">
                  <div style="margin-top: 10%;">收藏数：{{ movie.COLLECT }}</div>
                </el-col>
                <el-col :span="8">
                  <div style="margin-top: 10%;">观看数：{{ movie.WATCH }}</div>
                </el-col>
              </div>
            </li>
          </ul>
        </div>
      </el-col>
<!--   评分   -->
      <el-col :span="8" class="rank">
        <div  style="padding:20px;">
          <h1 class="QuestionHeader-title" style="">评分前三十</h1>
          <ul class="infinite-list" v-infinite-scroll="load1" style="overflow:auto;height: 534px;">
            <li v-for="(movie,index) in scoreMovies" style="height: 145px;box-shadow: 5px 5px 10px black;">
              <div @click="goToDetailPage(movie.id)" style="cursor: pointer;">
                <el-col :span="8"  style="height: 145px;" >
                  <img :src="getImageUrl(movie.PIC_URL)" style="height: 150px;padding: 13px;border-radius: 15px;">
                </el-col>
                <el-col :span="14" >
                  <div class="movie-name" style="margin-top: 10%;font-weight: 500;font-size: 24px;">{{ movie.NAME }}</div>
                </el-col>
                <el-col :span="2" class="paiming">
                  {{index+1}}
                </el-col>
                <el-col :span="10">
                  <div style="margin-top: 5%;"><el-rate :value="movie.SCORE" :disabled="true" :max="5" class="star" /></div>
                </el-col>
                <el-col :span="6">
                  <div style="margin-top: 5%;">评分：{{ movie.SCORE }}</div>
                </el-col>
                <el-col :span="8">
                  <div style="margin-top: 10%;height: 20px;">收藏数：{{ movie.COLLECT }}</div>
                </el-col>
                <el-col :span="8">
                  <div style="margin-top: 10%;height: 20px;">观看数：{{ movie.WATCH }}</div>
                </el-col>
              </div>
            </li>
          </ul>
        </div>
      </el-col>
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
  name: 'MovieShow',
  directives: {
    InfiniteScroll
  },
  data() {
    return {
      how:'全部',
      typeList:'',
      count1: 0,
      count2: 0,
      count3: 0,
      movieLock: [
        {url: require("../assets/img/img_3.png")},
        {url: require("../assets/img/img_4.png")},
        {url: require("../assets/img/img_8.png")},
      ],
      activeIndex: '1',
      searchResult: [],
      activeName: '全部',
      collectMovies:'',
      watchMovies :'',
      scoreMovies:'',

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
    handleClick(tab) {
      this.MovieByType(tab.label);
    },
    load1 () {
      this.count1 += 2
    },
    load2 () {
      this.count2 += 2
    },
    load3 () {
      this.count3 += 2
    },
    /*种类*/
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
    MovieByType(type){
      console.log(654165465)
        this.$axios({
          // 默认请求方式为get
          method: 'post',
          url:"/movie/getMovieRank",
          responseType: 'json',
          params:{type:type,how:this.how},
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
            this.collectMovies =  response.data.data[0]
            this.watchMovies =  response.data.data[1]
            this.scoreMovies =  response.data.data[2]
          })
    },
    goToDetailPage(movieId){
      console.log(movieId)
      Cookies.set('movieId', movieId, { expires: 0.02 })
      this.$router.push('/movieDetail')
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
    getImageUrl(pic_name) {
      return require(`@/assets/images/${pic_name}`)
    },
  },

  mounted() {
    this.MovieByType();
    document.getElementById('select').style.display='none';
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
@import '../views/views_css/movieRank.css';
</style>
