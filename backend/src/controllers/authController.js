// authController.js

import { upsertStreamUser } from "../lib/stream.js";
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

      try {
        await upsertStreamUser({
          id: newUser._id.toString(),
          name: newUser.fullName,
          image: newUser.profilePic,
        });

      } catch (error) {
        console.error("Error upserting stream user:", error);
        return res
          .status(500)
          .json({
            message: "Error creating stream user.",
            error: error.message,
          });
      }

      const token = jwt.sign(
        { userId: newUser._id },
        process.env.JWT_SECRET_KEY,
        {
          expiresIn: "7d",
        },
      );

      res.cookie("jwt", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        sameSite: "strict",
      });

      res.status(201).json({
        message: "User created successfully.",
        success: true,
        user: newUser,
      });
    } catch (error) {
      mydatabase;
      res.status(500).json({ message: "Signup failed.", error: error.message });
    }
  },

  login: async (req, res) => {
    const { email, password } = req.body;

    try {
      if (!email || !password) {
        return res.status(400).json({ message: "All fields are required." });
      }
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({ message: "Invalid Email or Password." });
      }

      const isMatch = await user.matchPassword(password);
      if (!isMatch) {
        return res.status(401).json({ message: "Invalid Email or Password." });
      }

      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, {
        expiresIn: "7d",
      });

      res.cookie("jwt", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        sameSite: "strict",
      });

      res.status(200).json({
        message: "User logged in successfully.",
        success: true,
        user: user,
      });
    } catch (error) {
      res.status(500).json({ message: "Login failed.", error: error.message });
    }
  },

  logout: async (req, res) => {
    try {
      // Optionally invalidate the token server-side if you store it in DB/Redis
      // await TokenBlacklist.create({ token: req.cookies.jwt });

      res.clearCookie("jwt", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", // Only send cookie over HTTPS in production
        sameSite: "strict", // Prevent CSRF
        path: "/", // Ensure same path as when the cookie was set
      });

      // Explicitly overwrite the cookie with an expired one (extra safety)
      res.cookie("jwt", "", {
        httpOnly: true,
        expires: new Date(0),
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
      });

      return res.status(200).json({ message: "User logged out successfully." });
    } catch (error) {
      console.error("Logout error:", error);
      return res.status(500).json({ message: "Failed to log out." });
    }
  },

  onboard: async (req, res) => {
    try {
      const userId = req.user._id;
      const { nativeLanguage, learningLanguage, location, bio, fullName } =
        req.body;
      if (
        !nativeLanguage ||
        !learningLanguage ||
        !location ||
        !bio ||
        !fullName
      ) {
        return res
          .status(400)
          .json({
            message: "All fields are required.",
            missingFields: [
              !nativeLanguage && "nativeLanguage",
              !learningLanguage && "learningLanguage",
              !location && "location",
              !bio && "bio",
              !fullName && "fullName",
            ].filter(Boolean),
          });
      }
  
  
      const updatedUser = await User.findByIdAndUpdate(userId,{...req.body, isOnboarded: true}, { new: true });
  
      if (!updatedUser) {
        return res.status(404).json({ message: "User not found." });
      }

      // Upsert the user in Stream


      try {
        await upsertStreamUser({
          id: updatedUser._id.toString(),
          name: updatedUser.fullName,
          image: updatedUser.profilePic||"",
        });

      } catch (error) {
        console.error("Error upserting stream user after onboarding::", error);
        return res
          .status(500)
          .json({
            message: "Error creating stream user after onboarding:.",
            error: error.message,
          });
      }




       res.status(200).json({ message: "Onboarding successful.", success: true, user: updatedUser });
    } catch (error) {
      console.error("Onboarding error:", error);
      res.status(500).json({ message: "Onboarding failed.", error: error.message });
    }
  } 


};

export default authController;
