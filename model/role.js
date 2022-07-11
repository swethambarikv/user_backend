const mongoose = require('mongoose');
require('dotenv').config()

const roleSchema = mongoose.Schema
({
    roleType :{
        type: String,
        required: true,
    }
})

module.exports = mongoose.model("role", roleSchema)