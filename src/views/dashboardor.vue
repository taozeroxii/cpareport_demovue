<template>
  <v-container>
    <v-btn color="orange darken-2 mb-5 mt-5" dark @click="back" ><v-icon dark left> mdi-arrow-left</v-icon>ย้อนกลับ</v-btn >
    <v-carousel cycle hide-delimiters show-arrows-on-hover height="auto" light>
      <v-carousel-item v-for="item in room_id" :key="item.room_id">
        <Cardtableor :room_id="item.room_id" :room_name="item.room_name" />
      </v-carousel-item>
    </v-carousel>
  </v-container>
</template>

<script>
import Cardtableor from "@/components/cards/cardTableOR";
import axios from "axios";

export default {
  components: { Cardtableor },
  data() {
    return {
      room_id: null,
      room_name: null,
    };
  },
  mounted() {
    axios
      .get(`http://localhost:3000/api/dashboard-or/findroom`)
      .then((result) => {
        this.room_id = result.data;
      });
  },
  methods: {
    back() {
      this.$router.back();
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
