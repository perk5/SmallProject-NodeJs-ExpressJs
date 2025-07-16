const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please add the user name"]
    },
    email:{
        type: String,
        required: [true, "Please provide Specific Email address"],
        unique: [true, "Email address already taken"]
    },
    password:{
        type: String,
        required: [true, "Please add the user Password"],
        select: false
    }

},{
    timestamps: true
})

userSchema.pre('save', async function(next){
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 12)

    next()
})

userSchema.methods.comparePasswordInDb = async function(pswd){
    return await bcrypt.compare(pswd, this.password)
}

module.exports = mongoose.model("User", userSchema)