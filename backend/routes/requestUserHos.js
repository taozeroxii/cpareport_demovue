const router = require("express").Router();
const services = require("../service/requestUserHos");
// const auth = require("../middleware/authUser"); // การใช้งานทั้วไปใช้ middleware ของ user ที่สามารถเข้าได้ในระดับการใช้งาน user ขึ้นไป

router.get("/position", async (req, res) => {
  try {
    const model = await services.fetchallposition();
    if (!model) throw new Error("ไม่พบข้อมูลที่ค้นหา");
    res.json(model);
  } catch (ex) {
    res.error(ex);
  }
});

router.get("/spclty", async (req, res) => {
  try {
    const model = await services.fetchallspclty();
    if (!model) throw new Error("ไม่พบข้อมูลที่ค้นหา");
    res.json(model);
  } catch (ex) {
    res.error(ex);
  }
});

router.get("/speciality", async (req, res) => {
  try {
    const model = await services.fetchallspeciality();
    if (!model) throw new Error("ไม่พบข้อมูลที่ค้นหา");
    res.json(model);
  } catch (ex) {
    res.error(ex);
  }
});

router.get("/providertype", async (req, res) => {
  try {
    const model = await services.fetchallprovidertype();
    if (!model) throw new Error("ไม่พบข้อมูลที่ค้นหา");
    res.json(model);
  } catch (ex) {
    res.error(ex);
  }
});

router.post("/serchOldusername", async (req, res) => {
    try {
      const model = await services.serchOldusername(req.body);
      if (!model) throw new Error("ไม่พบข้อมูลที่ค้นหา");
      res.json(model);
    } catch (ex) {
      res.error(ex);
    }
  });
  




module.exports = router;
