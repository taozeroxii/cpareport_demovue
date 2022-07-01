<template>
  <v-container>
    <h1 class="mt-5 mb-5">ERROR CODE เวชระเบียน</h1>
    <template>
      <v-expansion-panels>
        <v-expansion-panel v-for="(item, i) in menuDetail" :key="i">
          <v-expansion-panel-header>{{ item.menuName }}
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <small>{{ item.details }}</small>
            <br />
            <v-btn class="mt-2 " color="primary" elevation="2" @click="GotoPage(item.links)">คลิ๊กเปิดหน้าดึงข้อมูล</v-btn>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </template>
  </v-container>
</template>

<script>
export default {
  name: "ERROR_CODE",
  data() {
    return {
      menuDetail: [
        {
          menuName: "1. ให้รหัส icd10 ที่เป็นเพศหญิงเท่านั้นในเพศชาย",
          details: "- ให้รหัส icd10 ที่เป็นเพศหญิงเท่านั้นในเพศชาย เช่น 1. รหัส ICD10 ที่เป็นเพศหญิงเท่านั้น ได้แก่รหัส A34, B37.3, C51-C58, C79.6, D06.-, D07.0- D07.3, I D25-D28, D39.-, E28.-, E89.4, F52.5, F53.-, 186.3, L29.2, L70.5, M80.0-M80.1, M81.0-M81.1, M83.0, N70-N98, N99.2-N99.3, 000-099, P54.6, Q50-Q52, R87, S31.4-S37.6, T19.2-T19.3, T83.3, Y76.-, 201.4, Z12.4, 230.1, Z30.3, Z30.5, Z31.1, Z31.2, 732-236, 239.-, Z43.7, Z87.5, Z97.5",
          links: "sql_0317",
        },
        {
          menuName: "2. ให้รหัส icd10 ของเพศชายเท่านั้นในเพศหญิง",
          details: "- รหัส ICD ที่ใช้ได้กับผู้ป่วย ชายเท่านั้น ได้แก่รหัส B26.0, C60-63, D07.4-D07.6, D17.6, D29.-,D40.E29.-, E89.5, F52.4, 186.1, L29.1, N40-51, Q53-Q55, R86, S31.2-S31.3, Z12.5",
          links: "sql_0318",
        },
        {
          menuName:"3. ใช้รหัส V,W,X,Y เป็นรหัสโรคหลัก ซึ่งไม่ควรให้เป็นรหัสโรคหลัก",
          details: "- ใช้รหัส VW,X,Y เป็นรหัสโรคหลัก",
          links: "sql_0321",
        },
        {
          menuName: " 4. การให้รหัส S และ T ในผู้ป่วยรายใดต้องให้รหัสสาเหตุภายนอกร่วมด้วยเสมอ(หากมี S หรือ T ต้องมี v,w,x,y ร่วม ถ้าไม่มีดึงมา)",
          details: "- การให้รหัส S และ T ในผู้ป่วยรายใดต้องให้รหัสสาเหตุภายนอกร่วมด้วยเสมอ (หากมี S หรือ T ต้องมี v,w,x,y ร่วม ถ้าไม่มีดึงมา)",
          links: "sql_0322",
        },
        {
          menuName: "5. ห้ามใช้รหัส T31.0-T31.9 เป็นโรคหลัก pdx หรือ diagtype1",
          details: "- ห้ามใช้รหัส T31.0-T31.9 ซึ่งเป็นรหัสบอกเปอร์เซ็นต์การเกิดแผลไหม้เป็นโรคหลัก",
          links: "sql_0323",
        },
        {
          menuName: "6. การให้รหัส Z470-Z479,Z480-Z489 จะต้องไม่ใช้ร่วมกับรหัสกลุ่ม S หรือ T ในการรักษาครั้งนี้",
          details: "- ห้ามใช้รหัส Z470-Z479,Z480-Z489 ร่วมกับ รหัสกลุ่ม S หรือ T",
          links: "sql_0319",
        },
        {
          menuName:" 7. รหัส ICD ที่เป็นรหัสแสดงความด้อยคุณภาพของสถานพยาบาล E14.9, J06.9,D22.9, L02.9, L03.9, R22.9TO7, T14.0 - T14.9, Z34.9",
          details:"- เคสที่มีการลงรหัสตามนี้ E14.9, J06.9, D22.9, L02.9, L03.9, R22.9TO7, T14.0 - T14.9, Z34.9 ด้อยคุณภาพให้ดึงมา",
          links: "sql_0320",
        },
      ],
    };
  },methods: {
    GotoPage(sql_menu){
        this.$router.push(`/tableshowdata/${sql_menu}`);
    }
  },
};
</script>

<style></style>
