"use client";
import React from 'react'

function comingSoon() {
  return (
    <div className="text-center bg-white py-12">
    <div className="text-5xl font-bold text-orange-500 mb-4">
      Coming Soon!
    </div>
    <p className="text-xl text-gray-600 mb-6">
      We’re working hard to bring you something amazing. Stay tuned!
    </p>
    <form className="max-w-md mx-auto space-y-4">
      <input
        type="email" placeholder="Enter your email to get notified"
        className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-400"
        required
      />
      <button
        type="submit"
        className="w-[15vw] px-6 py-3 bg-orange-400 text-white font-semibold rounded-lg shadow-lg hover:bg-orange-600 transition duration-300"
      >
        Notify Me
      </button>
    </form>
  
</div>
  )
}

export default comingSoon
