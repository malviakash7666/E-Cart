import jwt from "jsonwebtoken";

export const adminAuth = async (req, res, next) => {
  try {
    const token =
      req.cookies?.adminToken ||
      req.cookies?.accessToken ||
      req.headers.authorization?.split(" ")[1];


    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Not Authorized. Please login again.",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);

    // check role
    if (decoded.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Access denied. Admin only.",
      });
    }

    // optional: extra security check
    if (decoded.email !== process.env.ADMIN_EMAIL) {
      return res.status(403).json({
        success: false,
        message: "Invalid admin credentials.",
      });
    }

    req.admin = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: error.message || "Invalid or expired token",
    });
  }
};