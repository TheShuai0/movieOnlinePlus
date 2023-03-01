<template>
    <div>
        <div class="top_2">
            <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
                <el-menu-item index="1">处理中心</el-menu-item>
                <el-submenu index="2">
                    <template slot="title">我的工作台</template>
                    <el-menu-item index="2-1">选项1</el-menu-item>
                    <el-menu-item index="2-2">选项2</el-menu-item>
                    <el-menu-item index="2-3">选项3</el-menu-item>
                    <el-submenu index="2-4">
                        <template slot="title">选项4</template>
                        <el-menu-item index="2-4-1">选项1</el-menu-item>
                        <el-menu-item index="2-4-2">选项2</el-menu-item>
                        <el-menu-item index="2-4-3">选项3</el-menu-item>
                    </el-submenu>
                </el-submenu>
                <el-menu-item index="3" disabled>消息中心</el-menu-item>
                <el-menu-item index="4"><a href="https://www.ele.me" target="_blank">订单管理</a></el-menu-item>
            </el-menu>
        </div>
        <div id="section1">
            <div id="section1_1">
                <span style="display:block;">校园失物招领网</span>
                <span style="display:block;">Lost and found</span>
            </div>
        </div>
        <div class="top_1">
            <div class="top_left">12</div>
            <div class="top_right">34</div>
        </div>
        <div id="section2"></div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            activeIndex: '1',
        };
    },
    methods: {
        handleSelect(key, keyPath) {
            console.log(key, keyPath);
        }
    }
}
</script>

<style>
@import '../views/views_css/index_1.css';
.el-menu--popup-bottom-start {
    margin-top: 0 !important;
}

#section1 {
    height: 400px;
    padding: 0;
    background-color: transparent;
    /* background-image: url(http://blog.piplong.cn/wp-content/uploads/2021/09/index-read.gif); */
    background-image: url(../../public/lostandfound_1.jpg);
    background-size: 100% 100%;
    background-position: center;
    background-repeat: no-repeat;
}

#section1_1{
    margin: 0 0 0 1240px;
    padding-top: 28px;
    font-size: 36px;
    color: #CCCCCC;
}
/* #section1::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    z-index: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .5);
}
*/

#section2 {
    overflow: hidden;
    display: table;
    table-layout: fixed;
    width: 100%;
    position: relative;
    padding: 100px 0;
}
</style>