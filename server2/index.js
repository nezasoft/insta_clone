import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import  {signUp} from "./Routes/Routes";
import bodyParser from "body-parser";

//Connecting mongoDB Database
mongoose.connect(`mongodb://127.0.0.1:27017/insta_app`).then((x)=>{
    console.log(`Connected to Mongo DB! Database Name: "${x.connections[0].name}"`)
    .catch((err)=>{
        console.error('Error connecting to Mongo', err.reason);
    });
});

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(cors());
app.use('/signup', signUp);

//PORT

const port = 5000 || 5001;
const server = app.listen(port,()=>{
    console.log('Connected to port' + port);
});

//404 Error
app.use((req,res,next)=>{
    next(createError(404));
});

app.use(function (err,req,res,next){
    console.error(err.message);

    if(!err.statusCode) {
        err.statusCode=500;
    }
    res.status(err.statusCode).send(err.message);
});

