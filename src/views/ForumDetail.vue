<template>
  <div style="overflow: hidden;">
    <Header></Header>
    <div class="QuestionHeader">
      <div id = "big" class="QuestionHeader-content" style="height: 150px;">

        <div class="QuestionHeader-main">

          <div class="grid-content bg-purple-dark" style="font-weight: 600;">
            {{forumUser.NAME}}:
          </div>
          <h1 class="QuestionHeader-title">简介：{{forumUser.FORUM_NAME}}</h1>
          <div class="css-4cffwv">
            <div class="LabelContainer-wrapper"></div>
          </div>
          <div>
                <div><span itemprop="text" style="white-space:unset">{{forumUser.FORUM_DES}}</span>
                    <span id="content" itemprop="text" style="white-space:unset;display: none;margin-top: 50px;font-size: 20px;">
                    内容：{{forumUser.FORUM_CONTENT}}
                  </span>
                  <button type="button"
                          @click="showMore()"
                          class="Button QuestionRichText-more FEfUrdfMIKpQDJDqkjte Button--plain fEPKGkUK5jyc4fUuT0QP">
                    <div id="showOrNo">显示全部</div> </button>
                </div>
          </div>
        </div>
      </div>
      <div class="QuestionHeader-footer">
        <div class="QuestionHeader-footer-inner">
          <div class="QuestionHeader-main QuestionHeader-footer-main">
            <div class="QuestionButtonGroup">
              <button @click="showAdd(forumUser.USER_ID,forumUser.NAME)" type="button"
                      class="Button FollowButton FEfUrdfMIKpQDJDqkjte Button--primary Button--blue epMJl0lFQuYbC7jrwr_o JmYzaky7MEPMFcJDLNMG">
                回复
              </button>
            </div>
            <div class="QuestionHeaderActions">
              <el-tooltip v-if="this.forumUser.status == '1'" content="取消" placement="bottom">
                <img style="height: 47px;float: right;margin-top: -15px;margin-bottom: -10px;cursor: pointer;margin-right: 20px"
                     :src="require('@/assets/icon/点赞 .png')" @click="isGood(forumUser.ID)">
              </el-tooltip>
              <el-tooltip v-else status="0" content="点赞" placement="bottom">
                <img  style="height: 47px;float: right;margin-top: -15px;margin-bottom: -10px;cursor: pointer;margin-right: 20px"
                      :src="require('@/assets/icon/取消点赞.png')" @click="isGood(forumUser.ID)">
              </el-tooltip>
              <div class="GoodQuestionAction">
                <button type="button"
                        class="Button GoodQuestionAction-commonBtn FEfUrdfMIKpQDJDqkjte Button--plain Button--withIcon Button--withLabel fEPKGkUK5jyc4fUuT0QP B46v1Ak6Gj5sL2JTS4PY RuuQ6TOh2cRzJr6WlyQp">
                  点赞数：{{forumUser.GOOD}}
                </button>
              </div>
              <div class="QuestionHeader-Comment">
                <button type="button"
                        class="Button FEfUrdfMIKpQDJDqkjte Button--plain Button--withIcon Button--withLabel fEPKGkUK5jyc4fUuT0QP B46v1Ak6Gj5sL2JTS4PY RuuQ6TOh2cRzJr6WlyQp">
                  回复数： {{forumUser.REPLY_NUMBER}}条评论
                </button>
              </div>
            </div>
            <div class="QuestionHeader-actions"></div>
          </div>
        </div>
      </div>
    </div>
<!-- 弹出框 -->
    <div v-if="showForm" style="border-radius:20px;height: 300px;width: 520px;background-color: white;position: absolute;top: 50%;left: 50%;transform: translate(-50%, -50%);z-index: 9999;border: 0px solid black; box-shadow: 2px 2px 5px grey;">
      <el-button  style="border:unset;float: right;font-size: 20px;width:unset " icon="el-icon-circle-close" circle @click="closeAdd()"></el-button>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" style="padding: 20px">
        <div style="margin-left: -20px">
          <el-col :span="24" style=" margin-left: 20px;height: 29px;font-weight: 600;">
            <div class="grid-content bg-purple-dark" >
              回复： {{this.reply_user_name}}
            </div>
          </el-col>
          <el-form-item label="" prop="name">

          </el-form-item>
          <!--<el-form-item style="height: 100px" label="简介" prop="desc">

          </el-form-item>-->
          <el-form-item label="内容" prop="desc">
            <el-input
              type="textarea"
              :autosize="{ minRows: 5, maxRows: 5}"
              placeholder="请输入回复内容"
              v-model="ruleForm.content">
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="addReply()" style="margin-left: 114px;width: 100px;margin-right: 20px;">立即创建</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
        </div>
      </el-form>
    </div>
