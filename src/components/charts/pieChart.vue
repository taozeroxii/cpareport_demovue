<script>
//Importing Bar class from the vue-chartjs wrapper
import { Pie, mixins } from "vue-chartjs";
const { reactiveProp } = mixins;
//Exporting this so it can be used in other components
export default {
  extends: Pie,
  mixins: [reactiveProp],
  data() {
    return {
      //Chart.js options that controls the appearance of the chart
      options: {
        scales: {
          // yAxes: [
          //   {
          //     ticks: {
          //       beginAtZero: false
          //     },
          //     gridLines: {
          //       display: false
          //     }
          //   }
          // ],
          // xAxes: [
          //   {
          //     gridLines: {
          //       display: false
          //     }
          //   }
          // ]
        },
        legend: {
          display: true,
        },
        responsive: true,
        maintainAspectRatio: false,
      },
    };
  },
  mounted() {
    //renderChart function renders the chart with the datacollection and options object.
    setTimeout(() => {
      this.renderChart(this.chartData, this.options);
    }, 100);
  },
};
</script>
