<template>
  <div style="font-family:'Microsoft YaHei';">
    <Header ></Header>
    <Float ></Float>
    <div class="PersonTop" style="height:67px;width: 1200px;margin-top: 23px;">
      <div class="PersonTop_img" style="width: 44px;height: 44px;margin-top: -9px;">
        <img :src="getImageUrl(detailList.pic_name)" @click="dialogTable = true">
      </div>
      <div class="PersonTop_text" style="width: 1200px" v-ma>
        <div class="user_text">
          <div class="user_name" style="margin-top: -11px;">
            <span> {{ detailList.name }} </span>
          </div>
          <div class="user_qianming" style="margin-top: -5px;">
            <span> {{ detailList.des }}</span>
          </div>
        </div>
        <div class="user_num" style="height: 22%;">
          <div style="cursor: pointer;margin-left: 80%;">
            <span class="num_text">我的主题贴数</span>
            <div class="num_number">{{ myForumList.length }}</div>
          </div>
        </div>
      </div>
    </div>
        <img v-if="imageUrl" :src="imageUrl" class="avatar" >
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>

    <div class="person_body" style="margin-top: -71px;width: 1200px;">
      <div class="person_body_left" >
        <el-card class="box-card" :body-style="{ padding: '0px' }" style="height: 523px;">
          <div slot="header" class="clearfix" >
            <span class="person_body_list" style="border-bottom: none;"
            >我的帖子</span>
          </div>
          <ul class="infinite-list" v-infinite-scroll="load" style="overflow:auto;height: 457px;;">
            <li v-for="(forum, index) in myForumList" class="infinite-list-item" :key="index"
                style="cursor: pointer;border-radius:17px;background-color: rgb(146 246 211 / 40%);margin: 7px;height: 58px" @click="goTOdetail(forum.ID)">
              <div class="forum-container">
                <div class="forum-name2" >{{forum.FORUM_NAME}}</div>
                <div class="forum-name3" >讨论数：{{forum.REPLY_NUMBER}}</div>
              </div>
            </li>
          </ul>
        </el-card>

      </div>
      <div class="person_body_right" style="height: 523px;">
        <el-menu :default-active="activeIndex" class="dhl header" mode="horizontal"  style="height: 60px;">
          <el-menu-item index="1" style="margin-left: 3%;" @click="getForumByTime()">按时间</el-menu-item>
          <el-menu-item index="2" @click="getForumByReply()">按热度</el-menu-item>

          <div class="jsx-1273643155 search-box show-suggestion" style="width: 321px;height: 39px;margin-left: 11%">
            <input type="text" placeholder="寻找相关帖子"
                   class="jsx-1273643155 search-field" style="width: 240px;" value="" v-model="searchForum">
            <div class="jsx-1273643155 search-button"><span class="jsx-1273643155 iconfont icon-search"
                                                            @click="selectForum(searchForum)">
            <i class="iconfont icon-sousuo">&#xe64a;</i></span>
            </div>
          </div>
          <el-menu-item index="3" @click="showAdd()" style="color: #5eb1a2;margin-left: 32px;font-weight: 600;">发布</el-menu-item>
        </el-menu>

        <ul class="infinite-list" v-infinite-scroll="load" style="overflow:auto;height: 457px;">
          <li v-for="(forum, index) in forumList" class="Card TopstoryItem TopstoryItem-isRecommend" :key="index"
              style="cursor: pointer;border-radius:14px;margin: 7px;height: 70px;background-color: #c5edec52;" @click="goTOdetail(forum.ID)">
            <div class="forum-container">
              <div class="forum-name " style="margin-left: 20px">{{forum.FORUM_NAME}}</div>
              <div class="forum-description" style="margin-left: 20px">
                <div style="height: 35px;overflow: hidden;text-overflow: ellipsis;">{{forum.FORUM_DES}}</div>
                <div style="font-size: 3px;margin-left: 138px;color: #f04f4f;">
                  发布时间：{{formatDateTime(forum.INSERT_TIME)}}&nbsp&nbsp&nbsp&nbsp讨论数：{{forum.REPLY_NUMBER}}  </div>
              </div>
              <el-button type="success" round style="margin-left: 79px;;text-align: center;width: unset;">详情</el-button>
            </div>
          </li>
        </ul>

      </div>
    </div>

    <div v-if="showForm" style="border-radius:20px;height: 420px;width: 520px;background-color: white;position: absolute;top: 50%;left: 50%;transform: translate(-50%, -50%);z-index: 9999;border: 0px solid black; box-shadow: 2px 2px 5px grey;">
      <el-button  style="border:unset;float: right;font-size: 20px;width:unset " icon="el-icon-circle-close" circle @click="closeAdd()"></el-button>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" style="padding: 20px">
        <div style="margin-left: -20px">
          <el-form-item label="标题" prop="name">
            <el-input
              type="textarea"
              autosize
              placeholder="请输入主题贴标题"
              v-model="ruleForm.name">
            </el-input>
          </el-form-item>
          <el-form-item style="height: 100px" label="简介" prop="desc">
            <el-input
              type="textarea"
              :autosize="{ minRows: 3, maxRows: 3}"
              placeholder="请输入主题帖简介"
              v-model="ruleForm.des">
            </el-input>
          </el-form-item>
          <el-form-item label="内容" prop="desc">
            <el-input
              type="textarea"
              :autosize="{ minRows: 5, maxRows: 5}"
              placeholder="请输入主题帖内容"
              v-model="ruleForm.content">
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="addForum(detailList.id)" style="margin-left: 114px;width: 100px;margin-right: 20px;">立即创建</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>

