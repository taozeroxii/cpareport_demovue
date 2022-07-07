<template>
  <v-container>
    <v-row>
      <v-col cols="1"></v-col>
      <v-col cols="10">
        <h4 class="mt-5 mb-3 ">
          <v-icon> mdi-account-plus </v-icon> ขอเพิ่ม User เพื่อเข้าใช้งาน ระบบ
          hosxp
        </h4>
        <hr />

        <v-form ref="form" v-model="valid" lazy-validation>
          <v-row>
            <v-col cols="2">
              <v-select
                v-model="formData.pname"
                :items="pname"
                :rules="[(v) => !!v || 'โปรดระบุคำนำหน้า']"
                label="คำนำหน้า"
                required
              ></v-select
            ></v-col>
            <v-col>
              <v-text-field
                v-model="formData.fname"
                :rules="nameRules"
                label="ชื่อ"
                required
              ></v-text-field
            ></v-col>
            <v-col>
              <v-text-field
                v-model="formData.lname"
                :rules="lnameRules"
                label="นามสกุล"
                required
              ></v-text-field
            ></v-col>
            <v-col>
              <v-text-field
                v-model="formData.engfullname"
                :rules="engfullnameRules"
                label="ชื่อภาษาอังกฤษ (FULL NAME)"
                required
              ></v-text-field
            ></v-col>
            <v-col cols="2">
              <v-select
                v-model="formData.gender"
                :items="gender"
                :rules="[(v) => !!v || 'โปรดระบุเพศ']"
                label="เพศ"
                required
              ></v-select
            ></v-col>
          </v-row>

          <v-row>
            <v-col cols="12" sm="6" md="2">
              <v-menu
                v-model="menu2"
                :close-on-content-click="false"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    :rules="[(v) => !!v || 'โปรดเลือกวันเดือนปีเกิด']"
                    v-model="formData.birthday"
                    label="วันเดือนปีเกิด"
                    prepend-icon="mdi-calendar"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  locale="th-th"
                  v-model="formData.birthday"
                  @input="menu2 = false"
                ></v-date-picker>
              </v-menu>
            </v-col>

            <v-col>
              <v-text-field
                v-model="formData.cid"
                label="เลขที่บัตรประชาชน"
                maxlength="13"
                :rules="[
                  (v) =>
                    /^[0-9]+$/.test(v) ||
                    'โปรดกรอกเลขบัตรประชาชนตัวเลขเท่านั้น',
                  (v) => (v && v.length >= 13) || 'โปรดกรอก 13 หลัก',
                ]"
                required
              ></v-text-field
            ></v-col>

            <v-col>
              <v-autocomplete
                :items="position"
                v-model="watchposition"
                label="ตำแหน่ง"
                :rules="[(v) => !!v || 'โปรดกรอกตำแหน่ง']"
                required
              ></v-autocomplete>
            </v-col>

            <v-col>
              <v-autocomplete
                :items="spclty"
                v-model="watchspclty"
                label="แผนก"
                :rules="[(v) => !!v || 'โปรดกรอกแผนก']"
                required
              ></v-autocomplete>
            </v-col>

            <v-col>
              <v-autocomplete
                :items="speciality"
                v-model="formData.speciality"
                label="เฉพาะทาง"
              ></v-autocomplete>
            </v-col>

            <v-col>
              <v-autocomplete
                :items="providertype"
                v-model="formData.providertype"
                label="Providertype"
                :rules="[(v) => !!v || 'โปรดระบุ Providertype']"
                required
              ></v-autocomplete>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12" sm="6" md="3">
              <v-menu
                v-model="menu5"
                :close-on-content-click="false"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="formData.first_day_in_job"
                    label="วันที่เริ่มงาน"
                    prepend-icon="mdi-calendar"
                    readonly
                    :rules="[(v) => !!v || 'โปรดระบุ วันที่เริ่มงาน']"
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  locale="th-th"
                  v-model="formData.first_day_in_job"
                  @input="menu5 = false"
                ></v-date-picker>
              </v-menu>
            </v-col>

            <v-col cols="3">
              <v-text-field
                v-model="formData.doctor_cert"
                label="เลขใบประกอบวิชาชีพ"
              ></v-text-field
            ></v-col>

            <v-col cols="12" sm="6" md="3">
              <v-menu
                v-model="menu3"
                :close-on-content-click="false"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="formData.accepcert"
                    label="วันที่ออกใบอนุญาต"
                    prepend-icon="mdi-calendar"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  locale="th-th"
                  v-model="formData.accepcert"
                  @input="menu3 = false"
                ></v-date-picker>
              </v-menu>
            </v-col>

            <v-col cols="12" sm="6" md="3">
              <v-menu
                v-model="menu4"
                :close-on-content-click="false"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="formData.expirecert"
                    label="วันที่หมดอายุใบอนุญาต"
                    prepend-icon="mdi-calendar"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  locale="th-th"
                  v-model="formData.expirecert"
                  @input="menu4 = false"
                ></v-date-picker>
              </v-menu>
            </v-col>
          </v-row>

          <v-row>
            <v-col>
              <v-text-field
                v-model="formData.emailaddress"
                label="E-mail"
              ></v-text-field
            ></v-col>
            <v-col cols="2">
              <v-text-field
                v-model="formData.mobilenumber"
                label="โทรศัพท์"
              ></v-text-field
            ></v-col>
              <v-col cols="2">
              <v-text-field
                v-model="formData.phone_internal"
                label="โทรศัพท์ภายใน"
                :rules="[(v) => !!v || 'โปรดระบุ โทรศัพท์ภายใน']"
              ></v-text-field
            ></v-col>
            <v-col>
              <v-text-field
                v-model.lazy="formData.username"
                label="ชื่อเข้าใช้งาน Username"
                :rules="[ (v) => !!v || 'โปรดระบุ Username', (v) => /^[a-z0-9]+$/.test(v) || 'โปรดระบุ Username ตัวพิมเล็กหรือตัวอักษร',]"
                required
              />
            </v-col>
            <v-col>
              <v-text-field
                v-model="formData.password"
                label="password"
                disabled
              ></v-text-field
            ></v-col>
          </v-row>

          <hr v-if="doctorplanthai" />
          <h6 v-if="doctorplanthai">
            กรณีบุคลากรแผนไทยโปรดกรอกข้อมูลเพิ่มเติม
          </h6>
          <hr v-if="doctorplanthai" />
          <v-row>
            <v-col cols="2">
              <v-select
                v-model="formData.dcth_saka"
                :items="dcth_saka"
                v-if="doctorplanthai"
                :rules="[(v) => !!v || 'โปรดระบุสาขา/หลักสูตรที่จบ']"
                label="สาขา/หลักสูตรที่จบ"
                required
              ></v-select
            ></v-col>
            <v-col cols="2">
              <v-select
                v-model="formData.dcth_vuti"
                :items="dcth_vuti"
                v-if="doctorplanthai"
                :rules="[(v) => !!v || 'โปรดระบุ วุฒิการศึกษา']"
                label="วุฒิการศึกษา"
                required
              ></v-select
            ></v-col>
            <v-col cols="2">
              <v-select
                v-model="watchdcth_typeschool"
                :items="dcth_typeschool"
                item-text="health_med_institute_type_name"
                item-value="health_med_institute_type_id"
                v-if="doctorplanthai"
                :rules="[(v) => !!v || 'โปรดระบุ ประเภทสถานศึกษา']"
                label="ประเภทสถานศึกษา"
                required
              ></v-select
            ></v-col>
            <v-col cols="2">
              <v-select
                v-model="formData.dcth_nameschool"
                :items="dcth_nameschool"
                v-if="doctorplanthai"
                label="ชื่อสถานศึกษา"
                required
                :disabled="disableschool"
              ></v-select
            ></v-col>
            <v-col cols="2">
              <v-select
                v-model="formData.dcth_service_type"
                :items="dcth_service_type"
                v-if="doctorplanthai"
                label="ชนิดของการบริการ"
                required
              ></v-select
            ></v-col>
            <v-col cols="2">
              <v-select
                v-model="formData.dcth_service_type2"
                :items="dcth_service_type2"
                v-if="doctorplanthai"
                label="ประเภทของการให้บริการ"
                required
              ></v-select
            ></v-col>
          </v-row>




          <v-alert
            v-if="errorMessage"
            border="right"
            colored-border
            type="error"
            elevation="2"
          >
           {{errorMessage}}
          </v-alert>


          <v-checkbox
            v-model="checkbox"
            :rules="[(v) => !!v || 'โปรดกดยืนยันข้อมูล']"
            label="ยืนยันข้อมูล"
            required
          ></v-checkbox>

          <v-btn
            :disabled="!valid"
            color="success"
            class="mr-4"
            @click="validate"
          >
            บันทึก
          </v-btn>

          <!-- <v-btn color="error" class="mr-4" @click="clear">
            ยกเลิก
          </v-btn> -->
        </v-form>
      </v-col>
      <v-col cols="1"></v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  name: "requestuserhos",
  data() {
    return {
      //แผนไทยตัวแปร
      disableschool:false,// ปิดปุ่มช่ื่อสถานศึกษาหากเป็นอื่นๆ
      watchspclty: null,
      doctorplanthai: false, //โชว input แผนไทย
      watchdcth_typeschool: null,
      schooltype_id: null,
      dcth_saka: [],
      dcth_vuti: [],
      dcth_typeschool: [],
      dcth_nameschool: [],
      dcth_typecert: [],
      dcth_service_type: [],
      dcth_service_type2: [],

      date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().substr(0, 10),
      menu2: false,
      menu3: false,
      menu4: false,
      menu5: false,
      valid: true,
      checkbox: false,
      watchposition:null,
      position: [],
      spclty: [],
      speciality: [],
      providertype: [],
      pname: [
        "นาย",
        "นาง",
        "น.ส.",
        "นพ.",
        "นศพ.",
        "พญ.",
        "พทป.",
        "ทพ.",
        "ทพญ.",
        "ภก.",
        "ภกญ.",
        "ภญ.",
      ],
      gender: ["ชาย", "หญิง"],
      formData: {
        pname: null,
        fname: null,
        lname: null,
        engfullname: null,
        gender: null,
        birthday: null,
        cid: null,
        jobclass: null,
        spclty: null,
        speciality: null,
        doctor_cert: null,
        first_day_in_job: null,
        accepcert: null,
        expirecert: null,
        emailaddress: null,
        mobilenumber: null,
        username: null,
        password: 1234,
        providertype: null,
        note: null,
        dcth_saka: null,
        dcth_vuti: null,
        dcth_typeschool: null,
        dcth_nameschool: null,
        dcth_service_type: null,
        dcth_service_type2: null,
        ip_insert:localStorage.ip,
        phone_internal:null,
        insertdate_time:new Date().toLocaleString(),
        status:"waiting",
      },
      nameRules: [(v) => !!v || " โปรดระบุชื่อ"],
      lnameRules: [(v) => !!v || "โปรดระบุนามสกุล"],
      engfullnameRules: [(v) => !!v || "โปรดกรอกชื่อภาษาอังกฤษ"],
      // emailRules: [(v) => /.+@.+\..+/.test(v) || "โปรดระบุ email ให้ถูกต้อง"],
      errorMessage:null,
    };
  },

  watch: {
    watchspclty: function(val) {
      this.formData.spclty = val;
      //หากเจอแพทย์แผนไทยให้สถานะฟอร์ม  2 เป็น true เพื่อให้กรอกข้อมูลของแพทย์แผนไทยเพิ่ม
      if (val.match(/แผนไทย.*/)) {
        this.doctorplanthai = true;
        this.formData.note = "021,251,252,253,386,387";
      } else {
        this.doctorplanthai = false;
      }
    },
    watchposition: function(val) {
      this.formData.jobclass = val;
      //หากเจอแพทย์แผนไทยให้สถานะฟอร์ม  2 เป็น true เพื่อให้กรอกข้อมูลของแพทย์แผนไทยเพิ่ม 
      if (val.match(/ผู้ช่วยทันตแพทย์.*/)) {
        this.formData.note = "287,321";
      }
      else if (val.match(/ทันตแพทย์.*/)) {
        this.formData.note = "322";
      }else if(val.match(/เภสัชกร.*/)){
        this.formData.note = "258,378,388,435,436,437,488,647,656";
      }else if(val.match(/พยาบาล.*/)){
        this.formData.note = "259,260,333,334";
      }
      else if(val.match(/แพทย์.*/)){
        this.formData.note = "257,267,270,271,306,601,603";
      }
    },
    watchdcth_typeschool: function(val) {
      for(var i=0;i< this.dcth_typeschool.length;i++){//ส่งค่า id ประเภทสถานศึกษาที่เลือกมาเทียบกับค่าใน array แล้วเอาชื่อไปเก็บในตัวแปรที่จะส่งไป insert ข้อมูล
        if(this.dcth_typeschool[i].health_med_institute_type_id == val){
          this.formData.dcth_typeschool = this.dcth_typeschool[i].health_med_institute_type_name;
          // console.log( this.formData.dcth_typeschool )
        }
      }

      this.formData.dcth_typeschool =  val;
      if (val) {
        this.loadnameschool(val);
      } 
      if(val == 13){
        this.disableschool = true;
      }else{
        this.disableschool = false;
      }
     
    },
  },

  async created() {
    await this.loadDatainput();
    await this.loadDatainputdcth();
  },

  mounted() {},

  methods: {
    validate() {
      this.$refs.form.validate();
      if (this.$refs.form.validate()) {
        //บันทึกข้อมูลลงฐานข้อมูล
        console.log(this.formData);
        axios.post(`http://172.16.0.251:3010/api/requestUserHos/insertreq`,this.formData) .then(() => { 
          this.alertify.success("แจ้งข้อมูลไปยังผู้ดูแลระบบเรียบร้อย");
          this.errorMessage = null;
          this.watchposition = null;
          this.watchspclty = null;
          this.watchdcth_typeschool = null;
          this.formData= {
            pname: null,
            fname: null,
            lname: null,
            engfullname: null,
            gender: null,
            birthday: null,
            cid: null,
            jobclass: null,
            spclty: null,
            speciality: null,
            doctor_cert: null,
            first_day_in_job: null,
            accepcert: null,
            expirecert: null,
            emailaddress: null,
            mobilenumber: null,
            username: null,
            password: 1234,
            providertype: null,
            note: null,
            dcth_saka: null,
            dcth_vuti: null,
            dcth_typeschool: null,
            dcth_nameschool: null,
            dcth_service_type: null,
            dcth_service_type2: null,
            ip_insert:localStorage.ip,
            phone_internal:null,
          };
          this.$refs.form.resetValidation();
        }).catch((err) => {
            this.errorMessage = err.response.data.message;
        });
      }
    },
    clear() {
      this.$refs.form.resetValidation();
      this.formData = {
        pname: null,
        fname: null,
        lname: null,
        engfullname: null,
        gender: null,
        birthday: null,
        cid: null,
        jobclass: null,
        spclty: null,
        speciality: null,
        providertype: null,
        doctor_cert: null,
        accepcert: null,
        expirecert: null,
        emailaddress: null,
        mobilenumber: null,
        username: null,
        password: 1234,
        room: [],
        inphone: null,
      };
      this.dcth_nameschool = [];
      this.watchdcth_typeschool = null;
    },
    loadDatainput() {
      axios
        .get(`http://172.16.0.251:3010/api/requestUserHos/position`)
        .then((result) => {
          for (var i = 0; i < result.data.length; i++) {
            this.position.push(result.data[i].name);
          }
        });
      axios
        .get(`http://172.16.0.251:3010/api/requestUserHos/spclty`)
        .then((result) => {
          for (var i = 0; i < result.data.length; i++) {
            this.spclty.push(result.data[i].name);
          }
        });
      axios
        .get(`http://172.16.0.251:3010/api/requestUserHos/speciality`)
        .then((result) => {
          for (var i = 0; i < result.data.length; i++) {
            this.speciality.push(result.data[i].doctor_department_name);
          }
        });
      axios
        .get(`http://172.16.0.251:3010/api/requestUserHos/providertype`)
        .then((result) => {
          for (var i = 0; i < result.data.length; i++) {
            this.providertype.push(result.data[i].provider_type_name);
          }
        });
    },
    loadDatainputdcth() {
      axios
        .get(`http://172.16.0.251:3010/api/requestUserHos/health_med_curriculum`)
        .then((result) => {
          for (var i = 0; i < result.data.length; i++) {
            this.dcth_saka.push(result.data[i].health_med_curriculum_name);
          }
        });
      axios
        .get(`http://172.16.0.251:3010/api/requestUserHos/health_med_educational`)
        .then((result) => {
          for (var i = 0; i < result.data.length; i++) {
            this.dcth_vuti.push(result.data[i].health_med_educational_name);
          }
        });
      axios
        .get(
          `http://172.16.0.251:3010/api/requestUserHos/health_med_institute_type`
        )
        .then((result) => {
          this.dcth_typeschool = result.data;
        });

      axios
        .get(
          `http://172.16.0.251:3010/api/requestUserHos/health_med_provider_type`
        )
        .then((result) => {
          for (var i = 0; i < result.data.length; i++) {
            this.dcth_service_type.push(
              result.data[i].health_med_provider_type_name
            );
          }
        });

      axios
        .get(
          `http://172.16.0.251:3010/api/requestUserHos/health_med_provider_category`
        )
        .then((result) => {
          for (var i = 0; i < result.data.length; i++) {
            this.dcth_service_type2.push(
              result.data[i].health_med_provider_category_name
            );
          }
        });
    },
    loadnameschool(id) {
      this.dcth_nameschool = [];
      axios
        .get(
          `http://172.16.0.251:3010/api/requestUserHos/health_med_institute/${id}`
        )
        .then((result) => {
          for (var i = 0; i < result.data.length; i++) {
            this.dcth_nameschool.push(result.data[i].health_med_institute_name);
          }
        });
    },
  },
};
</script>

<style></style>
