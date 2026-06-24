import express from "express";
import cors from "cors";
import "dotenv/config";
import dns from "dns";

import cookieParser from "cookie-parser";

import { connectToDB } from "./config/mongodb.js";
import connectToCloudinary from "./config/cloudinary.js";

import userRoute from "./routes/user.routes.js";
import productRoute from "./routes/product.route.js";
import cartRoute from "./routes/cart.route.js";
import orderRoute from "./routes/order.route.js";

// DNS fix (good for Mongo Atlas issues)
dns.setServers(["8.8.8.8", "8.8.4.4"]);

const app = express();
const port = process.env.PORT || 4000;

// ===============================
// CORS CONFIG (COOKIE SUPPORT)
// ===============================
app.use(
  cors({
    origin: [process.env.ADMIN_URL, process.env.FRONTEND_URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// ===============================
// MIDDLEWARES
// ===============================
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser()); // 🔥 REQUIRED for cookies

// ===============================
// HEALTH CHECK
// ===============================
app.get("/", (req, res) => {
  res.send("Backend is running...");
});

// ===============================
// ROUTES
// ===============================
app.use("/api/user", userRoute);
app.use("/api/product", productRoute);
app.use("/api/cart", cartRoute);
app.use("/api/order", orderRoute);

// ===============================
// DB + CLOUDINARY
// ===============================
connectToDB();
connectToCloudinary();

// ===============================
// START SERVER
// ===============================
app.listen(port, () =>
  console.log("Server running on PORT: " + port)
);