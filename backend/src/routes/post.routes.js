import express from "express";
import authenticate from "../middlewares/auth.middleware.js";
import upload from "../middlewares/upload.middleware.js";
import { createPost } from "../controllers/post.controllers.js";

const postRoutes = express.Router();

postRoutes.route("/").post(authenticate, upload.single("image"), createPost );

export default postRoutes;
