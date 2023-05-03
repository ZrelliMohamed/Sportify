const conn = require("../index");
module.exports = {
    getOneByEmail : function(callBack,email){
 const sql = 'select * from Users where user_email=?'
conn.query(sql,email,function(error,result){
callBack(error,result)
})
    }
}