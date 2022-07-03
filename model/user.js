const mongoose = require('mongoose');

const schema = mongoose.Schema;

const userScheme = new schema({
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
    }
});

module.exports = mongoose.model("user", userScheme)