"use client";
import React from "react";

const Landing = () => {
  return (
    <div className="flex flex-col bg-gradient-to-b from-orange-50 to-white rounded-5xl border-[25px] border-white shadow-md mx-16  mt-32 lg:flex-row items-center justify-between h-screen px-8 lg:px-16">
      {/* Left Section */}
      <div className="lg:w-1/2 text-center lg:text-left space-y-6 mr-8 pr-16">
        <div className="lg:text-7xl font-bold leading-tight">
          Get started on finding your next{" "}
          <span className="text-orange-500">TripMate</span> with us.
        </div>
        <button
          className="mt-4 px-6 py-3 text-white bg-orange-400 rounded-full shadow-lg hover:bg-orange-600 transition duration-300"
        >
          Discover More
        </button>
      </div>

      {/* Right Section */}
      <div className="lg:w-1/2 mt-10 lg:mt-0">
        <img
          src="image1.jpg" // Replace with your actual image path
          alt="Landing Visual"
          className="w-[700] h-[600] object-cover rounded-full mx-auto shadow-lg "
    
        />
      </div>
    </div>
  );
};

export default Landing;
