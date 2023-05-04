const express = require('express')
const { getOneByEmail } = require('../database/models/user')
const { handleLogin } = require('../controllers/user')
const router = express.Router
router.get("/useremail/:email",getOneByEmail)
router.post('/login',handleLogin)
module.exports = router  