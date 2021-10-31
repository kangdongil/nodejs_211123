const videos = [
	{
		title: "First Video",
		views: 5,
		rating: 4,
		comments: 5,
		createdAt: "2 miniutes ago",
		id: 1
	},
	{
		title: "Second Video",
		views: 5,
		rating: 4,
		comments: 5,
		createdAt: "2 miniutes ago",
		id: 2
	},
	{
		title: "Third Video",
		views: 5,
		rating: 4,
		comments: 5,
		createdAt: "2 miniutes ago",
		id: 3
	},
]

export const home = (req, res) => {
	return res.render("home", {pageTitle: "Home", videos});
};
export const search = (req, res) => res.send("search");
export const getUpload = (req, res) => {
	return res.render("upload", {pageTitle: "Upload Video"});
};
export const postUpload = (req, res) => {
	const { title } = req.body;
	const newVideo = {
		title,
		views: 0,
		rating: 0,
		comments: 0,
		createdAt: "Just Now",
		id: videos.length + 1,
	};
	videos.push(newVideo);
	return res.redirect("/");
};
export const watch = (req, res) => {
	const { id } = req.params;
	const video = videos[id - 1];
	return res.render("watch", {pageTitle: `Watch Video: ${video.title}`, video});
};
export const getEdit = (req, res) => {
	const { id } = req.params;
	const video = videos[id-1];
	res.render("edit", {pageTitle: `Edit ${video.title}`, video});
};
export const postEdit = (req, res) => {
	const { id } = req.params;
	const { title } = req.body;
	videos[id - 1].title = title;
	return res.redirect(`/videos/${id}`);
}
export const deleteVideo = (req, res) => res.send("deleteVideo");