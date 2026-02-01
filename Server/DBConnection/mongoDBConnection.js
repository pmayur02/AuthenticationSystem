const mongoose = require("mongoose");


async function connectDB(){
    mongoose.connection.on('connected', ()=>console.log("Database Connected!"));
    await mongoose.connect(process.env.MONGO_URI);
}

module.exports = {connectDB};