const express = require('express')
const cors = require('cors')
const app = express()
const Port = 3000
app.use(cors())
app.use(express.urlencoded({extended:true}))
app.use(express.json())




app.listen(Port,()=>{console.log('listenning on port ,',Port);})