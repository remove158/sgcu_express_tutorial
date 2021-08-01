const mongoose = require("mongoose");
const Post = mongoose.model("Post");

const create = async (req, res) => {
	const { body } = req.body;
	if (!body) return res.sendStatus(400);
	const data = new Post({ body });
	data.save();
	return res.json({ data });
};

const viewAll = async (req, res) => {
	const { search } = req.query;
	const data = await Post.find(
		{ body: { $regex: search || "" } },
		"-replies"
	);
	return res.json(data);
};

const viewId = async (req, res) => {
	const { id } = req.params;
	if (!id) return res.sendStatus(400);
	const data = await Post.findById(id);
	return res.json(data);
};

const editId = async (req, res) => {
	const { id } = req.params;
	const { body } = req.body;
	const data = await Post.findByIdAndUpdate(id, { body }, { new: true });
	return res.json(data);
};

const deleteId = async (req, res) => {
	const { id } = req.params;
	const post = await Post.findByIdAndDelete(id);
	if (!post) return res.send(404);
	return res.json({ post });
};

const replyPost = async (req, res) => {
	const { id } = req.params;
	const { body } = req.body;
	const post = await Post.findByIdAndUpdate(
		id,
		{
			$push: { replies: { body } },
		},
		{ new: true }
	);

	if (!post) return res.send(404);
	return res.json({ post });
};

const isValidMongoID = async (req, res, next) => {
	const { id } = req.params;
	if (mongoose.isValidObjectId(id)) return next();
	return res.sendStatus(400);
};

module.exports = {
	create,
	viewAll,
	viewId,
	editId,
	deleteId,
	replyPost,
	isValidMongoID,
};
