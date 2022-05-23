<template>
  <v-container>
    <v-row class="mt-1">
      <v-btn
        v-if="fullscreen == false"
        color="orange darken-2 mb-5"
        class="noprint"
        dark
        @click="back"
        outlined
        x-small
        ><v-icon dark left> mdi-arrow-left</v-icon>ย้อนกลับ</v-btn
      >&nbsp;
      <v-btn
        :color="status_cycle == true ? 'success mb-5 mt-2' : 'mb-5 mt-2'"
        outlined
        x-small
        @click="scolltable"
        class="noprint"
        v-if="fullscreen"
      >
        <v-icon dark>mdi-format-list-bulleted-square </v-icon>เลื่อนอัตโนมัติ
        &nbsp;<i class="material-icons">{{
          status_cycle === true ? "check" : "clear"
        }}</i>
      </v-btn>
      <v-btn x-small @click="toggle" outlined class="noprint"
        >Full Screen And slide Show<i class="material-icons">{{
          fullscreen === true ? "close_fullscreen" : "open_in_full"
        }}</i></v-btn
      >

      <v-btn
        class="warning ml-3 noprint"
        v-if="passwordOR_inlocal == passworddf"
        @click="loadRoomid(today)"
        x-small
      >
        {{ today | date2 }}</v-btn
      >
      <v-btn
        class="warning noprint"
        v-if="passwordOR_inlocal == passworddf"
        @click="loadRoomid(tomorrow)"
        x-small
      >
        {{ tomorrow | date2 }}</v-btn
      >
      <v-btn
        class="warning noprint"
        v-if="passwordOR_inlocal == passworddf"
        @click="loadRoomid('all')"
        x-small
      >
        All</v-btn
      >

      <v-spacer></v-spacer>
      <small class="noprint">
        <b>set_type : 1.รอการเปิด Visit 2.สั่งผ่าตัดแล้ว </b>
        <b class="blue--text ">พื้นหลังสีฟ้า:วันที่ผ่าตัดพรุ้งนี้</b>, ไม่มีสี
        วันนี้ <b class="red--text">&nbsp; Emergency:สีแดง</b> ,<b
          class="success--text"
          >&nbsp;Elective:สีเขียว</b
        >,อื่นๆ : ไม่มีสี</small
      >
    </v-row>

    <v-row>
      <h1 v-if="room_id == ''">.. ไม่พบข้อมูล ..</h1>
      <v-col cols="12" xl="6" v-for="item in room_id" :key="item.room_id">
        <Cardtableor
          :room_id="item.room_id"
          :room_name="item.room_name"
          v-if="fullscreen == false"
          :date_dd="item.date == null ? 'all' : item.date"
        />
      </v-col>

      <!-- Slide Show Components And Send data Props -->
      <v-carousel
        :cycle="status_cycle"
        interval="10000"
        hide-delimiter-background
        delimiter-icon="mdi-minus"
        show-arrows-on-hover
        height="800px"
        light
        v-model="currentIndex"
        v-if="fullscreen"
      >
        <v-carousel-item v-for="item in room_id" :key="item.room_id">
          <Cardtableor
            :room_id="item.room_id"
            :room_name="item.room_name"
            :date_dd="item.date == null ? 'all' : item.date"
          />
        </v-carousel-item>
      </v-carousel>
      <!-- END Slide Show Components                 -->
    </v-row>

    <v-row class="ml-3 mt-5">
      <form @submit.prevent="submit" v-if="fullscreen == false">
        <v-row>
          <v-text-field
            v-model="passwordOR"
            type="text"
            label="password"
            required
            class="noprint"
          ></v-text-field>
          <v-btn type="submit" class="mt-2 success noprint">บันทึก</v-btn>
          <v-btn
            type="submit"
            v-on:click="clearLocal()"
            class="mt-2 warning noprint"
            >ล้างรหัสผ่าน</v-btn
          >
        </v-row>
      </form>
    </v-row>
  </v-container>
</template>

<script>
import Cardtableor from "@/components/cards/cardTableOR";
import axios from "axios";
import md5 from "md5";
import { api as fullscreen } from "vue-fullscreen";
import moment from "moment";

