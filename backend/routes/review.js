const express = require('express')
const router = express.Router()

const {getAllReviews,getOneReview,createReview,updateReview,deleteReview} = require('../controllers/review')

router.get('/review', getAllReviews);
router.get('/review/:id',getOneReview );
router.post('/review',createReview );
router.put('/review/:id', updateReview);
router.delete('/review/:id',deleteReview );

module.exports = router

