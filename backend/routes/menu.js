const router = require("express").Router();
const services = require("../service/menu");

router.get("/", async (req, res) => {
    try {
        const model = await services.findAll();
        if (!model) throw new Error("ไม่พบข้อมูลที่ค้นหา");
        res.json(model);
      } catch (ex) {
        res.error(ex);
      }
});

router.get("/submenu/:id", async (req, res) => {
  try {
    const model = await services.findById(req.params.id);
    if (!model) throw new Error("ไม่พบข้อมูลที่ค้นหา");
    res.json(model);
  } catch (ex) {
    res.error(ex);
  }
});

router.post("/search", async (req, res) => {
  try {
    const model = await services.searchMenu(req.body);
    if (!model) throw new Error("ไม่พบข้อมูลที่ค้นหา");
    res.json(model);
  } catch (ex) {
    res.error(ex);
  }
});


module.exports = router;
