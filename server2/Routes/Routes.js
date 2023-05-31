import mongoose from "mongoose";
import express from  "express";

const router = express.Router();

//User Model
import User from "../Models/User";
import Post from "../Models/Post";


//Create User
export const signUp = router.route('/signup').post((req,res,next)=>{
    User.create(req.body,(error,data)=>{
        if(error){
            return next(error);
        }else{
            console.log(error);
            res.json(data);
        }
    });
});

//Update user
/*router.route('/reset-pwq').post((req,res,next)=>{
    User.create()
});*/

//Read Posts
export const allPost = router.route('/allpost').get((req,res)=>{
    Post.find((error,data)=>{
        if(error){
            return next(error);

        }else{
            res.json(data);
        }
    });
});

//Read Single Post
export const singlePost = router.route('/view-post/:id').get((req,res)=>{
    Post.findById(req.params.id, (error,data)=>{
        if(error){
            return next(error);
        }else{
            res.json(data);
        }
    });

});

//Update Post 
export const updatePost =  router.route('/update-post/:id').put((req,res,next)=>{
    Post.findByIdAndUpdate(req.params.id,{
        $set: req.body
    },(error,data)=>{
        if(error){
            return next(error);
            console.log(error);
        }else{
            res.json(data);
            console.log('Student updated successfully!');
        }
    });
});

//Delete Student
export const deletePost = router.route('/delete-post/:id').delete((req,res,next)=>{
    Post.findByIdAndRemove(req.params.id,(error,data)=>{
        if(error){
            return next(error);

        }else{
          res.status(200).json({
            msg:data
          });
        }
    });
});
