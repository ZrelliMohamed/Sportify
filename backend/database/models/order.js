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
          
          res.json(result.insertId)
        });
      },
      

      getAllOrders: function(id,callBack) {
              
        const sql0 =`select * from commandes 
        where user_id=?` 
       conn.query(sql0,id, function(e, r) {
        if(e) callBack(e, null);
        else {
          const sql =`select
              c.date,c.commande_id,
              p.product_name,p.product_price,p.Qantite_commande
              from commandes c 
             inner join product p 
             where c.user_id=? 
             and p.commande_id = c.commande_id;` 
             conn.query(sql,id, function(err, res) {
              if(err) callBack(err, null);
              else {
             const sql1 =`select
             c.date,c.commande_id,prg.prg_name,prg.prg_price
             from commandes c 
             inner join programes prg
             where c.user_id=? 
             and prg.commande_id=c.commande_id;` 
            conn.query(sql1,id, function(erreur, result) {
             if(erreur) callBack(erreur, null);
             else {
               const updatedResult = r.map((item) => {
                const matchingItems = res.filter((product) => product.commande_id === item.commande_id);
                const matchingResult = result.find((resultItem) => resultItem.commande_id === item.commande_id);
                const itemArray = matchingItems.length ? [...matchingItems] : [];
                if (matchingResult) {
                  itemArray.push(matchingResult);
                }
                return {
                  ...item,
                  item: itemArray
                };
              });
            callBack(e, updatedResult);
             }
            })
           
              }
             })
        }
       })
      },
      verify:function(data,callBack) {
        const sql = `select * from programes p 
        inner join commandes c  
        where p.commande_id=c.commande_id
        and c.user_id=?
        and p.prg_name=? and p.User_Id=?`;
        conn.query(sql,[data.user_id,data.prg_name,data.User_Id], function(error, result) {
          if(result.length>0)callBack(error, false);
          else callBack(error, true);
        });
      },





}