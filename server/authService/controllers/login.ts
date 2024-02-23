import { sign } from "jsonwebtoken";
import { compare } from "bcryptjs";

import User from "../models/User";
import { Request, Response } from "express";

export default async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({ error: "Please enter all fields" });

    const findUser = await User.findOne({ email: email }); // Await the result here
    if (!findUser)
      return res.status(400).json({ error: "User does not exist" });
    const isMatch = await compare(password, findUser.password);

    if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

    const token = sign(
      { id: findUser._id, username: findUser.userName },
      process.env.JWT_SECRET || "",
      {
        expiresIn: "7d",
      }
    );

    res.status(200).json({
      token,
      user: {
        id: findUser._id,
        userName: findUser.userName,
        email: findUser.email,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
