<template>
  <div id="Header">
    <v-app-bar color="accent-4" app dense>
      <v-toolbar-title>{{ version }} วันที่ {{datenow }}</v-toolbar-title>

      <v-spacer></v-spacer>
      <v-btn icon @click="GotoLogin" class="mr-5" v-if="!isLogined">
        &nbsp;&nbsp; LOGIN<v-icon>login </v-icon>&nbsp;</v-btn
      >
      <v-btn icon @click="Logout" class="mr-5" v-if="isLogined">
        &nbsp;&nbsp;<v-icon>logout </v-icon>&nbsp; LOGOUT</v-btn
      >
    </v-app-bar>
  </div>
</template>
<script>
export default {
  name: "Header",
  data() {
    return {
      isLogined: null,
      datenow:new Date().toLocaleString()
    };
  },
  computed: {
    version() {
      return process.env.VUE_APP_TITLE + " v. " + process.env.VUE_APP_VERSION;
    },
  },
  methods: {
    GotoLogin() {
      // console.log(this.$router.history.current.name)
      if(this.$router.history.current.name == 'tableshowdata'){
        this.$router.push("../login").catch(() => {});
      }else{
        this.$router.push("./login").catch(() => {});
      }
    },
    Logout() {
      localStorage.clear();
      this.alertify.warning("LOGOUT");
      this.$router.push("/").catch(() => {});
    },
  },
  mounted() {
    setInterval(() => {
        this.isLogined = localStorage.fname;
        this.datenow = new Date().toLocaleString()
    }, 1000);
  },
};
</script>

<style></style>
