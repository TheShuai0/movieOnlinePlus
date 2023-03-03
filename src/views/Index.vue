<template>
  <div style="overflow: hidden;">
    <el-menu :default-active="activeIndex" class="dhl header" mode="horizontal" @select="handleSelect" style="">
      <el-menu-item index="1" style="margin-left: -20%">首页</el-menu-item>
      <el-submenu index="2">
        <template slot="title">影片库</template>
        <el-menu-item index="2-1">喜剧</el-menu-item>
        <el-menu-item index="2-2">动作</el-menu-item>
        <el-menu-item index="2-3">爱情</el-menu-item>
        <el-menu-item index="2-3">惊悚</el-menu-item>
        <el-menu-item index="2-3">奇幻</el-menu-item>
        <el-menu-item index="2-3">古装</el-menu-item>
      </el-submenu>
      <el-menu-item index="3">论坛</el-menu-item>
      <el-menu-item index="4">排行榜</el-menu-item>
      <div class="jsx-1273643155 search-box show-suggestion">
        <input type="text" placeholder="喜剧 / 科幻 / 奇幻 / 古装 ..."
               class="jsx-1273643155 search-field" value="">
        <div class="jsx-1273643155 search-button"><span class="jsx-1273643155 iconfont icon-search"
                                                        @click="searchAction($event)">
          <i class="iconfont icon-sousuo">&#xe64a;</i></span></div>
      </div>
    </el-menu>
<!--右边浮框-->
    <div class="jsx-f10d8aa192346a1c">
      <div class="jsx-f10d8aa192346a1c fixed-nav">
        <div id="tv" class="jsx-f10d8aa192346a1c fixed-nav-content first highlight">排行榜</div>
        <div id="anime" class="jsx-f10d8aa192346a1c fixed-nav-content">收 藏</div>
        <div id="movie" class="jsx-f10d8aa192346a1c fixed-nav-content">喜 欢</div>
        <div id="show" class="jsx-f10d8aa192346a1c fixed-nav-content">论 坛</div>
        <div id="documentary" class="jsx-f10d8aa192346a1c fixed-nav-content">搜 索</div>
        <div id="filter" class="jsx-f10d8aa192346a1c fixed-nav-content">影 院</div>
        <div class="jsx-f10d8aa192346a1c fixed-nav-content last"><span
          class="jsx-f10d8aa192346a1c iconfont icon-up">^</span></div>
      </div>
    </div>
<!--背景模板-->
    <div class="beijing">
      <div style="width: 80%;margin: 29px 8% auto;margin-top: 24px">
        <el-carousel :interval="4000" type="card" height="240px;" style="overflow: hidden;">
          <el-carousel-item v-for="item in movieLock" :key="item.url" style="margin-top: 3%;">
            <img class="medium" :src="item.url" style="object-fit: fill;width: 100%;height: 100%">
          </el-carousel-item>
        </el-carousel>
      </div>
