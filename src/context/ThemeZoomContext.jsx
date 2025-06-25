import React, { createContext, useContext, useState, useEffect } from "react";

const ThemeZoomContext = createContext();

export function ThemeZoomProvider({ children }) {
  // Zoom state
  const [zoom, setZoom] = useState(1);

  // Dark mode state
  const [darkMode, setDarkMode] = useState(() => {
    // localStorage se theme le lo agar available hai
    const saved = localStorage.getItem("darkMode");
    return saved ? JSON.parse(saved) : false;
  });

  useEffect(() => {
    // Zoom ko body pe apply karo
    document.body.style.zoom = zoom;
  }, [zoom]);

  useEffect(() => {
    // Dark mode class body pe toggle karo
    if (darkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
    // Local storage me save karo
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);

  const zoomIn = () => setZoom((z) => Math.min(z + 0.1, 2)); // max 2x zoom
  const zoomOut = () => setZoom((z) => Math.max(z - 0.1, 0.5)); // min 0.5x zoom
  const toggleDarkMode = () => setDarkMode((d) => !d);

  return (
    <ThemeZoomContext.Provider
      value={{ zoom, zoomIn, zoomOut, darkMode, toggleDarkMode }}
    >
      {children}
    </ThemeZoomContext.Provider>
  );
}

// Hook for easy use
export function useThemeZoom() {
  return useContext(ThemeZoomContext);
}
