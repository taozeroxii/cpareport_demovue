const connection = require("../configs/database");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")

module.exports = {
  async register(value) {
    value.create_datetime = new Date().toLocaleString(); 
    value.password = await bcrypt.hash(value.password, 10);
    // return value;
    return new Promise((resolve, reject) => {
      connection.query("INSERT INTO cpareport_userlogin_nversion SET ?",value,(err, result) => {
          if (err) return reject(err);
          resolve(result);
        }
      );
    });
  },

  onLogin(value) {
    return new Promise((resolve, reject) => {
      connection.query( "select * from cpareport_userlogin_nversion where username =?",[value.username],async (err, result) => {
          if (err) return reject(error);
          if (result.length > 0) {
            const userLogin = result[0];
            if (await bcrypt.compare(value.password, userLogin.password)) { //check password
              //create usertoken 
              const token = jwt.sign( { user_id:userLogin.id, username:userLogin.username},process.env.TOKEN_KEY,{expiresIn:"60s"});
              //save user Token
              userLogin.token = token;
              delete userLogin.password;
              return resolve(userLogin)
            }
          }
          reject(new Error("Invalid username or password "));
        }
      );
    });
  },

  
};
