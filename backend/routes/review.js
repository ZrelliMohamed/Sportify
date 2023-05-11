const express = require('express')
const router = express.Router()

const {getAllReviews,getOneReview,createReview,updateReview,deleteReview} = require('../controllers/review')

router.get('/', getAllReviews);
router.get('/:id_prd/:id_user',getOneReview );
router.post('/',createReview );
router.put('/:id', updateReview);
router.delete('/:id',deleteReview );

module.exports = router
