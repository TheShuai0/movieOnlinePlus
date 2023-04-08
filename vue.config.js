const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  lintOnSave: false,
  transpileDependencies: true,

  devServer: {
    open: false,//自动打开浏览器
    port: 8082,//配置项目启动的规定端口号

    proxy: {
      '/movie': {    // 遇到'/movie'的请求拦截下来，将跨域改成target的url
        target: 'http://localhost:8081',
        changeOrigin: true,  //是否跨域，肯定true
        pathRewrite: {   //重写请求中的/movie
          '^/movie': ''
        }
      },
      '/api': {
        target: 'http://localhost:8081',
        ws: true,//用于支持websocket
        //用于控制请求头中host值（端口，判断是否说谎，默认值是true）
        changeOrigin: true,//true:5001  false:9000
        pathRewrite: { '^/api': "" }//重写路径，也就是把/api前缀给替换为空格
      }
    }
  }
})
