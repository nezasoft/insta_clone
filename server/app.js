import express from "express";
import morgan from "morgan";
import cors from "cors";
import compression from "compression";
import helmet from "helmet";
import connectDB from "./config/db_config.js";

//Connection to DB
//require("dotenv").config();
 
//Create the express application object
connectDB();
const app = express();

//Compress the HTTP response sent back to client
app.use(compression()); //compress all routes

//Use helmet to protect against well known vulnerabilities
app.use(helmet());

//use Morgan dep in dev mode
app.use(morgan("dev"));
//set up cors to allow us to accept requests from our client
app.use(
    cors({origin:"http://localhost:3000",credentials:true,}) //location of the react app were connecting to
);

//Parsers
app.use(express.json({limit: "50mb"}));
app.use(express.urlencoded({extended: true}));

//Routes
import "./routes/auth_route.js";
import "./routes/post_route.js";
import "./routes/user_route.js";

//Specify the PORT which will the server running on
//const PORT = process.env.PORT || 3001;
const PORT = 5000 || 5001;

//Disabling Powered by tag
app.disable("x-powered-by");
app.listen(PORT,()=>{
    console.log(`Server is running in ${process.env.NODE_ENV} mode, under port ${PORT}.`);

});