<!--电影列表-->
      <div id="box" class="dv">
        <ul v-if="searchResult.length>0" class="ul">
          <li v-for="(v,index) in searchResult" :key="index">
            <img :src="v.url" alt="">
            <h4 class="zi">{{ v.name }}</h4>
            <p class="leixing">分类： {{ v.type }}</p>
          </li>
        </ul>
        <ul v-else class="ul">
          <li v-for="(v,index) in datalist" :key="index">
            <img :src="v.url" alt="">
            <h4 class="zi">{{ v.name }}</h4>
            <p class="leixing">分类： {{ v.type }}</p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import {throttle} from '../lib/utils'

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
          url: 'https://img2.voc.com.cn/remote/2021/11/23/928_ca082c53a9a66fa5a4c294b690e47683ac09aa74.jpg',
          information: '商品有限，先到先得'
        },
        {
          name: '乌龙精神',
          type: '奇幻，冒险，动作',
          url: 'https://img1.baidu.com/it/u=3751338849,1371422884&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=700',
          information: '创新科技，全新体验'
        }, {
          name: '古董局中局',
          type: '爱情，喜剧',
          url: 'https://img2.baidu.com/it/u=2414434584,1177950410&fm=253&fmt=auto&app=120&f=JPEG?w=500&h=750',
          information: '完美音质，便携好用'
        },
        {
          name: '印度功夫',
          type: '动作，喜剧，古装',
          url: 'https://img1.baidu.com/it/u=1529273513,2662071587&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=740',
          information: '高清像素，功能多样'
        },
        {
          name: '独行月球',
          type: '爱情，喜剧',
          url: 'https://img0.baidu.com/it/u=3302324359,313199919&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=716',
          information: '商品有限，先到先得'
        }, {
          name: '天火',
          type: '奇幻，喜剧',
          url: 'https://img2.baidu.com/it/u=139956150,1895274049&fm=253&fmt=auto&app=138&f=JPEG?w=358&h=500',
          information: '创新科技，全新体验'
        }, {
          name: '天降雄狮',
          type: '仙侠，动作',
          url: 'https://img1.baidu.com/it/u=1635427687,1099530414&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=712',
          information: '完美音质，便携好用'
        },
        {
          name: '魔兽',
          type: '奇幻，动作',
          url: 'https://img1.baidu.com/it/u=3582955170,3601988905&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=742',
          information: '高清像素，功能多样'
        },
        {
          name: '喜剧之王',
          type: '喜剧，冒险',
          url: 'https://img2.baidu.com/it/u=63041991,1098144704&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=713',
          information: '商品有限，先到先得'
        },
        {
          name: '影',
          type: '动作，古装',
          url: 'https://img1.baidu.com/it/u=2071206600,1520978693&fm=253&fmt=auto&app=138&f=JPEG?w=339&h=500',
          information: '创新科技，全新体验'
        }, {
          name: '杰夫',
          type: '惊悚，冒险',
          url: 'https://img2.baidu.com/it/u=27761900,1514803590&fm=253&fmt=auto&app=120&f=JPEG?w=800&h=1120',
          information: '完美音质，便携好用'
        },{
          name: '门锁',
          type: "爱情，奇幻",
          url: 'https://img2.voc.com.cn/remote/2021/11/23/928_ca082c53a9a66fa5a4c294b690e47683ac09aa74.jpg',
          information: '商品有限，先到先得'
        },
        {
          name: '乌龙精神',
          type: '奇幻，冒险，动作',
          url: 'https://img1.baidu.com/it/u=3751338849,1371422884&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=700',
          information: '创新科技，全新体验'
        }, {
          name: '古董局中局',
          type: '爱情，喜剧',
          url: 'https://img2.baidu.com/it/u=2414434584,1177950410&fm=253&fmt=auto&app=120&f=JPEG?w=500&h=750',
          information: '完美音质，便携好用'
        },
        {
          name: '印度功夫',
          type: '动作，喜剧，古装',
          url: 'https://img1.baidu.com/it/u=1529273513,2662071587&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=740',
          information: '高清像素，功能多样'
        },
        {
          name: '独行月球',
          type: '爱情，喜剧',
          url: 'https://img0.baidu.com/it/u=3302324359,313199919&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=716',
          information: '商品有限，先到先得'
        }, {
          name: '天火',
          type: '奇幻，喜剧',
          url: 'https://img2.baidu.com/it/u=139956150,1895274049&fm=253&fmt=auto&app=138&f=JPEG?w=358&h=500',
          information: '创新科技，全新体验'
        }, {
          name: '天降雄狮',
          type: '仙侠，动作',
          url: 'https://img1.baidu.com/it/u=1635427687,1099530414&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=712',
          information: '完美音质，便携好用'
        },
        {
          name: '魔兽',
          type: '奇幻，动作',
          url: 'https://img1.baidu.com/it/u=3582955170,3601988905&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=742',
          information: '高清像素，功能多样'
        },
        {
          name: '喜剧之王',
          type: '喜剧，冒险',
          url: 'https://img2.baidu.com/it/u=63041991,1098144704&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=713',
          information: '商品有限，先到先得'
        },
        {
          name: '影',
          type: '动作，古装',
          url: 'https://img1.baidu.com/it/u=2071206600,1520978693&fm=253&fmt=auto&app=138&f=JPEG?w=339&h=500',
          information: '创新科技，全新体验'
        }, {
          name: '杰夫',
          type: '惊悚，冒险',
          url: 'https://img2.baidu.com/it/u=27761900,1514803590&fm=253&fmt=auto&app=120&f=JPEG?w=800&h=1120',
          information: '完美音质，便携好用'
        },
      ]
    };
  },
  methods: {
    load() {
      this.index += 2
    },
    searchAction: throttle(function (e) {
      console.log("asdsad")
      const inputValue = e.target.value
      this.searchResult = this.datalist.filter((item) => {
        if (item.name.includes(inputValue)) {
          return item
        }
      })
    }, 1000),
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    }
  }
}
</script>

<style>
@import '../views/views_css/index_1.css';

.el-menu--popup-bottom-start {
  margin-top: 0 !important;
}

.beijing {
  background-color: rgba(239, 235, 239, 0.74);
  margin-left: 10%;
  margin-right: 10%;
}

body {
  margin: 0 !important;
}

.search-button.jsx-1273643155 {
  text-align: center;
  width: 50px;
  height: 100%;
  padding: 0;
  background: transparent;
  border: none;
  -webkit-border-bottom-left-radius: 0;
  -moz-border-radius-bottomleft: 0;
  border-bottom-left-radius: 0;
  -webkit-border-top-left-radius: 0;
  -moz-border-radius-topleft: 0;
  border-top-left-radius: 0;
  cursor: pointer;
  display: -webkit-box;
  display: -webkit-flex;
  display: -moz-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: center;
  -webkit-justify-content: center;
  -moz-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -moz-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  outline: none;
}

#section1 {
  height: 400px;
  padding: 0;
  background-color: transparent;
  /* background-image: url(http://blog.piplong.cn/wp-content/uploads/2021/09/index-read.gif); */
  background-image: url(../../public/lostandfound_1.jpg);
  background-size: 100% 100%;
  background-position: center;
  background-repeat: no-repeat;
}

