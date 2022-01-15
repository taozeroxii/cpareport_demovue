## ระบบรายงาน รพ ใช้งานด้วย node js + vue js 

     ดึงข้อมูลจากชุดคำสั่ง query ใน ฐานข้อมูล โดยมีการส่ง parameter พวกวันที่สิทธิเวลา และยิงชุด query ไปดึงข้อมูลเพื่อแสดงผลมาปั่นเอาค่าแสดงผลใน datable
  
  
# fontend
** กำหนด api url ผ่าน proxy ในการ dev แต่พออัพขึ้นproduct รันไม่ได้เลยปรับให้เรียกผ่าน url api โดยตรงทั้งหมด ** 
หน้า src/views/form/tableshowdata จะมีส่วนการดุึงข้อมูลจาก backend 
โดยใช้เป็น local ip 172.16.0.251 ไว้หากclone มาเปลียนเป็น http://localhost/:portที่กำหนด   ในส่วนนี้default port 3000
npm install
npm run serve
# backend
สร้าง folder configs ในbackend และสรา้งไฟล์์ connect database และ middleware
     1.database.js (Connct mysql database)
     const mysql = require('mysql');

     const connection  = mysql.createConnection({
     host            : 'host',
     user            : 'userdb',
     password        : 'passworddb',
     database        : 'database',
     charset:'utf8'
     });

     //connection.getConnection((err,connect)=> console.log(err));//เช็ค connection 
     module.exports = connection;

     2.pgcon.js (Connct postgresql database)
     const { Pool, Client } = require('pg')
     const pgconnection = new Pool({
     host: '',
     user: '',
     password: '',
     database: '',
     charset:'utf8',
     port: 5432,
     });
     module.exports = pgconnection;


     3.middleware.js (เช็ค validator paramitor ฝั่ง backend ด้วย express-validator)
     const { validationResult } = require("express-validator");

     module.exports = function (req, res, next) {
     //ตรวจสอบ validation
     req.validate = function () {
          const errors = validationResult(req).array();
          if (errors.length == 0) return;
          //console.log(errors);
          throw new Error(`${errors[0].param}:${errors[0].msg}`)
     }
     //แสดง error ออกไป
     res.error = function (ex) {
          res.status(400).json({ message: ex.message });
     };
     next();
     };

หากรันใน vscode 
cd backend
npm install ลง package ทั้งหมด
npm start  รัน backend ผ่านการตั้งค่าจากไฟล์ package json ด้วย node mon default PORT 3000

