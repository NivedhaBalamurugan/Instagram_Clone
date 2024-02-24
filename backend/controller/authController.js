/*const User = require('../models/User')
const asyncHandler = require('express-async-handler')

const login = asyncHandler(async(req,res) => {

    const {email,password} = req.body;
    if(!email || !password)
        return res.status(400).json({"message" : "all fields are required"})

    const founduser = await User.find({email : email}).exec()
    if(!fonduser)
        return res.status(401).json({"message" : "user not found"})

    const match = await bcrypt.compare(password, founduser.password)
    if(match){

    }
    
})*/