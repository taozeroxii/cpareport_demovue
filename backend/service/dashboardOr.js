const connection = require("../configs/database");
const pgconnection = require("../configs/pgcon");
var moment = require("moment"); // require

module.exports = {
  FindAllOperation_room() {
    var date = moment(new Date()).format("YYYY-MM-DD") ;
    const tomorrow = new Date(date)
    tomorrow.setDate(tomorrow.getDate() + 1)
    // console.log(date+' '+moment(tomorrow).format("YYYY-MM-DD"))
    return new Promise((resolve, reject) => {
      pgconnection.query(
        `  SELECT  gb_room.room_id,gb_room.room_name FROM (
          SELECT r.room_id,r.room_name,o.operation_date as date
          FROM operation_list o
          LEFT OUTER JOIN operation_room r ON r.room_id = o.room_id
          WHERE	1 = 1
          AND o.operation_date    between '${date}' AND '${moment(tomorrow).format("YYYY-MM-DD")}'
          AND o.status_id NOT IN ('3','9')
          GROUP BY r.room_id,r.room_name,o.operation_date
          UNION  ALL
          SELECT r.room_id,r.room_name,o.operation_set_date as date
          FROM operation_set o
          LEFT OUTER JOIN operation_room r ON r.room_id = o.room_id
          WHERE	 o.operation_set_date   between '${date}' AND '${moment(tomorrow).format("YYYY-MM-DD")}'
          AND o.operation_set_type_id = '1'
      )as gb_room 
        GROUP BY room_id,room_name 	order by room_id	`,
        (error, result) => {
          if (error) return reject(error);
          resolve(result.rows);
        }
      );
    });
  },
  FindAllOperation_room_bydate(date) {
    return new Promise((resolve, reject) => {
      pgconnection.query(
        `			
        SELECT * FROM (
              SELECT r.room_id,r.room_name,o.operation_date as date
              FROM operation_list o
              LEFT OUTER JOIN operation_room r ON r.room_id = o.room_id
              WHERE	1 = 1
              AND o.operation_date  = '${date}'
              AND o.status_id NOT IN ('3','9')
              GROUP BY r.room_id,r.room_name,o.operation_date
              UNION  ALL
              SELECT r.room_id,r.room_name,o.operation_set_date as date
              FROM operation_set o
              LEFT OUTER JOIN operation_room r ON r.room_id = o.room_id
              WHERE	 o.operation_set_date  = '${date}'
              AND o.operation_set_type_id = '1'
          )as gb_room 
            GROUP BY room_id,room_name,date 	order by room_id	
            `
        ,(error, result) => { if (error) return reject(error); resolve(result.rows);
        }
      );
    });
  },

  
  fetchDataByRoomud(room_id) {
    var date = moment(new Date()).format("YYYY-MM-DD") ;
    const tomorrow = new Date(date)
    tomorrow.setDate(tomorrow.getDate() + 1)
    // console.log(date+' '+moment(tomorrow).format("YYYY-MM-DD"))
    return new Promise((resolve, reject) => {
      pgconnection.query(
        ` SELECT 
        oset.operation_set_type_id  as set_type,o.status_id,
        o.operation_date,o.request_operation_time as timeoper,o.hn    ,CONCAT(pt.pname,pt.fname,'  ',pt.lname) As pname
        ,o3.provision_diagnosis_text,o.operation_name
        --,s.status_name
        ,e.emergency_name
        ,CASE  WHEN ans.age_y IS NOT NULL THEN  ans.age_y ::TEXT  WHEN ans.age_y IS NULL THEN  vns.age_y ::TEXT ELSE '' END  AS age_y
        ,CASE  WHEN o3.bw IS NOT NULL THEN  ROUND(o3.bw,2) :: TEXT WHEN o3.bw IS NULL THEN  ROUND(ss.waist,2) :: TEXT ELSE '' END   AS weight
        ,CASE WHEN w.NAME IS NOT NULL THEN  w.NAME WHEN w.NAME IS NULL THEN  'OPD' ELSE '' END  AS ward_name
        ,CASE WHEN o3.operation_set_npo_time IS NOT NULL THEN  'NPO' WHEN o3.operation_set_npo_time IS NULL THEN  ' ' ELSE '' END  AS npo,o3.set_tf
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
        LEFT OUTER JOIN operation_set_type oset ON oset.operation_set_type_id = o3.operation_set_type_id
        WHERE	1 = 1         
         AND o.operation_date between '${date}' AND '${moment(tomorrow).format("YYYY-MM-DD")}'
         AND o.status_id NOT IN ('3','9')
         AND r.room_id ${room_id == null ? 'is null ': '= '+room_id} 
         
         UNION  ALL
 
         SELECT	
          o2.operation_set_type_id as set_type,(select operation_status from operation_list where operation_id = operation_id limit 1)::int,
           o1.operation_set_date as operation_date,
           o1.operation_set_time as timeoper,
           o1.hn,
           CAST ( concat ( P.pname, P.fname, ' ', P.lname ) AS VARCHAR ( 250 ) ) AS pname,
           o1.provision_diagnosis_text,
           o1.operation_name,  
           e.emergency_name,
           EXTRACT (YEAR FROM age(P.birthday))::TEXT  AS age_y,
           CASE WHEN o1.bw IS NOT NULL THEN  ROUND(o1.bw,2) :: TEXT WHEN o1.bw IS NULL THEN  ROUND(ss.waist,2) :: TEXT ELSE '' END   AS weight,
           case when w3.NAME is null then k1.department else w3.NAME end AS ward_name,
           CASE WHEN o1.operation_set_npo_time IS NOT NULL THEN  'NPO' WHEN o1.operation_set_npo_time IS NULL THEN  ' ' ELSE '' END  AS npo,
           o1.set_tf,
           d.NAME AS request_doctor_name
         FROM
           operation_set o1
           LEFT OUTER JOIN doctor d ON d.code = o1.operation_set_doctor_code
           LEFT OUTER JOIN operation_set_type o2 ON o2.operation_set_type_id = o1.operation_set_type_id
           LEFT OUTER JOIN operation_time_type o3 ON o3.operation_time_type_id = o1.operation_time_type_id
           LEFT OUTER JOIN operation_emergency o4 ON o4.emergency_id = o1.emergency_id
           LEFT OUTER JOIN operation_room o5 ON o5.room_id = o1.room_id
           LEFT OUTER JOIN operation_type o6 ON o6.operation_type_id = o1.operation_type_id
           LEFT OUTER JOIN operation_list_anes_type o7 ON o7.operation_list_anes_type_id = o1.operation_list_anes_type_id
           LEFT OUTER JOIN patient P ON P.hn = o1.hn
           LEFT OUTER JOIN kskdepartment k1 ON k1.depcode = o1.operation_set_depcode
           LEFT OUTER JOIN ipt i3 ON i3.an = o1.an
           LEFT OUTER JOIN ward w3 ON w3.ward = i3.ward 
           LEFT OUTER JOIN operation_emergency e ON e.emergency_id = o1.emergency_id
           LEFT OUTER JOIN opdscreen ss ON ss.vn = o1.vn  
         WHERE	o1.set_complete = 'N' 
            AND o1.operation_set_date BETWEEN '${date}' AND '${moment(tomorrow).format("YYYY-MM-DD")}'
            AND o2.operation_set_type_id NOT IN ('2','3','9')
            AND o5.room_id ${room_id == null ? 'is null ': '= '+room_id} `,
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        }
      );
    });
  },
  fetchData_DateRoomid(reqdate) {
    var date =  reqdate.date;
    var room_id =  reqdate.room_id;
    return new Promise((resolve, reject) => {
      pgconnection.query(
        ` SELECT 
        oset.operation_set_type_id  as set_type,o.status_id,
        o.operation_date,o.request_operation_time as timeoper,o.hn    ,CONCAT(pt.pname,pt.fname,'  ',pt.lname) As pname
        ,o3.provision_diagnosis_text,o.operation_name
        --,s.status_name
        ,e.emergency_name
        ,CASE  WHEN ans.age_y IS NOT NULL THEN  ans.age_y ::TEXT  WHEN ans.age_y IS NULL THEN  vns.age_y ::TEXT ELSE '' END  AS age_y
        ,CASE  WHEN o3.bw IS NOT NULL THEN  ROUND(o3.bw,2) :: TEXT WHEN o3.bw IS NULL THEN  ROUND(ss.waist,2) :: TEXT ELSE '' END   AS weight
        ,CASE WHEN w.NAME IS NOT NULL THEN  w.NAME WHEN w.NAME IS NULL THEN  'OPD' ELSE '' END  AS ward_name
        ,CASE WHEN o3.operation_set_npo_time IS NOT NULL THEN  'NPO' WHEN o3.operation_set_npo_time IS NULL THEN  ' ' ELSE '' END  AS npo,o3.set_tf
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
        LEFT OUTER JOIN operation_set_type oset ON oset.operation_set_type_id = o3.operation_set_type_id
        WHERE	1 = 1         
         AND o.operation_date = '${date}'
         AND o.status_id NOT IN ('3','9')
         AND r.room_id ${room_id == null ? 'is null ': '= '+room_id} 
         
         UNION  ALL
 
         SELECT	
          o2.operation_set_type_id as set_type,(select operation_status from operation_list where operation_id = operation_id limit 1)::int,
           o1.operation_set_date as operation_date,
           o1.operation_set_time as timeoper,
           o1.hn,
           CAST ( concat ( P.pname, P.fname, ' ', P.lname ) AS VARCHAR ( 250 ) ) AS pname,
           o1.provision_diagnosis_text,
           o1.operation_name,  
           e.emergency_name,
           EXTRACT (YEAR FROM age(P.birthday))::TEXT  AS age_y,
           CASE WHEN o1.bw IS NOT NULL THEN  ROUND(o1.bw,2) :: TEXT WHEN o1.bw IS NULL THEN  ROUND(ss.waist,2) :: TEXT ELSE '' END   AS weight,
           case when w3.NAME is null then k1.department else w3.NAME end AS ward_name,
           CASE WHEN o1.operation_set_npo_time IS NOT NULL THEN  'NPO' WHEN o1.operation_set_npo_time IS NULL THEN  ' ' ELSE '' END  AS npo,
           o1.set_tf,
           d.NAME AS request_doctor_name
         FROM
           operation_set o1
           LEFT OUTER JOIN doctor d ON d.code = o1.operation_set_doctor_code
           LEFT OUTER JOIN operation_set_type o2 ON o2.operation_set_type_id = o1.operation_set_type_id
           LEFT OUTER JOIN operation_time_type o3 ON o3.operation_time_type_id = o1.operation_time_type_id
           LEFT OUTER JOIN operation_emergency o4 ON o4.emergency_id = o1.emergency_id
           LEFT OUTER JOIN operation_room o5 ON o5.room_id = o1.room_id
           LEFT OUTER JOIN operation_type o6 ON o6.operation_type_id = o1.operation_type_id
           LEFT OUTER JOIN operation_list_anes_type o7 ON o7.operation_list_anes_type_id = o1.operation_list_anes_type_id
           LEFT OUTER JOIN patient P ON P.hn = o1.hn
           LEFT OUTER JOIN kskdepartment k1 ON k1.depcode = o1.operation_set_depcode
           LEFT OUTER JOIN ipt i3 ON i3.an = o1.an
           LEFT OUTER JOIN ward w3 ON w3.ward = i3.ward 
           LEFT OUTER JOIN operation_emergency e ON e.emergency_id = o1.emergency_id
           LEFT OUTER JOIN opdscreen ss ON ss.vn = o1.vn  
         WHERE	o1.set_complete = 'N' 
            AND o1.operation_set_date = '${date}' 
            AND o2.operation_set_type_id  = '1'
            AND o5.room_id ${room_id == null ? 'is null ': '= '+room_id}`,
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        }
      );
    });
  },



};
