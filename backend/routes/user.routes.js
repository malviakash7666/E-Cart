import express from "express";
import {
  adminLogin,
  getMe,
  userLogin,
  userRegister,
  userLogout,
  refreshAccessToken,
} from "../controllers/userController.js";

import { userAuthorizes } from "../middleware/userAuth.js";
import { adminAuth } from "../middleware/adminAuth.js";

const userRoute = express.Router();

// Register
userRoute.post("/register", userRegister);

// Login
userRoute.post("/login", userLogin);

// Logout
userRoute.post("/logout", userLogout);

// Refresh Token
userRoute.post("/refresh", refreshAccessToken);

// Get current user (protected)
userRoute.get("/me", userAuthorizes, getMe);

// Get current admin (protected)
userRoute.get("/admin/me", adminAuth, (req, res) => {
  res.status(200).json({ success: true, admin: req.admin });
});

// Admin login
userRoute.post("/admin/login", adminLogin);


export default userRoute;