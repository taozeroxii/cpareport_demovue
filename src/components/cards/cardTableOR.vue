<template>
  <div>
    <!-- <v-card class="elevation-4 text-xl-h1 "> -->
    <!-- <v-card-title class="elevation-4 text-xl-h5 font-weight-blod">{{  room_name == null ? "ไม่ได้ระบุห้องผ่าตัด" : room_name }}</v-card-title> -->
    <table border="collapse " >  
      <tr><th colspan = "12" class="purple lighten-4"><h2> {{  room_name == null ? "ไม่ได้ระบุห้องผ่าตัด" : room_name }} </h2></th>  </tr>
      <tr>
        <th class="red lighten-3  text-center" v-for="(headers, i) in headers" :key="i">{{ headers.value }}</th>
      </tr>
      <tr v-for="(data, i) in data" :key="i" :class="getColorDate(data.operation_date)" >
        <td >{{ data.operation_date|date2 }}</td>
        <td >{{ data.timeoper }}</td>
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
       <tr >
         <td colspan = "11" ></td>
         <td ><p>1.ทดสอบ นามสกุล </p> <p>2.ทดสอบ นามสกุล </p> <p>3.ทดสอบ นามสกุล </p> <p>4.ทดสอบ นามสกุล </p>  <p>5.ทดสอบ นามสกุล </p></td>
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
      data: [],
      headers: [],
      datenow: new Date().toLocaleString(),
    };
  },
  props: {
    room_id: {
      required: true,
    },
    room_name: {
      required: true,
    },
  },
  methods: {
    itemRowBackground: function(item) {
      return item.protein > 4.2 ? "style-1" : "style-2";
    },
    getColor(emergency_name) {
      if (emergency_name == '"Emergency"') return "red white--text";
      else if (emergency_name == "Elective") return "success white--text";
      else return "";
    },
    getColorDate(date) {
      if (  moment(date).format("YYYY-MM-DD") == moment(new Date()).format("YYYY-MM-DD") ) return "";
      else if ( moment(date).format("YYYY-MM-DD") ==  moment(new Date())  .add(1, "days")  .format("YYYY-MM-DD") )  return "cyan lighten-4  black--text";
      else return "";
    },
    fetchdata() {
      axios .post(`http://172.18.2.2:3010/api/dashboard-or/fetchDataByRoomud`, {  room_id: this.room_id, }).then((result) => {
          var i;
          for (i = 0; i < result.data.fields.length; i++) {
            if (
              result.data.fields[i].name != "emergency_name" 
            ) {
              // if(result.data.fields[i].name == "age_y"){var classs = "primary white--text"}  else { classs = ""}
              this.headers.push({
                text: result.data.fields[i].name,
                value: result.data.fields[i].name,
                // class: classs,
                sortable: false,
              });
            }
          }
          this.data = result.data.rows;
          // console.log(this.data);
        });
    },
  },
  created() {},
  mounted() {
    this.fetchdata();
  },
};
</script>

<style scoped>
/* .v-data-table {
  font-family: "Prompt", sans-serif;
  border-radius: 20 20 20 20;
}
.v-data-table >>> td {
  font-size: 16px !important;
  font-weight: 500;
} */
table{
   width: 100%;
}
table, th, td {
  border: 1px solid black;
  font-size: 11px;
  border-collapse: collapse;
  padding: 1px;
}
</style>
