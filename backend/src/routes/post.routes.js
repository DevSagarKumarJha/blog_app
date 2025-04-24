import express from "express";
import authenticate from "../middlewares/auth.middleware.js";
import upload from "../middlewares/upload.middleware.js";
import {
  createPost,
  deletePost,
  getAllPosts,
  getPostById,
  updatePost,
} from "../controllers/post.controllers.js";

const postRoutes = express.Router();

postRoutes
  .route("/")
  .post(authenticate, upload.single("image"), createPost)
  .get(getAllPosts);

postRoutes
  .route("/:id")
  .get(getPostById)
  .put(authenticate, upload.single("image"), updatePost)
  .delete(authenticate, deletePost);

export default postRoutes;
