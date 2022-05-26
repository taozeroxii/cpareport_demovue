const connection = require("../configs/database");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
var moment = require("moment"); // require

module.exports = {
  async register(value) {
    value.create_datetime = moment(new Date()).format("YYYY-MM-DD H:mm:ss");
    value.password = await bcrypt.hash(value.password, 10);
    // return value;
    return new Promise((resolve, reject) => {
      connection.query(
        "INSERT INTO cpareport_userlogin_nversion SET ?",
        value,
        (err, result) => {
          if (err) return reject(err);
          resolve(result);
        }
      );
    });
  },

  onLogin(value) {
    return new Promise((resolve, reject) => {
      connection.query( "select * from cpareport_userlogin_nversion where username =?", [value.username],async (err, result) => {
          if (err) return reject(error);
          if (result.length > 0) {
            const userLogin = result[0];

            if (await bcrypt.compare(value.password, userLogin.password)) {
              //check password create usertoken
              const token = jwt.sign({ user_id: userLogin.id, username: userLogin.username,userrole:userLogin.status ,fname:userLogin.fname,lname:userLogin.lname ,niname:userLogin.niname  },  process.env.TOKEN_KEY, { expiresIn: "3h" } );
              //save user Token
              userLogin.token = token;
              delete userLogin.password;
              return resolve(userLogin);
            }
          }
          reject(new Error("Invalid username or password "));
        }
      );
    });
  },

  findAlluserrole() {
    return new Promise((resolve, reject) => {
      connection.query("select * from cpareport_user_role ", (err, result) => {
        if (err) return reject(error);
        return resolve(result);
      });
    });
  },

  getAlluserlist() {
    return new Promise((resolve, reject) => {
      connection.query(
        `select id,username,pname,fname,lname,status,create_datetime FROM cpareport_userlogin_nversion`,
        (error, result) => {
          // console.log(result);
          if (error) return reject(error);
          resolve(result);
        }
      );
    });
  },

  getAllqueryList() {
    return new Promise((resolve, reject) => {
      connection.query(`SELECT cm.*,cmu.main_name,case when menu_status = 1 then 'true' else '' end m_status,cs.sql_head 
      from cpareport_menu  cm  
      LEFT JOIN cpareport_sql cs on cm.menu_file = cs.sql_file 
      LEFT JOIN cpareport_mainmenu cmu on cmu.main_id = cm.menu_main
      Order by cm.id desc`, (error, result) => {
          // console.log(result);
          if (error) return reject(error);
          resolve(result);
        }
      );
    });
  },

  async changepassword(value){
    value.password = await bcrypt.hash(value.password, 10);
    // return value;
    return new Promise((resolve, reject) => {
      // resolve(value)
      connection.query( `UPDATE cpareport_userlogin_nversion set password = '${value.password}' where id = '${value.id}' and username = '${value.username}'`,  (err, result) => {
          if (err) return reject(err);
          resolve(result);
        }
      );
    });
  },

  changestatus(id, value) {
    return new Promise((resolve, reject) => {
      connection.query( `UPDATE cpareport_menu set menu_status = '${value.status}' where id = '${id}'`, async (error, result) => {
          // console.log(result);
          if (error) return reject(error);
          await this.changestatussql(id,value.status)
          resolve(result);
      });
    });
  },
  changestatussql(id,status){
    return new Promise((resolve, reject) => {
      connection.query( `SELECT menu_file FROM cpareport_menu where id = '${id}'`,(error, result) => {
        if (error) return reject(error);
        connection.query( `UPDATE cpareport_sql set sql_status = '${status}' where sql_file = '${result[0].menu_file}'`, (error, result) => {
          if (error) return reject(error);
          resolve(result);
        });
      });
    });
  },


  //ดึงข้อมูลเพิ่มลบแก้ไข query 
  async addquery(value){
    //data for cpareport_menu
    var cpareport_menu = {
      menu_main:          value.menu_main               ,
      menu_sub:           value.menu_sub                ,
      menu_link:          value.menu_link               ,
      menu_type:          value.menu_type               ,
      menu_file:          value.menu_file               ,
      menu_title:         value.menu_title              ,
      menu_order:         value.menu_order              ,
      menu_userupdate:    value.menu_userupdate         ,
      menu_status :       1                             ,
      menu_datetimeupdate:moment(new Date()).format("YYYY-MM-DD H:mm:ss")    
    };
    //data for cpareport_sql
    var cpareport_sql = {
      sql_name        :value.sql_name,
      sql_type        :value.menu_type,
      sql_file        :value.sql_file,
      sql_code        :value.sql_code,
      sql_subcode_1   :value.sql_subcode_1,
      sq_link         :value.sql_link,
      sql_head        :value.sql_head,
      sql_updatedate  :moment(new Date()).format("YYYY-MM-DD H:mm:ss") ,
      sql_userupdate  :value.menu_userupdate,
      sql_status      :1,
    };
    max_reportmenu = await this.getMaxid_cpareport_menu();
    cpareport_menu.id =  max_reportmenu.last_id;
    maxsql_id = await this.getMaxid_sql();
    cpareport_sql.sql_id =  maxsql_id.last_id;

    return  new Promise(async (resolve, reject) => {
      // console.log(cpareport_menu);
      // console.log(cpareport_sql);
      await connection.query("INSERT INTO cpareport_menu SET ?",cpareport_menu,(err, result) => {
          if (err) return reject(err);
          resolve(result)
      });
      await connection.query("INSERT INTO cpareport_sql SET ?",cpareport_sql,(err, result) => {
          if (err) return reject(err);
          resolve(result)
      });  
    });
  },
  
  findOldquerybyid(sql_id){
    return new Promise((resolve, reject) => {
      connection.query( `SELECT cm.id,cm.menu_title,sl.* FROM cpareport_sql sl  INNER  JOIN cpareport_menu cm on cm.menu_file  = sl.sql_file where cm.id = ${sql_id}`,(error, result) => {
          if (error) return reject(error);
          resolve(result);
        }
      );
    });
  },
  editquery(olddata,value){
    // console.log(olddata)
    var sql_id = olddata.sql_id;
    var log = {
      sql_edit_user  :value.sql_edit_user,
      sql_file:olddata.sql_file,
      old_sql:olddata.sql_code,
      new_sql:value.sql_code,
      sqlsubcode1_old:olddata.sql_subcode_1,
      sqlsubcode1_new:value.sql_subcode_1,
      update_datetime:moment(new Date()).format("YYYY-MM-DD H:mm:ss")   
    }
    return new Promise((resolve, reject) => {
      const query = `UPDATE cpareport_sql SET  sql_code   = ?, sql_subcode_1 = ?  WHERE sql_id   = ?`;
      connection.query(query, [  value.sql_code, value.sql_subcode_1,sql_id ], (error, result) => {
          if (error) return reject(error);
          connection.query("INSERT INTO sqlupdate_log SET ?",log,() => {});
          resolve(result);
      });
    })
  },
  editmenuquery(id,value){
    return new Promise((resolve, reject) => {
      const query  = `UPDATE cpareport_menu SET  menu_sub   = ? ,menu_title = ? WHERE menu_file   = ?`;
      const query2 = `UPDATE cpareport_sql SET  sql_name   = ? ,sql_head = ? WHERE sql_file   = ?`;
      connection.query(query, [value.menu_title,value.menu_title,id ], (error, result) => {
          if (error) return reject(error);
          connection.query(query2,[value.sql_head,value.sql_head,id ],() => {});
          resolve(result);
      });
    })
  },

  fetchQuerylog(req){
    var sql_file = req;
    return new Promise((resolve, reject) => {
      connection.query( `SELECT * FROM sqlupdate_log  where sql_file = '${sql_file}' ORDER BY update_datetime desc LIMIT 5`,(error, result) => {
          if (error) return reject(error);
          resolve(result);
        }
      );
    });
  },


  //เมนูต่างๆ ------------------------------------------------------------------------------------------------------
  //main_menu select
  getMain_namelist(){
    return new Promise((resolve, reject) => {
      connection.query(`SELECT * from cpareport_mainmenu where main_status = '1'`,(error, result) => {
          if (error) return reject(error);
          resolve(result);
        }
      );
    });
  },
  getMaxid_menu(id){
    return new Promise((resolve, reject) => {
      connection.query(`SELECT count(menu_order)+1 as max_menu  from cpareport_menu where menu_main = '${id}'`,(error, result) => {
          if (error) return reject(error);
          resolve(result[0]);
        }
      );
    });
  },
  getMaxid_sql(){//id สุดท้าย cpareportmenu
    return new Promise((resolve, reject) => {
      connection.query(`SELECT MAX(sql_id)+1 AS last_id FROM cpareport_sql`,(error, result) => {
          if (error) return reject(error);
          resolve(result[0]);
        }
      );
    });
  },
  getMaxid_cpareport_menu(){//id สุดท้าย cpareportmenu
    return new Promise((resolve, reject) => {
      connection.query(`SELECT MAX(id)+1 AS last_id FROM cpareport_menu`,(error, result) => {
          if (error) return reject(error);
          resolve(result[0]);
        }
      );
    });
  },
  getselectform(){
    return new Promise((resolve, reject) => {
      connection.query(`SELECT * FROM cpareport_report WHERE report_status = '1' and is_use = '1'  ORDER BY report_id ASC  `,(error, result) => {
          if (error) return reject(error);
          resolve(result);
        }
      );
    });
  },
  getformparams(req){
    // console.log(`SELECT paramitor1,paramitor2,paramitor3,paramitor4 FROM cpareport_report where report_name = '${req.report_name}'`)
    return new Promise((resolve, reject) => {
      connection.query(`SELECT paramitor1,paramitor2,paramitor3,paramitor4 FROM cpareport_report where report_name = '${req.report_name}'`,(error, result) => {
          if (error) return reject(error);
          resolve(result[0]);
        }
      );
    });
  },





};
