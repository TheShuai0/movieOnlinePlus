<template>
  <div class="home">
    <div>
      <div class="containerall">
        <div class="containerimg"></div>
        <div class="container">
          <div style="margin-top: 27px;">
            <h1 style="margin-left: 32%">狗眼电影</h1>
            <div>
              <i class="iconfont icon-wode"style="margin-left: 5%;font-size: 22px;border: none;">&#xe64a;</i>
              <el-input class="el_input" v-model="input_username" placeholder="请输入账号" clearable
                        style="width: 69%;padding-left: 1px;"></el-input>
            </div>
            <div>
              <i class="iconfont icon-suo"style="margin-left: 5%;font-size: 22px;border: none;">&#xe64a;</i>
              <el-input class="el_input" v-model="input_password" placeholder="请输入密码" show-password
                        style="width: 69%;padding-left: 1px;" type="password"></el-input>
            </div>
            <div style="display: flex">
            <i class="iconfont icon-quanbu"style="margin-left: 5%;font-size: 22px;border: none;margin-top: 6%;">&#xe64a;</i>
              <div >
            <el-select v-model="value" placeholder="请选择" @change="selectProductType"style="margin:20px 140px 0 0;width: 86%; padding-left: 1px;">
              <el-option v-for="item in options" :key="item.value" :label="item.label"
                :value="{ label: item.value, value: item.label }">
              </el-option>
            </el-select>
              </div>
            </div>
            <div class="btn_1" style="display: flex;">
              <Vcode :show="isShow" @success="success" @close="close" />
              <div class="h-button submit" @click="submit">登录</div>
              <div class="h-button submit" @click="register">注册</div>
              <div class="h-button submit" @click="register">游客登录</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div style="width: 100%;">
      <div class="container1" style="display: none;">
        <div class="square" style="--d: 1"></div>
        <div class="square" style="--d: 2"></div>
        <div class="square" style="--d: 3"></div>
        <div class="square" style="--d: 4"></div>
        <div class="square" style="--d: 5"></div>
        <div class="square" style="--d: 6"></div>
        <div class="square" style="--d: 7"></div>
        <div class="square" style="--d: 8"></div>
        <div class="square" style="--d: 9"></div>
      </div>
    </div>
