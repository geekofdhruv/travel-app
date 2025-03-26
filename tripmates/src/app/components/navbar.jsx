"use client"; 
import React, { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import {jwtDecode} from "jwt-decode";


const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const router = useRouter();

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('')

  useEffect(() => {
    // Check if token exists
    const token = localStorage.getItem('token');
    if (token) {
      const decoded = jwtDecode(token)
      setUsername(decoded.username)
      setIsAuthenticated(true);
    } else {
      
      setIsAuthenticated(false);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token"); // Clear the token
    setIsAuthenticated(false);
    setUsername("");
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const handleButton = ()=>{
    router.push("/register")
  }
  const handleProfile = ()=>{
    router.push('/profile')
  }
 

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-150 transition-all duration-300 ease-in-out ${
        scrolled
          ? "w-3/5 mt-4 mx-auto rounded-full border border-gray-300 shadow-2xl"
          : "w-full mx-auto border-none transition-all duration-200 ease-in-out"
      } bg-white shadow-md`}
      style={{
        transform: scrolled ? "translateY(0)" : "translateY(0)",
      }}
    >
      <div className="flex items-center justify-between px-6 py-4">
     
        <div className="flex text-3xl font-bold">
        <img
          src="/logo.png"
          alt="TripMates Logo"
          className={`transition-all duration-300 px-4 ${
            scrolled ? "h-10 w-auto" : "h-12 w-auto"
          }`}
        />TripMates
        </div>
        <div>
          <ul className="flex space-x-6">
            <li>
              <a href="/trips" className="hover:text-orange-500 text-xl">Trips</a>
            </li>
            <li>
              <a href="#" className="hover:text-orange-500 text-xl">Match</a>
            </li>
            <li>
              <a href="#" className="hover:text-orange-500 text-xl">About</a>
            </li>
            <li>
              <a href="#" className="hover:text-orange-500 text-xl">Contact</a>
            </li>
          </ul>
        </div>
        <div className="flex space-x-4">
  {!isAuthenticated ? (
    <button
      className="px-4 py-4 w-[18vw] text-white text-xl font-medium bg-orange-400 rounded-full hover:bg-orange-600 hover:text-white transition duration-300"
      onClick={handleButton}
    >
      Login/SignUp
    </button>
  ):(
    <>
            <span className="text-xl align-middle mt-1" onClick={handleProfile}>Welcome, {username}</span>
           
            <button
              onClick={handleLogout}
              className="bg-orange-400 px-4 py-2 rounded hover:bg-orange-600 transition"
            >
              Logout
            </button>
          </>
  )}
</div>
      </div>
    </nav>
  );
};

export default Navbar;
