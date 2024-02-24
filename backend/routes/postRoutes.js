const express = require('express')
const router = express.Router()
const {
    getAllPosts,
    createPost,
    deletePost
}   = require('../controller/postsController')

router.route('/')
    .get(getAllPosts)      //get all posts
    .post(createPost)     //create a apost

router.route('/:id')
    .delete(deletePost)   //delete a post

module.exports = router