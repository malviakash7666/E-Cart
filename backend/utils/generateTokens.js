
import jwt from "jsonwebtoken";

export const generateAccessToken = (userId) => {
  return jwt.sign(
    { id: userId },
    process.env.JWT_ACCESS_SECRET,
    {
      expiresIn: "15m",
    }
  );
};

export const generateRefreshToken = (userId) => {
  return jwt.sign(
    { id: userId },
    process.env.JWT_REFRESH_SECRET,
    {
      expiresIn: "7d",
    }
  );
};



export const generateAdminToken = () => {
  return jwt.sign(
    {
      role: "admin",
      email: process.env.ADMIN_EMAIL,
    },
    process.env.JWT_ACCESS_SECRET,
    { expiresIn: "15m" }
  );
};
