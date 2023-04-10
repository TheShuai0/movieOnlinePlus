<template>
  <div style="overflow: hidden;">
    <Header></Header>
    <Float></Float>
    <!--背景模板-->
    <MovieShow></MovieShow>
    </div>
</template>
<script>
import {throttle} from '../lib/utils'
import MovieShow from './MovieShow.vue';
import Header from './Header.vue';
import Float from './Float.vue'
import $ from "jquery";

export default {
  data() {
    return {
      count: 0,
     }},
  mounted() {

  },
  components: {
    Header,
    Float,
    MovieShow
  },
}
</script>

<style>
@import '../views/views_css/main.css';
</style>
