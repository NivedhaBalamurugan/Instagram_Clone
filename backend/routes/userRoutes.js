const express = require('express')
const router = express.Router()

router.route('/')
    .post()     //create a new user
    .patch()    //update my profile details

router.route('/:id')
    .get()      //get one user info ny their id

module.exports = router