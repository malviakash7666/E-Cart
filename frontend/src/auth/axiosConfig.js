import axios from "axios";
import interceptor from "./interceptor";

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve();
    }
  });
  failedQueue = [];
};

export const applyRefreshInterceptor = (instance) => {
  instance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;

      // Handle 401 unauthorized errors
      if (error.response?.status === 401 && !originalRequest._retry) {
        // Prevent loop if the refresh or login endpoint itself fails
        if (
          originalRequest.url?.includes("/api/user/refresh") ||
          originalRequest.url?.includes("/api/user/login")
        ) {
          return Promise.reject(error);
        }

        originalRequest._retry = true;

        if (isRefreshing) {
          return new Promise((resolve, reject) => {
            failedQueue.push({ resolve, reject });
          })
            .then(() => {
              return instance(originalRequest);
            })
            .catch((err) => {
              return Promise.reject(err);
            });
        }

        isRefreshing = true;

        try {
          const backendUrl = import.meta.env.VITE_BACKEND_URL;
          
          // Trigger the refresh token endpoint
          await axios.post(
            `${backendUrl}/api/user/refresh`,
            {},
            { withCredentials: true }
          );

          isRefreshing = false;
          processQueue(null);

          // Retry the original request
          return instance(originalRequest);
        } catch (refreshError) {
          isRefreshing = false;
          processQueue(refreshError);
          return Promise.reject(refreshError);
        }
      }

      return Promise.reject(error);
    }
  );
};

// Apply to default axios instance
applyRefreshInterceptor(axios);

// Apply to custom axios interceptor instance
applyRefreshInterceptor(interceptor);
