
const express = require('express')
const router = express.Router()

const {getAllCommands,getAllCommandsById,AddOneOrder}= require('../controllers/order')

router.get('/getAll',getAllCommands)
router.get('/getByid/:id',getAllCommandsById)
router.post('/addorderTo/:id',AddOneOrder)
module.exports = router