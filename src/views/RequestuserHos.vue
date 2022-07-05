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
                v-model="formData.FullNameENG"
                :rules="fullnameEngRules"
                label="ชื่อภาษาอังกฤษ (FULL NAME)"
                required
              ></v-text-field
            ></v-col>
            <v-col cols="2">
              <v-select
                v-model="formData.sex"
                :items="sex"
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
                  (v) => /^[0-9]+$/.test(v) ||'โปรดกรอกเลขบัตรประชาชนตัวเลขเท่านั้น',
                  (v) => (v && v.length >= 13) || 'โปรดกรอก 13 หลัก',
                ]"
                required
              ></v-text-field
            ></v-col>

            <v-col>
              <v-autocomplete
                :items="position"
                v-model="formData.main_position"
                label="ตำแหน่ง"
                :rules="[(v) => !!v || 'โปรดกรอกตำแหน่ง']"
                required
              ></v-autocomplete>
            </v-col>

            <v-col>
              <v-autocomplete
                :items="spclty"
                v-model="formData.spclty"
                label="แผนก"
                :rules="[(v) => !!v || 'โปรดกรอกแผนก']"
                required
              ></v-autocomplete>
            </v-col>

            <v-col>
              <v-autocomplete
                :items="spciality"
                v-model="formData.spciality"
                label="เฉพาะทาง"
              ></v-autocomplete>
            </v-col>

            <v-col>
              <v-autocomplete
                :items="providertype"
                v-model="formData.providertype"
                label="Providertype"
                :rules="[(v) => !!v || 'โปรดระบุ Providertypedadw']"
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
                    v-model="formData.startjob"
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
                  v-model="formData.startjob"
                  @input="menu5 = false"
                ></v-date-picker>
              </v-menu>
            </v-col>

            <v-col cols="3">
              <v-text-field
                v-model="formData.dccertno"
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
                    v-model="formData.startcert"
                    label="วันที่ออกใบอนุญาต"
                    prepend-icon="mdi-calendar"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  locale="th-th"
                  v-model="formData.startcert"
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
                    v-model="formData.excert"
                    label="วันที่หมดอายุใบอนุญาต"
                    prepend-icon="mdi-calendar"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  locale="th-th"
                  v-model="formData.excert"
                  @input="menu4 = false"
                ></v-date-picker>
              </v-menu>
            </v-col>
          </v-row>




          <v-row>
            <v-col>
              <v-text-field
                v-model="formData.email"
                label="E-mail"
              ></v-text-field
            ></v-col>
            <v-col>
              <v-text-field
                v-model="formData.mobilephone"
                label="โทรศัพท์"
              ></v-text-field
            ></v-col>
            <v-col>
              <v-text-field
                v-model="formData.username"
                label="ชื่อเข้าใช้งาน Username"
                :rules="[
                  (v) => !!v || 'โปรดระบุ Username',
                  (v) =>/^[a-z0-9]+$/.test(v) ||'โปรดระบุ Username ตัวพิมเล็กหรือตัวอักษร',
               
                ]"
                required
              ></v-text-field
            ></v-col>
            <v-col>
              <v-text-field
                v-model="formData.password"
                label="password"
                disabled
              ></v-text-field
            ></v-col>
          </v-row>

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

          <v-btn color="error" class="mr-4" @click="clear">
            ยกเลิก
          </v-btn>
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
      date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().substr(0, 10),
      menu2: false,
      menu3: false,
      menu4: false,
      menu5: false,
      valid: true,
      checkbox: false,
      position: [],
      spclty: [],
      spciality: [],
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
      sex: ["ชาย", "หญิง"],
      formData: {
        pname: null,
        fname: null,
        lname: null,
        FullNameENG: null,
        sex: null,
        birthday: null,
        cid: null,
        main_position: null,
        spclty: null,
        spciality: null,
        dccertno: null,
        startjob: null,
        startcert: null,
        excert: null,
        email: null,
        mobilephone: null,
        username: null,
        password: 1234,
        providertype: null,
        // room: [],
        inphone: null,
      },
      nameRules: [(v) => !!v || " โปรดระบุชื่อ"],
      lnameRules: [(v) => !!v || "โปรดระบุนามสกุล"],
      fullnameEngRules: [(v) => !!v || "โปรดกรอกชื่อภาษาอังกฤษ"],
      // emailRules: [(v) => /.+@.+\..+/.test(v) || "โปรดระบุ email ให้ถูกต้อง"],
    };
  },
  watch: {},
  created() {
    this.loadDatainput();
  },
  mounted() {},
  methods: {
    validate() {
      this.$refs.form.validate();
      if (this.$refs.form.validate()) {
        //บันทึกข้อมูลลงฐานข้อมูล
        console.log(this.formData);
      }
    },
    clear() {
      this.$refs.form.resetValidation();
      this.formData = {
        pname: null,
        fname: null,
        lname: null,
        FullNameENG: null,
        sex: null,
        birthday: null,
        cid: null,
        main_position: null,
        spclty: null,
        spciality: null,
        dccertno: null,
        startcert: null,
        excert: null,
        email: null,
        mobilephone: null,
        username: null,
        password: 1234,
        providertype: null,
        room: [],
        inphone: null,
      };
    },
    loadDatainput() {
      axios
        .get(`http://localhost:3010/api/requestUserHos/position`)
        .then((result) => {
          for (var i = 0; i < result.data.length; i++) {
            this.position.push(result.data[i].name);
          }
        });
      axios
        .get(`http://localhost:3010/api/requestUserHos/spclty`)
        .then((result) => {
          for (var i = 0; i < result.data.length; i++) {
            this.spclty.push(result.data[i].name);
          }
        });
      axios
        .get(`http://localhost:3010/api/requestUserHos/speciality`)
        .then((result) => {
          for (var i = 0; i < result.data.length; i++) {
            this.spciality.push(result.data[i].doctor_department_name);
          }
        });
      axios
        .get(`http://localhost:3010/api/requestUserHos/providertype`)
        .then((result) => {
          for (var i = 0; i < result.data.length; i++) {
            this.providertype.push(result.data[i].provider_type_name);
          }
        });
    },
  },
};
</script>

<style></style>
