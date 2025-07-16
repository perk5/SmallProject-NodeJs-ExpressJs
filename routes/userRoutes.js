const express = require('express')
const router = express.Router()
const userController = require('../Controllers/userController')
const validateToken = require("../middleware/validateTokenHandler")

router.route('/register').post(userController.createUser)
router.route('/login').post(userController.login)
router.route('/current').get( validateToken ,userController.currentUserInformation)

module.exports = router