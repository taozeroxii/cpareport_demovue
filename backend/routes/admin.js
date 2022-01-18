const router = require("express").Router();
const { check, header } = require("express-validator");
const services = require("../service/admin");
const auth  = require("../middleware/auth");
const jwt = require("jsonwebtoken");

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

router.post( "/register",
  [
    check("username")
      .not()
      .isEmpty(),
    check("password")
      .not()
      .isEmpty(),
    check("pname")
      .not()
      .isEmpty(),
    check("fname")
      .not()
      .isEmpty(),
    check("lname")
      .not()
      .isEmpty(),
    check("niname")
      .not()
      .isEmpty(),
    check("status")
      .not()
      .isEmpty(),
  ],auth,
  async (req, res) => {
    try {
      req.validate();
      const created = await services.register(req.body);
      res.json(created);
    } catch (ex) {
      res.error(ex);
    }
  }
);

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

router.post("/checkJWTexpire",auth, (req, res)=>{
  tokendata  = jwt.decode(req.headers["x-access-token"],process.env.TOKEN_KEY);
  // console.log(tokendata);
  var userlodinData = {
    token : req.headers["x-access-token"],
    username : tokendata.username,
    userrole : tokendata.userrole
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




// QUERY 

router.get("/cpareportmenu-list",auth,async (req, res) => {
  try {
    const model =  await services.getAllqueryList();
    if (!model) throw new Error("ไม่พบข้อมูลที่ค้นหา");
    res.json(model);
  } catch (ex) {
    res.error(ex);
  }
});

router.post("/addquery",auth, (req, res) => {
  res.json({ message: "addquery" });
});

router.put("/editquery/:sql_id",auth, (req, res) => {
  res.json({ message: "editquery" });
});


router.put("/changestatus/:id",auth, async (req, res) => {
    try {
      const status = await services.changestatus(req.params.id,req.body);
      res.json(status)
    } catch (ex) {
      res.error(ex);
    }
});



module.exports = router;
