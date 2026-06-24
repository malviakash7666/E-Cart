import React from 'react'
import {assets} from "../assets/frontend_assets/assets"
const OurPolicy = () => {
  return (
    <div className='grid grid-cols-1 sm:grid-cols-3 gap-8 py-16 px-4 mb-16'>
      <div className='flex flex-col items-center text-center p-8 rounded-3xl border border-white/20 glass-card transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/5 hover:-translate-y-1'>
        <div className='w-16 h-16 rounded-2xl bg-indigo-50 flex items-center justify-center mb-6 shadow-inner'>
          <img src={assets.exchange_icon} className='w-8 h-8 object-contain' alt="" />
        </div>
        <h3 className="text-lg font-bold text-gray-800 mb-2">Easy Exchange Policy</h3>
        <p className="text-gray-400 text-sm">We offer hassle-free exchange policies to guarantee perfect fitting.</p>
      </div>

      <div className='flex flex-col items-center text-center p-8 rounded-3xl border border-white/20 glass-card transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/5 hover:-translate-y-1'>
        <div className='w-16 h-16 rounded-2xl bg-purple-50 flex items-center justify-center mb-6 shadow-inner'>
          <img src={assets.quality_icon} className='w-8 h-8 object-contain' alt="" />
        </div>
        <h3 className="text-lg font-bold text-gray-800 mb-2">7 Days Return Policy</h3>
        <p className="text-gray-400 text-sm">We provide a 7-day free return window with no questions asked.</p>
      </div>

      <div className='flex flex-col items-center text-center p-8 rounded-3xl border border-white/20 glass-card transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/5 hover:-translate-y-1'>
        <div className='w-16 h-16 rounded-2xl bg-cyan-50 flex items-center justify-center mb-6 shadow-inner'>
          <img src={assets.support_img} className='w-8 h-8 object-contain' alt="" />
        </div>
        <h3 className="text-lg font-bold text-gray-800 mb-2">24/7 Customer Support</h3>
        <p className="text-gray-400 text-sm">Dedicated premium support team ready to assist you at any time.</p>
      </div>
    </div>
  )
}


export default OurPolicy