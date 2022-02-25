<template>
  <v-app>
    <Header v-if="this.$route.name!='dashboardor'"/>
    <Menu v-if="this.$route.name!='dashboardor'"/>
      <vue-progress-bar></vue-progress-bar>
    <Content />        
  </v-app>
</template>
 
<script>
import Header from "@/components/core/Header";
import Menu from "@/components/core/Menu";
import Content from "@/components/core/Content";
export default {
  name: "App",
  components: {
    Header,
    Menu,
    Content,
  },
  mounted() { 

  },
};
</script>

<style></style>
