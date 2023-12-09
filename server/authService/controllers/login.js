const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const User = require("../models/User");

module.exports = async (req, res) => {
  try {

    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({ error: "Please enter all fields" });

    const findUser = await User.findOne({ email: email }); // Await the result here
    if (!findUser)
      return res.status(400).json({ error: "User does not exist" });
    const isMatch = await bcrypt.compare(password, findUser.password);

    if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

    const token = jwt.sign(
      { id: findUser._id, username: findUser.userName },
      process.env.JWT_SECRET,
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
