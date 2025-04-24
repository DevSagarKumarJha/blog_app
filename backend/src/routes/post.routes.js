import express from "express";
import authenticate from "../middlewares/auth.middleware.js";
import upload from "../middlewares/upload.middleware.js";
import { createPost, getAllPosts } from "../controllers/post.controllers.js";

const postRoutes = express.Router();

postRoutes
  .route("/")
  .post(authenticate, upload.single("image"), createPost)
  .get(getAllPosts);

export default postRoutes;
