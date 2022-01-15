import Vue from "vue";
import Vuex from "vuex";
// import Axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // id: null,
    // username: null,
    // fname: null,
    // lname: null,
    // token: null,
    // status: null,
  },
  mutations: {
    // set_user: (state, user) => (state.user = user),
  },
  actions: {
    // get_user_login: ({ commit }) => Axios.post("api/admin/checkJWTexpire").then((res) =>commit("set_user", res.data)),
  },
  getters: {
    // get_name(state) {
    //   return ( state.user.fname + " " +state.user.lname );
    // },
  },
  modules: {},
});
