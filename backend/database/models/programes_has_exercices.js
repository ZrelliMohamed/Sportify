const conn = require("../index");

module.exports = {
    getAll: function(callback) {
        const sql='SELECT * FROM programes_has_exercices ';
        conn.query(sql, function(error, results, fields) {
          if (error) {
            callback(error, null);
          } else {
            callback(null, results); 
          }
        });
      },
      getOne: function(prg_id, callback) {
        const sql = `select p.*,e.exercice_image,e.exercice_name from programes_has_exercices p
        inner join exercices e 
        where e.exercice_id=p.exercice_id and p.prg_id=?`;
        conn.query(sql, prg_id, function(error, results, fields) {
          if (error) {
            callback(error, null);
          } else {
            callback(null, results);
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
      },
      prgc : function(data,callBack){
        const sql = 'select * from programes_has_exercices where prg_id= ?';
        conn.query(sql,data.mainProg,function(error, results, fields) {
          if(error) {
            callBack(error, null);
        } else {
          const modifiedData = results.map(obj => {
            const { id, prg_id, ...rest } = obj; // Destructure the 'id' and 'prg_id' keys and capture the remaining properties in 'rest'
            return { prg_id: data.newProg, ...rest }; // Return the modified object with the updated prg_id and remaining properties
          });
          console.log(modifiedData);
          const sql = 'INSERT INTO programes_has_exercices SET ?';
          modifiedData.forEach(obj => {
            conn.query(sql, obj, function(error, results1, fields) {
              if (error) {
                console.error(error);
              } else {
                console.log(results1.insertId);
              }
            });
          });
          callBack(null, results);
        }

        })
        
      }
}