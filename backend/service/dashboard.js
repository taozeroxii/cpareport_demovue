const connection = require("../configs/database");
const pgconnection = require("../configs/pgcon");
var moment = require("moment"); // require
module.exports = {
  toptenopd() {
    return new Promise((resolve, reject) => {
      pgconnection.query(
        `
        (SELECT 'opd' as department,icd10,COUNT(vn) FROM ovstdiag 
        WHERE vstdate  >= date_trunc('month', current_timestamp) - interval '1 month'
        and vstdate <  date_trunc('month', current_timestamp)
        GROUP BY icd10 ORDER BY count DESC limit 10 )
        UNION ALL
        (SELECT 'ipd' as department,icd10,COUNT(*) FROM iptdiag iptd
        inner join ipt i on i.an = iptd.an 
        AND  dchdate  >= date_trunc('month', current_timestamp) - interval '1 month'
        AND  dchdate <  date_trunc('month', current_timestamp)
        GROUP BY icd10 ORDER BY count DESC limit 10 )        
         `,
        (error, result) => {
          if (error) return reject(error);
          resolve(result.rows);
        }
      );
    });
  },

  ptytoday() {
    return new Promise((resolve, reject) => {
      pgconnection.query(
        `
          SELECT ov.pttype,pty.name as pty_name,COUNT(*) FROM ovst ov
          LEFT JOIN pttype pty on pty.pttype = ov.pttype
          WHERE vstdate = CURRENT_DATE
          -- vstdate  >= date_trunc('month', current_timestamp) - interval '1 month' and vstdate <  date_trunc('month', current_timestamp)
          GROUP BY ov.pttype,pty_name ORDER BY count desc

         `,
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        }
      );
    });
  },

  visit() {
    return new Promise((resolve, reject) => {
      pgconnection.query(
        `
        SELECT ord as ord,type ,
            sum (case when vstdate = CURRENT_DATE  then cc else 0 end )  as ข้อมูลปัจจุบัน  ,
            sum (case when vstdate = CURRENT_DATE -1 then cc  else 0 end )as ย้อนหลังหนึ่งวัน    ,
            sum (case when vstdate = CURRENT_DATE -2 then cc  else 0 end )as ย้อนหลังสองวัน  ,
            sum (case when vstdate = CURRENT_DATE -3 then cc  else 0 end )as ย้อนหลังสามวัน  ,
            sum (case when vstdate = CURRENT_DATE -4 then cc  else 0 end )as ย้อนหลังสี่วัน  
            FROM(
            SELECT '1' :: integer as ord,'ผู้รับบริการผู้ป่วยนอก OPD' as type,vstdate,count(hn)as cc FROM ovst where vstdate between CURRENT_DATE -4  and CURRENT_DATE 
            GROUP BY vstdate ,ord 
            UNION ALL

            SELECT '2' :: integer as ord,'ผู้รับบริการผู้ป่วยนอก OPD ไม่ได้มีนัดวันนี้ ' as type,vstdate,
              sum (case when concat(visit,vstdate) = concat('a',vstdate)  then cc else 0 end ) - sum(case when concat(visit,vstdate) = concat('b',vstdate) then cc else 0 end  )as cc
              from (
                (SELECT 'a' as visit,vstdate,count(*)as cc from ovst where vstdate  between CURRENT_DATE -4  and CURRENT_DATE group by vstdate  ) 
                UNION ALL
                (SELECT 'b' as oapp,vstdate,count(*) FROM ovst  where vstdate between CURRENT_DATE -4  and CURRENT_DATE 
                and vn in (SELECT visit_vn FROM oapp where nextdate  between CURRENT_DATE -4  and CURRENT_DATE group by nextdate,visit_vn)
                group by vstdate)
              )AS countsum
            group by vstdate
            UNION ALL
            SELECT '3' :: integer as ord,'คลินิกระบบทางเดินหายใจ (ARI Clinic)' as type,vstdate,count(hn)as cc 
            FROM ovst 
            where vstdate between CURRENT_DATE -4  and CURRENT_DATE 
            AND main_dep in ('396','397')
            GROUP BY vstdate,ord 
            UNION ALL
            SELECT '4' :: integer as ord,'คลินิกระบบทางเดินหายใจ (ARI เจ้าหน้าที่ รพ.)' as type,a.vstdate,count(a.hn)as cc
            FROM ovst AS a
            INNER JOIN vn_stat AS b ON a.vn = b.vn
            INNER JOIN patient AS p ON p.hn = a.hn
            INNER JOIN doctor AS d ON p.cid = d.cid AND d.active = 'Y'
            INNER JOIN provider_type AS v ON v.provider_type_code = d.provider_type_code
            WHERE 1 = 1
            AND a.vstdate BETWEEN  CURRENT_DATE -4  and CURRENT_DATE 
            AND a.main_dep in ('396','397')
            GROUP BY a.vstdate,ord 
            UNION ALL
            SELECT '5' :: integer as ord,'คลินิกระบบทางเดินหายใจ ( ช่วงอายุ น้อยกว่าหรือเท่ากับ 15 ปี)' as type,o.vstdate,count(o.hn)as cc 
            FROM ovst as o 
            INNER JOIN vn_stat as v on v.vn = o.vn
            where o.vstdate between CURRENT_DATE -4  and CURRENT_DATE 
            AND o.main_dep in ('396','397')
            AND v.age_y <= '15'
            GROUP BY o.vstdate,ord 
            UNION ALL
            SELECT '6' :: integer as ord,'คลินิกระบบทางเดินหายใจ (ช่วงอายุ มากกว่า 15 ปี)' as type,o.vstdate,count(o.hn)as cc 
            FROM ovst as o 
            INNER JOIN vn_stat as v on v.vn = o.vn
            where o.vstdate between CURRENT_DATE -4  and CURRENT_DATE 
            AND o.main_dep in ('396','397')
            AND v.age_y > '15'
            GROUP BY o.vstdate,ord 
            UNION ALL
            SELECT '7' :: integer as ord,'ผู้ป่วย Admit' as type,regdate,count(an) as cc  FROM ipt where regdate between CURRENT_DATE -4  and CURRENT_DATE 
            GROUP BY regdate,ord  
            UNION ALL
            SELECT '8' :: integer as ord,'ผู้ป่วย จำหน่าย' as type,dchdate,count(an) as cc  FROM ipt WHERE  dchdate between CURRENT_DATE -4  and CURRENT_DATE
            GROUP BY dchdate ,ord 
            UNION ALL
            select '9' :: integer as ord,'ผู้รับบริการ ผ่าตัด' as type,os.operation_request_date,count(*) as cc  from operation_set os where os.operation_request_date between CURRENT_DATE -4  and CURRENT_DATE 
            GROUP BY os.operation_request_date ,ord 
            UNION ALL
            SELECT '10' :: integer as ord,'ผู้รับบริการ ทันตกรรม' as type,d1.vstdate,count(d1.dtmain_id) as cc  FROM dtmain d1 WHERE d1.vstdate BETWEEN CURRENT_DATE -4   and CURRENT_DATE 
            GROUP BY vstdate,ord   
            UNION ALL 
            SELECT '11' :: integer as ord,'Refer_in (รับเข้า)' as type,refer_date,count(*) as cc  FROM referin  WHERE refer_date BETWEEN CURRENT_DATE -4   and CURRENT_DATE 
            GROUP BY refer_date,ord   
            UNION ALL 
            SELECT '12' :: integer as ord,'Refer_out (ส่งต่อ)' as type,refer_date,count(*) as cc FROM referout  WHERE refer_date  BETWEEN CURRENT_DATE -4   and CURRENT_DATE 
            GROUP BY refer_date,ord  
            )as OPD
            GROUP BY TYPE,ord
            ORDER BY ord
         `,
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        }
      );
    });
  },

  visitgendertoday() {
    return new Promise((resolve, reject) => {
      pgconnection.query(
        `
        SELECT sex,s.name as gender,COUNT(*) FROM ovst ov 
        INNER JOIN patient pt on pt.hn = ov.hn 
        LEFT JOIN sex s on s.code = pt.sex
        WHERE vstdate = CURRENT_DATE
        GROUP BY sex,gender        
         `,
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        }
      );
    });
  },
};
