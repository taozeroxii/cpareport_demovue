
const connection = require("../configs/database");
const pgconnection = require("../configs/pgcon");

const table = {
  sql: "cpareport_sql",
  bkeq: "tb_bookings_has_tb_equipments",
};

module.exports = {
  findById(id) {
    return new Promise((resolve, reject) => {
      connection.query(`SELECT * FROM ${table.sql} WHERE sql_file = ?`, [id],(error, result) => {
          if (error) return reject(error);
          resolve(result.length > 0 ? result[0] : null);
        }
      );
    });
  },

  findMenuById(id) {
    return new Promise((resolve, reject) => {connection.query(`SELECT * FROM cpareport_menu WHERE menu_file = ?`,[id],(error, result) => {
          if (error) return reject(error);
          resolve(result.length > 0 ? result[0] : null);
        }
      );
    });
  },

  findqueryPg(value) {
    let replacesql = value.sql;

    replacesql = replacesql.replace(/{datepickers}/g,`'${value.date1}'`);// /{datepickers}/g ใช้ในการแทนที่คำนี้ทั้้งหมดในตัวแปร replacesql หากใช้แบบ "" ธรรมดาจะได้แคต่ตำแหน่งแรกที่เจออันเดียว
    replacesql = replacesql.replace(/{datepickert}/g,`'${value.date2}'`);
    replacesql = replacesql.replace(/{stime}/g,`'${value.time1}'`);
    replacesql = replacesql.replace(/{etime}/g,`'${value.time2}'`);
    replacesql = replacesql.replace(/{sicd10}/g,`'${value.sdiag}'`);
    replacesql = replacesql.replace(/{eicd10}/g,`'${value.ediag}'`);

    if(value.pttype != '')        {   replacesql = replacesql.replace(/{multiple_pttype}/g,` (${value.pttype}) `); }  
    else {replacesql = replacesql.replace(/{multiple_pttype}/g,` (select pttype FROM pttype) `);} 

    if(value.spclty != '')        {   replacesql = replacesql.replace(/{multiple_spclty}/g,` (${value.spclty}) `);}
    else {replacesql = replacesql.replace(/{multiple_spclty}/g,` (select spclty FROM spclty) `);} 


    if(value.kskdepartments != ''){   replacesql = replacesql.replace(/{multiple_room}/g,` (${value.kskdepartments}) `);}
    else {replacesql = replacesql.replace(/{multiple_room}/g,` (select depcode FROM kskdepartment) `);} 

    if(value.ward != '')          {   replacesql = replacesql.replace(/{multiple_ward}/g,` (${value.ward}) `);}
    else {replacesql = replacesql.replace(/{multiple_ward}/g,` (select ward FROM ward) `);} 


    if(value.doctor != '')        {   replacesql = replacesql.replace(/{multiple_doctor}/g,` (${value.doctor}) `);}
    else {replacesql = replacesql.replace(/{multiple_doctor}/g,` (select code FROM doctor) `);} 

    
    //  console.log(replacesql);
    
    return new Promise((resolve, reject) => {
      pgconnection.query(`${replacesql}`, (error, result) => {
        if (error) return  reject (error);
        for (let i = 0; i < result.rows.length; i++) {
          for (let j = 0; j < Object.entries(result.rows[i]).length; j++) {
            if (Object.prototype.toString.call(Object.values(result.rows[i])[j]) === '[object Date]'){
              result.rows[i][Object.keys(result.rows[i])[j]] = Object.values(result.rows[i])[j].toLocaleDateString('th-TH');
            }
          }
        }
        resolve(result);
      });

    });
  },

  findqueryPg2(value) {
    let replacesql = value.sql2;
    replacesql = replacesql.replace(/{datepickers}/g,`'${value.date1}'`);// /{datepickers}/g ใช้ในการแทนที่คำนี้ทั้้งหมดในตัวแปร replacesql หากใช้แบบ "" ธรรมดาจะได้แคต่ตำแหน่งแรกที่เจออันเดียว
    replacesql = replacesql.replace(/{datepickert}/g,`'${value.date2}'`);
    replacesql = replacesql.replace(/{stime}/g,`'${value.time1}'`);
    replacesql = replacesql.replace(/{etime}/g,`'${value.time2}'`);
    replacesql = replacesql.replace(/{sicd10}/g,`'${value.sdiag}'`);
    replacesql = replacesql.replace(/{eicd10}/g,`'${value.ediag}'`);

    // console.log(replacesql)


    if(value.pttype != '')        {   replacesql = replacesql.replace(/{multiple_pttype}/g,` (${value.pttype}) `); }  
    else {replacesql = replacesql.replace(/{multiple_pttype}/g,` (select pttype FROM pttype) `);} 

    if(value.spclty != '')        {   replacesql = replacesql.replace(/{multiple_spclty}/g,` (${value.spclty}) `);}
    else {replacesql = replacesql.replace(/{multiple_spclty}/g,` (select spclty FROM spclty) `);} 

    if(value.kskdepartments != ''){   replacesql = replacesql.replace(/{multiple_room}/g,` (${value.kskdepartments}) `);}
    else {replacesql = replacesql.replace(/{multiple_room}/g,` (select depcode FROM kskdepartment) `);} 

    if(value.ward != '')          {   replacesql = replacesql.replace(/{multiple_ward}/g,` (${value.ward}) `);}
    else {replacesql = replacesql.replace(/{multiple_ward}/g,` (select ward FROM ward) `);} 

    if(value.doctor != '')        {   replacesql = replacesql.replace(/{multiple_doctor}/g,` (${value.doctor}) `);}
    else {replacesql = replacesql.replace(/{multiple_doctor}/g,` (select code FROM doctor) `);} 

    //  console.log(replacesql);
    
    return new Promise((resolve, reject) => {
      pgconnection.query(`${replacesql}`, (error, result) => {
        if (error) return  reject (error);
        for (let i = 0; i < result.rows.length; i++) {
          for (let j = 0; j < Object.entries(result.rows[i]).length; j++) {
            if (Object.prototype.toString.call(Object.values(result.rows[i])[j]) === '[object Date]'){
              result.rows[i][Object.keys(result.rows[i])[j]] = Object.values(result.rows[i])[j].toLocaleDateString('th-TH');
            }
          }
        }
        resolve(result);
      });

    });
  },
};
