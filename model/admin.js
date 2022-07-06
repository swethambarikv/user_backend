const mongoose = require('mongoose');
require('dotenv').config()
const jwt = require('jsonwebtoken')

const schema = mongoose.Schema;

const adminSchema = new schema({
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
    mobile: {
        type: String,
        required: true,
    },
    topic: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    }
});
adminSchema.methods.generateJsonWebToken = function () {
    console.log("IN Admin schema : " + process.env.SECRET_KEY)
    return jwt.sign({ id: this._id }, process.env.SECRET_KEY, {
        expiresIn: '5m',
    });
}
module.exports = mongoose.model("admin", adminSchema)