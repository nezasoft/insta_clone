import { Schema, model } from "mongoose";
const { ObjectId } = Schema.Types;

const postSchema = new Schema(
	{
		Title: {
			type: String,
			required: true,
		},
		Body: {
			type: String,
			required: true,
		},
		Photo: {
			type: Buffer,
			default: "no photo",
		},
		PhotoType: {
			type: String,
		},
		PostedBy: {
			type: ObjectId,
			ref: "User",
		},
		Likes: [{ type: ObjectId, ref: "User" }],
		Comments: [
			{
				Text: String,
				PostedBy: {
					type: ObjectId,
					ref: "User",
				},
			},
		],
	},
	{ timestamps: true }
);

// Create a model from our schema
export default model("Post", postSchema);