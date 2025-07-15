const express = require('express')
const router = express.Router()
const contactController = require('../Controllers/contactController')

router.route('/').get(contactController.getAllContacts).post(contactController.createContact)

router.route('/:id').get(contactController.specificContact).put(contactController.updateContact).delete(contactController.deleteContact)

module.exports = router