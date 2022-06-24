<template>
  <v-container>
    <v-btn
      color="primary"
      :disabled="
        forminput == 'report_form_multipleselect.php' ||
        forminput == 'report_form_001.php' ||
        forminput == 'report_form_blood.php'
          ? true
          : false
      "
      target="_blank"
      :href="
        'http://172.16.0.251/report/' +
          forminput +
          '?sql=' +
          this.$route.params.sql
      "
      >คลิ๊กเพื่อไปยังเวอร์ชั่นเดิม เมื่อปุ่มเป็นสีน้ำเงิน
      ฟอร์มรับข้อมูลปัจจุบัน {{ forminput }}
    </v-btn>

    <hr class="mb-3 mt-5" />

    <form @submit.prevent="submitForm()">
      <v-container
        v-if="
          forminput == 'report_form_multipleselect.php' ||
            forminput == 'report_form_001.php' ||
            forminput == 'report_form_blood.php'
        "
      >
        <v-row>
          <v-menu
            v-model="datepicker1"
            :close-on-content-click="false"
            :nudge-right="40"
            transition="scale-transition"
            offset-y
            min-width="auto"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="form.date1"
                label="วันที่เริ่มต้น"
                prepend-icon="mdi-calendar"
                readonly
                v-if="!ckInput.date1"
                :disabled="ckInput.date1"
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="form.date1"
              locale="th-th"
              @input="datepicker1 = false"
              color="green lighten-1"
            ></v-date-picker>
          </v-menu>

          <v-menu
            v-model="datepicker2"
            :close-on-content-click="false"
            :nudge-right="40"
            transition="scale-transition"
            offset-y
            min-width="auto"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="form.date2"
                label="วันที่สิ้นสุด"
                prepend-icon="mdi-calendar"
                readonly
                v-bind="attrs"
                v-if="!ckInput.date2"
                :disabled="ckInput.date2"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="form.date2"
              locale="th-th"
              @input="datepicker2 = false"
            ></v-date-picker>
          </v-menu>
          <!-- <p>
            วันที่สิ้นสุด: <strong>{{ form.date2 }}</strong>
          </p> -->

          <v-menu
            ref="menu"
            v-model="timepicker1"
            :close-on-content-click="false"
            :nudge-right="40"
            transition="scale-transition"
            offset-y
            max-width="290px"
            min-width="290px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="form.time1"
                :disabled="ckInput.time1"
                v-if="!ckInput.time1"
                label="โปรดเลือกเวลาเริ่มต้น"
                prepend-icon="mdi-clock-time-four-outline"
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-time-picker
              v-if="timepicker1"
              format="24hr"
              v-model="form.time1"
              full-width
              @click:minute="$refs.menu.save(form.time1)"
            ></v-time-picker>
          </v-menu>

          <v-menu
            ref="menu"
            v-model="timepicker2"
            :close-on-content-click="false"
            :nudge-right="40"
            transition="scale-transition"
            offset-y
            max-width="290px"
            min-width="290px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="form.time2"
                v-if="!ckInput.time2"
                :disabled="ckInput.time2"
                label="โปรดเลือกเวลาสิ้นสุด"
                prepend-icon="mdi-clock-time-four-outline"
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-time-picker
              v-if="timepicker2"
              format="24hr"
              v-model="form.time2"
              full-width
              @click:minute="$refs.menu.save(form.time2)"
            ></v-time-picker>
          </v-menu>

          <v-text-field
            label="รหัสโรค"
            single-line
            v-if="!ckInput.sdiag"
            :disabled="ckInput.sdiag"
            v-model="form.sdiag"
          ></v-text-field>

          <v-text-field
            label="รหัสโรคสิ้นสุด"
            v-if="!ckInput.ediag"
            v-model="form.ediag"
            :disabled="ckInput.ediag"
            single-line
          ></v-text-field>
        </v-row>

        <v-autocomplete
          :items="spclty"
          v-if="!ckInput.spclty"
          :disabled="ckInput.spclty"
          v-model="form.spclty"
          label="โปรดเลือกแผนก หากไม่เลือกจะแสดงรายการทั้งหมด"
          multiple
        ></v-autocomplete>

        <v-autocomplete
          :items="kskdepartments"
          v-if="!ckInput.kskdepartments"
          :disabled="ckInput.kskdepartments"
          v-model="form.kskdepartments"
          multiple
          label="โปรดเลือกห้องใช้งาน  หากไม่เลือกจะแสดงรายการทั้งหมด"
        ></v-autocomplete>

        <v-autocomplete
          :items="ward"
          v-if="!ckInput.ward"
          :disabled="ckInput.ward"
          v-model="form.ward"
          multiple
          label="โปรดเลือก ward  หากไม่เลือกจะแสดงรายการทั้งหมด"
        ></v-autocomplete>

        <v-select
          :disabled="ckInput.pttype"
          v-if="!ckInput.pttype"
          v-model="form.pttype"
          :items="pttype"
          label="โปรดเลือกสิทธิ หากไม่เลือกจะแสดงรายการทั้งหมด"
          multiple
        >
          <template v-slot:prepend-item>
            <v-list-item ripple @click="toggle">
              <v-list-item-action>
                <v-icon
                  :color="form.pttype.length > 0 ? 'indigo darken-4' : ''"
                >
                  {{ icon }}
                </v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>
                  เลือกทุกรายการ
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-divider class="mt-2"></v-divider>
          </template>
          <template v-slot:append-item>
            <v-divider class="mb-2"></v-divider>
            <v-list-item disabled>
              <v-list-item-avatar color="grey lighten-3">
                <v-icon>
                  mdi-food-apple
                </v-icon>
              </v-list-item-avatar>

              <v-list-item-content v-if="likesAllFruit">
                <v-list-item-title>
                  เลือกทุกรายการ
                </v-list-item-title>
              </v-list-item-content>

              <v-list-item-content v-else-if="likesSomeFruit">
                <v-list-item-title>
                  สิทธิ ที่เลือก
                </v-list-item-title>
                <v-list-item-subtitle>
                  {{ form.pttype.length }}
                </v-list-item-subtitle>
              </v-list-item-content>

              <v-list-item-content v-else>
                <v-list-item-title>
                  โปรดเลือก สิทธิ ที่ต้องการ
                </v-list-item-title>
                <v-list-item-subtitle>
                  สามารถเลือกได้มากกว่า 1 รายการ
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </template>
        </v-select>

        <v-autocomplete
          :items="doctor"
          v-if="!ckInput.doctor"
          :disabled="ckInput.doctor"
          v-model="form.doctor"
          multiple
          label="โปรดเลือกบุคลากรที่ดำเนินการ  หากไม่เลือกจะแสดงรายการทั้งหมด"
        >
        </v-autocomplete>

        <v-btn type="submit" x-large class="success mb-5"
          ><v-icon class="mr-5">mdi-file-find</v-icon>ค้นหา</v-btn
        >
      </v-container>
    </form>

    <!-- alert message And progress bar when data is loading's long time -->
    <v-alert
      v-if="errorMessage != '' || errorMessage2 != ''"
      outlined
      dense
      type="error"
    >
      Error <strong>{{ errorMessage }}{{ errorMessage2 }}</strong>
    </v-alert>
    <v-progress-circular
      v-if="loading"
      :size="55"
      color="primary"
      indeterminate
    >  {{percentCompletedrun}}</v-progress-circular>

    <hr />

    <!-- tables show data section  -->
    <v-card
      v-if="
        forminput == 'report_form_multipleselect.php' ||
          forminput == 'report_form_001.php' ||
          forminput == 'report_form_blood.php'
      "
    >
      <v-card-title>
        {{ sql_name }}
        <v-spacer></v-spacer>
        <v-btn
          color="blue"
          class="mr-3"
          dark
          @click="sheet = !sheet"
          v-if="exceldata != '' && adminlogin == '1'"
        >
          SQL query</v-btn
        >
        &nbsp;
        <v-btn class="warning mr-3" @click="onExport" v-if="exceldata != ''"
          >File excel</v-btn
        >
        <input
          type="text"
          v-model.lazy="search"
          placeholder="กรอกคำที่ต้องการค้นหา..."
          class="inputclass"
        />
      </v-card-title>
      <v-data-table
        :headers="headers"
        :items="responseDataarray"
        :search="search"
        :footer-props="{ 'items-per-page-options': [10, 20, 30, 40, 50] }"
      ></v-data-table>
    </v-card>

    <!-- tables show data 2 section  -->
    <br />
    <v-card v-if="showdatable2">
      <v-card-title>
        ข้อมูลชุดที่ 2
        <v-spacer></v-spacer>
        <v-btn class="warning mr-3" @click="onExport2" v-if="exceldata2 != ''"
          >File excel</v-btn
        >
        <!-- <input
          type="text"
          v-model.lazy="search"
          placeholder="กรอกคำที่ต้องการค้นหา..."
          class="inputclass"
        /> -->
      </v-card-title>
      <v-data-table
        :headers="headers2"
        :items="responseDataarray2"
        :footer-props="{ 'items-per-page-options': [10, 20, 30, 40, 50] }"
      ></v-data-table>
    </v-card>

    <div class="text-center">
      <v-bottom-sheet v-model="sheet">
        <v-sheet class="text-center" height="200px">
          <v-btn class="mt-6" text color="red" @click="sheet = !sheet">
            close
          </v-btn>
          <div class="py-3">
            SQL QUERY CODE
            <hr />
            <v-row>
              <v-col lg="6">
                <v-textarea
                  outlined
                  name="input-7-4"
                  label="SQL-1"
                  id="n1"
                  :value="getsqlcode"
                  @click="copysqlcode1"
                ></v-textarea
              ></v-col>
              <v-col lg="6">
                <v-textarea
                  outlined
                  name="input-7-4"
                  label="SQL-2"
                  id="n2"
                  :value="getsqlcode2"
                  @click="copysqlcode1"
                ></v-textarea
              ></v-col>
            </v-row>

            <v-textarea
              outlined
              name="input-7-4"
              label="SQL-2"
              :value="form.sql2"
            ></v-textarea>
          </div>
        </v-sheet>
      </v-bottom-sheet>



    </div>
  </v-container>
