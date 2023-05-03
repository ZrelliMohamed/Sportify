const jwt = require("jsonwebtoken")
module.exports = (req,res,next)=>{
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    console.log(token)
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET,(err)=>{
        if(err) res.send(err)
        else{
            next()
        }
    });
}