import Video from "../models/Video";

export const home = async(req, res) => {
	const videos = await Video.find({}).sort({createdAt: "desc"});
	return res.render("home", {pageTitle: "Home", videos});
};
export const search = async(req, res) => {
	const { keyword } = req.query;
	let videos = [];
	if (keyword) {
		videos = await Video.find({
			title: {$regex: new RegExp(`^${keyword}`, "i")}
		});
	}
	return res.render("search", {pageTitle: "Search Video", videos });
};

export const getUpload = (req, res) => {
	return res.render("upload", {pageTitle: "Upload Video"});
};
export const postUpload = async(req, res) => {
	const { title, description, hashtags } = req.body;
	try {
		const video = await Video.create({
			title,
			description,
			hashtags: Video.formatHashtags(hashtags)
		});
	} catch(err) {
		res.render("upload", {pageTitle: "Upload Video", errMsg: err._message });
	}
	return res.redirect("/");
};
export const watch = async(req, res) => {
	const { id } = req.params;
	const video = await Video.findById({ _id: id });
	if (!video) {
		res.render("404", {pageTitle: "404 - video not found."})
	}
	return res.render("watch", {pageTitle: `Watch Video: ${video.title}`, video});
};
export const getEdit = async(req, res) => {
	const { id } = req.params;
	const video = await Video.findById({ _id: id });
	if (!video) {
		res.render("404", {pageTitle: "404 - no video found."})
	}
	res.render("edit", {pageTitle: `Edit ${video.title}`, video});
};
export const postEdit = async(req, res) => {
	const { id } = req.params;
	const { title, description, hashtags } = req.body;
	const videoExists = await Video.exists({ _id: id });
	if (!videoExists) {
		res.render("404", {pageTitle: "404 - video not found."})
	}
	await Video.findByIdAndUpdate(id, {
		title,
		description,
		hashtags: Video.formatHashtags(hashtags)
	});
	return res.redirect(`/videos/${id}`);
};
export const deleteVideo = async(req, res) => {
	const { id } = req.params;
	await Video.findByIdAndDelete(id);
	return res.redirect("/");
};