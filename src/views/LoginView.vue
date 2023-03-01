<template>
  <div class="home">
    <div>
      <div class="containerall">
        <div class="containerimg"></div>
        <div class="container">
          <div style="margin-top: 27px;">
            <h1>电影</h1>
            <el-input class="el_input" v-model="input_username" placeholder="请输入账号" style="width: 80%;"></el-input>
            <el-input class="el_input" v-model="input_password" placeholder="请输入密码" style="width: 80%;" type="password"></el-input>
<!--            <div class="yanzhengma">
              <el-input class="el_input" v-model="input_card" placeholder="请输入验证码" style="width: 59%;"></el-input>
              <img src="/api/numCode" class="codeImage" @click="changecode()" />
            </div>-->
            <el-select v-model="value" placeholder="请选择" @change="selectProductType"
              style="margin:20px 140px 0 0;width: 406px; padding-left: 45px;">
              <el-option v-for="item in options" :key="item.value" :label="item.label"
                :value="{ label: item.value, value: item.label }">
              </el-option>
            </el-select>
            <div class="btn_1" style="display: flex;">
              <Vcode :show="isShow" @success="success" @close="close" />
              <div class="h-button submit" @click="submit">登录</div>
              <div class="h-button submit">注册</div>
              <div class="h-button submit">游客登录</div>
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
import axios from 'axios'
import $ from 'jquery'
export default {
  name: 'HomeView',
  data() {
    return {
      isShow: false,
      input_username: '',
      input_password: '',
      input_card: '',
      options: [{
        value: '选项1',
        label: '管理员(后台管理员)'
      }, {
        value: '选项2',
        label: '拾者(捡到物品的人)'
      }, {
        value: '选项3',
        label: '失者(丢失物品的人)'
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
      console.log(this.value);
    },
    dianji() {
      axios.post('/api/login', {
        username: this.input_username,
        password: this.input_password,
        yzcode: this.input_card,
      }).then(
        (response) => {
          console.log(response.data)
          if (response.data.length == 1) {
            console.log(response.data.length);
            $(".container1").css("display", "");
            $("body").css("background", "#222");
            $(".containerall").css("display", "none");
            // function guodu() {
            //   window.location.href = '/';
            // }
            // var intervalID = setInterval(guodu, 1500);
          } else if(response.data.data == -1) {
            const h = this.$createElement;
            this.$notify({
              title: '温馨提示',
              message: h('i', { style: 'color: red' }, '账号密码错误!')
            });
          }else if(response.data.data == -2){
            const h = this.$createElement;
            this.$notify({
              title: '温馨提示',
              message: h('i', { style: 'color: red' }, '验证码错误!')
            });
          }
        }
      )
    },
    changecode() {
      var verifyImg = $('.codeImage').attr('src')
      $('.codeImage').attr('src', verifyImg.replace(/\?.%$/, '') + "?" + Math.random())
    },
    submit() {
      this.isShow = true;
    },
    // 用户通过了验证
    success(msg) {
      this.isShow = false; // 通过验证后，需要手动隐藏模态框
    },
    // 用户点击遮罩层，应该关闭模态框
    close() {
      this.isShow = false;
    }
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
<style>
@import '../views/views_css/btn_1.css';

body {
  background-image: url(../assets/back_1.jpg);
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
