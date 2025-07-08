import React, { useState, useEffect, useRef } from "react";
function Home() {
  const [text, setText] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [targetLang, setTargetLang] = useState("es"); // default: Spanish
  const [darkMode, setDarkMode] = useState(true);  // Default to dark mode
  const [highContrast, setHighContrast] = useState(false);
  const [fontSize, setFontSize] = useState(16);
  const [speechRate, setSpeechRate] = useState(1);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [listening, setListening] = useState(false);
  const [voices, setVoices] = useState([]);
  const [voice, setVoice] = useState(null);

  const liveRegionRef = useRef(null);
  const recognitionRef = useRef(null);

  // Load voices for speech synthesis
  useEffect(() => {
    const loadVoices = () => {
      const availableVoices = window.speechSynthesis.getVoices();
      setVoices(availableVoices);
      if (availableVoices.length > 0) setVoice(availableVoices[0]);
    };
    if (window.speechSynthesis.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }
    loadVoices();
  }, []);

  // Speech recognition setup
  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) return;

    recognitionRef.current = new SpeechRecognition();
    recognitionRef.current.continuous = false;
    recognitionRef.current.interimResults = false;
    recognitionRef.current.lang = "en-US";

    recognitionRef.current.onstart = () => setListening(true);
    recognitionRef.current.onend = () => setListening(false);
    recognitionRef.current.onerror = () => {
      setListening(false);
      announceLiveRegion("Speech recognition error");
    };
    recognitionRef.current.onresult = (event) => {
      const speechResult = event.results[0][0].transcript;
      setText((prev) => (prev ? prev + " " : "") + speechResult);
      announceLiveRegion("Speech input received");
    };
  }, []);

  const announceLiveRegion = (message) => {
    if (liveRegionRef.current) {
      liveRegionRef.current.textContent = "";
      setTimeout(() => {
        liveRegionRef.current.textContent = message;
      }, 100);
    }
  };

  const speakText = () => {
    if (!text.trim()) return;
    if (window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = speechRate;
    if (voice) utterance.voice = voice;

    utterance.onstart = () => {
      setIsSpeaking(true);
      announceLiveRegion("Speech started");
    };
    utterance.onend = () => {
      setIsSpeaking(false);
      announceLiveRegion("Speech ended");
    };
    utterance.onerror = () => {
      setIsSpeaking(false);
      announceLiveRegion("Speech error");
    };

    window.speechSynthesis.speak(utterance);
  };

  const speakTranslatedText = (translatedText, langCode) => {
    const langVoice = voices.find((v) => v.lang.startsWith(langCode));
    const utterance = new SpeechSynthesisUtterance(translatedText);
    utterance.rate = speechRate;
    if (langVoice) utterance.voice = langVoice;

    window.speechSynthesis.speak(utterance);
  };

  const pauseSpeech = () => {
    if (window.speechSynthesis.speaking && !window.speechSynthesis.paused) {
      window.speechSynthesis.pause();
      setIsSpeaking(false);
      announceLiveRegion("Speech paused");
    }
  };

  const resumeSpeech = () => {
    if (window.speechSynthesis.paused) {
      window.speechSynthesis.resume();
      setIsSpeaking(true);
      announceLiveRegion("Speech resumed");
    }
  };

  const startListening = () => {
    if (recognitionRef.current && !listening) recognitionRef.current.start();
  };

  const clearText = () => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
    setText("");
    setTranslatedText("");
  };

  const toggleDarkMode = () => setDarkMode((d) => !d);
  const toggleHighContrast = () => setHighContrast((h) => !h);
  const increaseFont = () => setFontSize((fs) => (fs < 32 ? fs + 2 : fs));
  const decreaseFont = () => setFontSize((fs) => (fs > 12 ? fs - 2 : fs));

  const translateText = async () => {
    if (!text.trim()) return;

    try {
      const res = await fetch("https://libretranslate.de/translate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          q: text,
          source: "en",
          target: targetLang,
          format: "text",
        }),
      });

      const data = await res.json();
      setTranslatedText(data.translatedText);
      announceLiveRegion("Translation completed");

      speakTranslatedText(data.translatedText, targetLang);
    } catch (error) {
      console.error("Translation Error:", error);
      announceLiveRegion("Translation failed");
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(text);
    announceLiveRegion("Copied to clipboard");
  };

  // Button base classes
  const btnBase = "px-4 py-2 rounded font-semibold transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed";

  // Colors adapt to dark/light and high contrast
  const btnColors = darkMode
    ? {
        normal: "bg-indigo-700 text-white hover:bg-indigo-600",
        pause: "bg-yellow-500 text-black hover:bg-yellow-400",
        resume: "bg-green-600 text-white hover:bg-green-500",
        clear: "bg-red-600 text-white hover:bg-red-500",
        listen: "bg-blue-700 text-white hover:bg-blue-600",
        copy: "bg-gray-600 text-white hover:bg-gray-500",
        translate: "bg-purple-700 text-white hover:bg-purple-600",
      }
    : {
        normal: "bg-indigo-500 text-white hover:bg-indigo-400",
        pause: "bg-yellow-400 text-black hover:bg-yellow-300",
        resume: "bg-green-500 text-white hover:bg-green-400",
        clear: "bg-red-500 text-white hover:bg-red-400",
        listen: "bg-blue-500 text-white hover:bg-blue-400",
        copy: "bg-gray-400 text-black hover:bg-gray-300",
        translate: "bg-purple-500 text-white hover:bg-purple-400",
      };

  // Background and text colors for main container
  const bgColor = highContrast ? "bg-black" : darkMode ? "bg-gray-900" : "bg-gray-100";
  const textColor = highContrast ? "text-yellow-300" : darkMode ? "text-white" : "text-gray-900";

  // Panel background colors
  const panelBg = highContrast ? "bg-black" : darkMode ? "bg-gray-800" : "bg-white";
  const panelText = highContrast ? "text-yellow-300" : darkMode ? "text-white" : "text-gray-900";

  return (
    <div
      className={`min-h-screen flex flex-col ${bgColor} ${textColor}`}
      style={{ fontSize }}
    >
      <div ref={liveRegionRef} aria-live="polite" className="sr-only"></div>

      {/* Navbar */}
      <header
        className={`${panelBg} ${panelText} flex justify-between items-center p-4 shadow-md`}
      >
        <div className="flex items-center space-x-3">
          <button
            onClick={toggleDarkMode}
            className={`${btnBase} ${darkMode ? "bg-white text-gray-900 hover:bg-gray-200" : "bg-gray-900 text-white hover:bg-gray-700"}`}
          >
            {darkMode ? "Light Mode" : "Dark Mode"}
          </button>
          <button
            onClick={toggleHighContrast}
            className={`${btnBase} bg-yellow-300 text-black hover:bg-yellow-400`}
          >
            High Contrast
          </button>
          <button
            onClick={decreaseFont}
            className={`${btnBase} bg-gray-300 text-black hover:bg-gray-400`}
          >
            A-
          </button>
          <button
            onClick={increaseFont}
            className={`${btnBase} bg-gray-300 text-black hover:bg-gray-400`}
          >
            A+
          </button>
        </div>
      </header>

      <main className="flex flex-1">
        <aside className={`${panelBg} ${panelText} w-full max-w-md p-6 shadow-lg flex flex-col`}>
          <h2 className="text-xl font-semibold mb-4">Translator Panel</h2>

          <textarea
            rows={10}
            style={{ fontSize }}
            className={`rounded-md p-3 resize-none ${darkMode ? "bg-gray-700 text-white" : "bg-gray-100 text-black"} ${highContrast ? "bg-black text-yellow-300" : ""}`}
            placeholder="Type something here..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          ></textarea>

          <div className="flex flex-wrap gap-2 mt-3">
            <button
              onClick={speakText}
              disabled={!text.trim() || isSpeaking}
              className={`${btnBase} ${btnColors.normal}`}
            >
              {isSpeaking ? "Speaking..." : "Speak"}
            </button>
            <button onClick={pauseSpeech} className={`${btnBase} ${btnColors.pause}`}>
              Pause
            </button>
            <button onClick={resumeSpeech} className={`${btnBase} ${btnColors.resume}`}>
              Resume
            </button>
            <button onClick={clearText} className={`${btnBase} ${btnColors.clear}`}>
              Clear
            </button>
            <button onClick={startListening} className={`${btnBase} ${btnColors.listen}`}>
              {listening ? "Listening..." : "Speak Input"}
            </button>
            <button onClick={copyToClipboard} className={`${btnBase} ${btnColors.copy}`}>
              Copy Text
            </button>
          </div>

          <div className="mt-4">
            <label className="block font-semibold mb-1">
              Speech Speed: {speechRate.toFixed(1)}x
            </label>
            <input
              type="range"
              min="0.5"
              max="2"
              step="0.1"
              value={speechRate}
              onChange={(e) => setSpeechRate(parseFloat(e.target.value))}
              className="w-full"
            />
          </div>

          <div className="mt-4">
            <label className="block font-semibold mb-1">Select Voice:</label>
            <select
              value={voice?.name || ""}
              onChange={(e) => setVoice(voices.find((v) => v.name === e.target.value))}
              className={`w-full p-2 rounded ${darkMode ? "bg-gray-700 text-white" : "bg-white text-black"}`}
            >
              {voices.map((v) => (
                <option key={v.name} value={v.name}>
                  {v.name} ({v.lang})
                </option>
              ))}
            </select>
          </div>

          <div className="mt-6">
            <label className="block font-semibold mb-1">Translate To:</label>
            <select
              value={targetLang}
              onChange={(e) => setTargetLang(e.target.value)}
              className={`w-full p-2 rounded ${darkMode ? "bg-gray-700 text-white" : "bg-white text-black"}`}
            >
              <option value="es">Spanish</option>
              <option value="fr">French</option>
              <option value="hi">Hindi</option>
              <option value="de">German</option>
              <option value="ja">Japanese</option>
            </select>
            <button
              onClick={translateText}
              className={`${btnBase} ${btnColors.translate} mt-3 w-full`}
            >
              Translate
            </button>
            {translatedText && (
              <div
                className={`mt-4 p-3 rounded ${
                  darkMode ? "bg-green-700 text-green-100" : "bg-green-100 text-green-900"
                }`}
              >
                <strong>Translation:</strong> {translatedText}
              </div>
            )}
          </div>

          <p className="mt-4 text-sm opacity-75">
            Word count: <strong>{text.trim() ? text.trim().split(/\s+/).length : 0}</strong> | Characters:{" "}
            <strong>{text.trim().length}</strong>
          </p>
        </aside>

        <section className={`flex-1 p-10 flex flex-col justify-center items-center text-center ${textColor}`}>
          <h2 className="text-4xl font-bold mb-6">Welcome to Smart Translator</h2>
          <p className="text-lg mb-8 max-w-xl">
            Type or speak anything in the translator panel to hear it spoken aloud. Control speech, font size, and accessibility settings. Try translating text!
          </p>
        </section>
      </main>
      <footer
        className={`p-4 text-center ${panelBg} ${panelText}`}
      >
        © 2025 Smart Translator. All rights reserved.
      </footer>
    </div>
  );
}

export default Home;
