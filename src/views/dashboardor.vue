<template>
  <v-container>
    
    <v-row class=" mt-2">
      <v-btn color="orange darken-2 mb-5" dark @click="back" outlined><v-icon dark left > mdi-arrow-left</v-icon>ย้อนกลับ</v-btn >&nbsp; 
      <v-btn  :color="status_cycle == true ? 'success mb-5 mt-2' : 'mb-5 mt-2'"  outlined  @click="scolltable"  >
      <v-icon dark >mdi-format-list-bulleted-square </v-icon>เลื่อนอัตโนมัติ &nbsp;<i class="material-icons">{{status_cycle === true ? "check":"clear"}}</i> </v-btn >
      <v-spacer></v-spacer>สถานะสี timeoper  :  <p class="teal--text"> เขียว:วันที่สี่งผ่าพรุ้งนี้</p>, ไม่มีสี วันนี้ ||สถานะสี HN : <p class="red--text"> &nbsp; Emergency:สีแดง</p>,Elective:สีดำ
      </v-row>
      <v-row class="ml-3 mt-5">      
        <form  @submit.prevent="submit">
          <v-row >
            <v-text-field
              v-model="passwordOR"
              type="text"
              label="password"
              required
            ></v-text-field>
          <v-btn type="submit" class="mt-2 success">บันทึก</v-btn></v-row>
        </form>
      <v-spacer></v-spacer> Page : {{currentIndex+1}}</v-row>
      <v-row>
      <v-carousel
        :cycle="status_cycle"
        interval="10000"
        hide-delimiter-background
        delimiter-icon="mdi-minus"
        show-arrows-on-hover
        height="800px"
        light
        v-model="currentIndex"
      >
        <v-carousel-item v-for="item in room_id" :key="item.room_id"  >
          <Cardtableor :room_id="item.room_id" :room_name="item.room_name" />
        </v-carousel-item>
      </v-carousel>     
     </v-row>
  </v-container>
</template>

<script>
import Cardtableor from "@/components/cards/cardTableOR";
import axios from "axios";
import md5 from "md5"

export default {
  components: { Cardtableor },
  data() {
    return {
      room_id: null,
      room_name: null,
      status_cycle: true,
      currentIndex:null,
      passwordOR:null,
      passwordOR_inlocal:null
    };
  },
  created() {
    this.passwordOR_inlocal = localStorage.passwordOR;
    if(this.passwordOR_inlocal == md5("ords123456")){
       this.passwordOR = 'บันทึกรหัสผ่านแล้ว';
       this.loadRoomid();
    }
  },
  mounted() {
  },
  watch: {
    currentIndex: function(val) {//เช็คตำแหน่งที่ภาพสไลด์หากสไลด์ถึงindex สุดท้ายให้รีเซ็ตค่า Roomid และส่งค่าผ่าน porp ใหม่ไปทำการ refeach components Cardtableor 
      if(this.room_id != null){
        // console.log(  this.room_id.length+''+ (val+1))
        if((this.room_id.length) == (val+1)){
            //หน่วงเวลา 5 วิก่อนทำการรีเซ็ตค่าเพื่อให้โหลด data ใหม่
            this.delay(10000).then(()=> {
              this.room_id = null;
              this.loadRoomid();
            })
        }
      }
    }
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
      axios .get(`http://172.18.2.2:3010/api/dashboard-or/findroom`) .then((result) => {
          this.room_id = result.data;
      });
    },
    submit(){
      if(this.passwordOR === "ords123456" ){
        localStorage.passwordOR =  md5(this.passwordOR);
        this.alertify.success("บันทึกสำเร็จ");
        this.passwordOR = 'บันทึกรหัสผ่านแล้ว';
        this.loadRoomid();
      }else {
          this.alertify.error("Password ไม่ถูกต้อง");
      }
    },
    delay(time) {
      return new Promise(resolve => setTimeout(resolve, time));
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
