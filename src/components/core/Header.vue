<template>
  <div id="Header">
    <v-app-bar color="accent-4" app dense >
      <!-- <v-app-bar-nav-icon ></v-app-bar-nav-icon> -->

      <v-toolbar-title>{{ version }}</v-toolbar-title>

      <v-spacer></v-spacer>
      <span>Username: none</span>
      <v-btn icon> <v-icon>mdi-export</v-icon></v-btn>
    </v-app-bar>
  </div>
</template>
<script>
export default {
  name: "Header",
  computed: {
    version() {
      return process.env.VUE_APP_TITLE +' v. '+ process.env.VUE_APP_VERSION;
    },
  },
};
</script>

<style></style>
