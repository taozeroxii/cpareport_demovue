<template>
  <v-container>
    <v-row >
      <v-col lg="12">
        <v-card>
          <v-list>
            <v-list-item-group>
              <v-list-item
                class="hovers"
                v-for="(item, i) in searchmenu"
                :key="i"
              >
                <v-list-item-content>
                  <v-list-item-title @click="onClickMenu(item.menu_file,item.menu_link)">{{ item.menu_title }}</v-list-item-title>
                  <hr />
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";
import moment from "moment";
export default {
  name: "searchMenu",
  props: ["searchmenu"],
  data() {
    return {
      menumain: null,
       detailuser: {
        session: null,
        ip: null,
        username: null,
        sql_file: null,
        datetime: null,
      },
    };
  },
  created() {
    axios.get("http://172.16.0.251:3010/api/menu/getclientip", {headers: { "x-access-token": localStorage.token },}).then((response) => {
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
      localStorage.ip = response.data;
      console.log("Client Ip : " + response.data);
    });
  },



  methods: {

    onClickMenu(menu_file,menu_link) {
      this.detailuser.sql_file = menu_file;
      // console.log(menu_link)
      axios.post( `http://172.16.0.251:3010/api/menu/stampviewer`, this.detailuser).then(() => {
        if(menu_file == null || menu_file == '' || !menu_file.match(/sql_.*/) ){
          // console.log(`http://172.16.0.251/report/${menu_link}`)
          if(menu_link.match(/report.*/)){
            window.open ("http://172.16.0.251/"+menu_link,"_blank");
          }else if(menu_link.match(/https.*/)){
            window.open (menu_link,"_blank");
          } 
        }else {
          this.$router.push(`./tableshowdata/${menu_file}`).catch(() => {});
        }
      });
    },



  },
};
</script>

<style>
.hovers:hover {
  background-color: gray;
}
</style>
