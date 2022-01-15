module.exports = {
  devServer: {
    proxy: {
      "/api": {
        target: "http://172.18.2.2:3010",
      },
    },
  },
  transpileDependencies: ['vuetify'],
  publicPath: process.env.NODE_ENV === 'production'
  ? '/cpareport/'
  : '/'
}
