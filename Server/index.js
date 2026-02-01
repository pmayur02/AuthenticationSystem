require("dotenv").config();
const express = require("express")
const cors = require("cors");
const cookieParser = require("cookie-parser");
const {connectDB} = require("./DBConnection/mongoDBConnection");
const {route} = require("./Routes/authRoutes")
const {userRoute} = require("./Routes/userRoutes")


const app = express();
connectDB();
const port = process.env.PORT || 8000;

app.use(express.json())
app.use(cookieParser());
const allowedOrigins = ["http://localhost:5173"]
app.use(cors({origin:allowedOrigins,credentials:true}));

app.get('/', (req,res)=> res.send("API Working"));
app.use('/auth',route);
app.use('/user',userRoute);

app.listen(port, ()=>{
    console.log(`listening on port ${port}`);
});


