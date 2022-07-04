<template>
  <v-container>
    <v-row>
      <v-col cols="2"></v-col>
      <v-col cols="8">
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

            <v-col>
              <v-text-field
                v-model="formData.email"
                label="E-mail"
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
      <v-col cols="2"></v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "requestuserhos",
  data() {
    return {
      valid: true,
      checkbox: false,
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
        startcert: null,
        excert: null,
        email: null,
        mobilephone: null,
        username: null,
        password: 1234,
        providertype: null,
        room: [],
        inphone: null,
      },
      nameRules: [(v) => !!v || " โปรดระบุชื่อ"],
      lnameRules: [(v) => !!v || "โปรดระบุนามสกุล"],
      fullnameEngRules: [(v) => !!v || "โปรดกรอกชื่อภาษาอังกฤษ"],
      // emailRules: [(v) => /.+@.+\..+/.test(v) || "โปรดระบุ email ให้ถูกต้อง"],
    };
  },
  created() {
    // console.log("get all data for inputbox");
  },
  mounted() {},
  methods: {
    validate() {
      this.$refs.form.validate();
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
  },
};
</script>

<style></style>
