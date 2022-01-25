<template>
  <v-container>
    <v-btn color="orange darken-2 mb-5 mt-5" dark @click="back" ><v-icon dark left> mdi-arrow-left</v-icon>ย้อนกลับ</v-btn >
    &nbsp;
    <v-btn color="info darken-2 mb-5 mt-5" dark @click="scolltable" >เลื่อนอัตโนมัติ {{status_cycle}}</v-btn >
    <v-carousel :cycle="status_cycle" hide-delimiters show-arrows-on-hover   height="100%" light>
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
      status_cycle:true
    };
  },
  mounted() {
    axios
      .get(`http://localhost:3000/api/dashboard-or/findroom`)
      .then((result) => {
        this.room_id = result.data;
      });
  },
  methods: {
    back() {
      if( localStorage.status_cycle != null){this.status_cycle =  localStorage.status_cycle}
      this.$router.back();
    },
    scolltable(){
      this.status_cycle = !this.status_cycle;
      if(this.status_cycle === true){
          this.alertify.success("เลื่อนอัตโนมัติ");
          localStorage.status_cycle = this.status_cycle;
      }else{
          this.alertify.error("ปิดการใช้งานเลื่อนอัตโนมัติ");
           localStorage.status_cycle = this.status_cycle;
      }
      // console.log("เปลี่ยนสไลด์ห้องอัตโนมัติ : "+this.status_cycle)
    }
  },
};
</script>

<style>
.small {
  max-width: 600px;
  margin: 150px auto;
}
</style>
