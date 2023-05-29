import { find } from "../models/post_model.js";
import { findOne, findByIdAndUpdate, find as _find } from "../models/user_model.js";

export function user(req, res) {
	findOne({ _id: req.params.id })
		.select("-Password")
		.then((user) => {
			find({ PostedBy: req.params.id })
				.populate("PostedBy", "_id Name")
				.exec((err, result) => {
					if (err) return res.status(422).json();
					const posts = [];
					result.map((item) => {
						posts.push({
							_id: item._id,
							Title: item.Title,
							Body: item.Body,
							Photo: item.Photo.toString("base64"),
							PhotoType: item.PhotoType,
							Likes: item.Likes,
							Comments: item.Comments,
							Followers: item.Followers,
							Following: item.Following,
						});
					});
					res.json({ user, posts });
				});
		})
		.catch((err) => {
			return res.status(404).json({ Error: "User not found" });
		});
}

export function follow(req, res) {
	findByIdAndUpdate(
		req.body.followId,
		{
			$push: { Followers: req.user._id },
		},
		{
			new: true,
		},
		(err, result) => {
			if (err) {
				return res.status(422).json({ error: err });
			}
			findByIdAndUpdate(
				req.user._id,
				{
					$push: { Following: req.body.followId },
				},
				{ new: true }
			)
				.select("-Password")
				.then((result) => {
					res.json(result);
				})
				.catch((err) => {
					return res.status(422).json({ error: err });
				});
		}
	);
}

export function unfollow(req, res) {
	findByIdAndUpdate(
		req.body.unfollowId,
		{
			$pull: { Followers: req.user._id },
		},
		{
			new: true,
		},
		(err, result) => {
			if (err) {
				return res.status(422).json({ error: err });
			}
			findByIdAndUpdate(
				req.user._id,
				{
					$pull: { Following: req.body.unfollowId },
				},
				{ new: true }
			)
				.select("-Password")
				.then((result) => {
					res.json(result);
				})
				.catch((err) => {
					return res.status(422).json({ error: err });
				});
		}
	);
}

export function bookmarks(req, res) {
	_find({ _id: req.user._id })
		.select("-Password")
		.then((user) => {
			const data = user[0].Bookmarks;
			find({ _id: { $in: data } })
				.populate("PostedBy", "_id Name")
				.then((result) => {
					let bookmark = [];
					result.map((item) => {
						bookmark.push({
							_id: item._id,
							PostedBy: item.PostedBy,
							Title: item.Title,
							Body: item.Body,
							Photo: item.Photo.toString("base64"),
							PhotoType: item.PhotoType,
							Likes: item.Likes,
							Comments: item.Comments,
						});
					});
					res.json({ bookmark });
				})
				.catch((err) => console.log(err));
		})
		.catch((err) => {
			return res.status(404).json({ Error: "User not found" });
		});
}

export function bookmarkPost(req, res) {
	findByIdAndUpdate(
		req.user._id,
		{
			$push: { Bookmarks: req.body.postId },
		},
		{ new: true }
	)
		.select("-Password")
		.then((result) => {
			res.json(result);
		})
		.catch((err) => {
			return res.json({ error: err });
		});
}

export function removeBookmark(req, res) {
	findByIdAndUpdate(
		req.user._id,
		{
			$pull: { Bookmarks: req.body.postId },
		},
		{ new: true }
	)
		.select("-Password")
		.then((result) => {
			res.json(result);
		})
		.catch((err) => {
			return res.json({ error: err });
		});
}

// Just Wrote the logic of it but not yet tested and the client implementation doesn't exist yet
export function updatePicture(req, res) {
	findByIdAndUpdate(
		req.user._id,
		{ $set: { Photo: req.body.Photo, PhotoType: req.body.PhotoType } },
		{ new: true },
		(err, result) => {
			if (err) {
				return res.status(422).json({ error: "pic canot post" });
			}
			res.json(result);
		}
	);
}

export function userSearch(req, res) {
	let pattern = new RegExp("^" + req.body.pattern);
	_find({ Email: { $regex: pattern } })
		.select("_id Email Name")
		.then((user) => {
			res.json({ user });
		})
		.catch((err) => {
			console.log(err);
		});
}