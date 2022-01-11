const connection = require("../configs/database");


module.exports = {
  findAll() {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT * FROM cpareport_mainmenu where main_status = '1' order by main_order`,
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        }
      );
    });
  },
  findById(id) {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT menu_sub,menu_title,menu_file,menu_head,menu_name,menu_status FROM cpareport_menu WHERE menu_status = '1' and  menu_main = ?`,
        [id],
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        }
      );
    });
  },

  searchMenu(value) {
    return new Promise((resolve, reject) => {
      const  txt = value.select ;
      connection.query(
        `SELECT menu_sub,menu_title,menu_file,menu_head,menu_name,menu_status FROM cpareport_menu WHERE menu_status = '1' and  menu_sub like ${connection.escape(`%${txt}%`)}`,
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        }
      );
    });
  },




};