export default {
  components: { Cardtableor },
  data() {
    return {
      fullscreen: false,
      teleport: true,
      room_id: null,
      room_name: null,
      status_cycle: true,
      currentIndex: null,
      passwordOR: null,
      passwordOR_inlocal: null,
      today: moment(new Date()).format("YYYY-MM-DD"),
      tomorrow: null,
      ckbuttondate: "all",
      passworddf: md5("ords123456"),
    };
  },
  created() {
    var tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    this.tomorrow = moment(tomorrow).format("YYYY-MM-DD");
    this.passwordOR_inlocal = localStorage.passwordOR;

    if (this.passwordOR_inlocal == md5("ords123456")) {
      this.passwordOR = "บันทึกรหัสผ่านแล้ว";
      this.loadRoomid(this.ckbuttondate);
    }
  },
  mounted() {
    if (this.fullscreen == false) {
      setInterval(() => {
        this.room_id = null;
        // console.log(new Date())
        this.delay(100).then(() => {
          //ดีเลเวลาหลังจากรีเซ็ตค่าก่อนโหลดข้อมูลใหม่ 1 วิ
          this.loadRoomid(this.ckbuttondate);
        });
      }, 1000 * 120);
    }
  },
  watch: {
    currentIndex: function(val) {
      //เช็คตำแหน่งที่ภาพสไลด์หากสไลด์ถึงindex สุดท้ายให้รีเซ็ตค่า Roomid และส่งค่าผ่าน porp ใหม่ไปทำการ refeach components Cardtableor
      if (this.room_id != null) {
        // console.log((val+1) +'/'+this.room_id.length)
        if (this.room_id.length == val + 1) {
          //หน่วงเวลา 5 วิก่อนทำการรีเซ็ตค่าเพื่อให้โหลด data ใหม่
          this.delay(10000).then(() => {
            this.room_id = null;
            this.loadRoomid(this.ckbuttondate);
          });
        }
      }
    },
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
    loadRoomid(date) {
      if (date == this.today) {
        this.room_id = null;
        this.ckbuttondate = date;
        axios
          .post(`http://172.18.2.2:3010/api/dashboard-or/findroom`, {
            date: date,
          })
          .then((result) => {
            this.room_id = result.data;
            // console.log( result.data)
          });
      } else if (date == this.tomorrow) {
        this.room_id = null;
        this.ckbuttondate = date;
        axios
          .post(`http://172.18.2.2:3010/api/dashboard-or/findroom`, {
            date: date,
          })
          .then((result) => {
            this.room_id = result.data;
          });
      } else {
        this.room_id = null;
        this.ckbuttondate = "all";
        axios
          .get(`http://172.18.2.2:3010/api/dashboard-or/findroom`)
          .then((result) => {
            this.room_id = result.data;
          });
      }
    },
    submit() {
      if (this.passwordOR === "ords123456") {
        localStorage.passwordOR = md5(this.passwordOR);
        this.alertify.success("บันทึกสำเร็จ");
        this.passwordOR = "บันทึกรหัสผ่านแล้ว";
        this.passwordOR_inlocal = localStorage.passwordOR;
        this.loadRoomid(this.ckbuttondate);
      } else {
        this.alertify.error("Password ไม่ถูกต้อง");
      }
    },
    delay(time) {
      return new Promise((resolve) => setTimeout(resolve, time));
    },
    async toggle() {
      await fullscreen.toggle(this.$el.querySelector(".fullscreen-wrapper"), {
        teleport: this.teleport,
        callback: (isFullscreen) => {
          this.fullscreen = isFullscreen;
        },
      });
      this.fullscreen = fullscreen.isFullscreen;
    },
    clearLocal() {
      localStorage.removeItem("passwordOR");
      this.passwordOR = "";
      window.location.reload();
    },
  },
};
</script>

<style>
.small {
  max-width: 600px;
  margin: 150px auto;
}
@media print {
  .noprint {
    visibility: hidden;
  }
}
</style>
