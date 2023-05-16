const {getAll,getAllById,addOrder} = require('../database/models/order')

module.exports ={

    getAllCommands: function(req, res) {
            getAll(function(err, results) {
          if(err) res.status(500).send(err);
          else res.json(results)
        })
      },
      getAllCommandsById: function(req, res) {
        getAllById(function(err, results) {
      if(err) res.status(500).send(err);
      else res.json(results)
    },req.params.id)
  },
  AddOneOrder: function(req, res) {
    addOrder(function(err, results) {
  if(err) res.status(500).send(err);
  else res.json(results)
},req.params.id,req,res)},

}