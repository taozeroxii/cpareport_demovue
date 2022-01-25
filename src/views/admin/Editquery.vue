<template>
  <v-container>
    <v-btn class="mb-5" color="darken-2" dark @click="back">
      <v-icon dark left elevation="7" x-large> mdi-arrow-left</v-icon
      >ย้อนกลับ</v-btn
    >
    <v-row>
      <v-col cols="12" sm="6" offset-sm="3">
        <h3>Query Sql_menu_id : {{ this.$route.params.id }}</h3>
        <v-card>
          <v-toolbar color="teal" dark>
            <h3>sql_head : {{ menu_title }}</h3>
            <template v-slot:extension class=" mb-3">
              <v-btn
                fab
                color="dark"
                bottom
                left
                absolute
                @click="dialog = !dialog"
              >
                log
              </v-btn>
            </template>
          </v-toolbar>

          <v-container class="mt-5">
            <v-form
              ref="form"
              v-model="valid"
              lazy-validation
              @submit.prevent="submit"
            >
              <v-row>
                <v-col cols="6">
                  <label for="SQL-1">sql_code</label>
                  <v-textarea
                    outlined
                    clearable
                    v-model="form.sql_code"
                    name="sql_code"
                    label="SQL-1"
                  ></v-textarea>
                </v-col>
                <v-col cols="6">
                  <label for="SQL-1">sql_subcode_1</label>
                  <v-textarea
                    clearable
                    outlined
                    v-model="form.sql_subcode_1"
                    name="sql_subcode_1"
                    label="SQL-2"
                  ></v-textarea>
                </v-col>
              </v-row>

              <v-checkbox
                v-model="checkbox"
                :rules="[
                  (v) => !!v || 'โปรดกดยืนยันก่อนดำเนินการอัพเดทข้อมูล!',
                ]"
                label="ยืนยันอัพเดทข้อมูล"
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

              <v-btn color="error" class="mr-4" @click="reset">
                reset form
              </v-btn>
            </v-form>
          </v-container>

          <v-dialog v-model="dialog" max-width="70%">
            <v-card>
              <v-card-title>log</v-card-title>
              <v-card-text>
                <v-simple-table dense>
                  <template v-slot:default>
                    <thead>
                      <tr>
                        <th class="text-left">  วันที่/เวลา แก้ไข</th>
                        <th class="text-left">  ผู้แก้ไข</th>
                        <th class="text-left">  old_sql</th>
                        <th class="text-left">  new_sql</th>
                        <th class="text-left">  old_sqlsubcode1</th>
                        <th class="text-left">  new_sqlsubcode1</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="item in logdata" :key="item.name">
                        <td>{{ item.update_datetime }}</td>
                        <td>{{ item.sql_edit_user }}</td>
                        <td>{{ item.old_sql }}</td>
                        <td>{{ item.new_sql }}</td>
                        <td>{{ item.sqlsubcode1_old }}</td>
                        <td>{{ item.sqlsubcode1_new }}</td>
                      </tr>
                    </tbody>
                  </template>
                </v-simple-table>
              </v-card-text>
            </v-card>
          </v-dialog>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  name: "EditQuery",
  data: () => ({
    dialog: false,
    valid: true,
    menu_title: "",
    form: {
      sql_code: null,
      sql_subcode_1: null,
      sql_edit_user: null,
    },
    select: null,
    logdata: [],
    checkbox: false,
  }),

  created() {
    axios.get(  `http://172.18.2.2:3010/api/admin/findOldquerybyid/${this.$route.params.id}`, { headers: { "x-access-token": this.$store.getters.get_token } } ).then((res) => {
        // console.log(res.data)
        this.form.sql_code = res.data.sql_code;
        this.form.sql_subcode_1 = res.data.sql_subcode_1;
        this.menu_title = res.data.menu_title;
      })
      .catch((err) => {
        this.alertify.error(err.response.data.message);
      });
      this.loadlogData();
  },

  methods: {
    back() {
      this.$router.back();
    },
    validate() {
      this.$refs.form.validate();
      if (this.$refs.form.validate() === true) {
        this.form.sql_edit_user = this.$store.getters.get_nickname;
        axios.put( `http://172.18.2.2:3010/api/admin/editquery/${this.$route.params.id}`,this.form, { headers: { "x-access-token": this.$store.getters.get_token } } ).then(() => {
            this.loadlogData();
            this.alertify.success("แก้ไขเรียบร้อย");
          });
      }
    },
    reset() {
      this.$refs.form.reset();
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    },
    loadlogData(){
    axios.get(  `http://172.18.2.2:3010/api/admin/logsqlupdate-list/${this.$route.params.id}`, { headers: { "x-access-token": this.$store.getters.get_token } } ).then((res) => {
            // console.log(res.data)
            this.logdata = res.data;
        })
        .catch((err) => {
            this.alertify.error(err.response.data.message);
        });
    },
  },
};
</script>

<style></style>
