const pgconnection = require("../configs/pgcon");
const connection = require("../configs/database");
module.exports = {

  //เพิ่มข้อมูล
  insert(value){
    return new Promise((resolve, reject) => {
      connection.query( "INSERT INTO frm_res_require_login_hosxp SET ?",value,(err, result) => {
          if (err) return reject(err);
          resolve(result);
        }
      );
    });
  },

  checkolduserhos(username){
    return new Promise((resolve, reject) => {
      pgconnection.query(  `SELECT * FROM officer where officer_login_name = '${username}'`,
        (error, result) => {
          if (error) return reject(error);
          resolve(result.rowCount);
        }
      );
    });
  },




  fetchallposition() {
    return new Promise((resolve, reject) => {
      pgconnection.query(
        `SELECT id,name FROM doctor_position order by id`,
        (error, result) => {
          if (error) return reject(error);
          resolve(result.rows);
        }
      );
    });
  },
  fetchallspclty() {
    return new Promise((resolve, reject) => {
      pgconnection.query(
        `SELECT spclty,name FROM spclty order by  spclty`,
        (error, result) => {
          if (error) return reject(error);
          resolve(result.rows);
        }
      );
    });
  },
  fetchallspeciality() {
    return new Promise((resolve, reject) => {
      pgconnection.query(
        `SELECT doctor_department_id,doctor_department_name FROM doctor_department`,
        (error, result) => {
          if (error) return reject(error);
          resolve(result.rows);
        }
      );
    });
  },
  fetchallprovidertype() {
    return new Promise((resolve, reject) => {
      pgconnection.query(
        `SELECT * FROM provider_type order by provider_type_code`,
        (error, result) => {
          if (error) return reject(error);
          resolve(result.rows);
        }
      );
    });
  },

  //dropdown แพทย์แผนไทย
  health_med_curriculum() {
    return new Promise((resolve, reject) => {
      pgconnection.query(
        `SELECT * FROM health_med_curriculum`,
        (error, result) => {
          if (error) return reject(error);
          resolve(result.rows);
        }
      );
    });
  },
  health_med_educational() {
    return new Promise((resolve, reject) => {
      pgconnection.query(
        `SELECT * FROM health_med_educational`,
        (error, result) => {
          if (error) return reject(error);
          resolve(result.rows);
        }
      );
    });
  },
  health_med_institute_type() {
    return new Promise((resolve, reject) => {
      pgconnection.query(
        `SELECT health_med_institute_type_id,health_med_institute_type_name FROM health_med_institute_type`,
        (error, result) => {
          if (error) return reject(error);
          resolve(result.rows);
        }
      );
    });
  },
  health_med_institute(id) {
    return new Promise((resolve, reject) => {
      pgconnection.query(
        `SELECT * FROM health_med_institute where health_med_institute_type_id =  '${id}'`,
        (error, result) => {
          if (error) return reject(error);
          resolve(result.rows);
        }
      );
    });
  },
  health_med_license_type() {
    return new Promise((resolve, reject) => {
      pgconnection.query(
        `SELECT * FROM health_med_license_type`,
        (error, result) => {
          if (error) return reject(error);
          resolve(result.rows);
        }
      );
    });
  },
  health_med_provider_type() {
    return new Promise((resolve, reject) => {
      pgconnection.query(
        `SELECT * FROM health_med_provider_type`,
        (error, result) => {
          if (error) return reject(error);
          resolve(result.rows);
        }
      );
    });
  },
  health_med_provider_category() {
    return new Promise((resolve, reject) => {
      pgconnection.query(
        `SELECT * FROM health_med_provider_category`,
        (error, result) => {
          if (error) return reject(error);
          resolve(result.rows);
        }
      );
    });
  },


};
