<template>
  <div>
    <Header></Header>
    <Float></Float>
    <div class="big-box" style="background-color: #312f2feb;">
        <div class="big-picture">
          <img :src="getImageUrl(movieDetail.pic_url)">
        </div>
        <div class="left-Introduction">
          <div class="title-box">
            <h2 style="float: left;">{{movieDetail.name}}</h2>
            <div >
              <el-tooltip v-if="this.isFavorite == 'true'" content="移出收藏夹" placement="top">
              <img style="height: 47px;float: right;margin-top: -57px;margin-bottom: 10px;cursor: pointer;"
                   :src="require('@/assets/icon/收藏.png')" @click="addCollect(movieDetail.id)">
              </el-tooltip>
              <el-tooltip v-else content="加入收藏夹" placement="top">
                <img  style="height: 47px;float: right;margin-top: -57px;margin-bottom: 10px;cursor: pointer;"
                   :src="require('@/assets/icon/未收藏.png')" @click="addCollect(movieDetail.id)">
              </el-tooltip>
            </div>
            <div></div>
            <hr>
          </div>

          <div class="text-box" style = " margin-top: 3%;height: 370px;">
            <div class="introduce-box">
              <div style="padding: 5px">
                <div>
                  <el-rate :value="movieDetail.score" :disabled="true" :max="5" class="star" />
                </div>
                  <div style="margin-top: 10px;">评分：{{ movieDetail.score }}</div>
                </div>
                <div style="padding: 5px">上映时间：{{movieDetail.release_time}}</div>
                <div style="padding: 5px">国家：{{movieDetail.country}}</div>
                <div style="padding: 5px;height: 80px;overflow-y: scroll;margin-top: 5px">演员：{{movieDetail.actors}}</div>
                <div style="padding: 5px;margin-top: 5px">类型：{{movieDetail.types}}</div>
              </div>
              <div style="padding: 5px;height: 80px;overflow-y: scroll;">
                简介：{{movieDetail.des}}
              </div>
            <button @click="goToUrlPage(movieId)"><i>立即观看</i></button>
            </div>

        </div>
    </div>
  </div>
</template>

<script>
import { InfiniteScroll } from 'v-infinite-scroll';
import Header from './Header.vue';
import Float from './Float.vue';
import Cookies from 'js-cookie'
export default {
  name: "movieDetail",
  data() {
    return {
        isFavorite:'',
        movieId:'',
        movieDetail: {
          id:'36',
          name:'冲天',
          des:'一位不愿透露姓名的年轻胡珀穿越洛杉矶市，到达海洋上一个神圣的篮球场。',
          release_time:'2015-12-11 00:00:00',
          pic_url:'pic_冲天.jpg',
          country:'美国',
          actors:'金士杰，张艾嘉，蔡灿得，贾静雯',
          types:'纪录片',
          score:4.4
        }
    }},
  methods: {
    goToUrlPage(movieId){
      Cookies.set('movieId', movieId, { expires: 0.02 })
      Cookies.set('pic_url', this.movieDetail.pic_url, { expires: 0.02 })

      this.$axios({
        // 默认请求方式为get
        method: 'post',
        url:"/user/addHistory",
        responseType: 'json',
        params:{movieId:movieId,token:localStorage.getItem("token")},
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
        })

      this.$router.push('/movieUrl')
    },
    getImageUrl(pic_name) {
      return require(`@/assets/images/${pic_name}`)
    },
    getMovieDetail(movieId){
      this.$axios({
        // 默认请求方式为get
        method: 'post',
        url:"/movie/getMovieDetail",
        responseType: 'json',
        params:{movieId:movieId},
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
          this.movieDetail =  response.data.data
        })
    },
    addCollect(movieId){
      console.log("this.isFavorite:"+this.isFavorite)
      if(this.isFavorite === 'false'){
      this.$axios({
        // 默认请求方式为get
        method: 'post',
        url:"/user/addCollect",
        responseType: 'json',
        params:{token:localStorage.getItem("token"),movieId:movieId},
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
          this.$message({
            message: '加入收藏夹成功',
            type: 'success'
          });
          this.isFavorite ='true'
        })}else {
        this.$axios({
          // 默认请求方式为get
          method: 'post',
          url:"/user/deleteCollect",
          responseType: 'json',
          params:{token:localStorage.getItem("token"),movieId:movieId},
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
            this.$message({
              message: '移除收藏夹成功',
              type: 'success'
            });
            this.isFavorite = 'false'
          })
      }
    },
    getCollectStatus(movieId){
      this.$axios({
        // 默认请求方式为get
        method: 'post',
        url:"/user/getCollectStatus",
        responseType: 'json',
        params:{token:localStorage.getItem("token"),movieId:movieId},
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
          console.log("response.data.data:"+response.data.data)
          this.isFavorite = response.data.data
        })
    }
  },
  components: {
    Header,
    Float,
  },
  mounted() {
      // 获取路由参数中的id值
    this.movieId = Cookies.get('movieId')
    this.getMovieDetail(this.movieId);
    },
  created() {
    this.movieId = Cookies.get('movieId')
    this.getCollectStatus(this.movieId);
  }

}
</script>


<style>
@import '../views/views_css/MovieDetail.css';
</style>


