const programExercises = require('../database/models/programes_has_exercices');
module.exports = {
getAllProgramExercises: function(req, res) {
programExercises.getAll(function(err, results) {
if (err) res.status(500).send(err);
else res.json(results)
})
},
getOneProgramExercise : function(req, res) {
  programExercises.getOne([req.params.id], function(error, programExercise) {
    if (error) {
      res.status(500).json({ error });
    } else if (!programExercise) {
      res.status(404).json({ error: 'Program exercise not found' });
    } else {
      res.status(200).json(programExercise);
    }
  });
},
addExerciseToProgram: function(req, res) {
    const programId = req.body.prg_id;
    const exerciseId = req.body.exercice_id;
    const sets = req.body.sets;
    const day = req.body.day
    console.log(day);
    const data = { prg_id: programId, exercice_id: exerciseId,sets:sets,day:day};
  programExercises.add(data, function(err, result) {
    if (err) {
      console.error(err);
      res.status(500).send("Error adding exercise to program.");
    } else {
      res.status(200).send("Exercise added to program successfully.");
    }
  });
  },
  updateProgramExercise: function(req, res) {
    const programId = req.params.prg_id;
    const exerciseId = req.params.exercice_id;
    const data = req.body.day;
    console.log(programId);
    programExercises.update( data,programId, exerciseId, function(err, results) {
      if (err) {
        res.status(500).json({ error: err });
      } else {
        console.log(results);
        res.status(200).json(results);
      }
    });
  }
  ,
deleteProgramExercise: function(req, res) {
const programId = req.params.prg_id;
const exerciseId = req.params.ex_id;
programExercises.delete(programId, exerciseId, function(err, results) {
if (err) {
res.status(500).send(err);
} else if (results.affectedRows === 0) {
res.status(404).send('Program exercise not found');
} else {
res.json(results);
}
});
},
progCmd : function(req,res){
  programExercises.prgc(req.body,function(err,result){
    if (err) {
      res.status(500).json({ error: err });
    } else {
      console.log(result);
      res.status(200).json(result);
    }
  })
  

}
};


