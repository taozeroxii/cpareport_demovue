<template>
  <v-container>
    <MenuTabadmin />
    <v-row class="justify-center mt-5">
      <v-card style="width:90%;" outline>
        <hr />
        <v-card-title primary-title>
          ADD QUERYs <v-spacer></v-spacer> SQL : {{ sql }} <br />
        </v-card-title>
        <hr />
        <v-card-text>
          <v-form @submit.prevent="submit">
            <v-row>
              <v-col class="d-flex" lg="2" cols="4">
                <v-autocomplete
                  :rules="main_menuRule"
                  name="main_menu"
                  v-model="main_menu"
                  v-validate="'required'"
                  :items="itemsmain_menu"
                  label="main_menu"
                  :class="{
                    'v-label theme--light error--text': errors.has(
                      'main_menuRule'
                    ),
                  }"
                ></v-autocomplete>
                <span>{{ errors.first("main_menuRule") }}</span>
              </v-col>

              <v-col lg="1" cols="1">
                <v-text-field
                  name="menu_maxid"
                  label="เมนูที่"
                  v-model="menu_maxid"
                  disabled
                  required
                />
              </v-col>

              <v-col lg="3" cols="3">
                <v-text-field
                  name="menu_sub"
                  label="ชื่อหัวข้อย่อย(menu_sub)"
                  v-model="menu_sub"
                  :rules="main_subRule"
                />
                <span>{{ errors.first("main_subRule") }}</span>
              </v-col>

              <v-col lg="3" cols="3">
                <v-text-field
                  name="menu_title"
                  label="เมื่อชี้หัวข้อย่อย (menu_title)"
                  :rules="main_titleRule"
                  v-model="menu_title"
                />
                <span>{{ errors.first("main_titleRule") }}</span>
              </v-col>

              <v-col lg="3" cols="3">
                <v-select
                  v-validate="'required'"
                  name="menu_link"
                  v-model="menu_link"
                  :items="item_menu_link"
                  label="menu_link"
                  :rules="menu_linkRule"
                  :class="{
                    'v-input--has-state theme--light v-text-field v-text-field--is-booted error--text': errors.has(
                      'menu_linkRule'
                    ),
                  }"
                >
                </v-select>
              </v-col>
            </v-row>

            <v-row class="">
              <v-col lg="3" cols="3">
                <v-text-field
                  name="sql_name"
                  label="SQL names(ชื่อQUERY) ย่อย เช่น DH010"
                  v-model="sql_name"
                  :rules="sql_nameRole"
                />
                <span>{{ errors.first("sql_nameRole") }}</span>
              </v-col>

              <v-col lg="3" cols="3">
                <v-text-field
                  name="sql_head"
                  label="คำที่แสดงในใบรีพอร์ทในหน้านั้น (sql_head)"
                  v-model="sql_head"
                  :rules="sql_headRole"
                />
                <span>{{ errors.first("sql_headRole") }}</span>
              </v-col>

              <v-col class="d-flex" lg="2" cols="4">
                <v-select
                  name="menu_type"
                  v-model="menu_type"
                  :items="item_menu_type"
                  label="menu_type"
                >
                </v-select>
              </v-col>

              <v-col class="d-flex" lg="2" cols="4">
                <v-text-field
                  name="sql_file"
                  v-model="sql_file"
                  label="sql_file"
                  disabled
                />
              </v-col>

              <v-col class="d-flex" lg="2" cols="4">
                <v-text-field
                  name="sql_link"
                  v-model="sql_link"
                  label="sql_link"
                  disabled
                />
              </v-col>
            </v-row>

            <v-row>
              <v-col class="d-flex" lg="12" cols="12">
                <v-textarea
                  solo
                  name="sql_code"
                  v-model="sql_code"
                  label="sql_code"
                ></v-textarea>
              </v-col>
            </v-row>

            <v-row>
              <v-col class="d-flex" lg="12" cols="12">
                <v-textarea
                  solo
                  name="sql_subcode_1"
                  v-model="sql_subcode_1"
                  label="sql_subcode_1"
                ></v-textarea>
              </v-col>
            </v-row>

            <v-row class="justify-space-between px-3 pt-5 mb-1">
              <v-col cols="6">
                <v-btn type="submit" block color="success">
                  บันทึก<v-icon dark right> mdi-checkbox-marked-circle </v-icon>
                </v-btn>
              </v-col>
              <v-col cols="6">
                <v-btn block color="orange darken-2" dark @click="cancle"
                  ><v-icon dark left> mdi-arrow-left</v-icon>ย้อนกลับ</v-btn
                >
              </v-col>

              <v-col>
                <v-alert
                  v-if="errorMessage"
                  outlined
                  type="warning"
                  prominent
                  border="left"
                  >{{ errorMessage }}</v-alert
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
import axios from "axios";
import MenuTabadmin from "@/components/cards/menuTabadmin";
export default {
  name: "addquery",
  components: {
    MenuTabadmin,
  },
  data() {
    return {
      // a:0,b:0,
      headers: { headers: { "x-access-token": this.$store.getters.get_token } },
      itemsmain_menu: [],
      item_menu_link: [],
      item_menu_type: ["OPD", "IPD", "BACKOFFICE", "SUPPORT"],
      //ตัวแปรไว้รับค่าจากฟอร์มเพื่อส่งไปบันทึกลงฐานข้อมูล
      form: {},
      sql: null,
      sql_file: null,
      main_menu: null,
      menu_maxid: null,
      menu_sub: null,
      menu_title: null,
      menu_link: null,
      sql_name: null,
      sql_head: null,
      menu_type: null,
      sql_link: null,
      sql_code: null,
      sql_subcode_1: null,
      //error handling เช็ค error ก่อนบันทึกข้อมูล
      errorMessage: null,
      main_menuRule: [(v1) => !!v1 || "โปรดเลือก หัวข้อหลัก"],
      main_subRule: [(v1) => !!v1 || "โปรดเลือก main_sub"],
      main_titleRule: [(v1) => !!v1 || "โปรดเลือก main_title"],
      menu_linkRule: [(v1) => !!v1 || "โปรดเลือก แบบฟอร์ม"],
      sql_nameRole: [(v1) => !!v1 || "โปรดเลือก  sql_name"],
      sql_headRole: [(v1) => !!v1 || "โปรดเลือก  sql_head"],
    };
  },

  watch: {
    // watcher นั้นใช้งานหลังจากที่ข้อมูลเปลี่ยนแปลงเสร็จแล้วซึ่งจะทำการเรียกใช้งาน method ที่ต้องการได้เลยมักใช้กับงานที่ใช้ resource เยอะ ๆ เช่น ส่งข้อมูลไปยัง Server หรือ เรียก REST APIs
    main_menu: function(val) {
      // หากเลือกเมนูแล้วให้ส่งค่า value ขอเมนูนั้นๆมาเพเื่อเรียกใช้ฟังก์ชันต่อ
      // console.log(val)
      var selectmain_menu_id;
      selectmain_menu_id = val.substring(0, 2);
      this.getMaxmenu_id(selectmain_menu_id);
    },
  },

  created() {
    console.log( this.$store.getters.get_nickname)
    this.getmain_menu();
  },

  methods: {
    cancle() {
      this.$router.back();
    },
    submit() {
      this.$validator.validateAll().then(async (valid) => {
        if (!valid) return this.alertify.error("โปรดกรอกข้อมูลให้ครบก่อนบันทึก");
        await this.setdata_beforesend(); 
        // console.log(this.form)
        await axios.post("http://172.18.2.2:3010/api/admin/addquery", this.form, { headers: { "x-access-token": this.$store.getters.get_token }, }).then(() => {
            this.menu_main =  null;
            this.menu_order =  null;
            this.menu_file = null;
            this.menu_sub =  null;
            this.menu_title = null;
            this.menu_link =  null;
            this.sql_name =  null;
            this.sql_head =  null;
            this.menu_type =  null;
            this.sql_code =  null;
            this.sql_subcode_1 =  null;
            this.menu_userupdate =  null;
            this.sql_userupdate =   null;
            this.form ={},
            this.errors.clear();
            this.getmain_menu();
            this.alertify.success("เพิ่มข้อมูลสำเร็จ");
            this.errorMessage = "Insert success";
          })
          .catch((err) => {
            // console.log(err.response.data.message);
            this.errorMessage = err.response.data.message;
          });
      });
    },
    getMaxmenu_id(selected_id) {
      axios
        .get(`http://172.18.2.2:3010/api/admin/selectmaxmenu/${selected_id}`, {
          headers: { "x-access-token": this.$store.getters.get_token },
        })
        .then((result) => {
          this.menu_maxid = result.data.max_menu;
        });
    },
    getmain_menu() {
      axios
        .get("http://172.18.2.2:3010/api/admin/input-main_name", this.headers)
        .then((result) => {
          var i;
          for (i = 0; i < result.data.length; i++) {
            this.itemsmain_menu.push(
              result.data[i].main_id + "  :" + result.data[i].main_name
            );
          }
        });
      axios
        .get("http://172.18.2.2:3010/api/admin/maxsqlfile_id", this.headers)
        .then((result) => {
          this.sql = result.data.last_id;
          this.sql_link = "report" + result.data.last_id;
          this.sql_file = "sql_0" + result.data.last_id;
        });
      axios
        .get("http://172.18.2.2:3010/api/admin/select-form", this.headers)
        .then((result) => {
          var i;
          for (i = 0; i < result.data.length; i++) {
            this.item_menu_link.push( result.data[i].report_name);
          }
        });
    },
    setdata_beforesend(){
      this.form = {
          sql: this.sql,
          sql_file: this.sql_file,
          menu_main: (this.main_menu.substring(0, 2).trim()),
          menu_order: this.menu_maxid,
          menu_file:this.sql_file,
          menu_sub: this.menu_sub,
          menu_title: this.menu_title,
          menu_link: this.menu_link,
          sql_name: this.sql_name,
          sql_head: this.sql_head,
          menu_type: this.menu_type,
          sql_link: this.sql_link,
          sql_code: this.sql_code,
          sql_subcode_1: this.sql_subcode_1,
          menu_userupdate: this.$store.getters.get_nickname,
          sql_userupdate:  this.$store.getters.get_nickname,
        };
    }
  },
};
</script>

<style></style>
