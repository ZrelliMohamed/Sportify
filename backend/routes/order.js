
const express = require('express')
const router = express.Router()

const {getAllCommands,getAllCommandsById,AddOneOrder,getAllOrderUser,verifyIfCanPurchasePrograme}= require('../controllers/order')

router.get('/getAll',getAllCommands)
router.get('/getByid/:id',getAllCommandsById)
router.get('/getOrders/:id',getAllOrderUser)
router.post('/addorderTo/:id',AddOneOrder)
router.post('/verify',verifyIfCanPurchasePrograme)

module.exports = router