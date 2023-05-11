const review = require('../database/models/review');

module.exports = {
  getAllReviews: function(req, res) {
    review.getAll(function(err, results) {
      if (err) res.status(500).send(err);
      else res.json(results)
    })
  },
  getOneReview: function(req, res) {
    const product_Id = req.params.id_prd;
    const user_Id = req.params.id_user;
    review.getOne(product_Id,user_Id, function(err, results) {
      if (err) {
        res.status(500).send(err);
      } else if (!results) {
        res.status(404).send('Review not found');
      } else {
        res.json(results);
      }
    });
  },
  createReview: function(req, res) {
    const reviewData = req.body;
    review.add(reviewData, function(err, results) {
      if (err) {
        res.status(500).send(err);
      } else {
        res.json(results);
      }
    });
  },
  updateReview: function(req, res) {
    const reviewId = req.params.id;
    const reviewData = req.body;
    review.update(reviewId, reviewData, function(err, results) {
      if (err) {
        res.status(500).send(err);
      } else if (results.affectedRows === 0) {
        res.status(404).send('Review not found');
      } else {
        res.json(results);
      }
    });
  },
  deleteReview: function(req, res) {
    const reviewId = req.params.id;
    review.delete(reviewId, function(err, results) {
      if (err) {
        res.status(500).send(err);
      } else if (results.affectedRows === 0) {
        res.status(404).send('Review not found');
      } else {
        res.json(results);
      }
    });
  }
};