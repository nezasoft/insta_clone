import mongoose from "mongoose";

const connectDB = async () => {
    try{
        const conn =  mongoose.connect(`mongodb://127.0.0.1:27017/insta_app`);
        console.log(`MongoDB Connected`);
   }catch(err){
    console.log("Error while connecting to the database:", err);
    process.exit(1);
   }

};
//module.exports = connectDB;
export default connectDB;