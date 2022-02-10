<template>
  <v-container>
    <MenuTabadmin />
    <v-card style="margin:15px">
      <v-data-table
        :search="search"
        :headers="headers"
        :items="mDataArray"
        :loading="loaddata"
        loading-text="Loading... Please wait"
      >
        <template v-slot:top>
          <v-toolbar flat color="white">
            <v-toolbar-title>Menu Query</v-toolbar-title>
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-text-field
              v-model="search"
              append-icon="search"
              label="Search"
              single-line
              hide-details
            ></v-text-field>
            <v-spacer></v-spacer>
          </v-toolbar>
        </template>

        <!-- table tr section -->
        <template v-slot:item="{ item }">
          <tr>
            <td>{{ item.id }}</td>
            <td>{{ item.menu_sub }}</td>
            <td>{{ item.menu_link }}</td>
            <td>{{ item.menu_title }}</td>
            <td>{{ item.sql_head }}</td>
            <td>{{ item.menu_userupdate }}</td>
            <td>{{ item.menu_datetimeupdate|date }} </td>
            <td class="text-center"> <v-icon class="mr-2" @click="editItem(item.id)" >  edit </v-icon>  </td>
            <td> <v-switch  :key="item.id" v-model="item.m_status" @click="updatestatus(item.id,item.m_status)" color="success" ></v-switch></td>
            <td><a :href="'#/tableshowdata/'+item.menu_file" target="_blank"  style=" text-decoration: none;"> <v-icon class="mr-2"  >    mdi-forward </v-icon>   </a> </td>
          </tr>
        </template>
      </v-data-table>
    </v-card>
  </v-container>
</template>

<script>
import axios from "axios";
import MenuTabadmin from "@/components/cards/menuTabadmin";

export default {
  name: "menuEditquery",
  components: {
    MenuTabadmin,
  },
  data() {
    return {
      search: "",
      status:0,
      selectedUserId: "",
      confirmDeleteDlg: false,
      loaddata: true,
      mDataArray: [],
      headers: [
        {
          text: "Id",
          align: "left",
          sortable: false,
          value: "id",
        },
        { text: "ชื่อหัวข้อย่อย", value: "menu_sub" },
        { text: "ชื่อฟอร์ม", value: "menu_link" },
        { text: "คำอธิบายย่อยตอน hover", value: "menu_title" },
        { text: "คำอธิบายแสดงในหน้ารายงาน", value: "sql_head" },
        { text: "ผู้เพิ่มรายการ", value: "menu_userupdate" },
        { text: "วันเวลาแก้ไขล่าสุด", value: "menu_datetimeupdate" },
        { text: "แก้ไข(Sql)", value: "action" },
        { text: "เปิด/ปิด", value: "activestatus" },
        { text: "เช็คข้อมูล", value: "test" },
      ],
    };
  },
  created() {
  },
  mounted() {
    this.getallquery_menu();
  },

  methods: {
    getallquery_menu() {
      axios.get("http://172.18.2.2:3010/api/admin/cpareportmenu-list",{ headers: { "x-access-token": this.$store.getters.get_token}}).then((result) => {
          this.mDataArray = result.data;
          this.loaddata = false;
      });
    },

    editItem(id){
      this.$router.push(`./Editquery/${id}`)
    },
    
    updatestatus(id,st){
      // console.log('ipdatestatus : ' + id,st);
      if(st === true){ this.status = {status : 1}}else { this.status = {status : 2}}
      axios.put(`http://172.18.2.2:3010/api/admin/changestatus/${id}`,this.status,{ headers: { "x-access-token": this.$store.getters.get_token}}).then(() => {
        this.alertify.success("แก้ไขเรียบร้อย");
        // console.log("status : "+ result.status)
      });
    }
  },
};
</script>

<style></style>
