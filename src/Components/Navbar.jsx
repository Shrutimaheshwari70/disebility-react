import React from "react";
import { NavLink } from "react-router-dom";
import { useThemeZoom } from "../context/ThemeZoomContext";

function Navbar() {
  const { zoomIn, zoomOut, darkMode, toggleDarkMode } = useThemeZoom();

  return (
    <nav className="bg-[#1A2331] p-4 text-white flex justify-between items-center shadow-lg">
      <div className="text-2xl font-extrabold tracking-wide cursor-pointer select-none">
        My Navbar
      </div>
      <ul className="flex space-x-8 text-lg font-medium items-center">
        <li>
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "text-blue-400 underline underline-offset-4 decoration-2"
                : "hover:text-blue-300 transition-colors duration-300"
            }
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive
                ? "text-blue-400 underline underline-offset-4 decoration-2"
                : "hover:text-blue-300 transition-colors duration-300"
            }
          >
            About
          </NavLink>
        </li>
                <li>
          <NavLink
            to="/services"
            className={({ isActive }) =>
              isActive
                ? "text-blue-400 underline underline-offset-4 decoration-2"
                : "hover:text-blue-300 transition-colors duration-300"
            }
          >
            Services
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              isActive
                ? "text-blue-400 underline underline-offset-4 decoration-2"
                : "hover:text-blue-300 transition-colors duration-300"
            }
          >
            Contact
          </NavLink>
        </li>


        {/* Zoom Buttons */}
        <li className="flex space-x-2">
          <button
            onClick={zoomOut}
            className="bg-gray-700 px-3 py-1 rounded hover:bg-gray-600 transition"
            aria-label="Zoom Out"
          >
            -
          </button>
          <button
            onClick={zoomIn}
            className="bg-gray-700 px-3 py-1 rounded hover:bg-gray-600 transition"
            aria-label="Zoom In"
          >
            +
          </button>
        </li>
      </ul>
    </nav>
  );
}
export default Navbar;
