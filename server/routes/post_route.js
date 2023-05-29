import { allPost, subPost, myPost, createPost, like, unlike, comment, deletePost } from "../controllers/post_controller.js";
import loginmiddleware from "../middleware/login_middleware.js";

export default (app) => {
	// Getting all posts
	app.get("/allpost", loginmiddleware, allPost);

	// Getting post for subscribed/followed users
	app.get("/subspost", loginmiddleware, subPost);

	// Getting the user posts
	app.get("/mypost", loginmiddleware, myPost);

	// Create a post
	app.post("/createpost", loginmiddleware, createPost);

	// Like a post
	app.put("/like", loginmiddleware, like);

	// Unlike a post
	app.put("/Unlike", loginmiddleware, unlike);

	// Commenting a post
	app.put("/comment", loginmiddleware, comment);

	// Deleting a post
	app.delete("/deletepost/:postId", loginmiddleware, deletePost);
};