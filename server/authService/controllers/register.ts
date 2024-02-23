import { sign } from "jsonwebtoken";
import { genSalt, hash } from "bcryptjs";

import User from "../models/User";

import { Request, Response } from "express";

export default async (req: Request, res: Response) => {
  try {
    const { userName, email, password } = req.body;

    if (!userName || !email || !password)
      return res.status(400).json({ error: "Please enter all fields" });

    const user = await User.findOne({ email: email });
    if (user) return res.status(400).json({ error: "User already exists" });

    const salt = await genSalt(10);
    const hashPass = await hash(password, salt);

    const newUser = new User({
      userName,
      email,
      password: hashPass,
    });

    await newUser.save();

    const token = sign(
      { id: newUser._id, username: newUser.userName },
      process.env.JWT_SECRET || "",
      {
        expiresIn: "1h",
      }
    );

    res.status(200).json({
      token,
      user: {
        id: newUser._id,
        userName: newUser.userName,
        email: newUser.email,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
