const users = require ('../database/models/user')
const bcrypt = require("bcrypt")
const jwt = require ("jsonwebtoken")
module.exports = {
  getOneUserLogin: function(req,res){
    users.getOneByEmail((err,results)=>{
      if (err){
        console.log(err)
        res.status(500).json(err)
      }
      res.status(200).json(results)
    },[req.params.email]) 
  },

  handleLogin: function(req,res){ 
    users.getOneByEmail((err,results)=>{
     if(err){
       console.log(err)
       res.status(500).json(err)
     }else{
      bcrypt.compare(req.body.user_password,results[0].user_password,(error,result)=>{
        if (error){
          console.log(error)
          res.status(500).json(error)
        }
        if(result){
          var token =  jwt.sign(results[0],process.env.ACCESS_TOKEN_SECRET)
           delete results[0].user_password
          res.status(200).json({success:true,message:{...results[0],token:token}})
          
        }else{
          res.status(400).json({success:false,message:"login failure"})
        }
      }) 

     }
    
    },[req.body.user_email])
  
 },
}
