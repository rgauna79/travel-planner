import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { createUserToken } from "../utils/jwt.js";
import { TOKEN_SECRET } from "../config/config.js";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {
  try {
    const { username, first_name, last_name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists." });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      username,
      first_name,
      last_name,
      email,
      password: hashedPassword,
    });

    await user.save();

    const token = createUserToken(user);
    res.cookie("authToken", token, {
      httpOnly: true, // Not Accessible from JavaScript
      secure: true, // Only for http connections on production
      sameSite: "None", // protection for CSRF atacks
      maxAge: 3600000, // 1 hour
    });

    res.status(200).json({
      message: "User registered sucesfully!",
      id: user._id,
      name: user.name,
      email: user.email,
      token,
    });
  } catch (error) {
    res.status(500).json({ message: "Registration failed" });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: "Invalid Credentials" });
    }
    const token = createUserToken(user);

    res.cookie("authToken", token, {
      httpOnly: true, // Not Accessible from JavaScript
      secure: true, // Only for http connections on production
      sameSite: "None", // protection for CSRF atacks
      maxAge: 3600000, // 1 hour
    });

    res
      .status(200)
      .json({ id: user._id, name: user.name, email: user.email, token });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ error: "Login failed." });
  }
};

export const logoutUser = async (req, res) => {
  res.clearCookie("authToken", {
    httpOnly: true,
    secure: true,
    sameSite: "None",
  });
  res.status(200).json({ message: "Logout successful" });
};

export const verifyToken = async (req, res) => {
  const token = req.cookies.authToken;
  if (!token) {
    return res
      .status(200)
      .json({ authenticated: false, message: "No token provided." });
  }

  jwt.verify(token, TOKEN_SECRET, (err, decoded) => {
    if (err) {
      return res
        .status(403)
        .json({ authenticated: false, message: "Invalid token." });
    }

    res
      .status(200)
      .json({ authenticated: true, message: "Token is valid", user: decoded });
  });
};
