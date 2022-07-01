<template>
  <v-container>
    <h1 class="mb-5">เกี่ยวกับเรา</h1>
    <p>
      ระบบรายงาน Version : 2.3.0 © 2021 By. Chaophraya abhaibhubejhr hospital
    </p>
    <p>หากพบปัญหาหรือรายงานบางส่วนไม่สามารถใช้งานได้โปรดติดต่อ 3148</p>
    <hr />
     <b class="mt-5">ปรับปรุงล่าสุด 2.3.3</b>
    <ul>
      <li>แก้ไข Bug Error Export Excel</li>
      <li>แก้ไข หน้าเมนู Error code เวชระเบียน ให้ใช้งานได้แบบเวอรัชั่นเก่า</li>
      <li>แก้ไข Bug หน้า Dashboard OR หลังเลือกรายวันแล้วข้อมูล OPD ไม่แสดงผล</li>
    </ul>
    <hr>
    <b class="mt-5">ปรับปรุง 2.3.0</b>
    <ul>
      <li>เพิ่มการ login เข้าใช้งานระบบทั้งหมด แยก admin user</li>
      <li>เพิ่ม Dashboard แสดงข้อมูลเป็นกราฟของผู้ป่วยนอกรายวัน</li>
      <li>เพิ่ม username ตามระบบ hosxp และตั้ง password default เป็น 1234</li>
      <li>ปรับ ui tab header</li>
      <li>แก้ dashboard OR ปรับสีและโครงสร้าง code บางส่วน แก้บัคข้อมูลห้องขึ้นซ้ำ</li>
      <li>ปรับโครงสร้างฐานข้อมูลบางส่วนและเพิ่มการเก็บ log การเรียกดูข้อมูลแต่ละหน้า</li>
      <li>ปรับ ui หน้าเมนูหน้าแรกใหม่ให้ดูง่ายขึ้น</li>
    </ul>
  </v-container>
</template>

<script>
export default {
  name: "about",
};
</script>

<style></style>
