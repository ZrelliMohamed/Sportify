const exercise = require('../database/models/exercices');
module.exports = {
  getAllExercises: function(req, res) {
    exercise.getAll(function(err, results) {
      if(err) res.status(500).send(err);
      else res.json(results)
    })
  },
  getAllExercisesProgCmd: function(req, res) {
    exercise.getAllProgCmd(req.params.id,function(err, results) {
      if(err) res.status(500).send(err);
      else res.json(results)
    })
  },
  getOneExercise: function(req, res) {
    const exerciseId = req.params.id;
    exercise.getOne(exerciseId, function(err, results) {
      if (err) {
        res.status(500).send(err);
      } else if (!results) {
        res.status(404).send('Exercise not found');
      } else {
        res.json(results);
      }
    });
  },
  createExercise: function(req, res) {
    const exerciseData = req.body;
    exercise.add(exerciseData, function(err, results) {
      if (err) {
        res.status(500).send(err);
      } else {
        res.json(results);
      }
    });
  }  
,
  updateExercise: function(req, res) {
    const exerciseId = req.params.id;
    const exerciseData = req.body;
    exercise.update(exerciseId, exerciseData, function(err, results) {
      if (err) {
        res.status(500).send(err);
      } else if (results.affectedRows === 0) {
        res.status(404).send('Exercise not found');
      } else {
        res.json(results);
      }
    });
  },
  deleteExercise: function(req, res) {
    const exerciseId = req.params.id;
    exercise.delete(exerciseId, function(err, results) {
      if (err) {
        res.status(500).send(err);
      } else if (results.affectedRows === 0) {
        res.status(404).send('Exercise not found');
      } else {
        res.json(results);
      }
    });
  }
};
