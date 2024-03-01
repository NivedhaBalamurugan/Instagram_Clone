const User = require('../models/User')
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const login = asyncHandler(async(req,res) => {

    const {email,password} = req.body;
    if(!email || !password)
        return res.status(400).json({"message" : "all fields are required"})

    const founduser = await User.findOne({email : email}).exec()
    if(!founduser)
        return res.status(401).json({"message" : "user not found"})

    const match = await bcrypt.compare(password, founduser.password)
    if(!match)
        return res.status(401).json({"message" : "invalid email or password"})

    const accessToken = jwt.sign(
        {
            "UserInfo" : {
                "username" : founduser.username,
                "email": email
            }
        },
        process.env.ACCESS_TOKEN_SECRET,
        {expiresIn: '15m'}
    )

    const refreshToken = jwt.sign(
        {"email" : email},
        process.env.REFRESH_TOKEN_SECRET,
        {expiresIn: '7d'}
    )

    res.cookie('jwt' , refreshToken , {
        httpOnly: true,
        secure:true,
        sameSite: 'None',
        maxAge: 7*24*60*60*1000
    })

    return res.status(200).json({accessToken})

})

const refresh = asyncHandler(async(req,res) => {

    //console.log(cookies)
    if(!req.cookies?.jwt)
        return res.status(401).json({"message" : "Unauthorized1"})

    const refreshToken = req.cookies.jwt
    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        asyncHandler(async(err,decoded) => {
            
            if(err)
                return res.status(403).json({"message" : "Forbidden"})

            const founduser = await User.findOne({email : decoded.email}).exec()
            if(!founduser)
                return res.status(401).json({"message" : "Unauthorized2"})

            const accessToken = jwt.sign(
                {
                    "UserInfo" : {
                        "username" : founduser.username,
                        "email": founduser.email
                    }
                },
                process.env.ACCESS_TOKEN_SECRET,
                {expiresIn: '15m'}
            )

            return res.status(200).json(accessToken)

        })
    )

})


const logout = asyncHandler(async(req,res) => {

    const cookies = req.cookies
    if(!cookies?.jwt)
        return res.status(401).json({"message" : "Unauthorized"})

        res.clearCookie('jwt' , {
            httpOnly: true,
            secure:true,
            sameSite: 'None',
            maxAge: 7*24*60*60*1000
        })

        return res.status(200).json({"message" : "Cookie cleared"})

})

module.exports = {
    login,
    refresh,
    logout
}