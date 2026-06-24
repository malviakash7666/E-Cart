import React, { useState } from "react";
import { assets } from "../assets/frontend_assets/assets";

const Hero = () => {
  const [coords, setCoords] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const width = window.innerWidth;
    const height = window.innerHeight;
    // Parallax values
    const x = (clientX - width / 2) / 35;
    const y = (clientY - height / 2) / 35;
    setCoords({ x, y });
  };

  const handleMouseLeave = () => {
    setCoords({ x: 0, y: 0 });
  };

  return (
    <div 
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative flex flex-col lg:flex-row items-center justify-between min-h-[80vh] lg:min-h-[700px] border border-white/20 rounded-3xl overflow-hidden glass-card p-8 lg:p-16 mb-16 transition-all duration-500 hover:shadow-2xl"
    >
      {/* Background glowing spot inside the card */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] rounded-full bg-gradient-to-br from-indigo-500/20 to-cyan-500/20 blur-[80px] pointer-events-none"></div>

      {/* Hero Left Content */}
      <div 
        style={{ 
          transform: `translate3d(${coords.x * 0.4}px, ${coords.y * 0.4}px, 0)`,
          transition: 'transform 0.1s ease-out'
        }}
        className="w-full lg:w-1/2 z-10 flex flex-col items-start text-left mb-10 lg:mb-0"
      >
        <div className="flex items-center gap-2 mb-4 bg-indigo-50/70 border border-indigo-100 px-3 py-1.5 rounded-full">
          <span className="w-2.5 h-2.5 rounded-full bg-indigo-600 animate-ping"></span>
          <p className="font-bold text-xs tracking-wider text-indigo-600 uppercase">
            Future of Retail
          </p>
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold leading-[1.1] mb-6 tracking-tight text-gray-900">
          Step Into the <br />
          <span className="text-gradient">Anti-Gravity</span> Era
        </h1>

        <p className="text-gray-500 text-sm sm:text-base max-w-md mb-8 leading-relaxed">
          Experience premium footwear engineered with levitating cushioning technology. Soft, responsive, and light as air. Designed for the year 2026.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <button className="px-8 py-4 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold text-sm shadow-lg shadow-indigo-600/25 hover:shadow-indigo-600/40 hover:-translate-y-0.5 transition cursor-pointer">
            Explore Collection
          </button>
          <button className="px-8 py-4 rounded-2xl border border-gray-200 bg-white/60 hover:bg-white text-gray-700 font-semibold text-sm hover:-translate-y-0.5 transition cursor-pointer">
            Watch Launch Film
          </button>
        </div>
      </div>

      {/* Hero Right Showcase (Levitating Product) */}
      <div 
        style={{ 
          transform: `translate3d(${coords.x * -0.8}px, ${coords.y * -0.8}px, 0)`,
          transition: 'transform 0.15s ease-out'
        }}
        className="relative w-full lg:w-1/2 flex items-center justify-center min-h-[350px] lg:min-h-[450px]"
      >
        {/* Shadow under the sneaker */}
        <div className="absolute bottom-[20%] w-[55%] h-[20px] bg-black/10 rounded-full blur-[8px] animate-pulse-glow" style={{ animationDuration: '5s' }}></div>

        {/* Levitating Sneaker */}
        <img
          src={assets.hero_sneaker}
          className="w-[80%] max-w-[420px] z-10 animate-float"
          alt="Future Sneaker"
        />

        {/* Floating Badges */}
        <div 
          style={{ transform: `translate3d(${coords.x * 0.2}px, ${coords.y * -0.4}px, 0)` }}
          className="absolute top-[10%] left-[5%] glass-card rounded-2xl px-4 py-2.5 shadow-lg border border-white/35 z-20 animate-float-slow pointer-events-none"
        >
          <p className="text-[10px] font-bold text-indigo-500 uppercase tracking-widest">Cushioning</p>
          <p className="text-xs font-black text-gray-800">Air-Bounce™ Pro</p>
        </div>

        <div 
          style={{ transform: `translate3d(${coords.x * -0.3}px, ${coords.y * 0.5}px, 0)` }}
          className="absolute bottom-[10%] right-[5%] glass-card rounded-2xl px-4 py-2.5 shadow-lg border border-white/35 z-20 animate-float-delay pointer-events-none"
        >
          <p className="text-[10px] font-bold text-cyan-500 uppercase tracking-widest">Weight</p>
          <p className="text-xs font-black text-gray-800">Ultra-Light 280g</p>
        </div>

        <div 
          style={{ 
            transform: `translate3d(${coords.x * 0.4}px, ${coords.y * 0.3}px, 0)`,
            animationDuration: '6s',
            animationDelay: '1s'
          }}
          className="absolute top-[40%] right-[0%] glass-card rounded-2xl px-4 py-2.5 shadow-lg border border-white/35 z-20 animate-float pointer-events-none"
        >
          <p className="text-[10px] font-bold text-purple-500 uppercase tracking-widest">Response</p>
          <p className="text-xs font-black text-gray-800">Adaptive Carbon Shank</p>
        </div>
      </div>
    </div>
  );
};

export default Hero;