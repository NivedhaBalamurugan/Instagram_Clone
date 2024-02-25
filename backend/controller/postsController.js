const Post = require('../models/Post')
const User = require('../models/User')
const asyncHandler = require('express-async-handler')

const getAllPosts = asyncHandler(async(req,res) => {

    const response = await Post.find().lean()
    if(!response?.length)
        return res.status(400).json({"message" : "No posts found"})
    else{
        const newresponse = await Promise.all(response.map(async (post) => {
            const user = await User.findById(post.postedBy).lean().exec()
            if(!user)
                return res.status(400).json({"message"  : "Invalid user"})
            return {...post , username : user.username}

        }))
        return res.status(200).json(newresponse)
    }


    

})

const createPost = asyncHandler(async(req,res) => {

    const {title,body,photo,photoType,postedBy} = req.body ;
    if(!postedBy || !title || !body )
        return res.status(400).json({"message" : "All details required"})

    const newpost = {
        "title" : title,
        "body" : body,
        "postedBy" : postedBy
    }
    if(photo)   {
        newpost.photoType = photoType
        newpost.photo = new Buffer.from(photo, "base64")
    }
    
    const response = await Post.create(newpost)
    if(response)
        return res.status(200).json({"message" : "Post uploaded"})
    else
        return res.status(400).json({"message" : "Invalid post"})


})

const deletePost = asyncHandler(async(req,res) => {

    const id= req.params.id;
    if(!id)
        return res.status(400).json({"message" : "id required"})

    const delpost = await Post.findById(id).exec()
    if(!delpost) 
        return res.status(400).json({ "message": "post not found" });
    
    const response = await delpost.deleteOne()
    if(response)
        return res.status(200).json({"message" : "Post deleted"})
    else
        return res.status(400).json({"message" : "Invalid post"})


})

module.exports = {
    getAllPosts,
    createPost,
    deletePost
}