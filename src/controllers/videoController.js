export const home = (req, res) => res.send("home");
export const search = (req, res) => res.send("search");
export const upload = (req, res) => res.send("upload");
export const watch = (req, res) => res.send(`watch video ${req.params.id}`);
export const edit = (req, res) => res.send("edit");
export const deleteVideo = (req, res) => res.send("deleteVideo");