import Vue from "vue";
import Vuex from "vuex";
import Axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user:{
      token: null,
      username: null,
      userrole: null,
      fname: null,
      lname: null,
      niname:null,
    }
  },

  mutations: {
    set_user: (state, resdata) => ( state.user = resdata ),
    remove_user: (state, resdata) => ( state.user = resdata ),
  },

  actions: {
    get_user_login: ({ commit }) => Axios.post("http://172.16.0.251:3010/api/admin/checkJWTexpire",'',{ headers: { "x-access-token":  localStorage.getItem("token") }, }).then((res) =>commit("set_user", res.data)),
    logout_store ({ commit }) { commit('remove_user','')}
  },

  getters: {
    get_username(state) {
      return (state.user.username );
    },
    get_token(state){
      return state.user.token;
    },
    get_loginname(state){
      return ('คุณ '+state.user.fname +' '+ state.user.lname );
    },
    get_nickname(state) {
      return (state.user.niname );
    },
    get_userrole(state){
      return (state.user.userrole)
    }
  },

  modules: {},
});