<!--  主体  -->
    <div class="person_body_right" style="overflow-y: hidden;margin-left: 100px;width: 1329px;margin-top: 13px;">
      <el-menu :default-active="activeIndex" class="dhl header" mode="horizontal"  style="height: 60px;">
        <el-menu-item index="1" style="margin-left: 3%;" @click="getForumReplyByTime(forumUser.ID)">按热度</el-menu-item>
        <el-menu-item index="2" @click="getForumReplyByReply(forumUser.ID)">按时间</el-menu-item>
        <el-menu-item index="3" @click="getForumReply(forumUser.ID)">全部</el-menu-item>
        <div class="jsx-1273643155 search-box show-suggestion" style="width: 321px;height: 39px;margin-left: 11%">
          <input type="text" placeholder="寻找相关回复"
                 class="jsx-1273643155 search-field" style="width: 240px;" value="" v-model="searchForum">
          <div class="jsx-1273643155 search-button"><span class="jsx-1273643155 iconfont icon-search"
                                                          @click="selectForum(searchForum)">
            <i class="iconfont icon-sousuo">&#xe64a;</i></span>
          </div>
        </div>
      </el-menu>
      <ul class="infinite-list" v-infinite-scroll="load" style="overflow:auto;height: 800px;">
        <li v-for="(reply, index) in replyForum" class="Card TopstoryItem TopstoryItem-isRecommend" :key="index"
            style="border-radius:14px;margin: 11px;height: 175px;background-color: rgba(197,237,236,0.18);">
          <el-row>
            <el-col :span="6">
            </el-col>
          </el-row>
          <el-row >
            <el-col :span="24" style="height: 29px;font-weight: 800;">
              <div class="grid-content bg-purple-dark" >
                {{reply.REPLY_USER_NAME}} 回复： {{reply.TOPIC_USER_NAME}}
            </div>
            </el-col>
          </el-row>
          <el-row style="height: 93px;">
            <el-col :span="24" >
              <div class="grid-content bg-purple-dark">
                &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp{{reply.CONTENT}}
            </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="22" justify="right">
              <div class="grid-content bg-purple-dark">
                <div style="font-size: 3px;color: #f04f4f;">
                  发布时间：{{formatDateTime(reply.INSERT_TIME)}}
                </div>
              </div>
            </el-col>
            <el-col :span="2">
              <div class="grid-content bg-purple-dark">
                <button @click="showAdd(reply.TOPIC_USER_ID,reply.TOPIC_USER_NAME)" type="button" class="Button FollowButton FEfUrdfMIKpQDJDqkjte Button&#45;&#45;primary Button&#45;&#45;blue epMJl0lFQuYbC7jrwr_o JmYzaky7MEPMFcJDLNMG">
                  回复
                </button>
            </div>
            </el-col>
          </el-row>

        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import {throttle} from '../lib/utils'
import MovieShow from './MovieShow.vue';
import Header from './Header.vue';
import Float from './Float.vue'
import $ from "jquery";
import {rules} from "../../.eslintrc";

