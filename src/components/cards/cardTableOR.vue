<template>
  <div>
    <!-- <v-card class="elevation-4 text-xl-h1 "> -->
    <!-- <v-card-title class="elevation-4 text-xl-h5 font-weight-blod">{{  room_name == null ? "ไม่ได้ระบุห้องผ่าตัด" : room_name }}</v-card-title> -->
    <table border="collapse ">
      <tr>
        <th colspan="13" class="indigo accent-1 ">
          <h2>
            {{ room_name == null ? "ไม่ได้ระบุห้องผ่าตัด" : room_name }}
            <v-dialog v-model="dialog" width="600px">
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  color="info"
                  dark
                  v-bind="attrs"
                  v-on="on"
                  small
                  outlined
                >
                  <i class="material-icons">account_circle</i>
                </v-btn>
              </template>
              <v-card>
                <v-card-title>
                  <span class="text-h5">ตั้งค่ารายชื่อเจ้าหน้าที่: {{room_name }}</span>
                </v-card-title>
                <form @submit.prevent="submit">
                  <v-card-text>
                    <v-text-field
                      label="รายชื่อที่ 1"
                      v-model="form.name1"
                    ></v-text-field>
                    <v-text-field
                      label="รายชื่อที่ 2"
                      v-model="form.name2"
                    ></v-text-field>
                    <v-text-field
                      label="รายชื่อที่ 3"
                      v-model="form.name3"
                    ></v-text-field>
                    <v-text-field
                      label="รายชื่อที่ 4"
                      v-model="form.name4"
                    ></v-text-field>
                    <v-text-field
                      label="รายชื่อที่ 5"
                      v-model="form.name5"
                    ></v-text-field>
                    <small class="red--text">**หมายเหตุ:รายชื่อเพื่อแสดงผลในหน้าจอเครื่องที่ตั้งค่าเท่านั้นไม่แสดงผลหน้าจออื่นๆ **</small>
                   <br> <small class="red--text">**ข้อมูลไม่ได้ถูกบันทึกลงในฐานข้อมูลแต่อย่างใด**</small>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn type="submit" color="green darken-1" text>
                      ยืนยัน
                    </v-btn>
                  </v-card-actions>
                </form>
              </v-card>
            </v-dialog>
          </h2>
        </th>
      </tr>
      <tr>
        <th
          class="purple lighten-4  text-center"
          v-for="(headers, i) in headers"
          :key="i"
        >
          {{ headers.value }}
        </th>
      </tr>
      <tr
        v-for="(data, i) in data"
        :key="i"
        :class="getColorDate(data.operation_date)"
      >
        <td class=' text-center'>{{ data.set_type }}</td>
        <td :class="colorOp(data.status_id)">{{ data.operation_date | date2 }}</td>
        <td>{{ data.timeoper }}</td>
        <td :class="getColor(data.emergency_name)">{{ data.hn }}</td>
        <td>{{ data.pname }}</td>
        <td>{{ data.provision_diagnosis_text }}</td>
        <td>{{ data.operation_name }}</td>
        <td>{{ data.age_y }}</td>
        <td>{{ data.weight }}</td>
        <td>{{ data.ward_name }}</td>
        <td>{{ data.npo }}</td>
        <td>{{ data.set_tf }}</td>
        <td>{{ data.request_doctor_name }}</td>
      </tr>
      <tr>
        <td class="purple lighten-3 text-right" colspan="13">
         รายชื่อเจ้าหน้าที่ : {{  form.name1 }} {{  form.name2 }} {{  form.name3 }} {{  form.name4 }} {{  form.name5 }}
        </td>
      </tr>
    </table>

    <!-- <v-data-table :headers="headers" :items="data" hide-default-footer>
        <template v-slot:item.hn="{ item }">
          <v-btn
            :color="getColor(item.emergency_name)"
            label
            x-large
            block
            v-if="item.emergency_name != null"
          >
            {{ item.hn }}
          </v-btn>
          <v-btn
            color="black"
            v-if="item.emergency_name == null"
            label
            dark
            x-large
            block
          >
            {{ item.hn }}</v-btn
          >
        </template>

        <template v-slot:item.timeoper="{ item }">
          <v-btn
            :color="getColorDate(item.request_operation_date)"
            label
            x-large
            block
          >
            {{ item.timeoper }}
          </v-btn>
        </template>
      </v-data-table> -->
    <!-- </v-card> -->
  </div>
