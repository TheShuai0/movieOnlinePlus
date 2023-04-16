<template>
  <div class="beijing">
    <el-menu :default-active="activeIndex" class="dhl header" mode="horizontal"  style="">
      <el-menu-item index="1"  @click="gotoIndex()">首页</el-menu-item>
      <el-menu-item index="2" @click="">电影</el-menu-item>
      <el-menu-item index="3" @click="">论坛</el-menu-item>
    </el-menu>

    <el-table
      :data="forumTableData"
      border
      max-height="620px"
      style="width: 100%">
      <el-table-column
        fixed
        prop="ID"
        label="编号"
        width="100">
      </el-table-column>
      <el-table-column
        prop="userName"
        label="发帖人姓名"
        width="100">
      </el-table-column>
      <el-table-column
        prop="INSERT_TIME"
        label="发帖时间"
        width="100">
      </el-table-column>
      <el-table-column
        prop="FORUM_NAME"
        label="帖子名字"
        width="100">
      </el-table-column>
      <el-table-column
        prop="FORUM_DES"
        label="帖子简介"
        width="250">
      </el-table-column>
      <el-table-column
        prop="FORUM_CONTENT"
        label="帖子正文"
        width="550">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="100">
        <template slot-scope="scope">
          <el-button style="margin-left: 10px" @click="handleClick(scope.row)" type="text" size="small">发布</el-button>
          <el-button @click="deleteRow(scope.row)" type="text" size="small">撤销</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="block">
      <el-pagination
        @current-change="getForumApply()"
        layout="prev, pager, next, jumper"
        :page-size="8"
        :total="20"
        >
      </el-pagination>
    </div>

  </div>
</template>
<script>


import { InfiniteScroll } from 'v-infinite-scroll';
import 'element-ui/lib/theme-chalk/index.css'
import { EventBus } from '@/Utils/EventBus';
import Cookies from 'js-cookie'
export default {
  name: 'forumControl',

  data() {
    return {
      forumTableData:'',
      movieTableData:'',
      activeIndex: '3',
    }
  },
  methods: {
    getForumApply(val){
      if(val==null||val == '')
        val=0
      this.$axios({
        // 默认请求方式为get
        method: 'post',
        url:"/forum/getForumApply",
        responseType: 'json',
        params:{page:val},
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
          this.forumTableData = response.data.data;
        })
    },
    gotoIndex(){
      this.$router.push('/index')
    },
    handleClick(row) {
        Cookies.set('movieId', row.id, { expires: 0.02 })
        this.$router.push('/movieDetail')
    },
    deleteRow(row){
      console.log(row.id)
      this.$axios({
        // 默认请求方式为get
        method: 'post',
        url:"/movie/deleteMovie",
        responseType: 'json',
        params:{movieId:row.id},
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
          this.$message({
            showClose: true,
            message: '删除成功',
            type: 'success'
          });
          this.getAllMovie()
        })
    }
  },
  mounted() {
    this.getForumApply()
  }
}
</script>

<style>
@import '../views/views_css/main.css';
@import '../views/views_css/MovieShow.css';
</style>
