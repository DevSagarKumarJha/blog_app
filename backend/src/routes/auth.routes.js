import express from "express"
import { getMe, login, register } from "../controllers/auth.controllers.js";
import authenticate from "../middlewares/auth.middleware.js";


const authRoutes = express.Router(); 

authRoutes.post("/register", register);
authRoutes.post("/login", login);
authRoutes.get("/profile", authenticate, getMe);

export default authRoutes;