const express = require('express')
const router = express.Router()
const {
    getAlluser,
    createUser,
    updateUserProfile
}   = require('../controller/usersController')

router.route('/')
    .get(getAlluser)    //get all users
    .post(createUser)     //create a new user
    .patch(updateUserProfile)    //update my profile details

module.exports = router