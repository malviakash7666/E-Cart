import React, { useContext, useState } from 'react'
import {assets} from "../assets/frontend_assets/assets"
import {Link, NavLink} from 'react-router-dom'
import { shopContext } from '../context/ShopContext'

const Navbar = () => {
    const [visible, setVisible] = useState(false)
    const {isAuthenticated, logoutUser, setShowSearch, getCardCount, navigate} = useContext(shopContext)
    const logout = ()=>{
        logoutUser();
    }

   
    
  return (
    <div className='sticky top-0 z-50 py-4 mb-2'>
      <div className='flex items-center justify-between px-6 py-3.5 rounded-2xl glass-nav shadow-[0_4px_30px_rgba(0,0,0,0.03)] transition-all duration-300'>
        <Link to={"/"} className="flex items-center">
          <h1 onClick={()=>navigate("/")} className="text-2xl font-black tracking-tight text-gradient cursor-pointer">ShopEase</h1>
        </Link>
        
        <ul className="hidden sm:flex gap-8 text-sm font-semibold text-gray-600">
          <NavLink to={"/"} className={({ isActive }) => `relative py-1 transition duration-300 ${isActive ? 'text-indigo-600' : 'text-gray-600 hover:text-indigo-600'}`}>
            {({ isActive }) => (
              <>
                <p>HOME</p>
                <span className={`absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-indigo-500 to-purple-500 transition-transform duration-300 origin-left ${isActive ? 'scale-x-100' : 'scale-x-0'}`}></span>
              </>
            )}
          </NavLink> 
          <NavLink to={"/collection"} className={({ isActive }) => `relative py-1 transition duration-300 ${isActive ? 'text-indigo-600' : 'text-gray-600 hover:text-indigo-600'}`}>
            {({ isActive }) => (
              <>
                <p>COLLECTION</p>
                <span className={`absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-indigo-500 to-purple-500 transition-transform duration-300 origin-left ${isActive ? 'scale-x-100' : 'scale-x-0'}`}></span>
              </>
            )}
          </NavLink> 
          <NavLink to={"/about"} className={({ isActive }) => `relative py-1 transition duration-300 ${isActive ? 'text-indigo-600' : 'text-gray-600 hover:text-indigo-600'}`}>
            {({ isActive }) => (
              <>
                <p>ABOUT</p>
                <span className={`absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-indigo-500 to-purple-500 transition-transform duration-300 origin-left ${isActive ? 'scale-x-100' : 'scale-x-0'}`}></span>
              </>
            )}
          </NavLink> 
          <NavLink to={"/contact"} className={({ isActive }) => `relative py-1 transition duration-300 ${isActive ? 'text-indigo-600' : 'text-gray-600 hover:text-indigo-600'}`}>
            {({ isActive }) => (
              <>
                <p>CONTACT</p>
                <span className={`absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-indigo-500 to-purple-500 transition-transform duration-300 origin-left ${isActive ? 'scale-x-100' : 'scale-x-0'}`}></span>
              </>
            )}
          </NavLink> 
          <NavLink to={import.meta.env.VITE_ADMIN_URL} target='_blank' className={({ isActive }) => `relative py-1 transition duration-300 ${isActive ? 'text-indigo-600' : 'text-gray-600 hover:text-indigo-600'}`}>
            {({ isActive }) => (
              <>
                <p>ADMIN</p>
                <span className={`absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-indigo-500 to-purple-500 transition-transform duration-300 origin-left ${isActive ? 'scale-x-100' : 'scale-x-0'}`}></span>
              </>
            )}
          </NavLink> 
        </ul>

        <div className="flex items-center gap-5">
          <img onClick={()=>setShowSearch(true)} src={assets.search_icon} className='w-5 cursor-pointer opacity-70 hover:opacity-100 transition' alt="" />
          <div className="group relative">
            <div className="group relative">
              <img onClick={()=>isAuthenticated ? null : navigate("/login")} src={assets.profile_icon} className='w-5 cursor-pointer opacity-70 hover:opacity-100 transition' alt="" />
               {/* ----Drop Down Menu  */}
               {isAuthenticated && (
                 <div className="group-hover:block hidden absolute dropDown-menu right-0 pt-4 z-50">
                   <div className="flex flex-col gap-2.5 w-36 py-3.5 px-5 bg-white/95 backdrop-blur-md text-gray-600 border border-gray-100 rounded-2xl shadow-xl">
                     <p className='cursor-pointer hover:text-indigo-600 font-medium transition'>My Profile</p>
                     <p onClick={()=>navigate('/Orders')} className='cursor-pointer hover:text-indigo-600 font-medium transition'>Order</p>
                     <p onClick={logout} className='cursor-pointer hover:text-indigo-600 font-medium transition'>Logout</p>
                   </div>
                 </div>
               )}
            </div>
          </div>

          <Link to={"/cart"} className='relative p-1 rounded-full hover:bg-gray-100/50 transition'>
            <img src={assets.cart_icon} alt="" className='w-5 min-w-5' />
            <p className="absolute top-[0px] right-[0px] w-4 h-4 text-center leading-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full text-[8px] font-bold shadow-sm">{getCardCount()}</p>
          </Link>
          <img onClick={()=>setVisible(true)} src={assets.menu_icon} className='w-5 cursor-pointer sm:hidden opacity-70 hover:opacity-100 transition' alt="" />
        </div>
      </div>

      {/* side bar menu for smaller screen */}
      <div className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white/95 backdrop-blur-lg transition-all duration-300 z-50 ${visible ? "w-full" : "w-0"}`}>
        <div className="flex flex-col text-gray-600 h-full">
          <div onClick={()=>setVisible(false)} className="flex items-center gap-4 p-5 border-b border-gray-100 cursor-pointer">
            <img className='h-4 rotate-180' src={assets.dropdown_icon} alt="" />
            <p className="font-semibold">Back</p>
          </div>
          <NavLink onClick={()=>setVisible(false)} to={"/"} className={({ isActive }) => `py-3.5 pl-8 border-b border-gray-50 hover:bg-indigo-50/30 transition font-medium ${isActive ? 'text-indigo-600 bg-indigo-50/20' : 'text-gray-600'}`}>HOME</NavLink>
          <NavLink onClick={()=>setVisible(false)} to={"/collection"} className={({ isActive }) => `py-3.5 pl-8 border-b border-gray-50 hover:bg-indigo-50/30 transition font-medium ${isActive ? 'text-indigo-600 bg-indigo-50/20' : 'text-gray-600'}`}>COLLECTION</NavLink>
          <NavLink onClick={()=>setVisible(false)} to={"/about"} className={({ isActive }) => `py-3.5 pl-8 border-b border-gray-50 hover:bg-indigo-50/30 transition font-medium ${isActive ? 'text-indigo-600 bg-indigo-50/20' : 'text-gray-600'}`}>ABOUT</NavLink>
          <NavLink onClick={()=>setVisible(false)} to={"/contact"} className={({ isActive }) => `py-3.5 pl-8 border-b border-gray-50 hover:bg-indigo-50/30 transition font-medium ${isActive ? 'text-indigo-600 bg-indigo-50/20' : 'text-gray-600'}`}>CONTACT</NavLink>
          <NavLink onClick={()=>setVisible(false)} to={import.meta.env.VITE_ADMIN_URL} target='_blank' className={({ isActive }) => `py-3.5 pl-8 border-b border-gray-50 hover:bg-indigo-50/30 transition font-medium ${isActive ? 'text-indigo-600 bg-indigo-50/20' : 'text-gray-600'}`}>ADMIN</NavLink>
        </div>
      </div>
    </div>

  )
}

export default Navbar