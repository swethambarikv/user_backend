const express = require('express')
const router = express.Router();
const login = require('../model/user');
const jwt = require('jsonwebtoken')
router.get('/', (req, res) => {
    res.send("Get request success");
})
function verifyToken(req, res, next) {
    if (!req.headers.authorization) {
        return res.status(401).send('Unauthorized request')
    }
    let token = req.headers.authorization.split('')[1]
    if (token === 'null') {
        return res.status(401).send('Unauthorized request')
    }
    let payload = jwt.verify(token, 'SECRETKEY')
    if (!payload) {
        return res.status(401).send('Unauthorized request')
    }
    req.userId = payload.subject
    next()
}

router.post('/register', (req, res) => {
    let user = req.body
    let registerData;
    // loginData = new login(req.body)
    // console.log(loginData)
    registerData = new user(req.body)
    console.log(registerData)
    registerData.save((error, registeredUser) => {
        if (error) {
            console.log(error);
        }
        else {
            let payload = { subject: registeredUser._id }
            let token = jwt.sign(payload, 'SECRETKEY')
            res.status(200).send({ token })
        }
    })
})
router.post('/login', (req, res) => {
    let userdata = req.body

    login.findOne({ username: userdata.username }, (error, user) => {
        if (error) {
            console.log(error);
        }
        else {
            if (!user) {
                res.status(401).send('Invalid username');
            }
            else
                if (user.password !== userdata.password) {
                    res.status(401).send('Invalid password')
                }
                else {
                    let payload = { subject: user._id }
                    let token = jwt.sign(payload, 'SECRETKEY')
                    res.status(200).send({ token })
                }
        }
    })
})

router.get('/events', (req, res) => {

})

module.exports = router;