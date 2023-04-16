<template>
  <div style="font-family:'Microsoft YaHei';">
    <Header></Header>
    <Float></Float>
    <div class="PersonTop">
      <div class="PersonTop_img">
        <img  :src="getImageUrl(detailList.pic_name)" @click="dialogTable = true">
      </div>
      <div class="PersonTop_text">
        <div class="user_text">
          <div class="user_name">
            <span> {{ detailList.name }} </span>
          </div>
          <div class="user_qianming" >
            <span> {{ detailList.des }}</span>
          </div>
          <div class="user_anniu">
            <el-button
              class="el-icon-edit"
              style="padding: 7px 10px;
              font-size: 11px;"
              type="primary"
              size="medium"
              plain
              @click="edit"
            >编辑</el-button
            >
          </div>
        </div>
        <div class="user_num" @click="changeInfo">
          <div style="cursor: pointer" >
            <span class="num_text">年龄</span>
            <div class="num_number">{{ detailList.age }}</div>
          </div>
          <div>
            <span class="num_text">邮箱</span>
            <div class="num_number">{{ detailList.email }}</div>
          </div>
          <div>
            <span class="num_text">手机</span>
            <div class="num_number">{{ detailList.phone }}</div>

          </div>
        </div>
      </div>
    </div>
    <el-dialog title="更换头像" :visible.sync="dialogTable">
      <el-upload
        class="avatar-uploader"
        action="/movie/user/updatePic"
        :show-file-list="false"
        :auto-upload="false"
        ref="upload"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload"
        :on-change="changeAvatar"
        >
        <img v-if="imageUrl" :src="imageUrl" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
      <button @click="uploadAvatar">上传头像</button>
    </el-dialog>
    <div class="person_body" style="margin-top: 186px;">
      <div class="person_body_left">
        <el-card class="box-card" :body-style="{ padding: '0px' }">
          <div slot="header" class="clearfix">
            <span class="person_body_list" style="border-bottom: none"
            >个人中心-我的主题帖</span>
          </div>
          <ul class="infinite-list"  style="overflow:auto;height: 378px;">
            <li v-for="(forum, index) in myForumList" class="infinite-list-item" :key="index"
                style="cursor: pointer;border-radius:17px;background-color: rgb(146 246 211 / 40%);margin: 7px;height: 58px" @click="goTOdetail(forum.ID)">
              <div class="forum-container">
                <div class="forum-name " style="margin-left: 10px;width: 130px">{{forum.FORUM_NAME}}</div>
                <div class="forum-name  v " style="margin-left: 20px;width: 74px">讨论数：{{forum.REPLY_NUMBER}}</div>
              </div>
            </li>
          </ul>
        </el-card>
      </div>
      <div class="person_body_right" style="height: 450px;">
        <div slot="header" class="clearfix" style="margin-left: 37%;margin-top: 13px;">
            <span class="person_body_list" style="border-bottom: none"
            >历史观影记录</span>
        </div>
        <div class=""style="height: 390px;overflow-y: auto;margin-top: 5px">
          <el-col :span="4" v-for="(movie, index) in historyMovies" :key="index" style="height: 152px;">
            <div class="movie" @click="goToDetailPage(movie.movieId)" style="cursor: pointer;">
              <img :src="getImageUrl2(movie.pic_url)" alt="Movie poster" class="movie-poster">
              <div class="movie-name">{{ movie.movieName }}</div>
            </div>
          </el-col>
        </div>
      </div>
    </div>

    <div v-if="showForm" style="border-radius:20px;height: 323px;width: 520px;background-color: white;position: absolute;top: 50%;left: 50%;transform: translate(-50%, -50%);z-index: 9999;border: 0px solid black; box-shadow: 2px 2px 5px grey;">
      <el-button  style="border:unset;float: right;font-size: 20px;width:unset " icon="el-icon-circle-close" circle @click="closeAdd()"></el-button>
      <el-form :model="ruleForm"  ref="ruleForm" label-width="100px" class="demo-ruleForm" style="padding: 20px">
        <div style="margin-left: -20px">
          <el-form-item label="年龄" prop="age" style="margin-top: 27px;">
            <el-input
              type="textarea"
              autosize
              maxlength="2"
              placeholder="请输入年龄"
              v-model="ruleForm.age">
            </el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input
              type="textarea"
              autosize
              placeholder="请输入邮箱"
              v-model="ruleForm.email">
            </el-input>
          </el-form-item>
          <el-form-item label="手机" prop="phone">
            <el-input
              type="textarea"
              autosize
              maxlength="11"
              placeholder="请输入手机号"
              v-model="ruleForm.phone">
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="addForum(detailList.id)" style="margin-left: 114px;width: 100px;margin-right: 20px;">保存修改</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
        </div>
      </el-form>
    </div>

  </div>
</template>

<script>

