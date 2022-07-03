const mongoose = require('mongoose');

const schema = mongoose.Schema;

const adminScheme = new schema({
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
    }
});

module.exports = mongoose.model("admin", adminScheme)