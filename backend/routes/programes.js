const express = require('express')
const router = express.Router()
 
  
const {getAllPrograms,getOneProgram,createProgram,updateProgram,deleteProgram,createProgramforCommande,getOneUserProgrames} = require('../controllers/programes')
 
router.get('/getAll/:user_id', getAllPrograms);
router.get('/UserBuy/:user_id', getOneUserProgrames);
router.get('/:id', getOneProgram);
router.post('/', createProgram);
router.post('/cmd', createProgramforCommande);
router.put('/:id', updateProgram);
router.delete('/:id', deleteProgram);



module.exports = router 