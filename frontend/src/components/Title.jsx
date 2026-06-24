import React from 'react'

const Title = ({text1,text2}) => {
  return (
    <div className="flex flex-col items-center justify-center mb-6">
      <div className="inline-flex gap-2.5 items-center mb-2">
        <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-gray-900">
          <span className="text-gray-400 font-light">{text1}</span> {text2}
        </h2>
      </div>
      <div className="w-16 h-1 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 shadow-sm shadow-indigo-500/20"></div>
    </div>
  )
}


export default Title