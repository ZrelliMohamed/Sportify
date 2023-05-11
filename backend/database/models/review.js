const conn = require("../index");

module.exports = {
  getOne: function(id_prd,id_user, callBack) {
    const sql = 'SELECT r.*, u.user_name,u.user_img FROM review r join users u WHERE product_id=? AND u.user_id=?';
    conn.query(sql, [id_prd,id_user], function(error, result) {
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
    const insertSql = 'INSERT INTO review (product_id, user_id, rating, comment) VALUES (?, ?, ?, ?)';
    conn.query(insertSql, [data.product_id, data.user_id, data.rating, data.comment], function(error, result) {
        if (error) {
            callBack(error, null);
        } else {
            // Get the sum of all the ratings and the number of reviews for the current product
            const selectSql = 'SELECT SUM(rating) AS total_rating, COUNT(*) AS num_reviews FROM review WHERE product_id = ?';
            conn.query(selectSql, [data.product_id], function(error, result) {
                if (error) {
                    callBack(error, null);
                } else {
                    const totalRating = result[0].total_rating;
                    const numReviews = result[0].num_reviews;
                    const averageRating = totalRating / numReviews;

                    // Update the `num_reviews` and `rating` fields in the `product` table
                    const updateSql = 'UPDATE product SET num_reviews = ?, rating = ? WHERE product_id = ?';
                    conn.query(updateSql, [numReviews, averageRating, data.product_id], function(error, result) {
                        callBack(error, result);
                    });
                }
            });
        }
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
