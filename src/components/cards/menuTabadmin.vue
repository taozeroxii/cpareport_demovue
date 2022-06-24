<template>
  <v-tabs>
    <v-btn
      dark
      v-for="(item, index) in cardmenu"
      :key="index"
      @click="onClickMenu(item.link)"
    >
      {{ item.title }}
    </v-btn>
    <a href="https://trello.com/abhaihelphos/home" dark target="_blank">
      <v-btn dark>รวมปัญหาต่างๆ</v-btn></a
    >
  </v-tabs>
</template>

<script>
export default {
  name: "menutab",
  data() {
    return {
      userrole:null,
      cardmenu: [
        {
          title: "เพิ่มQuery",
          color: "",
          link: "/admin/addquery",
        },
        {
          title: "รายการquery",
          color: "",
          link: "/admin/menuEditquery",
        },
        {
          title: "รายการuser(เพิ่ม/แก้ไข)",
          color: "",
          link: "/admin/tableuser",
        },
      ],
    };
  },
  mounted() {
    this.userrole = this.$store.getters.get_userrole;
  },
  methods: {
    onClickMenu(linkto) {
      if (this.userrole === "1") {
        this.$router.push(`${linkto}`).catch(() => {});
      }else{
        alert("User ของท่านไม่มีสิทธิการใช้งานหน้าเมนูดังกล่าว")
      }
    },
  },
};
</script>

<style></style>
