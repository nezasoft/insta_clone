import { verify } from "jsonwebtoken";

import { findById } from "../models/user_model";

export default (req, res, next) => {
	const { authorization } = req.headers;
	if (!authorization) {
		return res.status(401).json({ error: "You must be logged In." });
	}
	const token = authorization.replace("Bearer ", "");
	verify(token, process.env.JWT_SECRET, (err, payload) => {
		if (err) {
			return res.status(401).json({ error: "You session has been expired." });
		}
		const { _id } = payload;
		findById(_id).then((userdata) => {
			// We make user data accessible
			req.user = userdata;
			next();
		});
	});
};