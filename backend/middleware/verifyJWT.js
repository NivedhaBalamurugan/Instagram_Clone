const jwt = require('jsonwebtoken')

const verifyJWT = (req,res,next) => {

    const authHeader = req.headers.authorization || req.headers.Authorization;
    
    if(!authHeader)
        return res.status(401).json({"message" : "Unauthorized"})

        
    const accessToken = authHeader.split(' ')[1]
    jwt.verify(
        accessToken,
        process.env.ACCESS_TOKEN_SECRET,
        (err,decoded) => {
            
            if(err)
                return res.status(403).json({"message" : "Forbidden"})
            
            req.username = decoded.UserInfo.username
            req.email = decoded.UserInfo.email

            next()
            
        }

    )

}

module.exports = verifyJWT