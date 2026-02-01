const jwt = require("jsonwebtoken");

async function userAuth(req, res, next) {
    try {
        const { token } = req.cookies;
        req.body = req.body || {}

        if (!token) return res.json({
            success: false,
            message: "Not Authorised",
            statusCode: 401
        });

        const tokenData = jwt.verify(token, process.env.JWT_SECRET);

        if (tokenData.id) {
            req.body.userId = tokenData.id
        } else {
            return res.json({success: false,
                message: "Not Authorised",
                statusCode: 401})
        }

        next();

    } catch (error) {
        return res.json({
            success: false,
            message: error.message,
            statusCode: 500
        });
    }
}


module.exports = {userAuth}