<template>
  <v-container>
    <v-row class="mt-5">
      <v-col md="3" lg="4"></v-col>
      <v-col cols="12" md="6" lg="4">
        <form  @submit.prevent="submit">
          <h1>LOGIN</h1>
          <v-text-field
            v-model="form.username"
            :error-messages="usernameerror"
            label="username"
            required
          ></v-text-field>
          <v-text-field
            v-model="form.password"
            :error-messages="passworderror"
            label="password"
            type="password"
            required
          ></v-text-field>
          <v-btn class="mr-4" type="submit">
            submit
          </v-btn>
          <v-btn @click="clear">
            clear
          </v-btn>
          <v-alert
            class="mt-5"
            v-if="errMessage"
            border="right"
            colored-border
            type="error"
            elevation="2"
          >
            {{ errMessage }}</v-alert
          >
        </form></v-col
      >
      <v-col md="3" lg="4"></v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  name: "login",
  data() {
    return {
      usernameerror: null,
      passworderror: null,
      errMessage: null,
      form: {
        username: null,
        password: null,
      },
    };
  },
  methods: {
    submit() {
      // console.log(this.form);
      this.setLocalStorage(this.form)
      // this.$router.push("./")
    },
    setLocalStorage(data) {
      axios .post("http://172.18.2.2:3010/api/admin/login", data).then((result) => {
          localStorage.id = result.data.id;
          localStorage.username = result.data.username;
          localStorage.fname = result.data.fname;
          localStorage.lname = result.data.lname;
          localStorage.token = result.data.token;
          localStorage.status = result.data.status;
          localStorage.niname = result.data.niname;
          // console.log(result.data);
          this.errMessage = null;
          this.alertify.success("LOGIN สำเร็จ");
          this.$router.push("/admin");
        })
        .catch((err) => {
          this.errMessage = err.response.data.message;
          this.alertify.error("LOGIN ผิดพลาด");
        });
    },
    clear() {
      this.form = {};
    },
  },
};
</script>

<style></style>
