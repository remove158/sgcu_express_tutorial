const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new Schema(
	{
		body: { type: String, required: true },
		replies: {
			type: [{ body: { type: String, required: true } }],
			required: true,
		},
	},
	{ timestamps: true }
);

mongoose.model("Post", PostSchema);
