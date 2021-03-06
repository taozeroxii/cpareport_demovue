import Vue from "vue";
import Router from "vue-router";
import Home from "../views/Home.vue";
import tableshowdata from "../views/form/tableshowdata";
// import axios from "axios";
import * as alertify from 'alertifyjs'

Vue.use(Router);

export const router = new Router({
  // mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "Home",
      component: Home,
    },
    {
      path: "/dashboard",
      name: "dashboard",
      component: () => import("@/views/dashboard.vue"),
    },
    {
      path: "/dashboardor",
      name: "dashboardor",
      component: () => import("@/views/dashboardor.vue"),
    },
    {
      path: "/tableshowdata/:sql",
      name: "tableshowdata",
      component: tableshowdata,
    },
    {
      path: "/about",
      name: "About",
      component: () => import("../views/About.vue"),
    },
    {
      path: "/login",
      name: "login",
      component: () => import("@/views/Login.vue"),
    },
    {
      path: "/admin",
      name: "admin",
      component: () => import("../views/admin/admin.vue"),
      meta: { requiresAuth: true },
    },
    {
      path: "/admin/register",
      name: "register",
      component: () => import("../views/admin/register.vue"),
      meta: { requiresAuth: true },
    },
    {
      path: "/admin/tableuser",
      name: "tableuser",
      component: () => import("../views/admin/tableuser.vue"),
      meta: { requiresAuth: true },
    },
    {
      path: "/admin/addquery",
      name: "addquery",
      component: () => import("../views/admin/Addquery.vue"),
      meta: { requiresAuth: true },
    },
    {
      path: "/admin/menuEditquery",
      name: "menuEditquery",
      component: () => import("../views/admin/menuEditquery.vue"),
      meta: { requiresAuth: true },
    },
    {
      path: "/admin/Editquery/:id",
      name: "Editquery",
      component: () => import("../views/admin/Editquery.vue"),
      meta: { requiresAuth: true },
    },

    {
      path: "/errorcode",
      name: "errorcode",
      component: () => import("../views/form/formErrorcode.vue"),
      meta: { requiresAuth: true },
    },



    {
      path: "/requestreport",
      name: "Requestreport",
      component: () => import("@/views/Requestreport.vue"),
      meta: { requiresAuth: true },
    },
    
    {
      path: "/requestuserhos",
      name: "requestuserhos",
      component: () => import("@/views/RequestuserHos.vue"),
    },


    {
      path: "*",
      redirect: "/",
    },
  ],
});

router.beforeEach(async (to, from, next) => {
  // redirect to login page if not logged in and trying to access a restricted page
  const publicPages = ["/login", "/", "/about", "/dashboard","/dashboardor",'/requestuserhos']; // ?????????????????????????????????????????? login -- , "/tableshowdata"
  // const adminPage = ["/admin","/admin/register","/admin/tableuser","/admin/addquery","/admin/menuEditquery"];
  const authRequired = !publicPages.includes(to.path);
  // const loggedIn = localStorage.getItem("token");
  if (authRequired ) { //&& to.name != "tableshowdata"
    router.app.$store.dispatch("get_user_login").then(() => {

      // console.log(router.app.$store.state.user); //???????????????????????????????????????????????? store ????????????????????? login
    }).catch(() => {  
      alertify.error("JWT Token Expire OR Invalid Please Login!!");
      // localStorage.clear(); //clear localstorage ????????????????????? ??????????????? token ????????????????????? ?????????????????????????????????????????????????????? login
      localStorage.removeItem('username'); 
      localStorage.removeItem('token'); 
      localStorage.removeItem('fname') ;
      localStorage.removeItem('lname') ;
      localStorage.removeItem('niname') ;
      localStorage.removeItem('status') ;
      localStorage.removeItem('id');
      
      next({ name: "login" })
    });
  }
  next();
});

export default router;
