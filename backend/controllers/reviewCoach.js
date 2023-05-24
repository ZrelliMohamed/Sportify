const review = require('../database/models/reviewCoach');

module.exports ={getAllReviews: function(req, res) {
    review.getAll(function(err, results) {
      if (err) res.status(500).send(err);
      else res.json(results)
    })
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

}