
//@desc Create User
//@Route POST /api/users/register
//@access public
exports.createUsers = (req, res, next) =>{
    res.send('User Created...')
}


//@desc Login User
//@Route POST /api/users/login
//@access public
exports.login = (req, res, next) => {
    res.send('User Login...')
}

//@desc Get User
//@Route Get /api/users/current
//@access public
exports.currentUserInformation = (req, res, next) => {
    res.send('Current User Information')
}