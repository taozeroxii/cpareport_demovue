## ระบบรายงาน รพ ใช้งานด้วย node js + vue js 

     ดึงข้อมูลจากชุดคำสั่ง query ใน ฐานข้อมูล โดยมีการส่ง parameter พวกวันที่สิทธิเวลา และยิงชุด query ไปดึงข้อมูลเพื่อมาปั่นเอาค่าแสดงผลใน datable
  
  
# fontend
** กำหนด api url ผ่าน proxy ในการ dev แต่พออัพขึ้นproduct รันไม่ได้เลยปรับให้เรียกผ่าน url api โดยตรงทั้งหมด ** 
หน้า src/views/form/tableshowdata จะมีส่วนการดุึงข้อมูลจาก backend 
โดยใช้เป็น local ip 172.16.0.251 ไว้หากclone มาเปลียนเป็น http://localhost/:portที่กำหนด   ในส่วนนี้default port 3000
npm install
npm run serve
# backend
สร้าง  .env ใน backend เพื้่อทำการเชื่อมต่อกับฐานข้อมูลทั้ง2ตัว 1.mysql ของระบบรายงาน 2. postgresql ของ his รพ.
     #connection MYSQL
     MYSQL_HOST=
     MYSQL_USER=
     MYSQL_PASSWORD=
     MYSQL_DB=
     MYSQL_PORT=3306
     # Postgresql connection POSTGRE SQL
     PGSQL_HOST=
     PGSQL_USER=
     PGSQL_PASSWORD=
     PGSQL_DB=
     MYSQL_PORT=5432
     #SECREATKEY FOR JWT TOKEN ON THIS WEB SITE
     TOKEN_KEY=YOURTOKENKEY_FOR_JWT

หากรันใน vscode 
cd backend
npm install ลง package ทั้งหมด
npm start  รัน backend ผ่านการตั้งค่าจากไฟล์ package json ด้วย node mon default PORT 3000

