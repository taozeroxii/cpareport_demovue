module.exports = {
  devServer: {
    proxy: {
      "/api": {
        target: "http://localhost:3000",
      },
    },
  },
  transpileDependencies: ['vuetify'],
  publicPath: process.env.NODE_ENV === 'production'
  ? '/cpareport/'
  : '/'
}
