import mongoose from "mongoose";

mongoose.connect("mongodb://127.0.0.1:27017/wetube");

mongoose.connection.on("error", (err) => console.log("❌ DB Error", err));
mongoose.connection.once("open", () => console.log("✅ Connected to DB"));
