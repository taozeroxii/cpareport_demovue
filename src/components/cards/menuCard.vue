<template>
  <div id="menuCard">
    <v-alert border="right" colored-border type="error" elevation="2" v-if="warning">
      {{ warning }}
    </v-alert>
    <v-expansion-panels>
      <v-expansion-panel
        class=" mb-5"
        v-for="(item, i) in menumain"
        :key="i"
        @click="showSubmenu(item.main_id)"
      >
        <v-expansion-panel-header> {{(i+1)+' . '+ item.main_name }}</v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-list dense>
            <v-list-item
              class=""
              v-for="(item, index) in menusss"
              :key="index"
              link
              @click="onClickMenu(item.menu_file)"
            >
            <router-link style="text-decoration: none;" :to="'./tableshowdata/'+item.menu_file">{{(i+1)+'.'+(index+1)+' : '+  item.menu_sub }}</router-link>
            <!-- <a  class="text-decoration: none;" :href="'./tableshowdata/'+item.menu_file">  <v-list-item-content>{{ item.menu_sub }} </v-list-item-content></a> -->
            </v-list-item>
          </v-list>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>

<script>
import Axios from "axios";
export default {
  name: "menuCard",
  data() {
    return {
      warning: null,
      menumain: "",
      menusss: "",
      rout: "",
    };
  },

  async mounted() {
    // console.log("menu");
    await Axios.get("http://172.18.2.2:3010/api/menu") .then((result) => {
        //console.log(JSON.stringify(result.data));
        this.menumain = result.data;
      })
      .catch(() => {
        this.warning = "Warning : ไม่สามารถเชื่อมต่อกับฐานข้อมูลได้โปรดตรวจสอบเครื่อง server backend ";
      });
  },

  methods: {
    async showSubmenu(id) {
      await Axios.get(`http://172.18.2.2:3010/api/menu/submenu/${id}`).then(
        (result) => {
          // console.log(JSON.stringify(result.data));
          this.menusss = result.data;
        }
      );
    },
    onClickMenu(link) {
      this.$router.push(`/tableshowdata/${link}`);
    },
  },
};
</script>

<style>
.v-expansion-panel-header {
  background-color: #c9ffbef8;
  border: 2px solid #87c57bf8;
  font-size: 20px !important;
} 
</style>
