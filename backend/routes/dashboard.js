const router = require("express").Router();
const services = require("../service/dashboard");

router.get("/", async (req, res) => {
  try {
    const model = await services.toptenopd();
    if (!model) throw new Error("ไม่พบข้อมูลที่ค้นหา");
    res.json(model);
  } catch (ex) {
    res.error(ex);
  }
});

router.get("/ptytoday", async (req, res) => {
  try {
    const model = await services.ptytoday();
    if (!model) throw new Error("ไม่พบข้อมูลที่ค้นหา");
    res.json(model);
  } catch (ex) {
    res.error(ex);
  }
});

router.get("/visit", async (req, res) => {
  try {
    const model = await services.visit();
    if (!model) throw new Error("ไม่พบข้อมูลที่ค้นหา");
    res.json(model);
  } catch (ex) {
    res.error(ex);
  }
});

module.exports = router;
