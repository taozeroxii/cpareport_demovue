<template>
  <v-container>
    <MenuTabadmin />
  </v-container>
</template>

<script>
import MenuTabadmin from "@/components/cards/menuTabadmin";
export default {
  name: "admin",
  components: {
    MenuTabadmin,
  },
  data() {
    return {
      name: null,
    };
  },
};
</script>

<style></style>
