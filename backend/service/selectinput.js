const connection = require("../configs/database");
const pgconnection = require("../configs/pgcon");

const table = {
  doctor: "doctor",
  ward: "ward",
  pttype: "pttype",
  spclty: "spclty",
  kskdepartment:"kskdepartment",
};

module.exports = {
  findDoctor() {
    return new Promise((resolve, reject) => {
      pgconnection.query(
        `SELECT code,name,licenseno FROM ${table.doctor} order by code`,
        (error, result) => {
          if (error) return reject(error);
          resolve(result.rows);
        }
      );
    });
  },

  findSpclty() {
    return new Promise((resolve, reject) => {
      pgconnection.query(
        `SELECT spclty,name FROM ${table.spclty} order by spclty`,
        (error, result) => {
          if (error) return reject(error);
          resolve(result.rows);
        }
      );
    });
  },

  findDepartments() {
    return new Promise((resolve, reject) => {
      pgconnection.query(
        `SELECT depcode,department FROM ${table.kskdepartment} where department not like 'ฮ %%' order by depcode`,
        (error, result) => {
          if (error) return reject(error);
          resolve(result.rows);
        }
      );
    });
  },

  findWard() {
    return new Promise((resolve, reject) => {
      pgconnection.query(
        `SELECT ward,name FROM ${table.ward} order by ward`,
        (error, result) => {
          if (error) return reject(error);
          resolve(result.rows);
        }
      );
    });
  },

  findpttype() {
    return new Promise((resolve, reject) => {
      pgconnection.query(
        `SELECT pttype,name FROM ${table.pttype} order by pttype`,
        (error, result) => {
          if (error) return reject(error);
          resolve(result.rows);
        }
      );
    });
  },
};
