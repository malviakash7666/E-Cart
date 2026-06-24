import React, { useContext, useEffect, useState } from "react";
import { shopContext } from "../context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
  const [currentState, setCurrentState] = useState("Login");
  const [showPassword, setShowPassword] = useState(false);

  const { navigate, backendUrl } = useContext(shopContext);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleStateChange = (state) => {
    setCurrentState(state);
    setShowPassword(false);
  };

  // =========================
  // SUBMIT HANDLER
  // =========================
  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      if (currentState === "Sign Up") {
        const response = await axios.post(
          `${backendUrl}/api/user/register`,
          { name, email, password },
          { withCredentials: true }
        );

        if (response.data.success) {
          toast.success(response.data.message);
          navigate("/");
        } else {
          toast.error(response.data.message);
        }
      } else {
        const response = await axios.post(
          `${backendUrl}/api/user/login`,
          { email, password },
          { withCredentials: true }
        );

        if (response.data.success) {
          toast.success(response.data.message);
          navigate("/");
        } else {
          toast.error(response.data.message);
        }
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Login error");
    }
  };

  // =========================
  // AUTO REDIRECT IF LOGGED IN
  // =========================
  useEffect(() => {
    const checkLogin = async () => {
      try {
        const res = await axios.get(
          `${backendUrl}/api/user/me`,
          { withCredentials: true }
        );

        if (res.data.success) {
          navigate("/");
        }
      } catch (err) {
        // not logged in
      }
    };

    checkLogin();
  }, []);

  return (
    <div className="min-h-[75vh] flex items-center justify-center py-10 px-4 sm:px-6">
      <div className="w-full max-w-md glass-card p-8 sm:p-10 rounded-3xl border border-white/30 shadow-2xl relative overflow-hidden transition-all duration-300 hover:shadow-purple-500/10">
        {/* Glow effect blobs inside the card */}
        <div className="absolute -top-12 -left-12 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none"></div>
        <div className="absolute -bottom-12 -right-12 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl pointer-events-none"></div>
        
        {/* Header */}
        <div className="text-center mb-8 relative z-10">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gradient mb-2">
            {currentState === "Login" ? "Welcome Back" : "Create Account"}
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 font-medium">
            {currentState === "Login"
              ? "Access your ShopEase shopping account"
              : "Register to explore futuristic shopping trends"}
          </p>
        </div>

        <form onSubmit={onSubmitHandler} className="space-y-5 relative z-10">
          {currentState === "Sign Up" && (
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-indigo-500 transition-colors duration-200">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                className="w-full pl-11 pr-4 py-3.5 bg-white/40 border border-gray-200/80 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-300 placeholder-gray-400 text-gray-800 font-semibold"
                placeholder="Full Name"
                required
              />
            </div>
          )}

          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-indigo-500 transition-colors duration-200">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              className="w-full pl-11 pr-4 py-3.5 bg-white/40 border border-gray-200/80 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-300 placeholder-gray-400 text-gray-800 font-semibold"
              placeholder="Email Address"
              required
            />
          </div>

          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-indigo-500 transition-colors duration-200">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type={showPassword ? "text" : "password"}
              className="w-full pl-11 pr-12 py-3.5 bg-white/40 border border-gray-200/80 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-300 placeholder-gray-400 text-gray-800 font-semibold"
              placeholder="Password"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-indigo-500 transition-colors duration-200 cursor-pointer"
            >
              {showPassword ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              )}
            </button>
          </div>

          <div className="flex items-center justify-between text-xs sm:text-sm text-gray-500 font-medium">
            <p className="hover:text-indigo-600 transition-colors duration-200 cursor-pointer">Forgot Password?</p>
            {currentState === "Login" ? (
              <p
                onClick={() => handleStateChange("Sign Up")}
                className="text-indigo-600 hover:text-indigo-500 transition-colors duration-200 cursor-pointer font-bold"
              >
                Create Account
              </p>
            ) : (
              <p
                onClick={() => handleStateChange("Login")}
                className="text-indigo-600 hover:text-indigo-500 transition-colors duration-200 cursor-pointer font-bold"
              >
                Login Here
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-3.5 px-6 text-white font-bold bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 rounded-2xl shadow-[0_4px_20px_rgba(79,70,229,0.12)] hover:shadow-[0_4px_25px_rgba(79,70,229,0.25)] transition-all duration-300 transform active:scale-98 cursor-pointer text-center"
          >
            {currentState === "Login" ? "Sign In" : "Sign Up"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;