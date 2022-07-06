const mongoose = require('mongoose');
require('dotenv').config()
const jwt = require('jsonwebtoken')

const schema = mongoose.Schema;

const userSchema = new schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    practice: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: false,
    }
});

userSchema.methods.generateJsonWebToken = function(){
    console.log("IN User schema : "+process.env.SECRET_KEY)
    return jwt.sign({id:this._id},process.env.SECRET_KEY,{
        expiresIn:'5m',
    });
}

module.exports = mongoose.model("user", userSchema)