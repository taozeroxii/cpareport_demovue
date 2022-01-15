<template>
  <v-tabs>
    <v-btn   dark v-for="(item, index) in cardmenu" :key="index"   @click="onClickMenu(item.link)">  {{ item.title }}  </v-btn >
    <a href="https://trello.com/abhaihelphos/home" darktarget="_blank"> <v-btn dark>รวมปัญหาต่างๆ</v-btn></a>
  </v-tabs>
</template>

<script>
export default {
  name: "menutab",
  data() {
    return {
      cardmenu: [
        {
          title: "เพิ่มQuery",
          color: "",
          link: "/admin/addquery",
        },
        {
          title: "รายการquery(แก้ไข)",
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
  methods: {
    onClickMenu(linkto) {
      this.$router.push(`${linkto}`).catch(() => {});
    },
  },
};
</script>

<style></style>
