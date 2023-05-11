const conn = require("../index");


module.exports = {
  getOne: function(id, callBack) {
    const sql = 'SELECT * FROM exercices WHERE exercice_id=?';
    conn.query(sql, id, function(error, result) {
      callBack(error, result);
    });
  },
      getAll: function(callBack) {
        const sql = 'SELECT * FROM spotify.exercices';
        conn.query(sql, function(error, result) {
          callBack(error, result);
        });
      },
      add: function(exerciseData, callBack) {
        const sql = 'INSERT INTO spotify.exercices (exercice_image, exercice_name, exercice_description, exercice_sets, exercice_calories) VALUES (?, ?, ?, ?, ?)';
        const values = [exerciseData.exercice_image, exerciseData.exercice_name, exerciseData.exercice_description, exerciseData.exercice_sets, exerciseData.exercice_calories];
        conn.query(sql, values, function(error, result) {
            callBack(error, result);
        });
    }
    ,
    update: function(id, data, callBack) {
      const sql = 'UPDATE spotify.exercices SET exercice_image = ?, exercice_name = ?, exercice_description = ?, exercice_sets = ?, exercice_calories = ? WHERE exercice_id = ?';
      conn.query(sql, [data.exercice_image, data.exercice_name, data.exercice_description, data.exercice_sets, data.exercice_calories, id], function(error, result) {
        callBack(error, result);
      });
    },
    delete: function(id, callBack) {
      const sql = 'DELETE FROM spotify.exercices WHERE exercice_id = ?';
      conn.query(sql, id, function(error, result) {
        callBack(error, result);
      });
  },
}

