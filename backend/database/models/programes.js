const conn = require("../index");


module.exports = {
  getOne: function(id, callBack) {
    const sql = 'SELECT * FROM programes WHERE prg_id=?';
    conn.query(sql, id, function(error, result) {
      callBack(error, result);
    });
  }
  ,
      getAll: function(callBack) {
        const sql = 'SELECT * FROM spotify.programes';
        conn.query(sql, function(error, result) {
          callBack(error, result);
        });
      },
       add:function(data, callBack) {
        const sql = 'INSERT INTO spotify.programes (prg_img, prg_name, User_Id) VALUES (?, ?, ?)';
        conn.query(sql, [data.prg_img, data.prg_name, data.User_Id], function(error, result) {
          if (error) {
            console.error('Error inserting program:', error);
            callBack(error, null);
          } else {
            console.log('Program inserted successfully');
            callBack(null, result);
          }
        });
      }
      ,
      update: function(id, data, callBack) {
        const sql = 'UPDATE spotify.programes SET prg_img = ?, prg_name = ? WHERE prg_id = ?';
        conn.query(sql, [data.prg_img, data.prg_name, id], function(error, result) {
          callBack(error, result);
        });
      },
      delete: function(id, callBack) {
        const sql = 'DELETE FROM spotify.programes WHERE prg_id = ?';
conn.query(sql, [id], function(error, result) {
  callBack(error, result);
});
},
}
 
