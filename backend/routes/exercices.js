
const express = require('express')
const router = express.Router()
 
const {getAllExercises,getOneExercise,createExercise,updateExercise,deleteExercise} = require('../controllers/exercices')
// /exercice
router.get('/', getAllExercises);
router.get('/exerciseBy/:id', getOneExercise);
router.post('/', createExercise);
router.put('/:id', updateExercise);
router.delete('/:id', deleteExercise);

module.exports = router