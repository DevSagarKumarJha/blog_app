import express from "express"
import { login, register } from "../controllers/auth.controllers.js";


const authRoutes = express(); 

authRoutes.post("/register", register);
authRoutes.post("/login", login);


export default authRoutes;