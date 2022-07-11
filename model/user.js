const mongoose = require('mongoose');
require('dotenv').config()
const jwt = require('jsonwebtoken')
const role = require('./role')

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
        required: false,
    },
    phone: {
        type: String,
        required: false,
    },
    topic: {
        type: String,
        required: false,
    },
    password: {
        type: String,
        required: false,
    },
    role: {
        type: mongoose.Types.ObjectId,
        ref: 'role',
        required: false,
    }
    
});

userSchema.methods.generateJsonWebToken = function(){
    console.log("IN User schema : "+process.env.SECRET_KEY)
    return jwt.sign({id:this._id},"swetha27gmail",{
        expiresIn:'5m',
    });
}

module.exports = mongoose.model("user", userSchema)