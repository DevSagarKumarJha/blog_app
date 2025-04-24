import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

import { db } from "../libs/db.js";

const register = async (req, res) => {
  const { email, username, name, password, cnfPassword } = req.body;

  if (!email) {
    res.status(400).json({ errMsg: "Email is Required" });
  }

  if (!username) {
    res.status(400).json({ errMsg: "Username is Required" });
  }

  if (!password) {
    res.status(400).json({ errMsg: "Passwword is Required" });
  }

  if (!cnfPassword) {
    res.status(400).json({ errMsg: "Please confirm your password" });
  }

  if (cnfPassword !== password) {
    res.status(400).json({
      errMsg: "Password mismatched! confirm password and password must be same",
    });
  }
  try {
    const existingUserWithEmail = await db.user.findUnique({
      where: {
        email,
      },
    });

    if (existingUserWithEmail) {
      res.status(400).json({ errMsg: "email already registered! try login" });
    }

    const existingUserWithUsername = await db.user.findUnique({
      where: {
        username,
      },
    });

    if (existingUserWithUsername) {
      res
        .status(400)
        .json({ errMsg: "Username already registered! try login" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await db.user.create({
      data: {
        email,
        username,
        name,
        password: hashedPassword,
      },
    });

    const token = jwt.sign({ id: newUser.id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.cookie("jwt", token, {
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV !== "development",
      maxAge: 1000 * 60 * 60 * 24 * 7,
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
    res.status(500).json({
      error: "Internal Server Error",
    });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ errMsg: "All fields are required", success: false });
  }

  try {
    const user = await db.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      res.status(404).json({ errMsg: "User not found", success: false });
    }

    const isPasswordMatched = bcrypt.compare(user.password, password);

    if (!isPasswordMatched) {
      res
        .status(401)
        .json({ errMsg: "Incorrect password! try again", success: false });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.cookie("jwt", token, {
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV !== "development",
      maxAge: 1000 * 60 * 60 * 24 * 7,
    });

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
    res.status(500).json({ errMsg: "Internal Server Error", success: false });
  }
};

export { register, login };
