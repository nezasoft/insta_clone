import bcrypt from "bcryptjs";
import crypto from "crypto";
import jwt from "jsonwebtoken";

import User from "../models/user_model";

//SignUp Controller
exports.signup = (req, res) => {
    const {name, email, password} = req.body;
    //verifying if one of the fields is Empty
    if(!name || !password || !email){
        return res.json({error: "Please submit all required field"});
    }
    //Else we search the user with the credentials submitted
    User.findOne({Email: email}).then((savedUser)=>{
        //Verify if the user exists in the DB
        if(savedUser){
            return res.json({error: "This email is already used!"})

        }
    })
}
