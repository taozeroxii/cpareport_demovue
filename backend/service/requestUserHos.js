const pgconnection = require("../configs/pgcon");

module.exports = {
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
      pgconnection.query(`SELECT doctor_department_id,doctor_department_name FROM doctor_department`, (error, result) => {
        if (error) return reject(error);
        resolve(result.rows);
      });
    });
  },
  fetchallprovidertype() {
    return new Promise((resolve, reject) => {
      pgconnection.query(`SELECT * FROM provider_type order by provider_type_code`, (error, result) => {
        if (error) return reject(error);
        resolve(result.rows);
      });
    });
  },
};
