const router = require("express").Router();
const services = require("../service/menu");
const auth  = require("../middleware/authUser"); // การใช้งานทั้วไปใช้ middleware ของ user ที่สามารถเข้าได้ในระดับการใช้งาน user ขึ้นไป


router.get("/",auth, async (req, res) => {
    try {
        const model = await services.findAll();
        if (!model) throw new Error("ไม่พบข้อมูลที่ค้นหา");
        res.json(model);
      } catch (ex) {
        res.error(ex);
      }
});

router.get("/submenu/:id", auth,async (req, res) => {
  try {
    const model = await services.findById(req.params.id);
    if (!model) throw new Error("ไม่พบข้อมูลที่ค้นหา");
    res.json(model);
  } catch (ex) {
    res.error(ex);
  }
});

router.post("/search",auth, async (req, res) => {
  // console.log(req.headers['x-access-token'])
  try {
    const model = await services.searchMenu(req.body);
    if (!model) throw new Error("ไม่พบข้อมูลที่ค้นหา");
    res.json(model);
  } catch (ex) {
    res.error(ex);
  }
});


router.get("/getclientip",  (req, res) => {
  var ip = req.ip;
  try {
    res.json(ip.substring(7,25));
  } catch (ex) {
    res.error(ex);
  }
});


router.post("/stampviewer", async (req, res) => {
  try {
    // console.log(req.body)
    const model = await services.insertview_logmenu(req.body);
    res.json(model);
  } catch (ex) {
    res.error(ex);
  }
});





module.exports = router;
