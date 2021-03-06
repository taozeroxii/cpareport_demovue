const jwt = require("jsonwebtoken");
const config = process.env;

const verifyToken = (req, res, next) => {
  const token = req.body.token || req.query.token || req.headers["x-access-token"];

  if (!token) {
    return res.status(403).json({message:"Token is required for Authentication"});
  }

  try{
    const decoded = jwt.verify(token,config.TOKEN_KEY);
    req.user = decoded;
    if(req.user.userrole !== '1'){// ต้องเป็น admin เท่านั้นที่จะเข้าใช้งานได้ 
      return res.status(403).json({message:"Access Denieds"});
    }

  }catch{
    return res.status(401).json({message:"JWT is Invalid OR Expired"})
  }
  return next();
};

module.exports = verifyToken;