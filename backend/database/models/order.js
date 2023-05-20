const conn = require("../index");

module.exports ={

    getAll: function(callBack) {
        const sql = 'SELECT * FROM commandes';
        conn.query(sql, function(error, result) {
          callBack(error, result);
        });
      },
      getAllById:function (callBack,id_user){
        const sql = 'select * from commandes where user_id=?'
        conn.query(sql,id_user, function(error, result) {
            callBack(error, result);
          });
      },
      addOrder: function(callBack, id_user, req, res) {
        const date = new Date();
        const sql = 'INSERT INTO commandes (date, user_id) VALUES (?, ?)';
        conn.query(sql, [date, id_user], function(error, result) {
          if (error) {
            res.status(500).json('erreur in inserting Order');
          }
          const ItemtoBuy = req.body.map(obj => {
            return { ...obj, commande_id: result.insertId };
          });
      
          ItemtoBuy.forEach(obj => {
            const sqlInsert = `INSERT INTO product (product_name, product_price, product_desc, product_image, count_in_stock, rating, num_reviews, commande_id,Qantite_commande) 
                               VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
      
            const valuesInsert = [
              obj.product_name,
              obj.product_price,
              obj.product_desc,
              obj.product_image,
              obj.count_in_stock,
              obj.rating,
              obj.num_reviews,
              obj.commande_id,
              obj.QuantiteCommande
            ];
      
            conn.query(sqlInsert, valuesInsert, (error, results, fields) => {
              if (error) {
                res.status(500).json('erreur in inserting items to buy');
              } else {
                // Decrease count_in_stock for the product with product_id
                const sqlUpdate = `UPDATE product 
                                   SET count_in_stock = count_in_stock - ? 
                                   WHERE product_id = ? AND commande_id IS NULL`;
      
                const valuesUpdate = [obj.QuantiteCommande, obj.product_id];
      
                conn.query(sqlUpdate, valuesUpdate, (error, results, fields) => {
                  if (error) {
                    res.status(500).json('erreur in updating count_in_stock');
                  } 
                });
              }
            });
          });
          res.json('Added succesfully')
        });
      },
      

    





}