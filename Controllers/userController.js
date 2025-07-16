const errorHandler = require('express-async-handler')
const User = require('../Models/userModel')
const jwt = require('jsonwebtoken')
//@desc Create User
//@Route POST /api/users/register
//@access public
exports.createUser = errorHandler (async (req, res, next) =>{

    const newUser = await User.create(req.body)

    newUser.password = undefined

    res.status(201).json({
        status: "Success",
        data:{
            newUser
        }
    })

})


//@desc Login User
//@Route POST /api/users/login
//@access public
exports.login = errorHandler (async (req, res, next) => {
    const { email, password } = req.body

    if(!email || !password){    
        return res.status(401).json({
            status: "Failed"
        })
        
    }
    const user = await User.findOne({email: email}).select('+password')

    

    if (!user || !(await user.comparePasswordInDb(password))){
        return res.status(404).json({
            status: "Failed"
        })
    }

    const token = jwt.sign({email: email, id: user.id}, process.env.SECRET_STR, 
        {expiresIn: process.env.LOGIN_EXPIRES}
    )

    console.log(token)

    user.password = undefined

    res.status(201).json({
        status: "Success",
        token,
        data:{
            user
        }
    })

})

//@desc Get User
//@Route Get /api/users/current
//@access public
exports.currentUserInformation = errorHandler (async (req, res, next) => {
    const user = await User.find({id: req.id})

    if(!user){
        return res.status(404).json({
            status: "Failed",
            message: "User with given Email was not found in the dataBase"
        })
    }

    res.status(200).json({
        status: "Success",
        data:{
            user
        }
    })
})