#section1_1 {
  margin: 0 0 0 1240px;
  padding-top: 28px;
  font-size: 36px;
  color: #CCCCCC;
}

/* #section1::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    z-index: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .5);
}
*/

#section2 {
  overflow: hidden;
  display: table;
  table-layout: fixed;
  width: 100%;
  position: relative;
  padding: 100px 0;
}

.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}

.ul {
  margin-top: 0%;
  margin-left: 5%;
  /*overflow:scroll;*/
}

.header.dhl {
  width: 1 e3px;
  margin: auto;
  height: 74px;
  display: -webkit-box;
  display: -webkit-flex;
  display: -moz-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -moz-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: center;
  -webkit-justify-content: center;
  -moz-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  text-align: center;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -moz-box-align: center;
  -ms-flex-align: center;
  align-items: center;
}

.search-field.jsx-1273643155 {
  margin-left: 5%;
  width: 520px;
  border: none;
  padding: 0 0 0 15px;
  outline: none;
  height: 100%;
  -webkit-box-flex: 1;
  -webkit-flex: 1;
  -moz-box-flex: 1;
  -ms-flex: 1;
  flex: 1;
  color: rgb(51, 51, 51);
  background-color: transparent;
}

.search-box.jsx-1273643155 {
  margin-left: 2%;
  width: 400px;
  height: 44px;
  -webkit-border-radius: 24px;
  -moz-border-radius: 24px;
  border-radius: 24px;
  display: -webkit-box;
  display: -webkit-flex;
  display: -moz-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-shadow: 0 2px 5px 1px rgb(64 60 67 / 16%);
  -moz-box-shadow: 0 2px 5px 1px rgb(64 60 67/16%);
  box-shadow: 0 2px 5px 1px rgb(64 60 67 / 16%);
}

.first.jsx-f10d8aa192346a1c {
  -webkit-border-top-left-radius: 10px;
  -moz-border-radius-topleft: 10px;
  border-top-left-radius: 10px;
  -webkit-border-top-right-radius: 10px;
  -moz-border-radius-topright: 10px;
  border-top-right-radius: 10px;
}

.highlight.jsx-f10d8aa192346a1c, .fixed-nav-content.jsx-f10d8aa192346a1c:hover {
  background: #db542f;
  -webkit-background-clip: text;
  color: transparent;
  font-weight: 700;
}
.zi {
  color: rgba(78, 89, 105, 0.81);
  line-height: 1;
  font-size: 15px;
  margin-top: 7px;
}
.leixing {
  color: rgba(78, 89, 105, .7);
  line-height: 1;
  font-size: 14px;
  margin-top: -10px;
}
.fixed-nav-content.jsx-f10d8aa192346a1c {
  position: relative;
  display: -webkit-box;
  display: -webkit-flex;
  display: -moz-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -moz-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: center;
  -webkit-justify-content: center;
  -moz-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  color: rgba(78, 89, 105, .7);
  line-height: 1;
  background: #fff;
  cursor: pointer;
  font-size: 14px;
  width: 66px;
  height: 40px;
}

.fixed-nav.jsx-f10d8aa192346a1c {
  position: fixed;
  margin-left: 92%;
  top: 346px;
  z-index: 5;
  background: #fff;
  -webkit-border-radius: 8px;
  -moz-border-radius: 8px;
  border-radius: 8px;
  -webkit-box-shadow: 0 2px 4px 0 rgb(0 0 0 / 4%);
  -moz-box-shadow: 0 2px 4px 0 rgb(0 0 0/4%);
  box-shadow: 0 2px 4px 0 rgb(0 0 0 / 4%);
  font-weight: 500;
  padding: 5px 0;
}

.dhl {
  width: 1 e3px;
  margin: auto;
  height: 74px;
  display: -webkit-box;
  display: -webkit-flex;
  display: -moz-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -moz-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: center;
  -webkit-justify-content: center;
  -moz-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  text-align: center;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -moz-box-align: center;
  -ms-flex-align: center;
  align-items: center;
}

::-webkit-scrollbar {
  width: 6px;
  height: 8px;
  background-color: white;
}

/*定义滚动条轨道 内阴影+圆角*/
::-webkit-scrollbar-track {
  border-radius: 10px;
  background-color: #F5F5F5;
}

/*定义滑块 内阴影+圆角*/
::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background-color: #9E9E9E;
}

#box ul {
  display: flex;
  flex-wrap: wrap;
}

#box li {
  padding: 3px;
  list-style: none;
  margin-right: 22px;
  margin-top: 60px;
  height: 250px;
  border: 1px solid #eee;
}

.input {
  position: relative;
  left: 42%;
  top: 20px;
  width: 300px;
  text-align: center;
  font-size: 20px;
  border: 2px solid #B8B8B8;
  height: 40px;
  width: 15%;
  font-size: 16px;
}

#box img {
  width: 180px;
  height: 242px;
}

.image {
  width: 50%;
  display: block;
  position: relative;
  left: 210px;
}

h4 {
  text-align: center;
}

p {
  text-align: center;
}
</style>
