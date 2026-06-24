import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Collection from "./pages/Collection";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import PlaceOrder from "./pages/PlaceOrder";
import Orders from "./pages/Orders";
import Verify from "./pages/Verify";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Search from "./components/Search";

import ProtectedRoute from "./routes/Protected.route";

import { ToastContainer } from "react-toastify";

const App = () => {
  return (
    <div className="relative min-h-screen bg-[#FAFAFA] text-gray-900 overflow-x-hidden">
      {/* Background blobs for premium glassmorphism overlay */}
      <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-gradient-to-br from-indigo-200/40 to-purple-200/40 blur-[120px] pointer-events-none animate-pulse-glow" style={{ animationDuration: '8s' }}></div>
      <div className="absolute top-[30%] right-[-10%] w-[45vw] h-[45vw] rounded-full bg-gradient-to-br from-cyan-200/30 to-blue-200/30 blur-[100px] pointer-events-none animate-pulse-glow" style={{ animationDuration: '12s' }}></div>
      <div className="absolute bottom-[-10%] left-[20%] w-[60vw] h-[60vw] rounded-full bg-gradient-to-tr from-purple-200/30 via-indigo-100/20 to-cyan-200/30 blur-[140px] pointer-events-none animate-pulse-glow" style={{ animationDuration: '15s' }}></div>

      <div className="relative z-10 px-6 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] max-w-[1600px] mx-auto">
        <ToastContainer position="top-right" />

        <Navbar />
        <Search />

        <Routes>
          {/* PUBLIC ROUTES */}
          <Route path="/" element={<Home />} />
          <Route path="/collection" element={<Collection />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/product/:productId" element={<Product />} />
          <Route path="/login" element={<Login />} />
          <Route path="/verify" element={<Verify />} />

          {/* PROTECTED ROUTES */}
          <Route
            path="/cart"
            element={
              <ProtectedRoute>
                <Cart />
              </ProtectedRoute>
            }
          />

          <Route
            path="/place-order"
            element={
              <ProtectedRoute>
                <PlaceOrder />
              </ProtectedRoute>
            }
          />

          <Route
            path="/orders"
            element={
              <ProtectedRoute>
                <Orders />
              </ProtectedRoute>
            }
          />
        </Routes>

        <Footer />
      </div>
    </div>
  );
};

export default App;