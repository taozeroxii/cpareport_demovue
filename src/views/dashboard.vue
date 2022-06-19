<template>
  <v-container>
    <br />

    <CardTable
      class="mb-5"
      style="width:100%"
      tablename="ผู้มารับบริการ OPD วันนี้ จำแนกตามสิทธิ"
      :headers="headers1"
      :data="datafortable1"
    />

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
import CardTable from "@/components/cards/cardTable";
import BarChart from "@/components/charts/BarChart";
import axios from "axios";
export default {
  components: {
    BarChart,
    CardTable,
  },
  data() {
    return {
      datacollection: null,
      labels1Barchart: [],
      Data1Barchart: [],
      labels2Barchart: [],
      Data2Barchart: [],
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

    await axios
      .get(`http://172.18.2.2:3010/api/dashboard/ptytoday`)
      .then((result) => {
        for (var i = 0; i < result.data.fields.length; i++) {
          this.headers1.push({
            text: result.data.fields[i].name,
            value: result.data.fields[i].name,
          });
          this.datafortable1 = result.data.rows;
        }
      });

    await axios
      .get(`http://172.18.2.2:3010/api/dashboard/visit`)
      .then((result) => {
        for (var i = 0; i < result.data.fields.length; i++) {
          this.headers2.push({
            text: result.data.fields[i].name,
            value: result.data.fields[i].name,
          });
          this.datafortable2 = result.data.rows;
        }
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
              "rgba(255, 99, 132, 0.2)",
              "rgba(255, 99, 132, 0.2)",
              "rgba(255, 99, 132, 0.2)",
              "rgba(255, 99, 132, 0.2)",
              "rgba(255, 99, 132, 0.2)",
              "rgba(255, 99, 132, 0.2)",
              "rgba(255, 99, 132, 0.2)",
              "rgba(255, 99, 132, 0.2)",
              "rgba(255, 99, 132, 0.2)",
              "rgba(255, 99, 132, 0.2)",
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
              "rgba(54, 162, 235, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(54, 162, 235, 0.2)",
            ],
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
