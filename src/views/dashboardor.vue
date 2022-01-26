<template>
  <v-container>
    <v-row>
      <v-btn color="orange darken-2 mb-5 mt-2" dark @click="back"><v-icon dark left> mdi-arrow-left</v-icon>ย้อนกลับ</v-btn >&nbsp;
      <v-btn :color="status_cycle == true ? 'success mb-5 mt-2' : 'mb-5 mt-2'"  dark  @click="scolltable" >
      <v-icon dark>mdi-format-list-bulleted-square </v-icon>เลื่อนอัตโนมัติ &nbsp;{{ status_cycle }}</v-btn >
      <v-spacer></v-spacer> Emergency:สีแดง,Elective:สีฟ้าอ่อน</v-row>
    <v-carousel
      :cycle="status_cycle"
      interval="10000"
      hide-delimiter-background
      delimiter-icon="mdi-minus"
      show-arrows-on-hover
      height="800px"
      light
    >
    
      <v-carousel-item v-for="item in room_id" :key="item.room_id">
        <Cardtableor :room_id="item.room_id" :room_name="item.room_name" />
      </v-carousel-item>
    </v-carousel>
  </v-container>
</template>

<script>
import Cardtableor from "@/components/cards/cardTableOR";
import axios from "axios";

export default {
  components: { Cardtableor },
  data() {
    return {
      room_id: null,
      room_name: null,
      status_cycle: true,
    };
  },
  created() {
    this.loadRoomid();
  },
  mounted() {
    setInterval(() => {
      this.loadRoomid();
    }, 6000);
  },
  methods: {
    back() {
      this.$router.back();
    },
    scolltable() {
      this.status_cycle = !this.status_cycle;
      if (this.status_cycle == true) {
        this.alertify.success("เลื่อนอัตโนมัติ");
        localStorage.status_cycle = this.status_cycle;
      } else {
        this.alertify.error("ปิดการใช้งานเลื่อนอัตโนมัติ");
        localStorage.status_cycle = this.status_cycle;
      }
      // console.log("เปลี่ยนสไลด์ห้องอัตโนมัติ : "+this.status_cycle)
    },
    loadRoomid() {
      axios
        .get(`http://172.18.2.2:3010/api/dashboard-or/findroom`)
        .then((result) => {
          this.room_id = result.data;
        });
    },
  },
};
</script>

<style>
.small {
  max-width: 600px;
  margin: 150px auto;
}
</style>
