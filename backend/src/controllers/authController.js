// authController.js

import User from "../models/userModal.js";
import jwt from "jsonwebtoken"; 
const authController = {
  signup: async (req, res) => {
    const { fullName, email, password } = req.body;

    try {
      if (!fullName || !email || !password) {
        return res.status(400).json({ message: "All fields are required." });
      }

      if (password.length < 6) {
        return res.status(400).json({ message: "Password must be at least 6" });
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({ message: "Invalid email format." });
      }

      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: "Email already exists." });
      }
      const idx = Math.floor(Math.random() * 100) + 1; // generate a num between 1-100
      const randomAvatar = `https://avatar.iran.liara.run/public/${idx}.png`;

      const newUser = await User.create({
        email,
        fullName,
        password,
        profilePic: randomAvatar,
      });

      const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET_KEY, {
        expiresIn: '7d',
      });

    res.cookie('jwt', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        sameSite: 'strict', 
      });
      res.status(201).json({ message: "User created successfully.", success:true, user: newUser });
    } catch (error) {mydatabase
      res.status(500).json({ message: 'Signup failed.', error: error.message });
    }
  },

  login: async (req, res) => {
    res.json({
      message: "Login (current user) not implemented yet. Demo response.",
    });
  },

  logout: async (req, res) => {
    res.json({ message: "Logout not implemented yet. Demo response." });
  },
};

export default authController;
