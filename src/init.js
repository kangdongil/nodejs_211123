import "./db";
import Video from "./models/Video";
import app from "./server";

const PORT = 4000;

function handleListening () {
	console.log(`🚀 Listening to PORT ${PORT}: https://nodejs-practice-wrqbe.run.goorm.io`)
}

app.listen(PORT, handleListening);