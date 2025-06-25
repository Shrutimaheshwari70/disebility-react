import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../Components/Home";
import About from "../Components/About";
import Contact from "../Components/Contact";
import Userdetails from "../Components/Userdetails";
import TakeoverDetail from "../pages/TakeoverDetail";
import Services from "../Components/Services";

function Routing() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/services" element={<Services />} />      
      <Route path="/pages/:name" element={<Userdetails />} />
      <Route path="/pages/SocialTakeover/:id" element={<TakeoverDetail />} />

      <Route path="*" element={<p style={{ color: "red" }}>404 - Not Found</p>} />
    </Routes>
  );
}

export default Routing;
