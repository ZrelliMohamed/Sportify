
const express = require('express')
const router = express.Router()
 
const {getAllExercises,getOneExercise,createExercise,updateExercise,deleteExercise} = require('../controllers/exercices')

router.get('/exercises', getAllExercises);
router.get('/exercises/:id', getOneExercise);
router.post('/exercises', createExercise);
router.put('/exercises/:id', updateExercise);
router.delete('/exercises/:id', deleteExercise);

module.exports = router