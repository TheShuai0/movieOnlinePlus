<template>
  <div style="overflow: hidden;">
    <Header></Header>
    <Float></Float>
    <!--背景模板-->
    <MovieShow></MovieShow>
    </div>
</template>
<script>
import {throttle} from '../lib/utils'
import MovieShow from './MovieShow.vue';
import Header from './Header.vue';
import Float from './Float.vue'
import $ from "jquery";

export default {
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
      datalist: [
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
  },
  components: {
    Header,
    Float,
    MovieShow
  },
}
</script>

<style>
@import '../views/views_css/main.css';
</style>
