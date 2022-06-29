<template>
  <v-container>
    <v-row>
      <v-col lg="12">
        <v-form @submit.prevent="submit()" v-if="islogin">
          <v-row>
            <v-col lg="11">
              <v-text-field
                label="ค้นหารายงานที่ต้องการ"
                type="text"
                v-model.trim="form.select"
              ></v-text-field>
            </v-col>
            <v-col lg="1">
              <v-btn type="submit" class="success blok"  x-large><v-icon>mdi-search-web</v-icon> ค้นหา </v-btn>
            </v-col >
          </v-row>
        </v-form>
      </v-col>
    </v-row>

    
      <MenuCard class="mt-5" v-if="form.select ==''" :v-model="clicksubmit =  false" />
      <SearchMenu v-if="clicksubmit" :searchmenu="searchmenu"  />
  
  </v-container>
</template>

<script>
import axios from "axios";
import MenuCard from "@/components/cards/menuCard";
import SearchMenu from "@/components/cards/searchMenu";

export default {
  name: "Home",
  components: { MenuCard ,SearchMenu},
  data() {
    return {
      headers:{ headers: { "x-access-token": localStorage.token } },
      form: { select: ''},
      searchmenu:[],
      clicksubmit:false,
      islogin:false
    };
  },
  mounted() {
    if(this.$store.getters.get_username != null){
      this.islogin = true;
    }
  },
  methods: {
    submit() {
      axios.post(`http://172.16.0.251:3010/api/menu/search`,this.form,this.headers)
        .then((result) => {
        this.searchmenu = result.data;
        this.clicksubmit = true;
        console.log(  this.searchmenu);
     });
    this.clicksubmit = false;
    // console.log(this.form.select);
    },
  },
};
</script>
