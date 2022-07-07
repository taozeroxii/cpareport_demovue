const router = require("express").Router();
const services = require("../service/requestUserHos");
const { check, header } = require("express-validator");
// const auth = require("../middleware/authUser"); // การใช้งานทั้วไปใช้ middleware ของ user ที่สามารถเข้าได้ในระดับการใช้งาน user ขึ้นไป
const { default: axios } = require("axios");
var querystring = require('querystring');

router.post( "/insertreq",
  [ 
    check("username") .not() .isEmpty(),
    check("password") .not().isEmpty(),
    check("pname").not() .isEmpty(),
    check("fname") .not() .isEmpty(),
    check("lname") .not() .isEmpty(),
    check("engfullname") .not() .isEmpty(),
    check("gender") .not() .isEmpty(),
    check("birthday") .not() .isEmpty(),
    check("first_day_in_job") .not() .isEmpty(),
    check("phone_internal") .not() .isEmpty(),
  ], async (req, res) => {
    try {
      // console.log(req.body);
      req.validate();
      checkoldUsername = await services.checkolduserhos(req.body.username);
      if(checkoldUsername >=1){
        return res.status(400).json({message:"Username นี้มีอยู่แล้วในระบบ hosxp โปรดกรอก username ใหม่อีกครั้ง"});
      }
      // line notify
      var messageNotify =`\uDBC0\uDC84  \uDBC0\uDC3B\nวันที่ขอเพิ่ม User ${req.body.insertdate_time}\nชื่อ:${req.body.pname+' '+req.body.fname+' '+req.body.lname}\nสถานะ : รอดำเนินการ`;

      var url = "https://notify-api.line.me/api/notify";
      const headers = {
        'Content-Type' : 'application/x-www-form-urlencoded',
        'Authorization': 'Bearer d5zh3iN8q18hw1cTYxIJc2eS4OlZBOCMq6VOySo2u3z'
      }

      await axios.post(url,  querystring.stringify({message:messageNotify}),{headers: headers}). then( (res) => {
        // console.log(`Send Line notify Success statusCode: ${res.status}`);
      }).catch( (error) => {
        console.error(`Send Line notify Failer statusCode: ${error.response.status}`);
      });
      // line notify
      const created = await services.insert(req.body);
      res.json(created);
  
    } catch (ex) {
      res.error(ex);
    }
  }
);

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

//input select แผนไทย
router.get("/health_med_curriculum", async (req, res) => {
  try {
    const model = await services.health_med_curriculum();
    if (!model) throw new Error("ไม่พบข้อมูลที่ค้นหา");
    res.json(model);
  } catch (ex) {
    res.error(ex);
  }
});

router.get("/health_med_educational", async (req, res) => {
  try {
    const model = await services.health_med_educational();
    if (!model) throw new Error("ไม่พบข้อมูลที่ค้นหา");
    res.json(model);
  } catch (ex) {
    res.error(ex);
  }
});

router.get("/health_med_institute_type", async (req, res) => {
  try {
    const model = await services.health_med_institute_type();
    if (!model) throw new Error("ไม่พบข้อมูลที่ค้นหา");
    res.json(model);
  } catch (ex) {
    res.error(ex);
  }
});

router.get("/health_med_institute/:id", async (req, res) => {
  try {
    const model = await services.health_med_institute(req.params.id);
    if (!model) throw new Error("ไม่พบข้อมูลที่ค้นหา");
    res.json(model);
  } catch (ex) {
    res.error(ex);
  }
});

router.get("/health_med_license_type", async (req, res) => {
  try {
    const model = await services.health_med_license_type();
    if (!model) throw new Error("ไม่พบข้อมูลที่ค้นหา");
    res.json(model);
  } catch (ex) {
    res.error(ex);
  }
});

router.get("/health_med_provider_type", async (req, res) => {
  try {
    const model = await services.health_med_provider_type();
    if (!model) throw new Error("ไม่พบข้อมูลที่ค้นหา");
    res.json(model);
  } catch (ex) {
    res.error(ex);
  }
});

router.get("/health_med_provider_category", async (req, res) => {
  try {
    const model = await services.health_med_provider_category();
    if (!model) throw new Error("ไม่พบข้อมูลที่ค้นหา");
    res.json(model);
  } catch (ex) {
    res.error(ex);
  }
});

module.exports = router;
