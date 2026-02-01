const { userModel } = require("../Models/userModel");

module.exports.getUserData = async(req ,res )=>{
    try {
        const {userId} = req.body;

        const user = await userModel.findById(userId);

        if (!user) return res.json({ success: false, message: "User Not Found", statusCode: 404 });

        res.json({
            success:true,
            userData:{
                name: user.name,
                email: user.email,
                isAccountVerified: user.isAccountVerified
            }
        })
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}