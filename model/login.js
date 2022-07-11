const mongoose = require('mongoose')
const jwt=require('jsonwebtoken')
const loginSchema = new mongoose.Schema({
    email:
        { type: String,
        required:true
    },
    password:
        { type: String }
})
module.exports = mongoose.model("login", loginSchema)