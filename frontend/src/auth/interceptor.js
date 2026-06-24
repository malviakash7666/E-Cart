import axios from "axios";

const interceptor = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  withCredentials: true, // 🔥 MUST for cookies
});

// Request interceptor
interceptor.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor (optional for auth handling)
interceptor.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.log("Unauthorized - redirect to login");
    }
    return Promise.reject(error);
  }
);

export default interceptor;