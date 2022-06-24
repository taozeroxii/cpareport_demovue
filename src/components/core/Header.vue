<template>
  <div id="Header">
    <v-app-bar color="accent-4" app dense>
      <v-toolbar-title>{{ version }} วันที่ {{ datenow }}</v-toolbar-title>

      <v-spacer></v-spacer>
      <v-btn v-if="isLogined">{{UserLogin}} </v-btn>
      <v-btn icon class="ml-5 mr-5" v-if="isLogined" @click="dialog = !dialog">
        <v-icon>mdi-key</v-icon>
      </v-btn>
      <v-btn icon @click="GotoLogin" class="mr-5" v-if="!isLogined">
        <v-icon>login</v-icon></v-btn
      >
      <v-btn icon @click="Logout" class="mr-5" v-if="isLogined">
        &nbsp;&nbsp;<v-icon>logout </v-icon></v-btn
      >
    </v-app-bar>

    <v-dialog v-model="dialog" max-width="500">
      <v-card>
        <v-card-title class="text-h5 grey lighten-2">
          เปลี่ยนรหัสผ่าน
        </v-card-title>

        <v-card-text>
          <v-form @submit.prevent="submit" lazy-validation v-model="valid">
            <v-text-field
              v-model="form.password"
              :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
              :type="show1 ? 'text' : 'password'"
              name="input-10-1"
              label="New Password"
              @click:append="show1 = !show1"
              counter
              :rules="[rules.required]"
            ></v-text-field>
            <v-text-field
              v-model="form.confirmPassword"
              :rules="[rules.required, passwordConfirmationRule]"
              :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
              :type="show2 ? 'text' : 'password'"
              name="input-10-1"
              label="Confirm New Password"
              @click:append="show2 = !show2"
              counter
            ></v-text-field>

            <v-btn class="mr-4 success" type="submit" :disabled="!valid">
              submit
            </v-btn></v-form
          >
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "Header",
  data() {
    return {
      valid: true,
      show1: false,
      show2: false,
      dialog: false,
      isLogined: null,
      UserLogin:null,
      datenow: new Date().toLocaleString(),
      rules: {
        required: (value) => !!value || "Required.",
        emailMatch: () => `The email and password you entered don't match`,
      },
      form: {
        password: null,
        confirmPassword: null,
        username: null,
        id: null,
      },
    };
  },
  computed: {
    version() {
      return process.env.VUE_APP_TITLE + " v. " + process.env.VUE_APP_VERSION;
    },
    passwordConfirmationRule() {
      return () =>
        this.form.password === this.form.confirmPassword ||
        "Password must match";
    },
  },
  methods: {
    GotoLogin() {
      // console.log(this.$router.history.current.name)
      if (this.$router.history.current.name == "tableshowdata") {
        this.$router.push("../login").catch(() => {});
      } else {
        this.$router.push("./login").catch(() => {});
      }
    },
    Logout() {
      // localStorage.clear();
      localStorage.removeItem("username");
      localStorage.removeItem("token");
      localStorage.removeItem("fname");
      localStorage.removeItem("lname");
      localStorage.removeItem("niname");
      localStorage.removeItem("status");
      localStorage.removeItem("id");

      this.alertify.warning("LOGOUT");

      this.$store.dispatch('logout_store');
      this.$router.push("/login").catch(() => {});
    },
    submit() {
      if (this.form.password === this.form.confirmPassword) {
        this.form.id = localStorage.id;
        this.form.username = localStorage.username;
        axios.put("http://172.18.2.2:3010/api/admin/changepassword", this.form, { headers: { "x-access-token": localStorage.token },
          })
          .then(() => {
            this.alertify.success("เปลี่ยนรหัสผ่านสำเร็จ");
          })
          .catch((err) => {
            this.errorMessage = err.response.data.message;
          });
      } else {
        console.log("รหัสผ่านไม่ตรง");
      }
    },
  },
  mounted() {
    setInterval(() => {
      this.UserLogin = this.$store.getters.get_loginname;
      this.isLogined = localStorage.fname;
      this.datenow = new Date().toLocaleString();
    }, 1000);
  },
};
</script>

<style></style>
