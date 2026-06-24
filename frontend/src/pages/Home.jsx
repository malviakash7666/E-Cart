import React from 'react'
import Hero from '../components/Hero'
import BestSeller from '../components/BestSeller'
import OurPolicy from '../components/OurPolicy'
import NewsLetterBox from '../components/NewsLetterBox'
import LatestCollection from '../components/LatestCollection'
import Title from '../components/Title'
import { assets } from '../assets/frontend_assets/assets'

// ===============================
// TRUSTED BRANDS MARQUEE
// ===============================
const TrustedBrands = () => (
  <div className="py-10 mb-16 overflow-hidden border border-white/20 rounded-3xl glass-card relative">
    <p className="text-center text-[10px] font-black tracking-[0.2em] text-gray-400 uppercase mb-6">
      Trusted by World-Class Brands
    </p>
    <div className="flex gap-20 animate-marquee whitespace-nowrap">
      {['NIKE', 'ADIDAS', 'PUMA', 'UNDER ARMOUR', 'REEBOK', 'BALENCIAGA', 'SUPREME'].map((brand, idx) => (
        <span key={idx} className="text-2xl font-black tracking-tighter text-gray-300 hover:text-indigo-500 transition duration-300 select-none">{brand}</span>
      ))}
      {/* Duplicate for infinite loop */}
      {['NIKE', 'ADIDAS', 'PUMA', 'UNDER ARMOUR', 'REEBOK', 'BALENCIAGA', 'SUPREME'].map((brand, idx) => (
        <span key={`dup-${idx}`} className="text-2xl font-black tracking-tighter text-gray-300 hover:text-indigo-500 transition duration-300 select-none">{brand}</span>
      ))}
    </div>
  </div>
)

// ===============================
// FEATURED CATEGORIES
// ===============================
const FeaturedCategories = () => (
  <div className="mb-16">
    <Title text1="FEATURED" text2="CATEGORIES" />
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8">
      {[
        { name: 'Men', desc: 'Futuristic performance wear', gradient: 'from-blue-500/5 to-indigo-500/5' },
        { name: 'Women', desc: 'Avant-garde styling', gradient: 'from-purple-500/5 to-pink-500/5' },
        { name: 'Kids', desc: 'Playproof next-gen apparel', gradient: 'from-cyan-500/5 to-blue-500/5' }
      ].map((cat, idx) => (
        <div key={idx} className="relative overflow-hidden group p-8 rounded-3xl border border-white/20 glass-card transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/5 hover:-translate-y-1">
          <div className={`absolute inset-0 bg-gradient-to-br ${cat.gradient} opacity-50 group-hover:scale-105 transition-transform duration-500`}></div>
          <div className="relative z-10 flex flex-col items-start text-left">
            <h4 className="text-2xl font-black text-gray-800 mb-2">{cat.name}</h4>
            <p className="text-gray-400 text-sm mb-6">{cat.desc}</p>
            <button className="text-xs font-bold text-indigo-600 bg-white/80 border border-indigo-100 rounded-xl px-4 py-2 hover:bg-white transition-all cursor-pointer">Explore Now</button>
          </div>
        </div>
      ))}
    </div>
  </div>
)

