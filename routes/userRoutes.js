const express = require('express')
const router = express.Router()
const userController = require('../Controllers/userController')

router.route('/register').post(userController.createUsers)
router.route('/login').post(userController.login)
router.route('/current').get(userController.currentUserInformation)

module.exports = router