<template>
  <v-navigation-drawer app permanent dense dark class="responsesive">
    <template v-slot:prepend>
      <v-list-item two-line>
        <!-- <v-list-item-avatar>
          <img src="https://randomuser.me/api/portraits/women/81.jpg" />
        </v-list-item-avatar> -->

        <v-list-item-content>
          <v-list-item-title>CPA REPORT HOSPITAL</v-list-item-title>
          <v-list-item-subtitle
            >ระบบรายงาน รพ. เจ้าพระยาอภัยภูเบศร</v-list-item-subtitle
          >
        </v-list-item-content>
      </v-list-item>
    </template>

    <v-divider></v-divider>

    <v-list dense>
      <v-list-item-group v-model="selectedMenu" mandatory>
        <v-list-item
          class="tile"
          v-for="([icon, text, route], index) in menus"
          :key="index"
          link
          @click="onClickMenu(route)"
        >
          <v-list-item-icon>
            <v-icon> {{ icon }} </v-icon>
          </v-list-item-icon>
          <v-list-item-content> {{ text }}</v-list-item-content>
        </v-list-item>

        <v-list-item href="http://172.16.0.251/report">
          <v-list-item-icon>
            <v-icon> mdi-format-list-bulleted-square </v-icon>
          </v-list-item-icon>
          <v-list-item-content> Report เวอร์ชั่นเก่า</v-list-item-content>
        </v-list-item>

        <v-list-item href="http://172.16.0.251/report/login.php">
          <v-list-item-icon>
            <v-icon> mdi-export </v-icon>
          </v-list-item-icon>
          <v-list-item-content> LOGIN เวอร์ชั่นเก่า</v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: "Menu",
  data() {
    return {
      selectedMenu: 0,
      menus: [
        ["mdi-home-city", "Report Menu", "/"],
        ["mdi-chart-bar", "Dashboard", "/dashboard"],
        ["mdi-chart-line", "รายการผู้ป่วย OR", "/dashboardor"],
        ["mdi-account-group-outline", "about", "/about"],
        ["mdi-archive-edit-outline", "ขอข้อมูล ดึงรายงาน", "/requestreport"],
        ["mdi-account-plus", "ขอเพิ่ม User Hosxp", "/requestuserhos"], 
        ["mdi-television", "Admin", "/admin"],
      ],
    };
  },
  methods: {
    onClickMenu(link) {
      this.$router.push(link).catch(() => {});
    },
  },
};
</script>

<style>
@media only screen and (max-width: 600px) {
  .responsesive {
    width: 60px !important;
  }
  .v-main {
    padding: 48px 0px 0px 60px !important;
  }
  .v-main {
    padding: 48px 0px 0px 60px !important;
  }
  .v-sheet.theme--light.v-toolbar.v-toolbar--dense.v-app-bar.v-app-bar--fixed.accent-4 {
    left: 60px !important;
  }
}
</style>