import Header from './Header.vue';
import {EventBus} from "@/Utils/EventBus";
import $ from "jquery";
import Float from "@/views/Float.vue";

export default {
  name: "forum",
  data() {
    return {
      showForm:false,
      rules: { // 表单验证规则
        name: [
          { required: true, message: '请输入主题贴标题', trigger: 'blur' },
          { min: 3, max: 50, message: '长度在 3 到 20 个字符', trigger: 'blur' }
        ],
        des: [
          { required: true, message: '请输入主题帖简介', trigger: 'blur' },
          { min: 5, max: 200, message: '长度在 5 到 200 个字符', trigger: 'blur' }
        ],
        content: [
          { required: true, message: '请输入主题帖内容', trigger: 'blur' },
          { min: 10, max: 1000, message: '长度在 10 到 1000 个字符', trigger: 'blur' }
        ]
      },
      ruleForm: {
        name: '',
        content: '',
        des: '',
      },
      ascOrDescTime:"desc",
      ascOrDescReply:"desc",
      count: 0,
      searchForum: '',
      activeIndex: '1',
      imageUrl: '',
      file: null,
      dialogTable:false,
      myForumList:[{
        ID : "1",
        USER_ID: "1",
        INSERT_TIME: "2023-04-11 02:04:03",
        FORUM_NAME: "《九儿》",
        FORUM_DES: "一部温情治愈的电影,《九儿》是一部由徐峥执导的电影，讲述了一个女孩和她爷爷之间的故事。",
        FORUM_CONTENT: "电影以治愈的方式展现了生命的意义和亲情的重要性，赢得了观众的赞誉。作为一部温情治愈的电影，" +
          "《九儿》打动了我的心。这部电影讲述了一个女孩和她爷爷之间的故事，其中充满了亲情、友情和爱情。在电影中，我们可以看到女" +
          "孩的坚强和爷爷的慈爱，他们之间的感情非常真挚和动人。此外，电影中的音乐和画面也非常出色，让人感受到了浓厚的乡村气息和家" +
          "庭温暖。总的来说，这是一部非常值得一看的电影，它让我明白了生命的意义和亲情的重要性，也让我感到了温暖和治愈。",
        REPLY_NUMBER: "2",
        GOOD:55
      }],
      forumList:[{
        ID : "1",
        USER_ID: "1",
        INSERT_TIME: "2023-04-11 02:04:03",
        FORUM_NAME: "《九儿》",
        FORUM_DES: "一部温情治愈的电影,《九儿》是一部由徐峥执导的电影，讲述了一个女孩和她爷爷之间的故事。",
        FORUM_CONTENT: "电影以治愈的方式展现了生命的意义和亲情的重要性，赢得了观众的赞誉。作为一部温情治愈的电影，" +
    "《九儿》打动了我的心。这部电影讲述了一个女孩和她爷爷之间的故事，其中充满了亲情、友情和爱情。在电影中，我们可以看到女" +
    "孩的坚强和爷爷的慈爱，他们之间的感情非常真挚和动人。此外，电影中的音乐和画面也非常出色，让人感受到了浓厚的乡村气息和家" +
    "庭温暖。总的来说，这是一部非常值得一看的电影，它让我明白了生命的意义和亲情的重要性，也让我感到了温暖和治愈。",
        REPLY_NUMBER: "2",
        GOOD:55
      }],
      detailList: {
        id:"5",
        name: "John Doe",
        age: 15,
        phone: "13957071523",
        email: "johndoe@example.com",
        des: "我有一个梦想",
        pic_name: "img_3.png",
        favorite_id:"",
        hobby:"",
        hobby_id:"",
        user_role:"",
      }
    };
  },

  methods: {
    formatDateTime(datetimeStr) {
      const datetime = new Date(datetimeStr);
      const formattedDatetime = `${datetime.getFullYear()}-${padZero(datetime.getMonth() + 1)}-${padZero(datetime.getDate())} ${padZero(datetime.getHours())}:${padZero(datetime.getMinutes())}:${padZero(datetime.getSeconds())}`;
      return formattedDatetime;
      function padZero(num) {
        return num.toString().padStart(2, '0');
      }
    },
closeAdd(){
      this.showForm = false;
    },
    showAdd(){
      this.showForm = true;
    },
    addForum(userId) {
      if(this.ruleForm.name == null || this.ruleForm.name  == ""){
        this.$message({
          showClose: true,
          message: '标题不能为空',
          type: 'error'
        });
        return false;
      }
      if(this.ruleForm.name == null || this.ruleForm.name  == ""){
        this.$message({
          showClose: true,
          message: '简介不能为空',
          type: 'error'
        });
        return false;
      }
      if(this.ruleForm.content == null || this.ruleForm.content  == ""){
        if($('#ruleForm.name').val()== null ){
          this.$message({
            showClose: true,
            message: '内容不能为空',
            type: 'error'
          });
          return false;
        }
      }

      this.$axios({
        // 默认请求方式为get
        method: 'post',
        url:"/forum/addForum",
        responseType: 'json',
        params:{'name':this.ruleForm.name,'des':this.ruleForm.des,'content':this.ruleForm.content,'userId':userId},
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
          this.forumUser.status = response.data.data
          location.reload()
        })
      this.$message({
        showClose: true,
        message: '发布成功',
        type: 'success'
      });
      this.showForm = false;
      this.resetForm();
    },
    resetForm(formName){
      this.$refs[formName].resetFields(); // 重置表单
      this.ruleForm.name = '';
      this.ruleForm.des = '';
      this.ruleForm.content = '';
    },
    goTOdetail(forumId){
      localStorage.setItem("forumId",forumId)
      this.$router.push('/forumDetail')
    },
    load () {
      this.count += 2
    },
    getImageUrl(user_img) {
      return require(`@/assets/user_img/${user_img}`)
    },
    getUserDetail(){
      this.$axios({
        // 默认请求方式为get
        method: 'post',
        url:"/user/getUserDetail",
        responseType: 'json',
        params:{token:localStorage.getItem("token")},
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
          this.detailList =  response.data.data
        })
    },
    selectForum(searchForum){
      this.$axios({
        // 默认请求方式为get
        method: 'post',
        url:"/forum/searchForum",
        responseType: 'json',
        params:{searchForum:searchForum},
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
          this.forumList =  response.data.data
        })
    },
    getAllForum() {
      this.$axios({
        // 默认请求方式为get
        method: 'post',
        url:"/forum/getAllForum",
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
          this.forumList =  response.data.data
        })
    },
    getMyForum() {
      this.$axios({
        // 默认请求方式为get
        method: 'post',
        url:"/forum/getMyForum",
        params:{ascOrDesc:this.ascOrDescTime,token:localStorage.getItem("token")},
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
          console.log("response.data.data"+response.data.data)
          this.myForumList =  response.data.data
        })
    },
    getForumByTime() {
      this.$axios({
        // 默认请求方式为get
        method: 'post',
        url:"/forum/getForumByTime",
        responseType: 'json',
        params:{ascOrDesc:this.ascOrDescTime},
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
          this.forumList =  response.data.data
          if(this.ascOrDescTime == "desc"){
            this.ascOrDescTime = "asc"
          }else {
            this.ascOrDescTime = "desc"
          }
        })
    },
    getForumByReply() {
      this.$axios({
        // 默认请求方式为get
        method: 'post',
        url:"/forum/getForumByReply",
        responseType: 'json',
        params:{ascOrDesc:this.ascOrDescReply},
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
          this.forumList =  response.data.data
          if(this.ascOrDescReply == "desc"){
            this.ascOrDescReply = "asc"
          }else {
            this.ascOrDescReply = "desc"
          }
        })
    },
    updateDes(newDes){
      this.detailList.des = newDes;
      this.$axios({
        // 默认请求方式为get
        method: 'post',
        url:"/user/updateDes",
        responseType: 'json',
        params:{token:localStorage.getItem("token"),des:newDes},
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
    }
  },
  mounted() {
    document.getElementById('select').style.display='none';
    this.getMyForum()
    this.getAllForum()
    this.getUserDetail()
  },
  components: {
    Header,
    Float,
  },
};
</script>

<style>
@import '../views/views_css/User.css';
@import '../views/views_css/main.css';
@import '../views/views_css/Forum.css';
</style>
