const { response } = require("express");
const conn = require("../index");


module.exports = {
  getOne: function(id, callBack) {
    const sql = 'SELECT * FROM programes WHERE prg_id=?';
    conn.query(sql, id, function(error, result) {
      callBack(error, result);
    });
  },
  getAllUserProgrames: function(id, callBack) {
    const sql = "select p.* from commandes c inner join programes p where p.commande_id=c.commande_id and c.user_id=? ";
    conn.query(sql, [id], function(error, result) {
      if(error) callBack(error,null)
      else{
        callBack(null,result)
      }
    });
  }
  ,
      getAll: function(callBack,id) {
        const sql = 'SELECT * FROM spotify.programes where User_Id = ?';
        conn.query(sql,id, function(error, result) {
          callBack(error, result);
        });
      },
       add:function(data, callBack) {
        const sql = 'INSERT INTO spotify.programes (prg_img, prg_name, User_Id, prg_price, prg_goal) VALUES (?, ?, ?, ?, ?)';
        conn.query(sql, [data.prg_img, data.prg_name, data.User_Id , data.prg_price ,data.prg_goal ], function(error, result) {
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
addCmd:function(data, callBack) {
  const sql = 'INSERT INTO spotify.programes (prg_img, prg_name, User_Id, prg_price, prg_goal,commande_id) VALUES (?, ?, ?, ?, ?, ?)';
  conn.query(sql, [data.prg_img, data.prg_name, data.User_Id , data.prg_price ,data.prg_goal,data.commande_id.data ], function(error, result) {
    if (error) {
      console.error('Error inserting program:', error);
      callBack(error, null);
    } else {
      console.log('Program inserted successfully');
      callBack(null, result);
    }
  });
}
}
 
