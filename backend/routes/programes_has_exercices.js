const express = require('express')
const router = express.Router()
 
const {getAllProgramExercises,getOneProgramExercise,addExerciseToProgram,updateProgramExercise,deleteProgramExercise,getAllExercises} = require('../controllers/programes_has_exercices')
 
router.get('/program-exercises', getAllProgramExercises);
router.get('/program-exercises/:id', getOneProgramExercise);
router.post('/program-exercises', addExerciseToProgram);
router.put('/program-exercises/:prg_id/:exercice_id', updateProgramExercise);
router.delete('/program-exercises/:prg_id/:ex_id', deleteProgramExercise);

module.exports = router   