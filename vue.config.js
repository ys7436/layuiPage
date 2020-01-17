module.exports = {
  configureWebpack: {
    devtool: 'source-map'
  },
  /* 处理前段的跨域问题 */
  devServer: {
    proxy: 'http://localhost:3000'
    // port: '5004'
  },
  /* !!!: 打包后是否要放在某个文件夹内进行访问 */
  publicPath: process.env.NODE_ENV === 'production' ? '/yso/' : '/'
}