// ===============================
// FLASH SALE TIMER
// ===============================
const FlashSale = () => {
  const [timeLeft, setTimeLeft] = React.useState({ hrs: 12, mins: 34, secs: 56 });

  React.useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        let s = prev.secs - 1;
        let m = prev.mins;
        let h = prev.hrs;
        if (s < 0) {
          s = 59;
          m -= 1;
        }
        if (m < 0) {
          m = 59;
          h -= 1;
        }
        if (h < 0) {
          clearInterval(timer);
          return { hrs: 0, mins: 0, secs: 0 };
        }
        return { hrs: h, mins: m, secs: s };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative overflow-hidden flex flex-col md:flex-row items-center justify-between border border-white/20 rounded-3xl glass-card p-8 lg:p-12 mb-16 shadow-lg">
      <div className="absolute top-1/2 left-[10%] -translate-y-1/2 w-[250px] h-[250px] rounded-full bg-gradient-to-br from-indigo-500/10 to-pink-500/10 blur-[80px] pointer-events-none"></div>

      <div className="z-10 text-left mb-8 md:mb-0 max-w-lg w-full">
        <div className="inline-block bg-red-50 border border-red-100 text-red-500 text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full mb-4">
          Limited Flash Sale
        </div>
        <h3 className="text-3xl sm:text-4xl font-extrabold text-gray-800 tracking-tight mb-4">
          Next-Gen Drop - 45% Off
        </h3>
        <p className="text-gray-400 text-sm mb-6 leading-relaxed">
          Get the ultra-light Air-Bounce Pro sneaker today at an exclusive discount before it sells out. Limited to 100 pairs worldwide.
        </p>

        {/* Countdown */}
        <div className="flex gap-3 mb-6">
          {[{ label: 'Hours', val: timeLeft.hrs }, { label: 'Mins', val: timeLeft.mins }, { label: 'Secs', val: timeLeft.secs }].map((t, idx) => (
            <div key={idx} className="flex flex-col items-center bg-white/75 border border-gray-100 rounded-2xl p-3 min-w-16 shadow-sm">
              <span className="text-xl font-black text-gray-800">{String(t.val).padStart(2, '0')}</span>
              <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mt-0.5">{t.label}</span>
            </div>
          ))}
        </div>

        {/* Progress bar */}
        <div className="w-full">
          <div className="flex justify-between text-xs font-bold text-gray-500 mb-2">
            <span>Only 14 pairs left</span>
            <span>86% Sold out</span>
          </div>
          <div className="w-full h-2.5 bg-gray-150 rounded-full overflow-hidden border border-white/50 shadow-inner">
            <div className="h-full bg-gradient-to-r from-red-500 via-indigo-600 to-purple-600 rounded-full" style={{ width: '86%' }}></div>
          </div>
        </div>
      </div>

      {/* Showcase */}
      <div className="relative flex items-center justify-center min-h-[220px]">
        <div className="absolute w-[200px] h-[20px] bg-black/10 rounded-full blur-[8px] bottom-4"></div>
        <img src={assets.hero_sneaker} className="w-[240px] max-w-[280px] z-10 animate-float" style={{ transform: 'rotate(-12deg)' }} alt="" />
      </div>
    </div>
  )
}

// ===============================
// CUSTOMER TESTIMONIALS
// ===============================
const Testimonials = () => (
  <div className="mb-16">
    <Title text1="CUSTOMER" text2="REVIEWS" />
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
      {[
        { name: 'Sarah Jenkins', role: 'Sneaker Collector', comment: 'The levitation cushion actually works! I feel like I am walking on air all day. Absolute masterpiece.', rating: 5 },
        { name: 'Alex Rivera', role: 'UX Designer', comment: 'ShopEase is beautiful! The glassmorphism card layouts and lightning-fast checkout are state of the art.', rating: 5 },
        { name: 'Marc Dupont', role: 'Athletic Trainer', comment: 'Perfect ankle support, extremely lightweight. These shoes have redefined my training sessions.', rating: 4 }
      ].map((t, idx) => (
        <div key={idx} className="flex flex-col justify-between text-left p-8 rounded-3xl border border-white/20 glass-card transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/5 hover:-translate-y-1">
          <div>
            <div className="flex gap-1 mb-4 text-yellow-400">
              {Array.from({ length: t.rating }).map((_, i) => <span key={i}>★</span>)}
              {Array.from({ length: 5 - t.rating }).map((_, i) => <span key={i} className="text-gray-200">★</span>)}
            </div>
            <p className="text-gray-600 text-sm italic mb-6">"{t.comment}"</p>
          </div>
          <div>
            <p className="text-sm font-bold text-gray-800">{t.name}</p>
            <p className="text-[10px] font-semibold text-indigo-500 uppercase tracking-widest">{t.role}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
)

// ===============================
// INSTAGRAM STYLE GALLERY
// ===============================
const InstagramGallery = () => (
  <div className="mb-16">
    <Title text1="SHOP THE" text2="GALLERY" />
    <p className="text-center text-gray-400 text-xs sm:text-sm max-w-md mx-auto mb-8">
      Tag us on Instagram @ShopEase to get featured in our next-generation fashion timeline.
    </p>
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {[assets.about_img, assets.contact_img, assets.hero_img, assets.about_img].map((img, idx) => (
        <div key={idx} className="relative overflow-hidden group aspect-square rounded-2xl border border-white/10 glass-card">
          <img src={img} className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500" alt="" />
          <div className="absolute inset-0 bg-indigo-900/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <span className="text-xs font-bold text-white tracking-widest uppercase bg-white/20 backdrop-blur-md px-4 py-2 rounded-xl border border-white/20 select-none">View Post</span>
          </div>
        </div>
      ))}
    </div>
  </div>
)

const Home = () => {
  return (
    <>
      <Hero />
      <TrustedBrands />
      <FeaturedCategories />
      <LatestCollection />
      <FlashSale />
      <BestSeller />
      <OurPolicy />
      <Testimonials />
      <InstagramGallery />
      <NewsLetterBox />
    </>
  )
}

export default Home;