<template>
  <div>
    <Header></Header>
    <div class="PersonTop">
      <div class="PersonTop_img">
        <img  :src="getImageUrl(detailList.pic_name)" />
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
        <div class="user_num">
          <div style="cursor: pointer" @click="myfan">
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
    <div class="person_body">
      <div class="person_body_left">
        <el-card class="box-card" :body-style="{ padding: '0px' }">
          <div slot="header" class="clearfix">
            <span class="person_body_list" style="border-bottom: none"
            >个人中心</span
            >
          </div>
        </el-card>
      </div>
      <div class="person_body_right" style="height: 500px;">

      </div>
    </div>

  </div>
</template>

<script>

import Header from './Header.vue';

export default {
  name: "userDetail",
  data() {
    return {
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
    myfan() {

    },
    edit() {
    },
  },
  mounted() {
    this.getUserDetail()
  },
  components: {
    Header,
  },
};
</script>

<style>
@import '../views/views_css/User.css';
</style>
