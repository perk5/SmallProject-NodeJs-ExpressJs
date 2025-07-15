const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv').config()
const app = express()
const route = require('./routes/contactRoutes')
const userRoute = require('./routes/userRoutes')
const errorHandler = require('./middleware/errorHandler')

app.use(express.json())


mongoose.connect(process.env.CON_STR, {
    useNewUrlParser: true
}).then((conn) => {
    // console.log(conn)
    console.log("Database Connected")
}).catch((err) =>{
    console.log('Some error has Occured...')
})

const port = process.env.PORT || 5000


app.use('/api/contacts', route)
app.use('/api/users', userRoute)
app.use(errorHandler)
app.listen(port, () =>{
    console.log("Server Started")
})

