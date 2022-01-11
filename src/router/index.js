import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import tableshowdata from "../views/form/tableshowdata";

Vue.use(VueRouter);

const routes = [
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
    // meta:{ isSecured:true},
    name: "tableshowdata",
    component: tableshowdata,
  },
  {
    path: "/about",
    name: "About",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
  {
    path: "*",
    redirect: "/",
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
