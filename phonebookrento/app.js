const express=require("express")
const app=express()
const mongoose=require("mongoose")
const PORT=  process.env.PORT ||5000
const {MONGOURL}=require("./config/key")



mongoose.connect(MONGOURL,{
    useNewUrlParser: true,
    useUnifiedTopology: true

})
mongoose.connection.on('connected',()=>{
    console.log("connected to Server")
})
mongoose.connection.on('error',(err)=>{
    err && console.log("error",err)
})
require('./models/user')
require('./models/contact')

app.use(express.json() )
app.use(require('./routes/auth'))
app.use(require('./routes/contact'))

if(process.env.NODE_ENV=="production"){
    app.use(express.static('client/build'))
    const path=require('path')
    app.get("*",(req,res)=>{
        res.sendFile(path.resolve(__dirname,'client','build','index.html'))
    })
}
app.listen(PORT,()=>{
    console.log("Server is running at",PORT)
})