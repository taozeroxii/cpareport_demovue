const router = require("express").Router();
const services = require("../service/tableshowdata");
const { body, validationResult } = require('express-validator');

router.get("/", (req, res) => {
  res.json({ message: "table" });
});

// รับค่า sql_id เพื่อดึงชุดคำสั่ง query รายงาน
router.get("/sql/:id", async (req, res) => {
  //select query from mysql
  try {
    const model = await services.findById(req.params.id);
    if (!model) throw new Error("ไม่พบข้อมูล id ที่ค้นหา");
    res.json(model);
  } catch (ex) {
    res.error(ex);
  }
});

router.get("/menusql/:id", async (req, res) => {
  //select query from mysql
  try {
    const model = await services.findMenuById(req.params.id);
    if (!model) throw new Error("ไม่พบข้อมูล id ที่ค้นหา");
    res.json(model);
  } catch (ex) {
    res.error(ex);
  }
});




//รับค่าจาก form และ ส่งค่ามาเพื่อเรียกดูข้อมูล query รายงาน
router.post("/queryfrominput",async (req, res) => {
  try {
    req.validate();
    //ส่งค่าจากที่ get และค่าที่รับจาก user ไปดึงข้อมูลจาก database
    // console.log(JSON.stringify(req.body) );
    const data = await services.findqueryPg(req.body);
    res.status(200).json(data);
  } catch (ex) {
    res.error(ex);
  }
});

router.post("/queryfrominputsql2",async (req, res) => {
  try {
    req.validate();
    const data = await services.findqueryPg2(req.body);
    res.status(200).json(data);
  } catch (ex) {
    res.error(ex);
  }
});

module.exports = router;
