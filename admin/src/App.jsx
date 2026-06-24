import React, { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import {Routes,Route} from 'react-router-dom'
import Add from './pages/Add'
import List from './pages/List'
import Orders from './pages/Orders'
import Login from './components/Login'
import { ToastContainer, toast } from 'react-toastify'
import axios from 'axios'

export const currency = '$'
const backendUrl = import.meta.env.VITE_BACKEND_URL;

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Check admin session status
  const checkAuth = async () => {
    try {
      const response = await axios.get(
        `${backendUrl}/api/user/admin/me`,
        { withCredentials: true }
      );
      if (response.data.success) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    } catch (error) {
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  };

  // Logout admin
  const logout = async () => {
    try {
      await axios.post(
        `${backendUrl}/api/user/logout`,
        {},
        { withCredentials: true }
      );
      setIsAuthenticated(false);
      toast.success("Logged out successfully");
    } catch (error) {
      toast.error(error.response?.data?.message || "Logout failed");
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  // Dummy token to satisfy legacy component prop signatures
  const token = isAuthenticated ? "cookie-session" : "";

  return (
    <div className="bg-gray-50 min-h-screen">
      <ToastContainer />
      {!isAuthenticated ? (
        <Login onLoginSuccess={checkAuth} />
      ) : (
        <>
          <Navbar logout={logout} />
          <hr className='border-gray-300' />
          <div className="flex w-full ">
            <Sidebar />
            <div className="w-[70%] mx-auto ml-[(max-5vw,25px)] my-8 text-gray-600 text-base">
              <Routes>
                <Route path='/' element={<Add token={token} />} />
                <Route path='/list' element={<List token={token} />} />
                <Route path='/orders' element={<Orders token={token} />} />
              </Routes>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default App
