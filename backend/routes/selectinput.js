const router = require("express").Router();
const services = require("../service/selectinput");

router.get("/", (req, res) => {
  res.json({ message: "selection input router" });
});


router.get("/doctor", async (req, res) => {
  try {
    const model = await services.findDoctor();
    if (!model) throw new Error("ไม่พบข้อมูลที่ค้นหา");
    res.json(model);
  } catch (ex) {
    res.error(ex);
  }
});



router.get("/kskdepartments", async (req, res) => {
  try {
    const model = await services.findDepartments();
    if (!model) throw new Error("ไม่พบข้อมูลที่ค้นหา");
    res.json(model);
  } catch (ex) {
    res.error(ex);
  }
});


router.get("/spclty", async (req, res) => {
  try {
    const model = await services.findSpclty();
    if (!model) throw new Error("ไม่พบข้อมูลที่ค้นหา");
    res.json(model);
  } catch (ex) {
    res.error(ex);
  }
});


router.get("/ward", async (req, res) => {
  //select query from mysql
  try {
    const model = await services.findWard();
    if (!model) throw new Error("ไม่พบข้อมูลที่ค้นหา");
    res.json(model);
  } catch (ex) {
    res.error(ex);
  }
});

router.get("/pttype", async (req, res) => {
  //select query from mysql
  try {
    const model = await services.findpttype();
    if (!model) throw new Error("ไม่พบข้อมูลที่ค้นหา");
    res.json(model);
  } catch (ex) {
    res.error(ex);
  }
});


module.exports = router;
