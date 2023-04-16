<template>
  <div class="beijing">
    <el-menu :default-active="activeIndex" class="dhl header" mode="horizontal"  style="">
      <el-menu-item index="1"  @click="gotoIndex()">首页</el-menu-item>
      <el-menu-item index="2" @click="gotoForum()">电影</el-menu-item>
      <el-menu-item index="3" @click="gotoForumControl()">论坛</el-menu-item>
      <el-button @click="usePython"></el-button>
    </el-menu>

    <el-table
      :data="movieTableData"
      border
      max-height="620px"
      style="width: 100%">
      <el-table-column
        fixed
        prop="id"
        label="编号"
        width="100">
      </el-table-column>
      <el-table-column
        prop="NAME"
        label="电影名"
        width="100">
      </el-table-column>
      <el-table-column
        prop="COUNTRY"
        label="国家"
        width="100">
      </el-table-column>
      <el-table-column
        prop="TYPES"
        label="类型"
        width="100">
      </el-table-column>
      <el-table-column
        prop="RELEASE_TIME"
        label="上映日期"
        width="200">
      </el-table-column>
      <el-table-column
        prop="RELEASE_TIME"
        label="入库日期"
        width="200">
      </el-table-column>
      <el-table-column
        prop="SCORE"
        label="评分"
        width="100">
      </el-table-column>
      <el-table-column
        prop="COLLECT"
        label="收藏数"
        width="100">
      </el-table-column>
      <el-table-column
        prop="WATCH"
        label="观看数"
        width="100">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="100">
        <template slot-scope="scope">
          <el-button style="margin-left: 10px" @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
          <el-button style="margin-left: 10px" @click="handleClick(scope.row)" type="text" size="small">编辑</el-button>
          <el-button @click="deleteRow(scope.row)" type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="block">
      <el-pagination
        @current-change="getAllMovie"
        layout="prev, pager, next, jumper"
        :page-size="10"
        :total="406">
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
  name: 'control',

  data() {
    return {
      movieTableData:'',
      activeIndex: '2',
    }
  },
  methods: {
    usePython(){
      this.$axios({
        // 默认请求方式为get
        method: 'post',
        url:"/user/tuijian",
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
          this.getAllMovie
        })
    },
    getAllMovie(val){
      if(val==null||val == '')
        val=0
      this.$axios({
        // 默认请求方式为get
        method: 'post',
        url:"/movie/getAllMovie",
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
          this.movieTableData = response.data.data;
        })
    },
    gotoForumControl(){
      this.$router.push('/forumControl')
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
    this.getAllMovie()
  }
}
</script>

<style>
@import '../views/views_css/main.css';
@import '../views/views_css/MovieShow.css';
</style>