</template>

<script>
import axios from "axios";
import moment from "moment";
export default {
  name: "cardTableOR",
  data() {
    return {
      dialog: false,
      data: [],
      headers: [],
      datenow: new Date().toLocaleString(),
      form: {
        name1: null,
        name2: null,
        name3: null,
        name4: null,
        name5: null,
      },
    };
  },
  props: {
    room_id: {
      required: true,
    },
    room_name: {
      required: true,
    },
    date_dd: {
       required: true,
    },
  },
  methods: {
    itemRowBackground: function(item) {
      return item.protein > 4.2 ? "style-1" : "style-2";
    },
    getColor(emergency_name) {
      if (emergency_name == 'Emergency') return "red lighten-3 black--text";
      else if (emergency_name == "Elective") return "success lighten-4 black--text";
      else return "";
    },
    getColorDate(date) {
      if (
        moment(date).format("YYYY-MM-DD") ==
        moment(new Date()).format("YYYY-MM-DD")
      )
        return "";
      else if (
        moment(date).format("YYYY-MM-DD") ==
        moment(new Date())
          .add(1, "days")
          .format("YYYY-MM-DD")
      )
        return "cyan lighten-4  black--text";
      else return "";
    },
    colorOp(status_id){
    if (status_id == '2') return "brown  lighten-1 black--text";
      else return "";
    },
    fetchdata() {
      if(this.$props.date_dd != 'all'){
        var room_id = this.$props.room_id;
        var date = moment(this.$props.date_dd).format('YYYY-MM-DD')
        axios.post(`http://172.18.2.2:3010/api/dashboard-or/fetchData_DateRoomid`,{date,room_id} ) .then((result) => {
          var i;
          for (i = 0; i < result.data.fields.length; i++) {
            if (result.data.fields[i].name != "emergency_name" && result.data.fields[i].name != "status_id") {
              this.headers.push({
                text: result.data.fields[i].name,
                value: result.data.fields[i].name,
                sortable: false,
              });
            }
          }
          this.data = result.data.rows;
        });
      }else{
        axios.post(`http://172.18.2.2:3010/api/dashboard-or/fetchDataByRoomud`, {  room_id: this.room_id, }) .then((result) => {
          var i;
          for (i = 0; i < result.data.fields.length; i++) {
            if (result.data.fields[i].name != "emergency_name" && result.data.fields[i].name != "status_id") {
              this.headers.push({
                text: result.data.fields[i].name,
                value: result.data.fields[i].name,
                sortable: false,
              });
            }
          }
            // if(result.data.rowCount < 11 ){// หากข้อมูลมาไม่ครบ 11 บรรทัดให้เพิ่มค่าลงไป
            //     for  ( i = 0; i < result.data.rowCount ; i++) {
            //      this.data.push( result.data.rows[i])
            //     }
            //     var addr = result.data.rowCount;
            //     for  ( addr; addr < 11 ; addr++) {
            //       this.data.push({rows:i})
            //     }
            // }else{this.data = result.data.rows;}
          this.data = result.data.rows;
          // console.log(this.data[0])
        });
      }

    },
    submit() {
      console.log(this.form);
      localStorage.setItem(this.room_id + "name1",'1.'+ this.form.name1);
      localStorage.setItem(this.room_id + "name2",'2.'+ this.form.name2);
      localStorage.setItem(this.room_id + "name3",'3.'+ this.form.name3);
      localStorage.setItem(this.room_id + "name4",'4.'+ this.form.name4);
      localStorage.setItem(this.room_id + "name5",'5.'+ this.form.name5);
    },
  },
  created() {
    // console.log(this.$props)
    this.form.name1 = localStorage.getItem(this.room_id + "name1")
    this.form.name2 = localStorage.getItem(this.room_id + "name2")
    this.form.name3 = localStorage.getItem(this.room_id + "name3")
    this.form.name4 = localStorage.getItem(this.room_id + "name4")
    this.form.name5 = localStorage.getItem(this.room_id + "name5")
  },
  mounted() {
    this.fetchdata();
  },
};
</script>

<style scoped>
table {
  width: 100%;
}
table,
th,
td {
  border: 1px solid black;
  font-size: 11px;
  border-collapse: collapse;
  padding: 1px;
}
</style>
