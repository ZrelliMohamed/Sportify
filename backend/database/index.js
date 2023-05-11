const mysql = require('mysql2')
const cors = require("cors")

const conn =mysql.createConnection({
    host: "localhost",
<<<<<<< HEAD
    user: "root",
    password: "root",
=======
    user: "ali",
    password: "admin",
>>>>>>> 221c0d632f719c95318a4dee876b16685bf5c09d
    database:'Spotify'
})
conn.connect((err)=>{
    if(err){
        console.log(err)
    }
    else{
        console.log('db connected')
    }
})
module.exports = conn