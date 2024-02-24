const express = require('express')
const router = require('Router')

router.route('/')
    .get()      //get all posts
    .post()     //create a apost

router.route('/:id')
    .delete()   //delete a post

module.exports = router