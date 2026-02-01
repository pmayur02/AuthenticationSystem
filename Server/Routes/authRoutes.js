const route = require("express").Router();
const Controller = require("../Controller/AuthController");
const {userAuth} = require("../Middlewares/authencation");


route.post("/register",Controller.register);
route.post("/login",Controller.Login);
route.post("/logout",Controller.Logout);
route.post("/send-verify-otp",userAuth,Controller.sendVerifyOTP);
route.post("/verify-otp",userAuth,Controller.verifyOtp);
route.post("/islogged-in",userAuth,Controller.isAuthenticated);
route.post("/send-reset-otp", Controller.sendResetPasswordOtp)
route.post("/reset-password", Controller.resetPassword)



module.exports = {route}