import express from "express";
import morgan from "morgan";
import globalRouter from "./routers/globalRouter";
import videoRouter from "./routers/videoRouter";
import userRouter from "./routers/userRouter";

const PORT = 4000;

const app = express();
const logger = morgan("dev");

app.use(logger);
app.use("/", globalRouter);
app.use("/videos", videoRouter);
app.use("/users", userRouter);

function handleListening () {
	console.log(`Listening to PORT ${PORT}: https://nodejs-practice-wrqbe.run.goorm.io`)
}

app.listen(PORT, handleListening);