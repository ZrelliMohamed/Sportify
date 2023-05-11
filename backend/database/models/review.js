const conn = require("../index");

module.exports = {
  getOne: function(id, callBack) {
    const sql = 'SELECT * FROM review WHERE review_id=?';
    conn.query(sql, id, function(error, result) {
      callBack(error, result);
    });
  },
  getAll: function(callBack) {
    const sql = 'SELECT * FROM review';
    conn.query(sql, function(error, result) {
      callBack(error, result);
    });
  },
  add: function(data, callBack) {
    const sql = 'INSERT INTO review (product_id, user_id, rating, comment) VALUES (?, ?, ?, ?)';
    conn.query(sql, [data.product_id, data.user_id, data.rating, data.comment], function(error, result) {
      callBack(error, result);
    });
  },
  update: function(id, data, callBack) {
    const sql = 'UPDATE review SET product_id=?, user_id=?, rating=?, comment=? WHERE review_id=?';
    conn.query(sql, [data.product_id, data.user_id, data.rating, data.comment, id], function(error, result) {
      callBack(error, result);
    });
  },
  delete: function(id, callBack) {
    const sql = 'DELETE FROM review WHERE review_id = ?';
    conn.query(sql, [id], function(error, result) {
      callBack(error, result);
    });
  },
};
