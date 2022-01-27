<template>
  <div>
    <v-card class="elevation-4 text-xl-h1 ">
      <v-card-title class="elevation-4 text-xl-h3 font-weight-blod">{{  room_name == null ? "ไม่ได้ระบุห้องผ่าตัด" : room_name }}</v-card-title>
      <v-data-table :headers="headers" :items="data" hide-default-footer>
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
            outlined
          >
            {{ item.timeoper }}
          </v-btn>
        </template>
      </v-data-table>
    </v-card>
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
      if (emergency_name == '"Emergency"') return "red";
      else if (emergency_name == "Elective") return "";
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
        return "teal";
      else return "";
    },
    fetchdata() {
      axios
        .post(`http://172.18.2.2:3010/api/dashboard-or/fetchDataByRoomud`, {
          room_id: this.room_id,
        })
        .then((result) => {
          var i;
          for (i = 0; i < result.data.fields.length; i++) {
            if (
              result.data.fields[i].name != "emergency_name" &&
              result.data.fields[i].name != "request_operation_date"
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
.v-data-table {
  font-family: "Prompt", sans-serif;
  border-radius: 20 20 20 20;
}
.v-data-table >>> td {
  font-size: 26px !important;
  font-weight: 500;
  /* background-color: red; */
}
</style>