</template>

<script>
import axios from "axios";
import XLSX from "xlsx"; // import xlsx
import moment from 'moment';
axios.defaults.timeout = 1000 * 120 ;//set axios timeout

export default {
  name: "tableshowdata",
  data: () => ({  
    sheet: false,
    search: "",
    adminlogin: null,
    timepicker1: null,
    timepicker2: null,
    datepicker1: false,
    datepicker2: false,
    getsqlcode: "",
    getsqlcode2: "",
    showdatable1: "",
    showdatable2: "",
    sql_name: "",
    loading: false,
    loading2: false,
    errorMessage: "",
    errorMessage2: "",
    form: {
      sql: "",
      sql2: "",
      date1: "",
      date2: "",
      time1: null,
      time2: null,
      sdiag: null,
      ediag: null,
      pttype: [],
      spclty: [], // ค่าที่จะส่งไป
      ward: [],
      kskdepartments: [],
      doctor: [],
    },
    ckInput: {
      //เช็ค disable ปุ่ม
      date1: null,
      date2: null,
      ward: null,
      doctor: null,
      spclty: null,
      kskdepartments: null,
      pttype: null,
      time1: null,
      time2: null,
      sdiag: null,
      ediag: null,
    },
    Checkform: "",
    exceldata: "",
    exceldata2: "",
    doctor: [],
    pttype: [],
    spclty: [], // ตัวเลือก spclty
    ward: [],
    kskdepartments: [],
    headers: [],
    headers2: [],
    responseDataarray: [],
    responseDataarray2: [],
    forminput: "",
    percentCompletedrun :0,
    logExceldata:{
      sql_file:null,
      username:null,
      token:null,
      datetime:moment(new Date()).format("YYYY-MM-DD HH:mm:ss")
    },
  }),

  created() {
    this.adminlogin = localStorage.status;
    this.selectinput();
  },


  mounted() {
    this.logExceldata.sql_file = this.$route.params.sql;
    this.logExceldata.username = this.$store.getters.get_username;
    this.logExceldata.token = this.$store.getters.get_token;
    // console.log(this.logExceldata)
  },

  computed: {
    likesAllFruit() {
      return this.form.pttype.length === this.pttype.length;
    },
    likesSomeFruit() {
      return this.form.pttype.length > 0 && !this.likesAllFruit;
    },
    icon() {
      if (this.likesAllFruit) return "mdi-close-box";
      if (this.likesSomeFruit) return "mdi-minus-box";
      return "mdi-checkbox-blank-outline";
    },
  },

  methods: {
    toggle() {
      this.$nextTick(() => {
        if (this.likesAllFruit) {
          this.form.pttype = [];
        } else {
          this.form.pttype = this.pttype.slice();
        }
      });
    },

    submitForm() {
      this.percentCompletedrun = 'loading';
      // console.log(this.$route.params.sql)
      this.form.sql = this.$route.params.sql;
      this.form.sql2 = this.$route.params.sql;
      this.loading = true;
      this.headers = []; // clear data array ก่อนจะเพิ่มค่าใหม่ลงไปเพื่อแสดงใน data tables
      this.headers2 = []; // หากไม่ประกาศดักไว้ค่าหัสคอลั่มจะเพิ่มขึ้นเรื่อยๆเมื่อมีการกด submit Form ครั้งต่อๆไป

      var i;
      if (this.ckInput.pttype === false) {
        for (i = 0; i < this.form.pttype.length; i++) {
          this.form.pttype[i] = "'" + this.form.pttype[i].substring(0, 2) + "'";
        }
      }

      if (this.ckInput.spclty === false) {
        for (i = 0; i < this.form.spclty.length; i++) {
          this.form.spclty[i] = "'" + this.form.spclty[i].substring(0, 2) + "'";
        }
      }
      if (this.ckInput.kskdepartments === false) {
        for (i = 0; i < this.form.kskdepartments.length; i++) {
          this.form.kskdepartments[i] =
            "'" + this.form.kskdepartments[i].substring(0, 3) + "'";
        }
      }
      if (this.ckInput.ward === false) {
        for (i = 0; i < this.form.ward.length; i++) {
          this.form.ward[i] = "'" + this.form.ward[i].substring(0, 2) + "'";
        }
      }

      if (this.ckInput.doctor === false) {
        for (i = 0; i < this.form.doctor.length; i++) {
          this.form.doctor[i] = "'" + this.form.doctor[i].substring(0, 4) + "'";
        }
      }

      if (this.form.sdiag != null)
        this.form.sdiag = this.form.sdiag.toUpperCase();
      if (this.form.ediag != null)
        this.form.ediag = this.form.ediag.toUpperCase();


  
      axios .post( `http://172.18.2.2:3010/api/tableshowdata/queryfrominput`, this.form ,  
          {
              onDownloadProgress: (progressEvent) => {
                this.percentCompletedrun = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                // console.log(progressEvent.lengthComputable);
                // console.log(this.percentCompletedrun);
              }
          } ).then((result) => 
        {
          // this.getData = result.data;
          // this.headers =  [{ text: result.data.fields[0].name, value:  result.data.fields[0].name }];
          //  console.log(result.data)
          var i;
          for (i = 0; i < result.data.fields.length; i++) {
            //map field data ใส่ลง data table เพื่อการแสดงผลข้อมูลตามชุดคำสั่ง query
            this.headers.push({
              text: result.data.fields[i].name,
              value: result.data.fields[i].name,
            }); // เป็น obj อยู่แล้ว ดันมี obj array ว้อนในอีกทีตรงช่อง fields เลยต้องเพิ่มทีละช่อง
          }
          // console.log(this.headers);
          this.responseDataarray = result.data.rows; //map data ใส่ลง data table
          this.exceldata = this.responseDataarray;
          this.getsqlcode = result.data.sqlreplace; //code 1
          this.form.kskdepartments = '';
          this.loading = false;
          this.errorMessage = "";
          this.selectinput();
          this.percentCompletedrun=0;
        })
      .catch((err) => {
          this.loading = false;
          this.alertify.error(err.message);
          this.errorMessage = err.response.data.message;
          this.selectinput();
          this.percentCompletedrun=0;
        });

      if( this.showdatable2 !== '' &&  this.showdatable2 !== null){
            axios .post( `http://172.18.2.2:3010/api/tableshowdata/queryfrominputsql2`, this.form).then((result) => {
              var i;
              // console.log(result.data)
              for (i = 0; i < result.data.fields.length; i++) {
                //map field data ใส่ลง data table เพื่อการแสดงผลข้อมูลตามชุดคำสั่ง query
                this.headers2.push({
                  text: result.data.fields[i].name,
                  value: result.data.fields[i].name,
                }); // เป็น obj อยู่แล้ว ดันมี obj array ว้อนในอีกทีตรงช่อง fields เลยต้องเพิ่มทีละช่อง
              }
              this.getsqlcode2 = result.data.sqlreplace;
              this.responseDataarray2 = result.data.rows; //map data ใส่ลง data table
              this.exceldata2 = this.responseDataarray2;
              // console.log( this.responseDataarray2 );

              this.loading2 = false;
              this.errorMessage2 = "";
              this.selectinput();
            }).catch((err) => {
              this.loading2 = false;
              this.errorMessage2 = err.response.data.message;
              this.selectinput();
            });
      }
     
    },

    onExport() {
      axios.post('http://172.18.2.2:3010/api/tableshowdata/log_exportexcel',this.logExceldata).then(() => {
        const dataWS = XLSX.utils.json_to_sheet(this.exceldata);
        const wb = XLSX.utils.book_new();
        const namefile = Date.now();

        XLSX.utils.book_append_sheet(wb, dataWS);
        XLSX.writeFile(wb, `excel_export_${namefile}.xlsx`);
      });
    },

    onExport2() {
      axios.post('http://172.18.2.2:3010/api/tableshowdata/log_exportexcel',this.logExceldata).then(() => {
        const dataWS = XLSX.utils.json_to_sheet(this.exceldata2);
        const wb = XLSX.utils.book_new();
        const namefile = Date.now();

        XLSX.utils.book_append_sheet(wb, dataWS);
        XLSX.writeFile(wb, `excel_export_${namefile}.xlsx`);
      });
    },

    selectinput() {
      axios.get( `http://172.18.2.2:3010/api/tableshowdata/menusql/${this.$route.params.sql}` ) .then((result) => {this.forminput = result.data.menu_link; });

      axios.get(`http://172.18.2.2:3010/api/tableshowdata/sql/${this.$route.params.sql}`  ) .then((result) => {
          // console.log(result)
          this.showdatable1 = result.data.sql_code;
          this.showdatable2 = result.data.sql_subcode_1;

          this.sql_name = result.data.sql_head; //name 1
          //เช็ค query ว่ามีตัวแปร ต่ามที่กำหนด ไหมหากไม่มี disable ปุ่ม
          this.ckInput.date1 = this.secrchInput(
            result.data.sql_code.search("{datepickers}")
          );
          this.ckInput.date2 = this.secrchInput(
            result.data.sql_code.search("{datepickert}")
          );
          this.ckInput.time1 = this.secrchInput(
            result.data.sql_code.search("{stime}")
          ); //เรียกใช้งาน function secrchInput ส่งค่าไปเช็ค ifelse
          this.ckInput.time2 = this.secrchInput(
            result.data.sql_code.search("{etime}")
          );
          this.ckInput.sdiag = this.secrchInput(
            result.data.sql_code.search("{sicd10}")
          );
          this.ckInput.ediag = this.secrchInput(
            result.data.sql_code.search("{eicd10}")
          );

          // console.log(result.data.sql_code.search('{multiple_pttype}') )
          // console.log(result.data.sql_code);

          if (result.data.sql_code.search("{multiple_pttype}") >= 0) {
            this.ckInput.pttype = false;
            axios
              .get(`http://172.18.2.2:3010/api/selectinput/pttype`)
              .then((res) => {
                var i;
                for (i = 0; i < res.data.length; i++) {
                  this.pttype.push(
                    res.data[i].pttype + "  :" + res.data[i].name
                  );
                }
              });
          } else {
            this.ckInput.pttype = true;
          }

          if (result.data.sql_code.search("{multiple_spclty}") >= 0) {
            this.ckInput.spclty = false;
            axios
              .get(`http://172.18.2.2:3010/api/selectinput/spclty`)
              .then((res) => {
                var i;
                for (i = 0; i < res.data.length; i++) {
                  // console.log(res.data[i].spclty );
                  this.spclty.push(
                    res.data[i].spclty + "  :" + res.data[i].name
                  );
                }
              });
          } else {
            this.ckInput.spclty = true;
          }

          if (result.data.sql_code.search("{multiple_room}") >= 0) {
            this.ckInput.kskdepartments = false;
            axios
              .get(`http://172.18.2.2:3010/api/selectinput/kskdepartments`)
              .then((res) => {
                var i;
                for (i = 0; i < res.data.length; i++) {
                  // console.log(res.data[i].spclty );
                  this.kskdepartments.push(
                    res.data[i].depcode + "  :" + res.data[i].department
                  );
                }
              });
          } else {
            this.ckInput.kskdepartments = true;
          }

          if (result.data.sql_code.search("{multiple_ward}") >= 0) {
            this.ckInput.ward = false;
            axios
              .get(`http://172.18.2.2:3010/api/selectinput/ward`)
              .then((res) => {
                var i;
                for (i = 0; i < res.data.length; i++) {
                  // console.log(res.data[i].spclty );
                  this.ward.push(res.data[i].ward + "  :" + res.data[i].name);
                }
              });
          } else {
            this.ckInput.ward = true;
          }

          if (
            result.data.sql_code.search("{multiple_doctor}") >= 0 ||
            result.data.sql_code.search("{mutiple_doctor}") >= 0
          ) {
            this.ckInput.doctor = false;
            axios
              .get(`http://172.18.2.2:3010/api/selectinput/doctor`)
              .then((res) => {
                var i;
                for (i = 0; i < res.data.length; i++) {
                  //  console.log(res.data[i].code );
                  this.doctor.push(
                    res.data[i].code +
                      "  :" +
                      res.data[i].name +
                      res.data[i].licenseno
                  );
                }
              });
          } else {
            this.ckInput.doctor = true;
          }
        }); //endCreated
    },

    secrchInput(valuesql) {
      // function เช็คค่าว่า sql นั้นๆมีในคำสั่งหรือไม่แล้วให้ส่งค่ากลับไป
      if (valuesql >= 0) {
        return false;
      } else {
        return true;
      }
    },
    copysqlcode1: function(e) {
      var id = e.target.id;
      // var value = e.target.value;
      // console.log(id,value) 
      document.querySelector("#"+id).select();
      document.execCommand('copy');
    },
  },
};
</script>

<style>
.inputclass {
  cursor: text;
  margin: 0em;
  padding: 1px 2px;
  border-width: 2px;
  border-style: solid;
}
</style>
