<template>
  <div class='homepage'>
    <Header></Header>
    <div class="content">
      <div class='box' id='box1'></div>
      <div class='box' id='box2'> </div>
      <p>{{sign}}</p>
      <div class='box' id='box3'></div>
      <div class='box' id='box4'></div>
    </div>

    <div class="h-user">
      <div class="h-info clearfix">
        <div class="avatar-container">
          <div>
            <div class="bili-avatar" style="width: 60px;height:60px;">
              <img class="bili-avatar-img bili-avatar-face bili-avatar-img-radius" data-src="https://i1.hdslb.com/bfs/face/3840f1275fbd54c43182b5e58ca86236d428c487.jpg@240w_240h_1c_1s.webp" alt="" src="">
              <span class="bili-avatar-icon bili-avatar-right-icon  bili-avatar-size-60"></span>
            </div>
          </div>
          <a target="_blank" href="https://account.bilibili.com/account/face/upload?spm_id_from=333.999.0.0" class="avatar-cover">更换头像</a></div>
          <div class="h-basic">

              <span id="h-name">纯阳的雪下得有些喧嚣</span>
              <span id="h-ceritification" class="icon"></span>
              <span id="h-gender" class="icon gender male"></span>
              <div class="h-vipType disable">大会员
              </div>
              <div class="space-fans-medal">
              <div class="normal-medal">
              <div class="normal-left">
              </div>
              <div class="normal-right"><p>粉丝勋章</p>
              </div>
            </div>
          </div>
      </div>
        <div class="h-basic-spacing">
          <h4 title="你好啊" class="h-sign" style="display: none;">你好啊</h4>
          <input id="h-sign" type="text" placeholder="编辑个性签名" maxlength="60" class="space_input"></div></div>
        </div>
      </div>
    </div>


</template>

<script>
import Header from './Header.vue';
export default {
  name : 'User',
  data () {
    return {
      sign: '专注web前端开发 '
    }
  },
  components: {
    Header
  },
}
</script>
<style>
@import '../views/views_css/User.css';
</style>
