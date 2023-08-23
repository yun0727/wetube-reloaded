import express from "express";
import {  logout, see, startGithubLogin, finishGithubLogin, startKakaoLogin, finishKakaoLogin, getEdit, postEdit } from "../controllers/userController";

const userRouter = express.Router();

userRouter.get("/logout", logout);
userRouter.route("/edit").get(getEdit).post(postEdit);
userRouter.get("/github/start", startGithubLogin);
userRouter.get("/github/finish", finishGithubLogin);
userRouter.get("/kakao/start", startKakaoLogin);
userRouter.get("/kakao/finish", finishKakaoLogin);
userRouter.get(":id", see);


export default userRouter;