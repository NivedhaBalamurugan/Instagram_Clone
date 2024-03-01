const expressAsyncHandler = require('express-async-handler');
const User = require('../models/User');
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt')



const getAlluser = asyncHandler(async(req,res) => {

    const response = await User.find().lean().exec()
    if(!response?.length)
        return res.status(400).json({"message" : "No users found"})
    else
        return res.status(200).json(response)

})

const createUser = asyncHandler(async(req,res) => {

    const {username,email, password,photo,photoType} = req.body
    if(!username || !email || !password)    
        return res.status(400).json({"message" : "All field are required"});

    const dup = await User.findOne({username}).lean().exec()
    if(dup)
        return res.status(400).json({"message" : "Duplicate username found"});

    const hashedpwd = await bcrypt.hash(password, 10)

    const newuser = {
        "username" : username,
        "email" : email,
        "password" : hashedpwd
    }
    if(photo){
        newuser.photo = new Buffer.from(photo, "base64")
        newuser.photoType = photoType
    }

    const response = await User.create(newuser)
    if(response)
        return res.status(200).json({"message" : `User is created`});
    else
        return res.status(400).json({"message" : "Invalid user data"});


})

const updateUserProfile = asyncHandler(async (req,res) => {

    const {id, username, email, password, photo, photoType } = req.body
   if(!id)
   return res.status(400).json({"message" : "All details required1"})
   if(!username)
   return res.status(400).json({"message" : "All details required2"})

    if(!id || !username )
        return res.status(400).json({"message" : "All details required"})
    const upduser = await User.findById(id).exec()
    if(!upduser)
        return res.status(401).json({ "message": "user not found" });

    //checking whether this new username already exists
    //but also during upd , username may not be changed
    const dupuser = await User.findOne({username}).lean().exec()
    if(dupuser && dupuser._id.toString() !== id)
        return res.status(409).json({"message" : "Duplicate user name"})

    upduser.username=username
    upduser.email=email
    if(photo) {
        upduser.photo=new Buffer.from(photo, "base64")
        upduser.photoType=photoType
    }
    if(password)
        upduser.password = await bcrypt.hash(password,10)

    const response = await upduser.save()
    if(response)
        res.status(200).json({"message" : "Updates successfully"})
    else    
        res.status(400).json({"message" : "Invalid user data"})

})

module.exports = {
    getAlluser,
    createUser,
    updateUserProfile
}