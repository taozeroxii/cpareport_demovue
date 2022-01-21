const router = require("express").Router();
const { check, header } = require("express-validator");
const services = require("../service/admin");
const auth  = require("../middleware/auth");
const jwt = require("jsonwebtoken");
const e = require("express");

// ส่วนของการจัดการสมาชิก login , register , edit , inputmenu admin
router.get("/", (req, res) => {
  res.json({ message: "admin" });
});

router.get("/userrole",async (req, res) => {
  try {
    req.validate();
    const inputtype = await services.findAlluserrole();
    res.json(inputtype);
  } catch (ex) {
    res.error(ex);
  }
});

router.post("/login", [ check("username").not().isEmpty(), check("password").not().isEmpty(),],
  async (req, res) => {
    try {
      req.validate();
      const userLogin = await services.onLogin(req.body);
      res.json(userLogin)
    } catch (ex) {
      res.error(ex);
    }
  }
);

router.post( "/register",
  [ 
    check("username") .not() .isEmpty(),
    check("password") .not().isEmpty(),
    check("pname").not() .isEmpty(),
    check("fname") .not() .isEmpty(),
    check("lname") .not() .isEmpty(),
    check("niname").not() .isEmpty(),
    check("status") .not().isEmpty(),
  ],auth, async (req, res) => {
    try {
      req.validate();
      const created = await services.register(req.body);
      res.json(created);
    } catch (ex) {
      res.error(ex);
    }
  }
);

router.post("/checkJWTexpire",auth, (req, res)=>{//นำค่า token ที่ส่งมาจาก router store ของ vue มาเช็คว่าถูกต้องไหมและเป็นของใคร
  tokendata  = jwt.decode(req.headers["x-access-token"],process.env.TOKEN_KEY);
  // console.log(tokendata);
  var userlodinData = {
    token : req.headers["x-access-token"],
    username : tokendata.username,
    userrole : tokendata.userrole,
    fname : tokendata.fname,
    lname : tokendata.lname,
    niname: tokendata.niname
  }
  res.status(200).json(userlodinData);
});

router.get("/getuserlist",auth,async (req, res)=>{
  try {
    const model =  await services.getAlluserlist();
    if (!model) throw new Error("ไม่พบข้อมูลที่ค้นหา");
    res.json(model);
  } catch (ex) {
    res.error(ex);
  }
});


// ควบคุมชุดคำสั่ง Sql เพิ่มแก้ไขquery เพื่อดึงมาเป็นรายงาน  
router.get("/cpareportmenu-list",auth,async (req, res) => {
  try {
    const model =  await services.getAllqueryList();
    if (!model) throw new Error("ไม่พบข้อมูลที่ค้นหา");
    res.json(model);
  } catch (ex) {
    res.error(ex);
  }
});
router.put("/changestatus/:id",auth, async (req, res) => {
  try {
    const status = await services.changestatus(req.params.id,req.body);
    res.json(status)
  } catch (ex) {
    res.error(ex);
  }
});
router.post("/addquery",  [ 
  //checkinput table menu
  check("menu_main") .not() .isEmpty(),
  check("menu_sub") .not().isEmpty(),
  check("menu_link").not() .isEmpty(),
  check("menu_file") .not() .isEmpty(),
  check("menu_title") .not() .isEmpty(),
  check("menu_order").not() .isEmpty(),
  check("menu_userupdate") .not().isEmpty(),
  // //checkinput table sql
  check("sql_file").not() .isEmpty(),
  check("sql_code").not() .isEmpty(),
  check("sql_link").not() .isEmpty(),
  check("sql_head").not() .isEmpty(),
  check("sql_userupdate").not() .isEmpty(),
],auth, async (req, res) => {
  try {
    req.validate();
    const created = await services.addquery(req.body);
    res.json(created);
  } catch (ex) {
    res.error(ex);
  }
});
router.get("/findOldquerybyid/:sql_id",auth,async (req, res) => {
  try {
    const data = await services.findOldquerybyid(req.params.sql_id);
    if(data.length < 1) throw new Error('ไม่พบข้อมูลไฟล์ sql ดังกล่าว!!!');
    res.json(data[0]);
  } catch (ex) {
    res.error(ex);
  }
});
router.put("/editquery/:sql_id",[
  check('sql_code').not().isEmpty(),
  check('sql_subcode_1').not().isEmpty()
],auth,async (req, res) => {
  try {
    req.validate();
    const data = await services.findOldquerybyid(req.params.sql_id);
    if(data.length < 1) throw new Error('ไม่พบข้อมูลไฟล์ sql ดังกล่าว!!!');
    const update = await services.editquery(data[0],req.body);
    res.json(update);
  } catch (ex) {
    res.error(ex);
  }
});
router.get("/logsqlupdate-list/:sql_id",auth,async (req, res) => {
  try {
    const data = await services.findOldquerybyid(req.params.sql_id);
    if(data.length < 1) throw new Error('ไม่พบข้อมูลไฟล์ sql ดังกล่าว!!!');
    const log = await services.fetchQuerylog(data[0].sql_file);
    res.json(log);
  } catch (ex) {
    res.error(ex);
  }
});



// select menuinput หน้าเพิ่มแก้ไขquerry 
router.get("/input-main_name",auth,async (req, res) => {
  try {
    const mainmenu = await services.getMain_namelist();
    res.json(mainmenu);
  } catch (ex) {
    res.error(ex);
  }
});
router.get("/selectmaxmenu/:id",auth,async (req, res) => {
  try {
    const max = await services.getMaxid_menu(req.params.id);
    res.json(max);
  } catch (ex) {
    res.error(ex);
  }
});
router.get("/maxsqlfile_id",auth,async (req, res) => {
  try {
    const max = await services.getMaxid_sql();
    res.json(max);
  } catch (ex) {
    res.error(ex);
  }
});
router.post("/select-formparams",auth,async (req, res) => {
  // console.log(req)
  try {
    const max = await services.getformparams(req.body);
    res.json(max);
  } catch (ex) {
    res.error(ex);
  }
});
router.get("/select-form",auth,async (req, res) => {
  try {
    const max = await services.getselectform();
    res.json(max);
  } catch (ex) {
    res.error(ex);
  }
});







module.exports = router;
