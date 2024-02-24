const express = require('express')
const router = express.Router()
const {
    getOneUser,
    getAlluser,
    createUser,
    updateUserProfile
}   = require('../controller/usersController')

router.route('/')
    .get(getAlluser)    //get all users
    .post(createUser)     //create a new user
    .patch(updateUserProfile)    //update my profile details

router.route('/:id')
    .get(getOneUser)      //get one user info ny their id

module.exports = router