const asyncHandler = require('express-async-handler')

const jwt = require('jsonwebtoken')

const validateToken = asyncHandler (async (req, res, next) =>{
    let token
    let authHeader = req.headers.Authorization || req.headers.authorization

    // console.log(authHeader)
    if(authHeader && authHeader.startsWith('Bearer')){
        token = authHeader.split(" ")[1]
        jwt.verify(token, process.env.SECRET_STR, (err, decoded) => {
            if(err){
                return res.status(401).json({
                    status: "The Token provided is invalid..."
                })
            }
            req.id = decoded.id
            
            next()
        })
    }

    if(!token){
        return res.status(404).json({
            message: "Please Login to access this route"
        })
    }
})

module.exports = validateToken