const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { userModel } = require("../Models/userModel");
const {transporter} = require("../mailService/nodeMailer");



module.exports.register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) return res.json({ success: false, message: "Missing Details", statusCode: 400 });

        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.json({ success: false, message: "User Already Exists!", statusCode: 400 });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await userModel.create({ name, email, password: hashedPassword });
        await user.save();

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "4d" });

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? 'none' : 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        // const mailOptions = {
        //     from :process.env.SMTP_USER,
        //     to:email,
        //     subject: "Welcome to OurStack",
        //     text:`Welcome to OurStack website. Your account has been created with email id : ${email}`
        // }

        // await transporter.sendMail(mailOptions)

        return res.json({success:true, statusCode:200});

    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

module.exports.Login = async (req, res) => {
    try {
        
        const { email, password } = req.body;

        if (!email || !password) return res.json({ success: false, message: "Missing Details", statusCode: 400 });

        const user = await userModel.findOne({ email });
        if (!user) return res.json({ success: false, message: "User Not Found", statusCode: 404 });

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.json({ success: false, message: "Invalid Credentials", statusCode: 400 });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "4d" });

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? 'none' : 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        return res.json({success:true});


    } catch (error) {
        res.json({
            success: false,
            message: error.message
        })
    }
}


module.exports.Logout = async (req,res) => {
    try {
        res.clearCookie('token',{
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? 'none' : 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        return res.json({success:true, message: "Logged Out!"});
    } catch (error) {
        res.json({
            success: false,
            message: error.message
        })
    }
}


module.exports.sendVerifyOTP = async(req,res)=>{
    try {
        const {userId} = req.body;

        if(!userId) return res.json({
            success: false,
            message: "Email required."
        })

        const user = await userModel.findById(userId);
        
        if(!user) return res.json({
            success: false,
            message: "User Not Found",
            statusCode:400
        })  

        if(user.isAccountVerified){
            return res.json({
            success: false,
            message: "Account already verified",
            statusCode:400
        })  
        }

        const otp = String(Math.floor(100000 + Math.random() * 900000));
        user.verifyOtp = otp;
        user.verifyOtpExpireAt = Date.now() + 24 * 60 * 60 * 1000;

        await user.save();  // 278596

        const mailOptions = {
            from: process.env.SMTP_USER,
            to: user.email,
            subject: "Account Verification OTP",
            text:`Your OTP is  ${otp}. Verify your account using this otp.`            

        }

        // await transporter.sendMail(mailOptions);

        return res.json({success:true, message:"Verification OTP Sent on email."});


    } catch (error) {
            res.json({
            success: false,
            message: error.message
        })  
    }
}

module.exports.verifyOtp = async(req,res)=>{
    try {
        const {userId, otp} = req.body;

        if(!userId || !otp) return res.json({
            success:false,
            message: "Missing Details",
            statusCode: 400
        });

        const user = await userModel.findById(userId);

        if(!user) return res.json({
            success:false,
            message: "User not found!",
            statusCode: 404
        });

        if(user.verifyOtp == "" || otp!==user.verifyOtp) return res.json({
            success:false,
            message: "Invalid OTP",
            statusCode: 400
        }); 

        user.isAccountVerified = true;
        user.verifyOtpExpireAt = 0;
        user.verifyOtp = '';

        await user.save();
        return res.json({success:true, message: "email verified successfully.", statusCode:200})

    } catch (error) {
        res.json({
            success:false,
            message: error.message
        })
    }
}

// module.exports.resetOTP = async (req, res) => {
//     try {
//         const { userId, otp } = req.body;

//         if (!userId || !otp) return res.json({
//             success: false,
//             message: "Missing Details",
//             statusCode: 400
//         });

//         const user = await userModel.findById({ userId });

//         if (!user) return res.json({
//             success: false,
//             message: "User not found!",
//             statusCode: 404
//         });



//     } catch (error) {
//         res.json({
//             success: false,
//             message: error.message
//         })
//     }
// }

module.exports.isAuthenticated = async(req,res)=>{
    try {
        return res.json({success:true});
    } catch (error) {
        res.json({
            success: false,
            message: error.message
        })
    }
}

module.exports.sendResetPasswordOtp = async(req,res)=>{
    try {
        const {email} = req.body;
        if(!email) return res.json({
            success: false,
            message: "Email required.",
            statusCode: 400
        })

        const user = await userModel.findOne({email});
        if(!user) return res.json({
            success:false,
            message: "User not found!",
            statusCode: 404
        });

        const otp = String(Math.floor(100000 + Math.random() * 900000));
        console.log(otp);
        
        user.resetOtp = otp;
        user.resetOtpExpireAt = Date.now() + 15 * 60 * 60 * 1000;

        await user.save();

        const mailOptions = {
            from: process.env.SMTP_USER,
            to: user.email,
            subject: "Password Reset OTP",
            text:`Your OTP to reset your password is  ${otp}.`            

        }

        // await transporter.sendMail(mailOptions);

        return res.json({success:true, message:"Password Reset OTP Sent on email.",
           statusCode:200 
        });        

    } catch (error) {
        res.json({
            success: false,
            message: error.message
        })        
    }
}


module.exports.resetPassword = async(req,res)=>{
    try {
        const {email,otp,newPassword} = req.body;
        
        if (!email || !otp || !newPassword) return res.json({
            success: false,
            message: "Email, OTP and new password are required",
            statusCode: 400
        });

        const user = await userModel.findOne({email});

        if(!user) return res.json({
            success:false,
            message: "User not found!",
            statusCode: 404
        });

        if(user.resetOtp ==="" || user.resetOtp !== otp){
            return res.json({
                success:false,
                message:"Invalid OTP",
                statusCode:400
            })
        }

        if(user.resetOtpExpireAt < Date.now()){
            return res.json({
                success:false,
                message:"OTP Expired",
                statusCode:400
            })
        }

        const hashedPassword = await bcrypt.hash(newPassword,10)

        user.password = hashedPassword;
        user.resetOtp = "";
        user.resetOtpExpireAt=0;
        await user.save();

        return res.json({success:true, message:"Password Reset Successfully.",
           statusCode:200 
        });  

    } catch (error) {
        res.json({
            success: false,
            message: error.message
        })           
    }
}