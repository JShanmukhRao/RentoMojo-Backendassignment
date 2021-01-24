const jwt=require('jsonwebtoken')
const {JWT_SEC_KEY}=require('../config/key')
const mongoose = require('mongoose')
const User = mongoose.model('User')
module.exports=(req,res,next)=>{
    const {authorization} = req.headers

    if(!authorization)
    {
        return res.status(401).json({err:"User must loggedIn"})
    }
    const token =authorization.replace("Bearer ","")
     console.log(token)
    jwt.verify(token,JWT_SEC_KEY,(err,payload)=>{
        if(err)
        {
            console.log(err)
            return res.status(401).json({err:"User must loggedIn"})
        }
        console.log(payload)
        const {_id}= payload
        User.findById(_id).then(userData =>{
            req.user=userData
            next()
 
        })
    })

}

