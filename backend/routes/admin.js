const router = require("express").Router();
const { check } = require("express-validator");
const services = require("../service/admin");
const auth  = require("../middleware/auth");

router.get("/", (req, res) => {
  res.json({ message: "admin" });
});

router.post(
  "/register",
  [
    check("username")
      .not()
      .isEmpty(),
    check("password")
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
  ],
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
  res.status(200).json({message:"Ok"});
});


router.post("/logout", (req, res) => {
  res.json({ message: "logout" });
});

router.post("/addquery",auth, (req, res) => {
  res.json({ message: "addquery" });
});

router.put("/editquery/:sql_id",auth, (req, res) => {
  res.json({ message: "editquery" });
});

router.put("/changestatus/:sql_id",auth, (req, res) => {
  res.json({ message: "changestatus" });
});

module.exports = router;
