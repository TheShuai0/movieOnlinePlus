<template>
  <div>
    <Header></Header>
    <div class="big-box" style="background-color: #312f2feb;">
        <div class="big-picture">
          <img :src="getImageUrl(this.pic_url)">
        </div>
        <div class="left-Introduction">
          <div class="title-box">
            <h2>{{movieurl[0].name}}</h2>
            <hr>
          </div>

          <div class="text-box" style = " margin-top: 3%;height: 370px;">
            <div class="introduce-box">
                <div style="padding: 5px">{{movieurl[0].name}}</div>
              </div>
              <div style="height: 135px;padding: 5px">
                <ul v-infinite-scroll="load" class="infinite-list" style="overflow: auto;height: 322px;">
                  <li v-for="(url, index) in movieurl" :key="index" class="infinite-list-item"
                      style="cursor: pointer;border-radius:17px;background-color: #0706067a;" @click="GoNewMovie(url.url)">
                      <div>{{url.name}}播放地址{{index+1}}</div>
                    </li>
                </ul>
              </div>
            </div>

        </div>
    </div>
  </div>
</template>

<script  setup>
import { ref } from 'vue'
const count = ref(0)
const load = () => {
  count.value += 2
}
</script>
<script>
import { InfiniteScroll } from 'v-infinite-scroll';
import Cookies from 'js-cookie'
import Header from './Header.vue';
export default {

  name: "movieUrl",
  data() {
    return {
        movie_id:'',
        pic_url:'',
        movieurl: [{
          id:'36',
          movie_id : '10',
          name:'冲天',
          url:'https://www.so.com/link?m=eR21JGRH8EYE9wlM3W9GkzVyF3V0C77DNSvF3vwc6VElFDeU0ImDOkpDbqz1674giQZH7s77cT7le0%2Fr8nlRJqPJqLFHvZG9YaWO544K4ERJSzCHXYscvmn5ocaYt5BJq%2B63Z4fC4XZj0bBmCevAtbma79jCwQ8JMy%2Fyf%2BGfuh7bkU8RS',
        },{
          id:'36',
          movie_id : '10',
          name:'冲天',
          url:'https://www.so.com/link?m=eR21JGRH8EYE9wlM3W9GkzVyF3V0C77DNSvF3vwc6VElFDeU0ImDOkpDbqz1674giQZH7s77cT7le0%2Fr8nlRJqPJqLFHvZG9YaWO544K4ERJSzCHXYscvmn5ocaYt5BJq%2B63Z4fC4XZj0bBmCevAtbma79jCwQ8JMy%2Fyf%2BGfuh7bkU8RS',
        },{
          id:'36',
          movie_id : '10',
          name:'冲天',
          url:'https://www.so.com/link?m=eR21JGRH8EYE9wlM3W9GkzVyF3V0C77DNSvF3vwc6VElFDeU0ImDOkpDbqz1674giQZH7s77cT7le0%2Fr8nlRJqPJqLFHvZG9YaWO544K4ERJSzCHXYscvmn5ocaYt5BJq%2B63Z4fC4XZj0bBmCevAtbma79jCwQ8JMy%2Fyf%2BGfuh7bkU8RS',
        },{
          id:'36',
          movie_id : '10',
          name:'冲天',
          url:'https://www.so.com/link?m=eR21JGRH8EYE9wlM3W9GkzVyF3V0C77DNSvF3vwc6VElFDeU0ImDOkpDbqz1674giQZH7s77cT7le0%2Fr8nlRJqPJqLFHvZG9YaWO544K4ERJSzCHXYscvmn5ocaYt5BJq%2B63Z4fC4XZj0bBmCevAtbma79jCwQ8JMy%2Fyf%2BGfuh7bkU8RS',
        },]
    }},
  methods: {
    getImageUrl(pic_name) {
      return require(`@/assets/images/${pic_name}`)
    },
    GoNewMovie(url){
      window.open(url)
    },
    getMovieUrl(movieId){
      console.log("movieId"+movieId)
      this.$axios({
        // 默认请求方式为get
        method: 'post',
        url:"/movie/getMovieUrl",
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
          this.movieurl =  response.data.data
        })
    }
  },
  components: {
    Header,
  },
  mounted() {
    this.movieId = Cookies.get('movieId')
    this.pic_url = Cookies.get('pic_url')
    this.getMovieUrl(this.movieId)
    },

}
</script>


<style>
@import '../views/views_css/MovieUrl.css';
</style>


