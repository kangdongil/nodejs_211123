import express from "express";
import { logout, view, edit, deleteUser } from "../controllers/userController";

const userRouter = express.Router();

userRouter.get("/logout", logout);
userRouter.get("/id([0-9a-f]{24})", view);
userRouter.get("/edit", edit);
userRouter.get("/delete", deleteUser);

export default userRouter;