import React from 'react'

const NewsLetterBox = () => {
    const onSubmit = (e)=>{
        e.preventDefault()
    }
  return (
    <div className='relative overflow-hidden text-center py-16 px-6 sm:px-12 rounded-3xl border border-white/20 glass-card max-w-4xl mx-auto mb-16'>
      {/* Background soft glow spots inside card */}
      <div className="absolute -top-12 -left-12 w-48 h-48 rounded-full bg-indigo-500/10 blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-12 -right-12 w-48 h-48 rounded-full bg-purple-500/10 blur-3xl pointer-events-none"></div>

      <h3 className="text-2xl sm:text-3xl font-black text-gray-800 tracking-tight">Subscribe Now & Get 20% Off</h3>
      <p className='text-gray-400 mt-2 text-sm sm:text-base max-w-md mx-auto'>
        Join our exclusive club to receive next-generation product drops, early access, and members-only deals.
      </p>

      <form onSubmit={onSubmit} className='w-full sm:max-w-md flex flex-col sm:flex-row items-stretch gap-2.5 mx-auto mt-8 relative z-10'>
        <input 
          type="email" 
          className='w-full px-5 py-4 bg-white/60 border border-gray-200 rounded-2xl outline-none focus:border-indigo-500 focus:bg-white transition-all text-sm shadow-inner' 
          placeholder='Enter your email address' 
          required
        />
        <button 
          className='bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold text-sm px-8 py-4 rounded-2xl shadow-md hover:shadow-lg shadow-indigo-600/25 transition cursor-pointer' 
          type='submit'
        >
          Subscribe
        </button>
      </form>
    </div>
  )
}


export default NewsLetterBox