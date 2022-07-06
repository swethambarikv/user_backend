const jwt = require('jsonwebtoken')
require('dotenv').config()
const User = require('../model/user')
const Admin = require('../model/admin')


const isAuthenticateUser = async (req, res) => {
    const { token } = req.cookies;
    try {
        if(!token)
        throw "You don't have access to this page, please login"

        const decodedData = jwt.verify(token, process.env.SECRET_KEY);

        if(req.params.id && decodedData.id !== req.params.id)
        throw "You don't have acccess to other user"

        req.User = await User.findById(decodedData.id)
        next()
    }
    catch (err) {
        return res.status(401).json({error: err})
    }
}

const isAuthenticateAdmin = async (req, res) => {
    const { token } = req.cookies;
    try {
        if(!token)
        throw "You don't have access to this page, please login"

        const decodedData = jwt.verify(token, process.env.SECRET_KEY);

        if(req.params.id && decodedData.id !== req.params.id)
        throw "You don't have acccess to other admin"

        req.Admin = await Admin.findById(decodedData.id)
        next()
    }
    catch (err) {
        return res.status(401).json({error: err})
    }
}

module.exports = {isAuthenticateUser,isAuthenticateAdmin};