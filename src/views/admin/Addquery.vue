<template>
  <v-container>

    <MenuTabadmin />
    <input type="number" v-model="a"> <input type="number" v-model="b">A:{{a}}||   B:{{b}}  ||  Testcomputed A+B ={{averageScore}}

    <v-row class="justify-center mt-5">
      <v-card style="width:90%;" outline>
        <v-img class="align-end" height="100px">
          <v-card-title primary-title>
            ADD QUERYs
          </v-card-title>
        </v-img>
        <v-card-text>
          SQL file : 413
          <v-form @submit.prevent="submit">
            <v-row>
              <v-col class="d-flex" lg="2" cols="4">
                <v-select
                  v-validate="'required'"
                  name="main_menu"
                  v-model="main_menu"
                  :items="items"
                  label="main_menu"
                  :rules="main_menuRule"
                  :class="{ 'v-input--has-state theme--light v-text-field v-text-field--is-booted error--text': errors.has( 'main_menuRule' ), }"
                ></v-select>
              </v-col>

              <v-col lg="1" cols="1">
                <v-text-field   name="menu_maxid" label="เมนูที่"    v-model="menu_maxid"  disabled/>
                <!-- <span>{{ errors.first("lname") }}</span> -->
              </v-col>
            </v-row>

            <v-row class="justify-space-between px-3 pt-5 mb-5">
              <v-col cols="6">
                <v-btn type="submit" block color="success">
                  บันทึก<v-icon dark right> mdi-checkbox-marked-circle </v-icon>
                </v-btn>
              </v-col>
              <v-col cols="6">
                <v-btn block color="orange darken-2" dark @click="cancle"><v-icon dark left> mdi-arrow-left</v-icon>ย้อนกลับ</v-btn>
              </v-col>

              <v-col>
                <v-alert
                  v-if="errorMessage"
                  outlined
                  type="warning"
                  prominent
                  border="left"
                >
                  {{ errorMessage }}</v-alert
                >
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios"
import MenuTabadmin from "@/components/cards/menuTabadmin";
export default {
  name: "addquery",
  components: {
    MenuTabadmin,
  },
  data() {
    return {
      a:0,b:0,
      items     : ["1", "2", "3"],
      //ตัวแปรไว้รับค่าจากฟอร์มเพื่อส่งไปบันทึกลงฐานข้อมูล
      form:{},
      main_menu : "",
      menu_maxid:"",

      //error handling เช็ค error ก่อนบันทึกข้อมูล
      errorMessage: "",
      main_menuRule: [(v1) => !!v1 || "โปรดกรอก เลือกหัวข้อหลัก"],
    };
  },


  methods: {//ทำงานเมื่อมีการเรียกใช้งาน
    cancle() {
      this.$router.back();
    },
    getMaxmenu_id(selected_id){
      this.menu_maxid = selected_id+1;
    }
  },

  computed: {//ทำงานคล้ายๆ watch ใช้เมื่อต้องการแก้ไขข้อมูลบางตัวซึ่งผูกมัดกับข้อมูลอื่น ๆ 
    averageScore: function() {
      var sum = parseInt(this.a) + parseInt(this.b);
      return sum;
    }
  },

  watch: {// watcher นั้นใช้งานหลังจากที่ข้อมูลเปลี่ยนแปลงเสร็จแล้วซึ่งจะทำการเรียกใช้งาน method ที่ต้องการได้เลยมักใช้กับงานที่ใช้ resource เยอะ ๆ เช่น ส่งข้อมูลไปยัง Server หรือ เรียก REST APIs
    main_menu: function (val) {// หากเลือกเมนูแล้วให้ส่งค่า value ขอเมนูนั้นๆมาเพเื่อเรียกใช้ฟังก์ชันต่อ
      // console.log(val)
      this.getMaxmenu_id(val)
    },

  },

  created() {
      console.log( this.$store.get_name('increment'))
      axios.get("http://localhost:3000/api/admin/input-main_name",{ headers: { "x-access-token": this.token }}).then((result) => {
          console.log(result)
      });
  },

};
</script>

<style></style>
