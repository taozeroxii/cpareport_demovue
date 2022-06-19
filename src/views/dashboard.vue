<template>
  <v-container>
    <v-card>
      <v-title class="text-xl-h5 ml-5 font-weight-blod">
        ยอดผู้รับบริการผู้ป่วยนอกตามสิทธิ วันที่ : {{ today }}</v-title
      >
      <LineChart :chartData="datacollectionVisit_pty" style="height: 300px;" />
      <br />
      <CardTable
        class="mb-5"
        style="width:100%"
        tablename=""
        :headers="headers1"
        :data="datafortable1"
      />
    </v-card>

    <v-card>
      <h1 class="ml-5 mt-5">10 ลำดับโรค</h1>
      <v-row class="ml-3">
        <BarChart
          style="height: 300px; width:49%;"
          v-if="datacollection != null"
          :chartData="datacollection"
        />
        <BarChart
          style="height: 300px; width:47%;"
          v-if="datacollection != null"
          :chartData="datacollection2"
        />
      </v-row>
    </v-card>

    <CardTable
      class="mt-5 mb-5"
      style="width:100%"
      tablename="ข้อมูลจำนวนผู้รับบริการปัจจุบัน - ย้อนหลัง "
      :headers="headers2"
      :data="datafortable2"
    />


  </v-container>
</template>

<script>
import moment from "moment";
import CardTable from "@/components/cards/cardTable";
import BarChart from "@/components/charts/BarChart";
import LineChart from "@/components/charts/LineChart";
import axios from "axios";
export default {
  components: {
    BarChart,
    LineChart,
    CardTable,
  },
  data() {
    return {
      today: moment()
        .add(543, "year")
        .locale("th")
        .format(" Do MMMM YYYY"),
      datacollection: null,
      labels1Barchart: [],
      Data1Barchart: [],
      labels2Barchart: [],
      Data2Barchart: [],

      //ข้อมูลสิทธิกราฟ
      datacollectionVisit_pty: null,
      labelsVisit_pty: [],
      DataVisit_pty: [],
      //ข้อมูลสิทธิ
      headers1: [],
      datafortable1: [],
      //ข้อมูล visit แยกแผนก
      headers2: [],
      datafortable2: [],
    };
  },
  async created() {
    await axios.get(`http://172.18.2.2:3010/api/dashboard`).then((result) => {
      for (var i = 0; i < result.data.length; i++) {
        if (result.data[i].department === "opd") {
          this.labels1Barchart.push(result.data[i].icd10);
          this.Data1Barchart.push(result.data[i].count);
        } else {
          this.labels2Barchart.push(result.data[i].icd10);
          this.Data2Barchart.push(result.data[i].count);
        }
        this.fillData();
      }
    });

    await axios.get(`http://172.18.2.2:3010/api/dashboard/ptytoday`).then((result) => {
        for (var i = 0; i < result.data.fields.length; i++) {
          this.headers1.push({
            text: result.data.fields[i].name,
            value: result.data.fields[i].name,
          });
        }
        for (var j = 0; j < result.data.rows.length; j++) {
          this.labelsVisit_pty.push(result.data.rows[j].pttype);
          this.DataVisit_pty.push(result.data.rows[j].count);
        }
        console.log(this.labelsVisit_pty, this.DataVisit_pty);
        this.datafortable1 = result.data.rows;
      });

    await axios.get(`http://172.18.2.2:3010/api/dashboard/visit`).then((result) => {
        for (var i = 0; i < result.data.fields.length; i++) {
          this.headers2.push({
            text: result.data.fields[i].name,
            value: result.data.fields[i].name,
          });
        }
        this.datafortable2 = result.data.rows;
        this.fillLineVisitpty();
      });
  
  
  },

  mounted() {},

  methods: {
    fillData() {
      this.datacollection = {
        //Data to be represented on x-axis
        labels: this.labels1Barchart,
        datasets: [
          {
            label: "ข้อมูลเดือนที่แล้ว ผู้ป่วยนอก",
            pointBackgroundColor: "white",
            pointBorderColor: "#249EBF",
            data: this.Data1Barchart,
            borderWidth: 1,
            backgroundColor: [
              "rgba(255, 99, 132, 0.5)",
              "rgba(255, 99, 132, 0.5)",
              "rgba(255, 99, 132, 0.5)",
              "rgba(255, 99, 132, 0.5)",
              "rgba(255, 99, 132, 0.5)",
              "rgba(255, 99, 132, 0.5)",
              "rgba(255, 99, 132, 0.5)",
              "rgba(255, 99, 132, 0.5)",
              "rgba(255, 99, 132, 0.5)",
              "rgba(255, 99, 132, 0.5)",
            ],
          },
        ],
      };
      this.datacollection2 = {
        //Data to be represented on x-axis
        labels: this.labels2Barchart,
        datasets: [
          {
            label: "ข้อมูลเดือนที่แล้ว ผู้ป่วยใน",
            pointBackgroundColor: "white",
            pointBorderColor: "#249EBF",
            data: this.Data2Barchart,
            borderWidth: 1,
            backgroundColor: [
              "rgba(54, 162, 235, 0.5)",
              "rgba(54, 162, 235, 0.5)",
              "rgba(54, 162, 235, 0.5)",
              "rgba(54, 162, 235, 0.5)",
              "rgba(54, 162, 235, 0.5)",
              "rgba(54, 162, 235, 0.5)",
              "rgba(54, 162, 235, 0.5)",
              "rgba(54, 162, 235, 0.5)",
              "rgba(54, 162, 235, 0.5)",
              "rgba(54, 162, 235, 0.5)",
            ],
          },
        ],
      };
    },

    fillLineVisitpty() {
      this.datacollectionVisit_pty = {
        //Data to be represented on x-axis
        labels: this.labelsVisit_pty,
        datasets: [
          {
            label: "จำนวน visit",
            pointBackgroundColor: "white",
            pointBorderColor: "#249EBF",
            data: this.DataVisit_pty,
            borderWidth: 1,
            backgroundColor: ["rgba(255, 99, 91, 1)"],
          },
        ],
      };
    },
  },
};
</script>

<style>
.small {
  max-width: 600px;
  margin: 150px auto;
}
</style>
