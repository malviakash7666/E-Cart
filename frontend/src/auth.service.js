import interceptor from "./auth/interceptor";

// Get current user
export const getMe = async () => {
  const { data } = await interceptor.get("/api/user/me");
  return data;
};

// Login
export const loginUser = async (payload) => {
  const { data } = await interceptor.post("/api/user/login", payload);
  return data;
};

// Register
export const registerUser = async (payload) => {
  const { data } = await interceptor.post("/api/user/register", payload);
  return data;
};

// Admin login
export const adminLogin = async (payload) => {
  const { data } = await interceptor.post("/api/user/admin", payload);
  return data;
};