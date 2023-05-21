const express = require('express');
const router = express.Router();
const db = require('../database/index');

// Get all products
router.get('/', (req, res) => {
  const sql = 'SELECT * FROM product  WHERE commande_id IS NULL;';
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error executing query: ', err);
      res.status(500).send('Error retrieving products from database.');
      return;
    }
    res.json(results);
  });
});
// Get all products, filtered by user_goal if provided
router.get('/filtring', (req, res) => {
    const { user_goal } = req.query;
    let sql = 'SELECT * FROM product';
  
    // Add filter if user_goal is provided
    if (user_goal) {
      sql += ` WHERE product_desc LIKE '%${user_goal}%'`;
    }
  
    db.query(sql, (err, results) => {
      if (err) {
        console.error('Error executing query: ', err);
        res.status(500).send('Error retrieving products from database.');
        return;
      }
      res.json(results);
    });
  });
  
  router.post('/ProductCart', (req, res) => {
    const { cart } = req.body;
    const products = [];
  
    cart.forEach((tuple,i) => {
      const productId = tuple[0];
  
      db.query('SELECT * FROM product WHERE product_id = ?', [productId], (error, results, fields) => {
        if (error) {
          console.error(error);
          return res.status(500).json({ message: 'Something went wrong' });
        }
  
        if (results.length === 0) {
          return res.status(404).json({ message: `Product with ID ${productId} not found` });
        }
  
        products.push({...results[0],QuantiteCommande:tuple[1]});
  
        if (products.length === cart.length) {
          // All products have been fetched, send the response
          return res.json({ products });
        }
      });
    });
  
  });
// Get one product by ID
router.get('/:id', (req, res) => {
  const sql = 'SELECT * FROM product WHERE product_id = ?';
  db.query(sql, [req.params.id], (err, results) => {
    if (err) {
      console.error('Error executing query: ', err);
      res.status(500).send('Error retrieving product from database.');
      return;
    }
    if (results.length === 0) {
      res.status(404).send('Product not found.');
      return;
    }
    res.json(results[0]);
  });
});

// Delete one product by ID
router.delete('/:id', (req, res) => {
  const sql = 'DELETE FROM product WHERE product_id = ?';
  db.query(sql, [req.params.id], (err, results) => {
    if (err) {
      console.error('Error executing query: ', err);
      res.status(500).send('Error deleting product from database.');
      return;
    }
    res.send(`Product ${req.params.id} deleted successfully.`);
  });
});

// Update one product by ID
router.put('/:id', (req, res) => {
    console.log(req.body);
    const { product_name, product_price, product_desc, product_image, count_in_stock } = req.body;
  
    const sql = 'SELECT rating, num_reviews FROM product WHERE product_id = ?';
    db.query(sql, [req.params.id], (err, results) => {
      if (err) {
        console.error('Error executing query: ', err);
        res.status(500).send('Error retrieving product from database.');
        return;
      }
  
      const { rating, num_reviews } = results[0];
  
      const updateSql = 'UPDATE product SET product_name = ?, product_price = ?, product_desc = ?, product_image = ?, count_in_stock = ?, rating = ?, num_reviews = ? WHERE product_id = ?';
      db.query(updateSql, [product_name, product_price, product_desc, product_image, count_in_stock, rating, num_reviews, req.params.id], (err, results) => {
        if (err) {
          console.error('Error executing query: ', err);
          res.status(500).send('Error updating product in database.');
          return;
        }
        res.send(`Product ${req.params.id} updated successfully.`);
      });
    });
  });
// Add one product
router.post('/', (req, res) => {
    console.log(req.body);
    const { product_name, product_price, product_desc, product_image, count_in_stock, rating = 0, num_reviews = 0 } = req.body;
  
    const sql = 'INSERT INTO product (commande_id,product_name, product_price, product_desc, product_image, count_in_stock, rating, num_reviews) VALUES (NULL,?, ?, ?, ?, ?, ?, ?)';
    db.query(sql, [product_name, product_price, product_desc, product_image, count_in_stock, rating, num_reviews], (err, results) => {
      if (err) {
        console.error('Error executing query: ', err);
        res.status(500).send('Error adding product to database.');
        return;
      }
      res.send(`Product ${results.insertId} added successfully.`);
    });
  });

  
module.exports = router;