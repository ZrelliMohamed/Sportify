const conn = require("../index");

module.exports = {
    getAll: function(callback) {
        const sql='SELECT * FROM programes_has_exercices';
        conn.query(sql, function(error, results, fields) {
          if (error) {
            callback(error, null);
          } else {
            callback(null, results); 
          }
        });
      },
      getOne: function(prg_id, callback) {
        const sql = 'SELECT * FROM programes_has_exercices WHERE prg_id = ?';
        conn.query(sql, prg_id, function(error, results, fields) {
          if (error) {
            callback(error, null);
          } else {
            callback(null, results[0]);
          }
        });
      },     
      add: function(data, callBack) {
        const sql = 'INSERT INTO programes_has_exercices SET ?';
        conn.query(sql, [data], function(error, results, fields) {
          if (error) {
            callBack(error, null);
          } else {
            callBack(null, results.insertId);
          }
        });
      },
      update: function(data,prg_id, exercice_id, callback) {
        const sql = 'UPDATE programes_has_exercices SET day = ? WHERE prg_id = ? AND exercice_id = ?';
        conn.query(sql, [data, prg_id, exercice_id], function(error, results, fields) {
          if (error) {
            callback(error, null);
          } else {
            callback(null, results);
          }
        });
      }
      ,
      delete: function(prg_id, exercice_id, callback) {
        const sql = 'DELETE FROM programes_has_exercices WHERE prg_id = ? AND exercice_id = ?';
        conn.query(sql, [prg_id, exercice_id], function(error, results, fields) {
          if (error) {
            callback(error, null);
          } else {
            callback(null, results.affectedRows);
          }
        });
      }
}