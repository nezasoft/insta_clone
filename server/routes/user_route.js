import loginmiddleware from "../middleware/login_middleware";
import { user, follow, unfollow, bookmarks, bookmarkPost, removeBookmark, updatePicture, userSearch } from "../controllers/user_controller";

export default (app) => {
	// Getting the user details by id
	app.get("/user/:id", loginmiddleware, user);

	// Follow a user
	app.put("/follow", loginmiddleware, follow);

	// UnFollow a user
	app.put("/unfollow", loginmiddleware, unfollow);

	// Retrieve all Bookmarks
	app.get("/bookmarks", loginmiddleware, bookmarks);

	// Bookmark a post
	app.put("/bookmark-post", loginmiddleware, bookmarkPost);

	// Remove a bookmark
	app.put("/remove-bookmark", loginmiddleware, removeBookmark);

	// Update the profile picture
	// Just Wrote the logic of it but not yet tested and the client implementation doesn't exist yet
	app.put("/update-picture", loginmiddleware, updatePicture);

	// Search for a user by email
	app.post("/users-research", userSearch);
};