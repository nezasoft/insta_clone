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
        //We hash the pwd before saved into DB, more the number is high more its  more secure
        bcrypt.hash(password, 12).then((hashedPwd) =>{
            const user = new User({
                Name: name,
                Email: email,
                Password: hashedPwd,
            });
            //we save our new user to DB
            user.save().then((user)=>{
                	// const email = {
						// 	from: "no-reply@insta-clone.com",
						// 	to: user.Email,
						// 	subject: "Your account has been created successfully",
						// 	html: "<h1>Welcome to InstaClone</h1>",
						// };
						// sgMail.send(email);
						res.json({ message: "Saved successfully "});
            }).catch((err)=>{
                console.log(err);
            });
            //after saving the user to DB we send a confirmation email
        });
    }).catch((error)=>{
        console.log(err);

    });
};
//SignIn Controller
exports.signin = (req,res) => {
    const {email, password} = req.body;
    //Verification for an empty field
    if(!email || !password) {
        return res.json({error: "Please provide Email or Password"});
    }
    //check if email exists in our DB
    User.findOne({Email:email}).then((savedUser)=>{
        if(!savedUser){
            return res.json({error: "Invalid Email or Password"});
        }
        bcrypt.compare(password, savedUser.Password).then((doMatch)=>{
            if(doMatch){
                //we will generate the token based on the ID of the user
                const token = jwt.sign({_id: savedUser._id},
                    process.env.JWT_SECRET);
                    //retrieve the user info details and send it to the front
                    const {_id, Name, Email, Followers, Following, Bookmarks} = savedUser;
                    res.json({token, user: {_id, Name,Email, Followers, Following, Bookmarks}});
            }else{
                return res.json({error: "Invalid Email or Password"});
            }
        });
    }).catch((error)=>{
        console.log(err);
    });

};

//reset password controller
exports.resetPwd = (req, res) =>{
    crypto.randomBytes(32, (err, buffer)=>{
        if(err) {
            console.log(err);
        }

        const token = buffer.toString("hex");
        User.findOne({Email: req.body.email}).then((user)=>{
            if(!user){
                console.log("simple check of the error source");
                return res.json({error: "No user exists with that email"});

            }
            user.ResetToken = token;
            user.ExpirationToken = Date.now() + 600000;//10 min in ms
            user.save().then((result)=>{
                // this section will be fully functional after adding the SendGrid API Key
				// in order to use this feature
				// the following is an example of Email template

				// const email = {
				// 	from: "no-reply@insta-clone.com",
				// 	to: user.Email,
				// 	subject: "Password Reset",
				// 	html: `
				//      <p>A request has been made to change the password of your account </p>
				// 	 <h5>click on this <a href="http://localhost:3000/reset/${token}">link</a> to reset your password</h5>
				// 	 <p> Or copy and paste the following link :</p>
				// 	 <h5>"http://localhost:3000/reset/${token}"</h5>
				// 	 <h5>The link is only valid for 10min</h5>
				// 	 <h5>If you weren't the sender of that request , you can just ignore the message</h5>
				//      `,
				// };
				// sgMail.send(email);

				res.json({ message: "check your Email Inbox" });

            });

        });
    })
};

// New Password Controller
exports.newPwd = (req, res) => {
	const Password = req.body.password;
	const Token = req.body.token;
	User.findOne({ ResetToken: Token, ExpirationToken: { $gt: Date.now() } })
		.then((user) => {
			if (!user) {
				return res.status(422).json({ error: "Session expired ! Try Again with a new Request" });
			}
			bcrypt.hash(Password, 12).then((HashPwd) => {
				user.password = HashPwd;
				user.ResetToken = undefined;
				user.ExpirationToken = undefined;
				user.save().then((result) => {
					res.json({ message: "Password Updated successfully" });
				});
			});
		})
		.catch((err) => {
			console.log(err);
		});
};