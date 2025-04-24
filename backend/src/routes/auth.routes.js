import express from "express"
import { register } from "../controllers/auth.controllers.js";


const authRoutes = express(); 

authRoutes.post("/register", register);


export default authRoutes;