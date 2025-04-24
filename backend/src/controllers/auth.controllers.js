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
      res.status(400).json({ errMsg: "Username already registered! try login" });
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
        role: newUser.role,
        image: newUser.image,
      },
    });
  } catch (error) {
    console.log("Error creating user: ", error);
    res.status(500).json({
      error: "Error user registeration",
    });
  }
};

export { register };