import Header from './Header.vue';
import Float from "@/views/Float.vue";
import axios from "axios";
import Cookies from "js-cookie";

export default {
  name: "userDetail",
  data() {
    return {
      historyMovies: [
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
      formData: {
        token:'',
        avatar: '',
      },
      imgtoken:localStorage.getItem("token"),
      toheaders:{},
      showForm:false,
      ruleForm:{},
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
        REPLY_NUMBER: "2"
      }],
      imageUrl: '',
      file: null,
      dialogTable:false,
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
        user_role:""
      }
    };
  },

  methods: {
    changeAvatar(file){
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    goToDetailPage(movieId){
      Cookies.set('movieId', movieId, { expires: 0.02 })
      this.$router.push('/movieDetail')
    },
    submitForm() {
      let formData2 = new FormData()
      formData2.append('token', localStorage.getItem("token"))
      formData2.append('avatar', this.formData.avatar)
      console.log(formData2)
      this.$axios({
        // 默认请求方式为get
        method: 'post',
        url:"/user/updatePic",
        data:formData2,
        responseType: 'json',
        headers: {
          'Content-Type': "multipart/form-data",
          'token': localStorage.getItem("token")
        },
      }).then(
        (response) => {
          if(response.data.code === "1101"){
            alert(response.data.msg)
            localStorage.removeItem("token")
          }
          this.showForm = false;
          this.$message({
            showClose: true,
            message: '修改成功',
            type: 'success'
          });
          this.getUserDetail()
        })
    },
    changeInfo(){
      this.showForm=true
    },
    closeAdd(){
      this.showForm = false;
    },
    addForum(userId) {
      function validatePhoneNumber(phoneNumber) {
        var regex = /^1[0-9]{10}$/;
        return regex.test(phoneNumber);
      }

      function validateEmail(email) {
        var regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return regex.test(email);
      }
      if(this.ruleForm.age==null||this.ruleForm.age=='') {
        this.$message({
          showClose: true,
          message: '年龄不能为空',
          type: 'error'
        });
        return false;
      }
      if(!(this.ruleForm.age<150&&this.ruleForm.age>=0)) {
        this.$message({
          showClose: true,
          message: '年龄只能是数字',
          type: 'error'
        });
        return false;
      }
        if (!validateEmail(this.ruleForm.email)) {
          this.$message({
            showClose: true,
            message: '邮箱不合法',
            type: 'error'
          });
          return false;
        }
        if (!validatePhoneNumber(this.ruleForm.phone)) {
          this.$message({
            showClose: true,
            message: '电话号码不合法',
            type: 'error'
          });
          return false
        }

      this.$axios({
        // 默认请求方式为get
        method: 'post',
        url:"/user/changeUserInfo",
        params:{userId:userId,age:this.ruleForm.age,email:this.ruleForm.email,phone:this.ruleForm.phone},
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
          this.showForm = false;
          this.$message({
            showClose: true,
            message: '修改成功',
            type: 'success'
          });
          this.getUserDetail()
        })

      },
    resetForm(formName){
      this.$refs[formName].resetFields(); // 重置表单
      this.ruleForm.age = '';
      this.ruleForm.email = '';
      this.ruleForm.phone = '';
    },
    goTOdetail(forumId){
      localStorage.setItem("forumId",forumId)
      this.$router.push('/forumDetail')
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
    uploadAvatar() {
        this.$refs.upload.submit();
    },
    handleAvatarSuccess(res, file) {
      this.$message({
        type: 'success',
        message: '头像更改成功',
      })
      this.getUserDetail
    },
    beforeAvatarUpload(file) {
      const imgType = file.type ;
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (imgType != "image/jpeg"&&imgType != "image/jpg"&&imgType != "image/png"&&imgType != "image/gif") {
        this.$message.error('上传头像图片只能是 JPEG,JPG,PNG,GIF 格式!');
        return false
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
        return false
      }
      return true
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
          this.ruleForm={
            age:this.detailList.age,
            phone:this.detailList.phone,
            email:this.detailList.email
          }
        })
    },
    edit() {
      this.$prompt('请输入签名', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(({ value }) => {
        this.updateDes(value);
        this.$message({
          type: 'success',
          message: '签名更改成功',
        })
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
    },
    getImageUrl2(pic_url) {
      return require(`@/assets/images/${pic_url}`)
    },
    getMovieHistory(){
      this.$axios({
        // 默认请求方式为get
        method: 'post',
        url:"/user/getMovieHistory",
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
          this.historyMovies = response.data.data;
        })
    },
  },
  mounted() {
    this.getMovieHistory();
    this.getMyForum()
    this.getUserDetail()
    document.getElementById('select').style.display='none';

  },
  components: {
    Header,
    Float,
  },
};
</script>

<style>
@import '../views/views_css/User.css';
</style>
