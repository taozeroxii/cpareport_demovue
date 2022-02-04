const router = require("express").Router();
const services = require("../service/dashboardOr");

router.get("/findroom", async (req, res) => {
  try {
    const model = await services.FindAllOperation_room();
    if (!model) throw new Error("ไม่พบข้อมูลที่ค้นหา");
    res.json(model);
  } catch (ex) {
    res.error(ex);
  }
});

router.post("/findroom", async (req, res) => {
  try {
    const model = await services.FindAllOperation_room_bydate(req.body.date);
    if (!model) throw new Error("ไม่พบข้อมูลที่ค้นหา");
    res.json(model);
  } catch (ex) {
    res.error(ex);
  }
});

router.post("/fetchDataByRoomud", async (req, res) => {
  try {
    // console.log(req.body.room_id)
    const model = await services.fetchDataByRoomud(req.body.room_id);
    if (!model) throw new Error("ไม่พบข้อมูลที่ค้นหา");
    res.json(model);
  } catch (ex) {
    res.error(ex);
  }
});

router.post("/fetchData_DateRoomid", async (req, res) => {
  try {
    const model = await services.fetchData_DateRoomid(req.body);
    if (!model) throw new Error("ไม่พบข้อมูลที่ค้นหา");
    res.json(model);
  } catch (ex) {
    res.error(ex);
  }
});

module.exports = router;
