const asyncHandler = require("express-async-handler")
const Contact = require('../Models/contactModel')
const userModel = require("../Models/userModel")
//@desc Get all Contacts
//@Route GET /api/contact
//@access private

exports.getAllContacts = asyncHandler (async (req, res, next) =>{

    const contact = await Contact.find({user_id: req.id})

    res.status(200).json({
        message:  "Success",
        data:{
            contact
        }
    })
})

//@desc Create Contacts
//@Route POST /api/contact
//@access private
exports.createContact = asyncHandler (async (req, res, next) =>{
    console.log(req.id)

    const {name, email, phone} = req.body
    if(!name || !email || !phone){
       res.status(400)
       throw new Error("All fields are required")
    }

    const contact = await Contact.create({
        name,
        email,
        phone,
        user_id: req.id
    })

    await contact.save()

    res.status(200).json({
        message: "Success",
        data:{
            contact
        }
    })
})

//@desc Get Specific Contact
//@Route GET /api/contact/:id
//@access private
exports.specificContact = asyncHandler (async (req, res, next) =>{

    const contact = await Contact.findById(req.params.id)
    

    if(!contact){
        res.status(404)
        throw new Error("No User found in the database")
    }

    res.status(200).json({
        status: "Success",
        data:{
            contact
        }
    })
})

//@desc Update Contact
//@Route PUT /api/contact/:id
//@access private
exports.updateContact = asyncHandler (async (req, res, next) =>{
    const contact = await Contact.findById(req.params.id)
    
    if(!contact){
        res.status(404)
        throw new Error("No User found in the database")
    }

    const updatedContact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
            new: true,
            runValidators: true,
        }
    )

    await updatedContact.save()
    
    res.json({
        status: "Success",
        message: `Update contact for ${req.params.id}`,
        data:{
            updatedContact
        }
    })
})

//@desc Delete Contact
//@Route Delete /api/contact/:id
//@access private
exports.deleteContact = asyncHandler (async (req, res, next) =>{

    const contact = await Contact.findById(req.params.id)

    if(!contact){
       res.status(400)
       throw new Error("User Not found...")
    }
    await contact.deleteOne()

    res.json({
        status: "Success",
        message: "Contact deleted from the database"
    })
})