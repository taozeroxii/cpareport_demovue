<template>
  <div>
    <v-card    class="elevation-4 text-xl-h1 " >
      <v-card-title   class="elevation-4 text-xl-h3 font-weight-blod" >{{ room_name }}</v-card-title>
      <v-data-table 
        :headers="headers" 
        :items="data"
        hide-default-footer  
      >
      <template v-slot:item.hn="{ item }">
      <v-chip  :color="getColor(item.emergency_name)" dark >
        {{ item.hn }}
      </v-chip> 
      </template>
      </v-data-table>
    </v-card>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "cardTableOR",
  data() {
    return {
      data: [],
      headers: [],
      datenow : new Date().toLocaleString()
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
    getColor(emergency_name) {
      if (emergency_name == '"Emergency"') return "red";
      else if (emergency_name == "Elective") return "info";
      else return "";
    }, 
    fetchdata(){
      axios.post(`http://172.18.2.2:3010/api/dashboard-or/fetchDataByRoomud`, { room_id: this.room_id,}).then((result) => {
        var i;
        for (i = 0; i < result.data.fields.length; i++) {
          if (result.data.fields[i].name != "emergency_name") {
            this.headers.push({
              text: result.data.fields[i].name,
              value: result.data.fields[i].name,
              sortable: false,
            });
          }
        }
        this.data = result.data.rows; //map data ใส่ลง data table
      });
    }
  },
  created(){
    this.fetchdata();
  },
  mounted() {
  },
};
</script>

<style scoped>
.v-data-table {
    font-family: 'Prompt', sans-serif;
    border-radius: 20 20 20 20;
}
.v-data-table >>> th {
    font-size: 16px !important;
    background-color: bisque;
}
.v-data-table >>> td {
    font-size: 26px !important;
    font-weight: 500;
    /* background-color: red; */
}
</style>
