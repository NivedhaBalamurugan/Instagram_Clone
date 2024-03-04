const Post = require('../models/Post')
const User = require('../models/User')
const asyncHandler = require('express-async-handler')

const getAllPosts = asyncHandler(async (req, res) => {

    const posts = await Post.find().lean();
    if (!posts?.length) 
        return res.status(400).json({ "message": "No posts found" });
    else 
    {
    
        //fetch usernames for posts
        const postsWithUsernames = await Promise.all(posts.map(async (post) => {
            
            const user = await User.findById(post.postedBy).lean().exec()
            if (!user) 
                return res.status(400).json({ "message": "Invalid user" })
            

            // Fetch usernames for comments
            const commentsWithUsernames = await Promise.all(post.comments.map(async (comment) => {

                const commentUser = await User.findById(comment.com_postedBy).lean().exec()
                if (!commentUser) 
                    return res.status(400).json({ "message": "Invalid user" })
                
                return { ...comment, com_username: commentUser.username }

            }))
            
            return { ...post, username: user.username, comments: commentsWithUsernames }


        }))
        return res.status(200).json(postsWithUsernames);

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


const updatePost = asyncHandler(async(req,res) => {

    const {id , likedBy, dislikedBy , comment, commentedBy } = req.body
    if(!id)
        return res.status(400).json({"message" : "id required"})

    const updpost = await Post.findById(id).exec()

    if(!updpost)
        return res.status(400).json({ "message": "post not found" });
    
    if(likedBy) {
        updpost.likes.push(likedBy)
    }
    else if(dislikedBy){

        const index = updpost.likes.indexOf(dislikedBy)
        if(index !== -1)
            updpost.likes.splice(index, 1);

    }
    else if(comment) {
        const cts = {
            text : comment,
            com_postedBy : commentedBy
        }
        updpost.comments.push(cts)
    }
    
    const response = await updpost.save()
    if(response)
        res.status(200).json({"message" : "Updates successfully"})
    else    
        res.status(400).json({"message" : "Invalid post data"})

})

module.exports = {
    getAllPosts,
    createPost,
    deletePost,
    updatePost
}