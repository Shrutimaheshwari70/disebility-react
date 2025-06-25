import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

function Services() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Auto detect system preference on first load
    if (window.matchMedia) {
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return true;
  });
  const [isKeyboardUser, setIsKeyboardUser] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [favorites, setFavorites] = useState(() => {
    // Load favorites from localStorage if available
    try {
      const favs = localStorage.getItem('serviceFavorites');
      return favs ? JSON.parse(favs) : [];
    } catch {
      return [];
    }
  });
  const [fontSize, setFontSize] = useState(16);
  const [speechRate, setSpeechRate] = useState(1);
  const cardRefs = useRef([]);

  // Save favorites to localStorage on change
  useEffect(() => {
    localStorage.setItem('serviceFavorites', JSON.stringify(favorites));
  }, [favorites]);

  // Accessibility: detect keyboard usage for focus outline
  useEffect(() => {
    function handleFirstTab(e) {
      if (e.key === 'Tab') {
        setIsKeyboardUser(true);
        window.removeEventListener('keydown', handleFirstTab);
      }
    }
    window.addEventListener('keydown', handleFirstTab);
    return () => window.removeEventListener('keydown', handleFirstTab);
  }, []);

  const services = [
    {
      id: 1,
      title: 'Accessible Web Design',
      desc: 'Creating websites that everyone can use, no matter their abilities.',
      icon: '🌐',
    },
    {
      id: 2,
      title: 'Voice-Controlled Apps',
      desc: 'Hands-free applications for enhanced accessibility and convenience.',
      icon: '🎙️',
    },
    {
      id: 3,
      title: 'Screen Reader Support',
      desc: 'Optimizing content so it works perfectly with screen readers.',
      icon: '🔊',
    },
  ];

  // Filter services by search term
  const filteredServices = services.filter(
    (s) =>
      s.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.desc.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Text to Speech with adjustable rate
  const speakText = (text) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      utterance.rate = speechRate;
      speechSynthesis.cancel();
      speechSynthesis.speak(utterance);
    } else {
      alert('Sorry, your browser does not support speech synthesis.');
    }
  };

  // Clipboard copy function
  const copyToClipboard = (text) => {
    navigator.clipboard
      .writeText(text)
      .then(() => alert('Description copied to clipboard!'))
      .catch(() => alert('Failed to copy text.'));
  };

  // Toggle favorite
  const toggleFavorite = (id) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((favId) => favId !== id) : [...prev, id]
    );
  };

  // Highlight matching text helper
  const highlightMatch = (text) => {
    if (!searchTerm) return text;
    const regex = new RegExp(`(${searchTerm})`, 'gi');
    const parts = text.split(regex);
    return parts.map((part, i) =>
      regex.test(part) ? (
        <mark key={i} style={{ backgroundColor: '#60a5fa', color: '#000' }}>
          {part}
        </mark>
      ) : (
        part
      )
    );
  };

  // Theme styles
  const themeStyles = {
    backgroundColor: isDarkMode ? '#1A2331' : '#f0f4f8',
    color: isDarkMode ? '#E0E7FF' : '#1A2331',
  };
  const cardBgColor = isDarkMode ? '#2A3345' : '#ffffff';
  const cardTextColor = isDarkMode ? '#E0E7FF' : '#1A2331';
  const headingColor = isDarkMode ? '#60a5fa' : '#1E40AF';

  // Keyboard navigation trap on cards (basic example)
  const handleKeyDown = (e, index) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      const nextIndex = (index + 1) % filteredServices.length;
      cardRefs.current[nextIndex].focus();
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      const prevIndex = (index - 1 + filteredServices.length) % filteredServices.length;
      cardRefs.current[prevIndex].focus();
    }
  };

  return (
    <main
      role="main"
      aria-label="Services Section"
      style={{
        minHeight: '100vh',
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        padding: '2rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        outline: isKeyboardUser ? '2px solid #60a5fa' : 'none',
        ...themeStyles,
        transition: 'all 0.4s ease',
        position: 'relative',
      }}
    >
      {/* Dark/Light Mode Toggle */}
      <button
        onClick={() => setIsDarkMode(!isDarkMode)}
        aria-pressed={!isDarkMode}
        style={{
          position: 'absolute',
          top: 20,
          right: 20,
          backgroundColor: headingColor,
          color: isDarkMode ? '#fff' : '#000',
          border: 'none',
          padding: '0.5rem 1rem',
          borderRadius: 8,
          cursor: 'pointer',
          userSelect: 'none',
          marginBottom: '0.5rem',
        }}
      >
        {isDarkMode ? 'Light Mode' : 'Dark Mode'}
      </button>

      {/* Font Size Control */}
      <label
        htmlFor="font-size"
        style={{
          position: 'absolute',
          top: 70,
          right: 20,
          color: themeStyles.color,
          userSelect: 'none',
          fontSize: '0.85rem',
        }}
      >
        Font Size: {fontSize}px
        <input
          type="range"
          id="font-size"
          min="12"
          max="24"
          value={fontSize}
          onChange={(e) => setFontSize(Number(e.target.value))}
          style={{ width: '100px', marginLeft: '0.5rem' }}
        />
      </label>

      {/* Speech Rate Control */}
      <label
        htmlFor="speech-rate"
        style={{
          position: 'absolute',
          top: 110,
          right: 20,
          color: themeStyles.color,
          userSelect: 'none',
          fontSize: '0.85rem',
        }}
      >
        Speech Rate: {speechRate.toFixed(1)}
        <input
          type="range"
          id="speech-rate"
          min="0.5"
          max="2"
          step="0.1"
          value={speechRate}
          onChange={(e) => setSpeechRate(Number(e.target.value))}
          style={{ width: '100px', marginLeft: '0.5rem' }}
        />
      </label>

      {/* Heading */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        style={{
          fontSize: '3rem',
          fontWeight: '700',
          marginBottom: '1rem',
          color: headingColor,
          userSelect: 'none',
          outline: 'none',
          fontSize: fontSize,
        }}
        tabIndex={0}
      >
        Our Services
      </motion.h1>

      {/* Search box */}
      <input
        type="search"
        aria-label="Search services"
        placeholder="Search services..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{
          marginBottom: '2rem',
          padding: '0.5rem 1rem',
          fontSize: fontSize - 2,
          borderRadius: 8,
          border: `2px solid ${headingColor}`,
          outline: 'none',
          width: '300px',
          maxWidth: '90%',
          color: themeStyles.color,
          backgroundColor: isDarkMode ? '#2A3345' : '#fff',
        }}
      />

      {/* Description */}
      <p
        tabIndex={0}
        style={{
          maxWidth: 600,
          fontSize: fontSize - 2,
          lineHeight: 1.6,
          textAlign: 'center',
          color: isDarkMode ? '#cbd5e1' : '#4B5563',
          marginBottom: '2rem',
        }}
      >
        We provide accessible and inclusive digital solutions tailored for everyone, including people with disabilities.
      </p>

      {/* Service Cards */}
      <div
        role="list"
        aria-label="List of services"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1.5rem',
          width: '100%',
          maxWidth: 900,
        }}
      >
        {filteredServices.length === 0 && (
          <p style={{ gridColumn: '1/-1', textAlign: 'center', color: 'red' }}>
            No services found matching your search.
          </p>
        )}

        {filteredServices.map((service, index) => {
          const isFav = favorites.includes(service.id);

          return (
            <motion.article
              role="listitem"
              key={service.id}
              tabIndex={0}
              ref={(el) => (cardRefs.current[index] = el)}
              whileHover={{ scale: 1.05, boxShadow: `0 8px 24px rgba(96, 165, 250, 0.4)` }}
              style={{
                backgroundColor: cardBgColor,
                padding: '1.5rem',
                borderRadius: 12,
                color: cardTextColor,
                cursor: 'pointer',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                userSelect: 'none',
                outline: 'none',
                position: 'relative',
                fontSize: fontSize,
              }}
              onClick={() => speakText(service.desc)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  speakText(service.desc);
                }
                handleKeyDown(e, index);
              }}
              aria-describedby={`desc-${service.id}`}
            >
              <div
                aria-hidden="true"
                style={{ fontSize: '3rem', marginBottom: '1rem', position: 'relative' }}
                title={service.title}
              >
                {service.icon}
              </div>
              <h2
                style={{
                  fontSize: '1.5rem',
                  marginBottom: '0.5rem',
                  fontWeight: '600',
                  color: headingColor,
                }}
              >
                {highlightMatch(service.title)}
              </h2>
              <p
                id={`desc-${service.id}`}
                style={{ fontSize: '1rem', color: isDarkMode ? '#cbd5e1' : '#4B5563' }}
              >
                {highlightMatch(service.desc)}
              </p>

              {/* Favorite toggle */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleFavorite(service.id);
                }}
                aria-label={isFav ? `Remove ${service.title} from favorites` : `Add ${service.title} to favorites`}
                style={{
                  position: 'absolute',
                  top: 10,
                  right: 10,
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '1.5rem',
                  color: isFav ? '#facc15' : headingColor,
                  userSelect: 'none',
                }}
              >
                {isFav ? '★' : '☆'}
              </button>

              {/* Copy to clipboard button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  copyToClipboard(service.desc);
                }}
                aria-label={`Copy description of ${service.title}`}
                style={{
                  marginTop: '1rem',
                  backgroundColor: headingColor,
                  border: 'none',
                  borderRadius: 6,
                  padding: '0.4rem 0.8rem',
                  cursor: 'pointer',
                  color: isDarkMode ? '#fff' : '#000',
                  alignSelf: 'center',
                  userSelect: 'none',
                  fontWeight: '600',
                  fontSize: '0.9rem',
                }}
              >
                Copy Description
              </button>
            </motion.article>
          );
        })}
      </div>
    </main>
  );
}

export default Services;
