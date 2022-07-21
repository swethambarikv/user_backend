const sendToken = (user, statusCode, res, message) => {
    const token = user.generateJsonWebToken();
    console.log("token : ", token);
    const option = {
        expires: new Date(
            Date.now() + 120 * 60 * 1000
        ),
        httpOnly: true
    }

    return res.status(statusCode).cookie("token", token, option).json({
        success: message,
        user,
        token
    })
   
    
}

module.exports = sendToken;