const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  lintOnSave: false,
  transpileDependencies: true,
  devServer: {
    open: false,//自动打开浏览器
    port: 9000,//配置项目启动的规定端口号
    proxy: {
      '/api': {
        target: 'http://localhost:8090',
        ws: true,//用于支持websocket
        //用于控制请求头中host值（端口，判断是否说谎，默认值是true）
        changeOrigin: true,//true:5001  false:9000
        pathRewrite: { '^/api': "" }//重写路径，也就是把/api前缀给替换为空格
      }
    }
  }
})
