const userRoute = require("express").Router();
const Controller = require("../Controller/userController");
const {userAuth} = require("../Middlewares/authencation");

userRoute.get("/get-user-data",userAuth,Controller.getUserData);

module.exports = {userRoute}