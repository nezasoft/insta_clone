import mongoose from "mongoose";

const connectDB = async () => {
    try{
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected : ${conn.connection.host}`);
   }catch(err){
    console.log("Error while connecting to the database:", error);
    process.exit(1);
   }

};
//module.exports = connectDB;
export default connectDB;