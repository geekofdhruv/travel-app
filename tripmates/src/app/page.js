// page.js
"use client";
import React from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar";
import Landing from "./components/landing";
import ComingSoon from "./components/comingSoon";


const Page = () => {
  return (
  <div>
    <Navbar/><Landing/><ComingSoon/>
  </div>
    
  );
};

export default Page;
