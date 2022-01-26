const connection = require("../configs/database");
const pgconnection = require("../configs/pgcon");
var moment = require("moment"); // require

var date = moment(new Date()).format("YYYY-MM-DD") ;
module.exports = {
  FindAllOperation_room() {
    return new Promise((resolve, reject) => {
      pgconnection.query(
        `SELECT r.room_id,r.room_name
        FROM operation_list o
        LEFT OUTER JOIN operation_room r ON r.room_id = o.room_id
        WHERE	1 = 1
         AND o.request_date  = '${date}'
        AND o.status_id NOT IN ('3','9')
        AND  r.room_id is not null
        GROUP BY r.room_id,r.room_name
        ORDER BY room_id ASC`,
        (error, result) => {
          if (error) return reject(error);
          resolve(result.rows);
        }
      );
    });
  },
  fetchDataByRoomud(room_id) {
    return new Promise((resolve, reject) => {
      pgconnection.query(
        `
        SELECT o.request_operation_time as timeoper,o.hn    ,CONCAT(pt.pname,pt.fname,'  ',pt.lname) As pname
       ,o3.provision_diagnosis_text,o.operation_name
       --,s.status_name
       ,e.emergency_name
       ,CASE  WHEN ans.age_y IS NOT NULL THEN  ans.age_y ::TEXT  WHEN ans.age_y IS NULL THEN  vns.age_y ::TEXT ELSE '' END  AS age_y
       ,CASE  WHEN o3.bw IS NOT NULL THEN  ROUND(o3.bw,2) :: TEXT WHEN o3.bw IS NULL THEN  ROUND(ss.waist,2) :: TEXT ELSE '' END   AS weight
       ,CASE WHEN w.NAME IS NOT NULL THEN  w.NAME WHEN w.NAME IS NULL THEN  'OPD' ELSE '' END  AS ward_name
       ,CASE WHEN o3.operation_set_npo_time IS NOT NULL THEN  'NPO' WHEN o3.operation_set_npo_time IS NULL THEN  ' ' ELSE '' END  AS npo
       ,d.NAME AS request_doctor_name
       FROM operation_list o
       LEFT OUTER JOIN patient pt ON pt.hn = o.hn
       LEFT OUTER JOIN operation_status s ON s.status_id = o.status_id
       LEFT OUTER JOIN operation_emergency e ON e.emergency_id = o.emergency_id
       LEFT OUTER JOIN operation_room r ON r.room_id = o.room_id
       LEFT OUTER JOIN operation_screen_in oi ON oi.operation_id = o.operation_id
       LEFT OUTER JOIN icd101 i ON i.code = SUBSTRING ( o.provision_diagnosis, 1, 3 )
       LEFT OUTER JOIN doctor d ON d.code = o.request_doctor
       LEFT OUTER JOIN ipt T ON T.an = o.an
       LEFT OUTER JOIN ward w ON w.ward = T.ward
       LEFT OUTER JOIN spclty sp ON sp.spclty = o.spclty
       LEFT OUTER JOIN operation_type ot ON ot.operation_type_id = o.operation_type_id
       LEFT OUTER JOIN operation_time_type otn ON otn.operation_time_type_id = o.operation_time_type_id
       LEFT OUTER JOIN vn_stat vns ON vns.vn = o.vn  AND vns.vn IS NOT NULL LEFT OUTER JOIN pttype py1 ON py1.pttype = vns.pttype
       LEFT OUTER JOIN ovst ooo ON ooo.vn = o.vn  
       LEFT OUTER JOIN opdscreen ss ON ss.vn = o.vn  
       LEFT OUTER JOIN an_stat ans ON ans.an = o.an 	AND ans.an IS NOT NULL LEFT OUTER JOIN operation_facility f1 ON f1.operation_facility_id = o.operation_facility_id
       LEFT OUTER JOIN operation_list_anes_type ol1 ON ol1.operation_list_anes_type_id = o.operation_list_anes_type_id
       LEFT OUTER JOIN pttype py2 ON py2.pttype = ans.pttype
       LEFT OUTER JOIN operation_set o3 ON o3.operation_set_id = o.operation_set_id
       LEFT OUTER JOIN doctor d3 ON d3.code = o3.anes_doctor_code
       LEFT OUTER JOIN operation_set_cmpn o4 ON o4.operation_set_cmpn_id = o3.operation_set_cmpn_id 
       WHERE	1 = 1
        AND o.request_date = '${date}'
        AND o.status_id NOT IN ('3','9')
        AND  r.room_id = ${room_id}
       ORDER BY room_name `,
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        }
      );
    });
  },
};
