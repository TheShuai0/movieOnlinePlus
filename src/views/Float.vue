<template>
  <!--右边浮框-->
  <div class="jsx-f10d8aa192346a1c">
    <div class="jsx-f10d8aa192346a1c fixed-nav">
      <div id="rank" class="jsx-f10d8aa192346a1c fixed-nav-content first highlight" @click="gotoRank()">排行榜</div>
      <div id="user" class="jsx-f10d8aa192346a1c fixed-nav-content" @click="gotoUser()">主 页</div>
      <div id="collect" class="jsx-f10d8aa192346a1c fixed-nav-content" @click="gotoCollect()">收 藏</div>
<!--      <div id="like" class="jsx-f10d8aa192346a1c fixed-nav-content">喜 欢</div>-->
      <div id="talk" class="jsx-f10d8aa192346a1c fixed-nav-content" @click="gotoForum()">论 坛</div>
      <div id="select" class="jsx-f10d8aa192346a1c fixed-nav-content" @click="scrollToTop">搜 索</div>
<!--      <div id="movie" class="jsx-f10d8aa192346a1c fixed-nav-content">影 院</div>-->
      <div class="jsx-f10d8aa192346a1c fixed-nav-content last"><span
        class="jsx-f10d8aa192346a1c iconfont icon-up" @click="scrollToTop">^</span></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "float",
  methods:{
    gotoForum(){
      this.$router.push('/Forum')
    },
    gotoUser(){
      this.$router.push('/User')
    },
    gotoCollect(){
      this.$router.push('/movieCollect')
    },
    gotoRank(){
      this.$router.push('/movieRank')
    },
    scrollToTop(){
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    }
}
}
</script>

<style >
@import '../views/views_css/main.css';
</style>