</div>
</template>
<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import Vcode from "vue-puzzle-vcode";
import md5 from 'js-md5';
import $ from 'jquery'
import localCookie from "@/lib/localCookie";
export default {
  name: 'HomeView',
  data() {
    return {
      tokenMd5:'',
      isShow: false,
      input_username: '',
      input_password: '',
      options: [{
        value: '选项1',
        label: '管理员'
      }, {
        value: '选项2',
        label: '用户'
      }],
      value: ''
    }
  },
  methods: {
    selectProductType(data) {
      // 将data对象解构
      const { value, label } = data;
      this.label = label;
      this.value = value;
    },
    register(){
      this.$router.push('/register')
    },
    submit() {
      if(this.input_username === ''||this.input_password === ''){
        this.$alert('账号或密码未输入', '登录提示', {
          confirmButtonText: '确定',
        })
      }else {
        this.isShow = true;
      }
    },
    // 用户通过了验证开始登录校验
    success(msg) {
      console.log(this.value+this.input_username+this.input_password)
      this.isShow = false; // 通过验证后，隐藏模态框
      this.$axios({
        // 默认请求方式为get
        method: 'post',
        url:"/local/login",
        params:{
          userName: this.input_username,
          password: this.input_password,
          userRole: this.value,
        },
        responseType: 'json'
      }).then(
        (response) => {
          if (response.data.success == true) {
            console.log("token:"+response.data.data)
            localStorage.setItem("token",response.data.data)
            $(".container1").css("display", "");
            $("body").css("background", "#222");
            $(".containerall").css("display", "none");
            this.$router.push('/Index')
          }else  if(response.data.success == false){
            this.$alert('账号或密码错误', '登录提示', {
              confirmButtonText: '确定',
            })
          }else if (response.code === "1101") {
            console.log(response); // 用户已过期
            alert(response.msg)
            localStorage.removeItem("token")
          }
        }
      )
    },
    // 用户点击遮罩层，应该关闭模态框
    close() {
      this.isShow = false;
    },

  },
  components: {
    Vcode,
    HelloWorld,
  }
}
// 蜘蛛网效果
!function () {
  function n(n, e, t) {
    return n.getAttribute(e) || t
  }

  function e(n) {
    return document.getElementsByTagName(n)
  }

  function t() {
    var t = e("script"), o = t.length, i = t[o - 1];
    return { l: o, z: n(i, "zIndex", -1), o: n(i, "opacity", .5), c: n(i, "color", "0,0,0"), n: n(i, "count", 99) }
  }

  function o() {
    a = m.width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth, c = m.height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
  }

  function i() {
    r.clearRect(0, 0, a, c);
    var n, e, t, o, m, l;
    s.forEach(function (i, x) {
      for (i.x += i.xa, i.y += i.ya, i.xa *= i.x > a || i.x < 0 ? -1 : 1, i.ya *= i.y > c || i.y < 0 ? -1 : 1, r.fillRect(i.x - .5, i.y - .5, 1, 1), e = x + 1; e < u.length; e++) n = u[e], null !== n.x && null !== n.y && (o = i.x - n.x, m = i.y - n.y, l = o * o + m * m, l < n.max && (n === y && l >= n.max / 2 && (i.x -= .03 * o, i.y -= .03 * m), t = (n.max - l) / n.max, r.beginPath(), r.lineWidth = t / 2, r.strokeStyle = "rgba(" + d.c + "," + (t + .2) + ")", r.moveTo(i.x, i.y), r.lineTo(n.x, n.y), r.stroke()))
    }), x(i)
  }

  var a, c, u, m = document.createElement("canvas"), d = t(), l = "c_n" + d.l, r = m.getContext("2d"),
    x = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (n) {
      window.setTimeout(n, 1e3 / 45)
    }, w = Math.random, y = { x: null, y: null, max: 2e4 };
  m.id = l, m.style.cssText = "position:fixed;top:0;left:0;z-index:" + d.z + ";opacity:" + d.o, e("body")[0].appendChild(m), o(), window.onresize = o, window.onmousemove = function (n) {
    n = n || window.event, y.x = n.clientX, y.y = n.clientY
  }, window.onmouseout = function () {
    y.x = null, y.y = null
  };
  for (var s = [], f = 0; d.n > f; f++) {
    var h = w() * a, g = w() * c, v = 2 * w() - 1, p = 2 * w() - 1;
    s.push({ x: h, y: g, xa: v, ya: p, max: 6e3 })
  }
  u = s.concat([y]), setTimeout(function () {
    i()
  }, 100)
}();
</script>
<style >
@import '../views/views_css/btn_1.css';

body {
  background-image: url(../assets/groundback.jpg)!important;
  background-size: 100% 100%;
  background-position: center;
  background-attachment: fixed;
  background-repeat: no-repeat;
}

.containerall {
  width: 1000px;
  height: 400px;
  display: flex;
  position: absolute;
  left: 20%;
  top: 18%;
}

.containerimg {
  width: 620px;
  background-image: url("../../public/login1.jpg");
  background-repeat: no-repeat;
  opacity: 0.7;
  border-radius: 8px 0 0 8px;
  background-size: 100% 100%;
}

.container {
  width: 450px;
  height: 400px;
  background: rgba(245, 130, 233, 0.5);
  border-radius: 0 8px 8px 0;
  float: right;
  color: #FFFFFF;
}

.el_input {
  margin-top: 20px;
  border-radius: 18px !important;
}

.el_button {
  margin-top: 20px !important;
  border-radius: 8px !important;
}

.btn_1 {
  width: 483px;
  padding-right: 96px;
  margin-top: 7px;
  margin-left: 5%;
}
</style>
