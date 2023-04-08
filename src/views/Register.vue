<template>
  <div class="home">
    <div>
      <el-container class="login">
        <el-header>
          <div style="width:100%;height:60px;
        position: fixed !important;top: 0px;left: 0px;">
            <el-page-header
              @back="back"
              content="注册页面"
            >
            </el-page-header>
          </div>
        </el-header>
      </el-container>
      <div class="containerall">
        <div class="containerimg"></div>
        <div class="container">
          <div>
            <h1 style="margin-left: 22%;height: 30px;">创建一个新账户</h1>
            <div>
              <i class="iconfont icon-wode"style="margin-left: 5%;font-size: 22px;border: none;">&#xe64a;</i>
              <el-input class="el_input" v-model="input_username" placeholder="请输入账号" clearable
                      style="width: 69%;padding-left: 1px;"></el-input>
              <el-tooltip
                effect="light"
                placement="right"
              >
                <template #content> 用户名只能包含数字与英文<br />长度在 8 - 16 字之间<br />不可包含特殊符号</template>
                <i class="iconfont icon-wenhao"style="margin-left: 5%;font-size: 22px;border: none;">&#xe64a;</i>
              </el-tooltip>
            </div>
            <div>
              <i class="iconfont icon-suo"style="margin-left: 5%;font-size: 22px;border: none;">&#xe64a;</i>
              <el-input class="el_input" v-model="input_password" placeholder="请输入密码" show-password
                      style="width: 69%;padding-left: 1px;" type="password"></el-input>
              <el-tooltip
                effect="light"
                placement="right"
              >
                <template #content> 密码只能包含数字与英文<br />长度在 8 - 16 字之间<br />特殊符号只可用 @ _ </template>
                <i class="iconfont icon-wenhao"style="margin-left: 5%;font-size: 22px;border: none;">&#xe64a;</i>
              </el-tooltip>
            </div>
            <div>
              <i class="iconfont icon-suo"style="margin-left: 5%;font-size: 22px;border: none;">&#xe64a;</i>
              <el-input class="el_input" v-model="input_password_again" placeholder="请再次输入密码" show-password
                      style="width: 69%;padding-left: 1px;" type="password"></el-input>
            </div>
            <div>
              <i class="iconfont icon-dianhua"style="margin-left: 5%;font-size: 22px;border: none;">&#xe64a;</i>
              <el-input class="el_input" v-model="input_phoneNumber" placeholder="请输入电话号码" clearable
                      style="width: 69%;padding-left: 1px;" ></el-input>
            </div>
            <div class="btn_1" style="display: flex;">
              <div class="h-button submit" @click="Register" style="margin-left: 40%">注册</div>
              <!--              <div class="h-button submit" @click="back">返回</div>-->
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
import $ from 'jquery'
export default {
  name: 'HomeView',
  data() {
    return {
      input_username: '',
      input_password: '',
      input_password_again: '',
      input_phoneNumber: ''
    }
  },
  methods: {
    hasUserName(str) {
    return /[^a-zA-Z0-9]/.test(str);
    },
    hasPassword(str) {
      return /[^a-zA-Z0-9@_]/.test(str);
    },
    checkLogin(input_username,input_password,input_password_again,input_phoneNumber){
      if (input_username == '' || input_password == '' || input_password_again == '') {
        return '账号或密码不可为空'
      }else if(this.hasUserName(input_username)){
        return '账号不可包含特殊字符'
      }else if (input_username.length<8||input_username.length>16
        ||input_password.length<8||input_password.length>16){
        return '账号与密码长度应在8-16字之间'
      }else if(input_password != input_password_again){
        return '两次输入的密码不一致'
      }else if(this.hasPassword(input_password)||this.hasPassword(input_password_again)){
        return '密码不可包含除 @ _ 以外的特殊字符'
      }else if (input_phoneNumber.length != 11) {
        return '手机号填写错误'
      }else {
        return '校验通过'
      }
    },
    Register() {
      console.log()
    const checkStr = this.checkLogin(this.input_username,this.input_password,this.input_password_again,this.input_phoneNumber)
        if (checkStr != '校验通过'){
          this.$alert(checkStr, '注册提示', {
            confirmButtonText: '确定',
          })
        }else {
          if (this.input_phoneNumber.length)
            this.$axios({
              // 默认请求方式为get
              method: 'post',
              url: "/local/register",
              params: {
                userName: this.input_username,
                password: this.input_password,
                phoneNumber: this.input_phoneNumber,
              },
              responseType: 'json'
            }).then(
              (response) => {
                if (response.data.success == true) {
                  this.$alert('注册成功', '注册提示', {
                    confirmButtonText: '确定',
                  })
                  this.$router.push('/login')
                }else if (response.data.success == true){
                  this.$alert('该用户名已被使用', '注册提示', {
                    confirmButtonText: '确定',
                  })
                }
              }).catch((response) => {
              console.log(9999)
            })
        }
    },
    back() {
      this.$router.push('/login')
    },
  },
  components: {
    HelloWorld,
  },
  mounted() {
  },
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
    return {l: o, z: n(i, "zIndex", -1), o: n(i, "opacity", .5), c: n(i, "color", "0,0,0"), n: n(i, "count", 99)}
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
    }, w = Math.random, y = {x: null, y: null, max: 2e4};
  m.id = l, m.style.cssText = "position:fixed;top:0;left:0;z-index:" + d.z + ";opacity:" + d.o, e("body")[0].appendChild(m), o(), window.onresize = o, window.onmousemove = function (n) {
    n = n || window.event, y.x = n.clientX, y.y = n.clientY
  }, window.onmouseout = function () {
    y.x = null, y.y = null
  };
  for (var s = [], f = 0; d.n > f; f++) {
    var h = w() * a, g = w() * c, v = 2 * w() - 1, p = 2 * w() - 1;
    s.push({x: h, y: g, xa: v, ya: p, max: 6e3})
  }
  u = s.concat([y]), setTimeout(function () {
    i()
  }, 100)
}();


</script>
<style >
@import '../views/views_css/btn_1.css';

.login .el-page-header {
  color: white;
  line-height: 60px;
  margin-left: 20px;
}

.login .el-page-header__content {
  color: white;
}


.body {
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
  width: 500px;
  padding-right: 105px;
  margin-top: 7px;
}
</style>
