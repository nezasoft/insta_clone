//const Post = require("../models/post_model");
import Post from "../models/post_model.js";

export const allPost = (req, res) => {
    Post.find().populate("PostedBy","_id Name")
    .populate("Comments.PostedBy","_id Name")
    .sort("-createdAt")
    .then((data)=>{
        let posts = [];
        data.map((item)=>{
            posts.push({
                _id: item._id,
                Title: item.Title,
                Body: item.Body,
                PostedBy: item.PostedBy,
                Photo: item.Photo.toString("base64"),
                PhotoType:item.PhotoType,
                Likes: item.Likes,
                Comments: item.Comments,
            });
        });
        res.json({posts});
    }).catch((err)=>{
        console.log(err);
    });
};

export const subPost = (req, res) => {
    Post.find({PostedBy: {$in: req.user.Following}})
    .populate("PostedBy","_id Name")
    .populate("Comments.PostedBy","_id Name")
    .sort("-createdAt")
    .then((data)=>{
        let posts = [];
        data.map((item)=>{
            posts.push({
                _id: item._id,
                Title: item.Title,
                Body: item.Body,
                PostedBy: item.PostedBy,
                Photo: item.Photo.toString("64"),
                PhotoType: item.PhotoType,
                Likes: item.Likes,
                Comments: item.Comments,
            });
        });
        res.json({posts});
    }).catch((err)=>{
        console.log(err);
    });
};


export const myPost = (req,res) => {
    Post.find({PostedBy: {$in: req.user._id}})
    .populate("PostedBy","_id Name")
    .populate("Comments.PostedBy","_id Name")
    .sort("-createdAt")
    .then((data)=>{
        let posts = [];
        data.map((item)=>{
            posts.push({
                _id: item._id,
                Title: item.Title,
				Body: item.body,
                Photo: item.Photo.toString("base64"),
				hotoType: item.PhotoType,
				Likes: item.Likes,
				Comments: item.Comments,
            });
        });
        res.json({ posts });
    })
    .catch((err) => {
        console.log(err);
    });
};

export const createPost = (req, res) => {
	const { title, body, photoEncode, photoType } = req.body;
	if (!title || !body || !photoEncode) {
		return res.json({
			error: "Please submit all the required fields.",
		});
	}
	const post = new Post({
		Title: title,
		Body: body,
		PostedBy: req.user,
	});

	// savePhoto(post, photoEncode, photoType);

	if (photoEncoded != null) {
		post.Photo = new Buffer.from(photoEncoded, "base64");
		post.PhotoType = photoType;
	}

	post.save()
		.then((result) => {
			res.json({ message: "Post created successfully" });
		})
		.catch((err) => {
			console.log(err);
		});
};

export const like = (req, res) => {
	Post.findByIdAndUpdate(
		req.body.postId,
		{
			$push: { Likes: req.user._id },
		},
		{ new: true }
	)
		.populate("PostedBy", "_id Name")
		.populate("Comments.PostedBy", "_id Name")
		.exec((err, result) => {
			if (err) return res.status(422).json({ Error: err });
			else {
				res.json({
					_id: result._id,
					Title: result.Title,
					Body: result.Body,
					PostedBy: result.PostedBy,
					Photo: result.Photo.toString("base64"),
					PhotoType: result.PhotoType,
					Likes: result.Likes,
					Comments: result.Comments,
				});
			}
		});
};

export const unlike = (req, res) => {
	Post.findByIdAndUpdate(
		req.body.postId,
		{
			$pull: { Likes: req.user._id },
		},
		{ new: true }
	)
		.populate("PostedBy", "_id Name")
		.populate("Comments.PostedBy", "_id Name")
		.exec((err, result) => {
			if (err) return res.status(422).json({ Error: err });
			else {
				console.log(result);
				res.json({
					_id: result._id,
					Title: result.Title,
					Body: result.Body,
					PostedBy: result.PostedBy,
					Photo: result.Photo.toString("base64"),
					PhotoType: result.PhotoType,
					Likes: result.Likes,
					Comments: result.Comments,
				});
			}
		});
};

export const comment = (req, res) => {
	const comment = { Text: req.body.text, PostedBy: req.user._id };
	Post.findByIdAndUpdate(
		req.body.postId,
		{
			$push: { Comments: comment },
		},
		{ new: true }
	)
		.populate("Comments.PostedBy", "_id Name")
		.populate("PostedBy", "_id Name")
		.exec((err, result) => {
			if (err) return res.status(422).json({ Error: err });
			else {
				res.json({
					_id: result._id,
					Title: result.Title,
					Body: result.Body,
					PostedBy: result.PostedBy,
					Photo: result.Photo.toString("base64"),
					PhotoType: result.PhotoType,
					Likes: result.Likes,
					Comments: result.Comments,
				});
			}
		});
};

export const deletePost = (req, res) => {
	Post.findOne({ _id: req.params.postId })
		.populate("PostedBy", "_id")
		.exec((err, post) => {
			if (err || !post) return res.status(422).json({ Error: err });
			if (post.PostedBy._id.toString() === req.user._id.toString()) {
				post.remove()
					.then((result) => {
						res.json(result._id);
					})
					.catch((err) => console.log(err));
			}
		});
};
