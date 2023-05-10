const express = require('express')
const router = express.Router()
 
  
const {getAllPrograms,getOneProgram,createProgram,updateProgram,deleteProgram} = require('../controllers/programes')
 
router.get('/getAll', getAllPrograms);
router.get('/:id', getOneProgram);
router.post('/programes', createProgram);
router.put('/:id', updateProgram);
router.delete('/:id', deleteProgram);



module.exports = router 