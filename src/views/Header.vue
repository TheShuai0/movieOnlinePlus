<template>
  <div>
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
          <i class="iconfont icon-sousuo">&#xe64a;</i></span>
        </div>
      </div>

      <div style=" margin-left: 460px;margin-right: -29%;width: 70px;">
        <el-dropdown placement="bottom">
          <span class="el-dropdown-link">
            <img src="../assets/img/img_3.png" style="margin-top:6px;height: 50px;width: 50px;border-radius:50%;">
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
import {throttle} from "@/lib/utils";

export default {
  name: "Header",
  data() {
    return {
      activeIndex: '1'}
  },
  methods:{
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
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
  }
}
</script>

<style>
@import '../views/views_css/main.css';
</style>
