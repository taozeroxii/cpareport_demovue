<template>
  <div id="cardtabledashboard">
    <v-card class="text-xl-h1 mb-5">
      <v-card-title class="text-xl-h5 font-weight-blod">
        {{ titleName }}
      </v-card-title>
      <v-card>
        <v-data-table
          :headers="propheaders"
          :items="data"
          :items-per-page="5"
          :footer-props="{ 'items-per-page-options': [5, 10] }"
        ></v-data-table>
      </v-card>
    </v-card>
  </div>
</template>

<script>
// import axios from "axios";
// import moment from "moment";
export default {
  name: "cardTabledashboard",
  data() {
    return {
      //   datenow: new Date().toLocaleString(),
      titleName: null,
      propheaders: [],
    };
  },
  props: {
    tablename: {
      required: true,
    },
    headers: {
      required: true,
    },
    data: {
      required: true,
    },
  },
  methods: {},

  created() {
    this.titleName = this.$props.tablename;
    this.propheaders = this.$props.headers;
    this.data = this.$props.data;
    console.log(this.$props);
  },
  mounted() {},
};
</script>
