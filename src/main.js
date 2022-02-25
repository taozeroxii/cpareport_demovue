import Vue from 'vue'
import App from './App.vue'
import store from './store' //ต้อง import store ก่อน router ไม่เช่นนั้นค่าในstore จะไม่มา
import router from './router'
import vuetify from './plugins/vuetify'
import 'material-design-icons-iconfont'
import VeeValidate from 'vee-validate'
import Vue2Filters from 'vue2-filters'
import "./assets/styles.css";
var moment = require('moment'); // require

import  'alertifyjs/build/css/alertify.css'
import  'alertifyjs/build/css/themes/default.css'
import * as alertify from 'alertifyjs'
import VueProgressBar from 'vue-progressbar'

Vue.use(VueProgressBar, {
  color: 'rgb(143, 255, 199)',
  failedColor: 'red',
  height: '2px'
})


Vue.use(VeeValidate) //ใช้งาน validate form 
Vue.use(Vue2Filters)
Vue.prototype.alertify = alertify // กำหนดให้ alertify เป็นชื่อการเรียกใช้ function alertify

//filter สร้าง filter เพื่อกำหนด format วันที่
Vue.filter('date',(value)=>{
  // console.log(moment().format('L'))
  return(moment(value).format('DD/MM/YYYY HH:mm:ss'))
})
Vue.filter('date2',(value)=>{
  // console.log(moment().format('L'))
  return(moment(value).format('DD/MM/YYYY'))
})



Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
