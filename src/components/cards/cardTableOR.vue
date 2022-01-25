<template>
  <div>
    <v-card   class="elevation-4" >
      <v-card-title >{{ room_name }}</v-card-title>
      <v-data-table
        :headers="headers" 
        :items="data"
        hide-default-footer  
        class="elevation-2" 
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
  },
  mounted() {
    axios.post(`http://localhost:3000/api/dashboard-or/fetchDataByRoomud`, { room_id: this.room_id,}).then((result) => {
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
  },
};
</script>

<style></style>
