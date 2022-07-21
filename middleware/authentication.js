const jwt = require('jsonwebtoken')
const User = require('../model/user')

const isAuthenticateUser = async (req, res, next) => {
    const baseToken = req.headers.authorization;
    const token = baseToken.split(" ")[1]

    try {
        if (!token)
            throw "You don't have access to this page, please login"

        const decodedData = jwt.verify(token, "swetha27gmail");
        req.User = await User.findById(decodedData.id)
        console.log("Check", req.User);
        next()
    }
    catch (err) {
        return res.status(401).json({ error: err })
    }
}
module.exports = isAuthenticateUser
