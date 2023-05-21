const conn = require("../index");

module.exports = {

    getAll: function(callBack) {
        const sql = `select r.* ,u.user_name,u.user_img from reviewC r  
        inner join users u
        where r.User_Id=u.User_Id`;
        conn.query(sql, function(error, result) {
          callBack(error, result);
        });
      },
      add: function(data, callBack) {
        const insertSql = 'INSERT INTO reviewC (User_Id, coach_Id, message, rating) VALUES (?, ?, ?, ?)';
        conn.query(insertSql, [data.User_Id, data.coach_Id, data.message, data.rating], function(error, result) {
            if (error) {
                callBack(error, null);
            } else {
                const selectSql = 'SELECT SUM(rating) AS total_rating, COUNT(*) AS num_reviews FROM reviewC WHERE coach_Id = ?';
                conn.query(selectSql, [data.coach_Id], function(error, result) {
                    if (error) {
                        callBack(error, null);
                    } else {
                        const totalRating = result[0].total_rating;
                        const numReviews = result[0].num_reviews;
                        const averageRating = totalRating / numReviews;
                            console.log(totalRating,numReviews);
                        // Update the `num_reviews` and `rating` fields in the `product` table
                        const updateSql = 'UPDATE users SET User_preview = ? WHERE User_Id = ?';
                        conn.query(updateSql, [averageRating, data.coach_Id], function(error, result) {
                            callBack(error, result);
                        });
                    }
                });   

            } 
          } )

      }

}