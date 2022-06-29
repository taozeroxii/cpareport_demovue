<template>
  <div id="menuCard">
    <div class="" v-if="cklogin">
      <h1>
        **** เนื่องจากข้อบังคับ PDPA
        เกี่ยวกับเรื่องการเข้าถึงข้อมูลส่วนบุคคล****
      </h1>
      <p class="text-red">
        ***
        การเรียกข้อมูลรายงานจึงต้องมีการเข้าใช้งานระบบเพื่อเก็บว่ามีการเรียกใช้ข้อมูลในส่วนใดบ้างโดยผู้ใช้งานคนไหน
        ***
      </p>
      <a
        href="http://1.179.170.82/cpawebsite/uploads/pdffile/pdf/pdpa.pdf"
        class="mb-5"
        target="blank"
        >อ่านข้อมูลเพิ่มเติม คลิ๊ก !!!</a
      >
      <hr class="mt-5 mb-5" />
    </div>
    <v-btn
      v-if="cklogin"
      class="btn btn-info mb-5"
      block
      elevation="2"
      large
      x-large
      color="primary"
      @click="goTologin"
    >
      LOGIN เข้าใช้งาน คลิ๊ก !!!</v-btn
    >
    <v-alert
      border="right"
      colored-border
      type="error"
      elevation="2"
      v-if="warning"
    >
      {{ warning }}
    </v-alert>

    <v-progress-linear
      color="deep-purple accent-4"
      indeterminate
      rounded
      height="5"
      v-if="loading"
    ></v-progress-linear>
    <v-row>
       <v-col cols="4"  >
        <v-expansion-panels inset>   
          <v-expansion-panel v-for="(item, i) in menumain"  :key="i" @click="showSubmenu(item.main_id,item.main_name)">   
           <v-expansion-panel-header > {{ i + 1 + " . " + item.main_name }}</v-expansion-panel-header>     
            <!-- <v-expansion-panel-content >
              <v-list  >
                <v-list-item  class="" v-for="(item, index) in menusss"  :key="index"  link @click="onClickMenu(item.menu_file)"  >
                  <router-link style="text-decoration: none;" to="">{{  i + 1 + "." + (index + 1) + " : " + item.menu_sub }}</router-link>
                </v-list-item>
              </v-list>
            </v-expansion-panel-content>   -->
          </v-expansion-panel> 
        </v-expansion-panels>
      </v-col>
      <v-col  cols="8" v-if="HeadMenuname">  
        <h3>{{HeadMenuname}}</h3> <hr>
        <small>**สามารถเปิด tab ใหม่ได้โดยคลิ๊กขวาที่ชื่อเมนูตัวสีฟ้าๆ**</small>
        <hr>
        <v-card  class="mb-3" style="padding:6px" elevation="2" v-for="(item, index) in menusss"  :key="index" @click="onClickMenu(item.menu_file)" >
          <router-link style="text-decoration: none;" :to="'/tableshowdata/'+item.menu_file" >{{  (index + 1) + " : " + item.menu_sub }}</router-link>
        </v-card>
      </v-col>
    </v-row>
    

  </div>
</template>

<script>
import moment from "moment";
import Axios from "axios";
export default {
  name: "menuCard",
  data() {
    return {
      HeadMenuname:null,
      warning: null,
      menumain: "",
      menusss: "",
      rout: "",
      loading: true,
      detailuser: {
        session: null,
        ip: null,
        username: null,
        sql_file: null,
        datetime: null,
      },
      cklogin: null,
    };
  },
  created() {
    this.loading = true;
  },
  async mounted() {
    await Axios.get("http://172.16.0.251:3010/api/menu", {
      headers: { "x-access-token": localStorage.token },
    })
      .then((result) => {
        this.loading = false;
        this.menumain = result.data;
        this.cklogin = false;
      })
      .catch((ex) => {
        if (
          ex.message == "Request failed with status code 401" ||
          ex.message == "Request failed with status code 403"
        ) {
          this.warning =
            "||----->>>>> !!! โปรดเข้าสู่ระบบเพื่อใช้งาน  User เดียวกันกับ hosxp Password 1234 !!! <<<<<<-----||";
          this.loading = false;
          this.cklogin = true;
        } else {
          this.cklogin = true;
          this.warning =
            "Warning : ไม่สามารถเชื่อมต่อกับฐานข้อมูลได้โปรดตรวจสอบเครื่อง server backend ";
        }
      });

    await Axios.get("http://172.16.0.251:3010/api/menu/getclientip", {
      headers: { "x-access-token": localStorage.token },
    }).then((response) => {
      this.detailuser.ip = response.data;
      if (
        typeof localStorage.username == "undefined" ||
        localStorage.username == ""
      ) {
        this.detailuser.username = "guest";
        this.detailuser.session = "guest";
      } else {
        this.detailuser.username = localStorage.username;
        this.detailuser.session = localStorage.token;
      }

      this.detailuser.datetime = moment(new Date()).format(
        "YYYY-MM-DD HH:mm:ss"
      );
      console.log("Client Ip : " + response.data);
    });
  },

  methods: {
    async showSubmenu(id,Menuname) {
      this.HeadMenuname = Menuname;
      await Axios.get(`http://172.16.0.251:3010/api/menu/submenu/${id}`, { headers: { "x-access-token": localStorage.token },}).then((result) => {
        this.loading = false;
        this.menusss = result.data;
        window.scrollTo(0,0);
      }).catch(() => {  
        this.alertify.error("JWT Token Expire OR Invalid Please Login!!") 
        this.$router.push("./login")
      });
    },
    async onClickMenu(link) {
      // console.log(link);
      this.detailuser.sql_file = link;
      // console.log(this.detailuser);
      await Axios.post( `http://172.16.0.251:3010/api/menu/stampviewer`, this.detailuser).then(() => {
        // console.log(res.data);
        this.$router.push(`/tableshowdata/${link}`);
      });
    },
    goTologin() {
      this.$router.push("./login");
    },
  },
};
</script>
