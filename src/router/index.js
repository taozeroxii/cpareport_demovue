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
      path: "*",
      redirect: "/",
    },
  ],
});

router.beforeEach(async (to, from, next) => {
  // redirect to login page if not logged in and trying to access a restricted page
  const publicPages = ["/login", "/", "/about", "/dashboard", "/tableshowdata"]; //หน้าที่ไม่ต้อง login
  const authRequired = !publicPages.includes(to.path);
  // const loggedIn = localStorage.getItem("token");
  if (authRequired && to.name != "tableshowdata") {
    router.app.$store.dispatch("get_user_login").then(() => {
      // console.log(router.app.$store.state.user); //เช็คค่าที่เก็บลง store หลังจาก login
    }).catch(() => {  
      alertify.error("JWT Token Expire OR Invalid Please Login!!");
      localStorage.clear(); //clear localstorage เมื่อ token หมดอายุ ก่อนทำการดีดไปหน้า login
      next({ name: "login" })
    });
  }
  next();
});

export default router;
