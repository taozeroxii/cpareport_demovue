import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import 'material-design-icons-iconfont'
import VeeValidate from 'vee-validate'
import Vue2Filters from 'vue2-filters'
var moment = require('moment'); // require


Vue.use(VeeValidate) //ใช้งาน validate form 
Vue.use(Vue2Filters)

//filter สร้าง filter เพื่อกำหนด format วันที่
Vue.filter('date',(value)=>{
  // console.log(moment().format('L'))
  return(moment(value).format('DD/MM/YYYY HH:mm:ss'))
})



Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