export default {
  name: 'forumDetail',
  computed: {
    rules() {
      return rules
    }
  },
  data() {
    return {
      judgeTime:true,
      judgeNumber:true,
      activeIndex: '3',
      searchForum: '',
      reply_user_id:5,
      reply_user_name:'大大',
      showForm:false,
      ruleForm: {
        name: '',
        content: '',
        des: '',
      },
      displayedreplyForum: [],
      loading: false,
      page: 1,
      pageSize: 10,
      forumUser:{
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
        GOOD:55,
        NAME:"小刚",
        USER_IMG:"img_4.png",
        status:0
      },
      count: 0,
      replyForum:[{
        ID : 1,
        REPLY_USER_ID: 1,
        TOPIC_USER_ID:1,
        FORUM_ID:2,
        INSERT_TIME: "2023-04-11 02:04:03",
        CONTENT: "电影以治愈的方式展现了生命的意义和亲情的重要性，赢得了观众的赞誉。作为一部温情治愈的电影，" +
          "《九儿》打动了我的心。这部电影讲述了一个女孩和她爷爷之间的故事，其中充满了亲情、友情和爱情。在电影中，我们可以看到女" +
          "孩的坚强和爷爷的慈爱，他们之间的感情非常真挚和动人。此外，电影中的音乐和画面也非常出色，让人感受到了浓厚的乡村气息和家" +
          "庭温暖。总的来说，这是一部非常值得一看的电影，它让我明白了生命的意义和亲情的重要性，也让我感到了温暖和治愈。",
        GOOD: 2,
        REPLY_USER_NAME:"大壮",
        TOPIC_USER_NAME:"小美"
      }],
}},
  methods:{
    formatDateTime(datetimeStr) {
      const datetime = new Date(datetimeStr);
      const formattedDatetime = `${datetime.getFullYear()}-${padZero(datetime.getMonth() + 1)}-${padZero(datetime.getDate())} ${padZero(datetime.getHours())}:${padZero(datetime.getMinutes())}:${padZero(datetime.getSeconds())}`;
      return formattedDatetime;
      function padZero(num) {
        return num.toString().padStart(2, '0');
      }
    },
    getForumReplyByTime(forumId){
      this.$axios({
        // 默认请求方式为get
        method: 'post',
        url:"/forum/getForumReplyByTime",
        responseType: 'json',
        params:{forumId:forumId,judgeTime:this.judgeTime},
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
          this.replyForum =  response.data.data
          this.judgeTime=!this.judgeTime
        })
    },
    getForumReplyByReply(forumId){
      this.$axios({
        // 默认请求方式为get
        method: 'post',
        url:"/forum/getForumReplyByReply",
        responseType: 'json',
        params:{forumId:forumId,judgeNumber:this.judgeNumber},
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
          this.judgeNumber=!this.judgeNumber
          this.replyForum =  response.data.data
        })
    },
    selectForum(searchForum){
      this.$axios({
        // 默认请求方式为get
        method: 'post',
        url:"/forum/searchForumReply",
        responseType: 'json',
        params:{forumId:this.forumUser.ID,searchForum:searchForum},
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
          this.replyForum =  response.data.data
        })
    },
    closeAdd(){
      this.showForm = false;
    },
    showAdd(topic_id,topic_name){
      this.showForm = true;
      this.reply_user_id = topic_id
      this.reply_user_name = topic_name
    },
    addReply() {
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
        url:"/forum/addReply",
        responseType: 'json',
        params:{'forumId':this.forumUser.ID,'topicId':this.reply_user_id,'content':this.ruleForm.content,'token':localStorage.getItem("token")},
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
        message: '回复成功',
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
    showMore(){
      let showOrNoDiv = document.getElementById("showOrNo");
        if (showOrNoDiv.innerHTML === "显示全部") {
          document.querySelector('#big').style.height='400px'
          document.querySelector('#content').style.display='block'
          showOrNoDiv.innerHTML = "收起";
          $('#content').style.display = "block"
        } else {
          showOrNoDiv.innerHTML = "显示全部";
          document.querySelector('#big').style.height='150px'
          document.querySelector('#content').style.display='none'
        }
    },
    //动态加载
    loadMore() {
      this.loading = true;
      setTimeout(() => {
        this.page++;
        this.displayedreplyForum = this.replyForum.slice(0, this.page * this.pageSize);
        this.loading = false;
      }, 200);
    },
    getImageUrl(user_img) {
      return require(`@/assets/user_img/${user_img}`)
    },
    isGood(forumId){
      this.$axios({
        // 默认请求方式为get
        method: 'post',
        url:"/forum/addOrReduce",
        responseType: 'json',
        params:{'status':this.forumUser.status,'forumId':forumId,'token':localStorage.getItem("token")},
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
    },
    getForumReply(forumId){
      this.$axios({
        // 默认请求方式为get
        method: 'post',
        url:"/forum/getForumReply",
        responseType: 'json',
        params:{forumId:forumId},
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
          this.replyForum =  response.data.data
        })
    },
    getForumUser(forumId){
      this.$axios({
        // 默认请求方式为get
        method: 'post',
        url:"/forum/getForumUser",
        responseType: 'json',
        params:{forumId:forumId,'token':localStorage.getItem("token")},
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
          this.forumUser =  response.data.data
        })
    },
  },
  mounted() {
    this.getForumReply(localStorage.getItem("forumId"))
    this.getForumUser(localStorage.getItem("forumId"))
    this.loadMore();
    window.addEventListener('scroll', () => {
      if (
        window.innerHeight + window.pageYOffset >= document.body.offsetHeight - 500 &&
        !this.loading &&
        this.displayedreplyForum.length < this.replyForum.length
      ) {
        this.loadMore();
      }
    });
  },
  components: {
    Header,
    Float
  },
}
</script>

<style>
@import '../views/views_css/ForumDetail.css';
</style>
