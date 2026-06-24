import React, { useContext } from 'react'
import { shopContext } from '../context/ShopContext'
import { Link } from 'react-router-dom'

const ProductItem = ({id,image,name,price}) => {
    const {currency} = useContext(shopContext)

  return (
    <Link 
      className='group relative flex flex-col justify-between overflow-hidden border border-white/20 rounded-2xl glass-card px-4 py-4 transition-all duration-400 hover:shadow-xl hover:shadow-indigo-500/5 hover:-translate-y-1.5'
      to={`/product/${id}`}
    >
      {/* Badge (e.g. New or Trending) */}
      <div className="absolute top-3 left-3 z-10 bg-white/70 backdrop-blur-md border border-white/30 text-[9px] font-black uppercase tracking-wider text-indigo-600 px-2.5 py-1 rounded-full shadow-sm">
        New Arrival
      </div>

      {/* Image container */}
      <div className="relative w-full aspect-square rounded-xl overflow-hidden bg-gray-50/50 flex items-center justify-center mb-4 transition">
        <img 
          className='w-[90%] h-[90%] object-contain group-hover:scale-105 transition-all duration-500 ease-out' 
          src={image[0]} 
          alt={name} 
        />
        {/* Hover gradient layer */}
        <div className="absolute inset-0 bg-gradient-to-t from-indigo-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>

      {/* Product metadata */}
      <div className="flex flex-col items-start w-full">
        {/* Rating stars */}
        <div className="flex items-center gap-1 mb-1">
          <span className="text-yellow-400 text-xs">★</span>
          <span className="text-yellow-400 text-xs">★</span>
          <span className="text-yellow-400 text-xs">★</span>
          <span className="text-yellow-400 text-xs">★</span>
          <span className="text-gray-300 text-xs">★</span>
          <span className="text-[10px] text-gray-400 ml-1 font-semibold">(4.2)</span>
        </div>

        <p className="text-gray-800 text-sm font-semibold tracking-tight line-clamp-1 group-hover:text-indigo-600 transition duration-300 mb-1 w-full text-left">
          {name}
        </p>

        <div className="flex items-center justify-between w-full mt-1.5">
          <p className="text-base font-black text-gray-900">
            {currency}{price}
          </p>
          <span className="text-xs font-semibold text-indigo-600 bg-indigo-50 border border-indigo-100 rounded-lg px-2 py-0.5 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
            View
          </span>
        </div>
      </div>
    </Link>
  )
}


export default ProductItem