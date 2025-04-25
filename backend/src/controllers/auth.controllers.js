import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

import { db } from "../libs/db.js";

const register = async (req, res) => {
  const { email, username, name, password, cnfPassword } = req.body;

  if (!email) return res.status(400).json({ error: "Email is Required" });
  if (!username) return res.status(400).json({ error: "Username is Required" });
  if (!password)
    return res.status(400).json({ error: "Passwword is Required" });
  if (!cnfPassword)
    return res.status(400).json({ error: "Please confirm your password" });
  if (cnfPassword !== password)
    return res.status(400).json({
      error: "Password mismatched! confirm password and password must be same",
    });

  try {
    const existingUserWithEmail = await db.user.findUnique({
      where: { email },
    });
    if (existingUserWithEmail)
      return res
        .status(400)
        .json({ error: "email already registered! try login" });

    const existingUserWithUsername = await db.user.findUnique({
      where: { username },
    });
    if (existingUserWithUsername)
      return res
        .status(400)
        .json({ error: "Username already registered! try login" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await db.user.create({
      data: { email, username, name, password: hashedPassword },
    });

    const token = jwt.sign({ id: newUser.id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.set("Authorization", `Bearer ${token}`);

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // true in production
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res.status(201).json({
      message: "User created successfully",
      user: {
        id: newUser.id,
        username: newUser.username,
        email: newUser.email,
        name: newUser.name,
      },
    });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res
      .status(400)
      .json({ error: "All fields are required", success: false });

  try {
    const user = await db.user.findUnique({ where: { email } });
    if (!user)
      return res.status(404).json({ error: "User not found", success: false });

    const isPasswordMatched = await bcrypt.compare(password, user.password);
    if (!isPasswordMatched)
      return res
        .status(401)
        .json({ error: "Incorrect password! try again", success: false });

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // true in production
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });
    // res.set("Authorization", `Bearer ${token}`);
    
    res.status(200).json({
      message: "User login successfully",
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        name: user.name,
      },
    });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error", success: false });
  }
};

const getMe = async (req, res) => {
  try {
    const user = await db.user.findUnique({
      where: { id: req.user.id },
      select: {
        id: true,
        name: true,
        username: true,
        email: true,
        createdAt: true,
      },
    });

    if (!user) return res.status(404).json({ error: "User not found" });

    res.status(200).json({ user });
  } catch (error) {
    console.error("getMe error:", error);
    res.status(500).json({ error: "Failed to get user info" });
  }
};

export { register, login, getMe };
