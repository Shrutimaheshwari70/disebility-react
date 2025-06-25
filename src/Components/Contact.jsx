import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';

function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [charCount, setCharCount] = useState(0);
  const audioRef = useRef(new Audio('/click.mp3')); // Put click.mp3 in public folder

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'message') {
      setCharCount(value.length);
    }

    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(() => {});
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      setError('Please fill in all fields.');
      setSuccess(false);
      return;
    }

    setError('');
    setSuccess(true);

    setTimeout(() => {
      alert(`Thanks ${formData.name}! Your message has been received.`);
    }, 500);

    setFormData({ name: '', email: '', message: '' });
    setCharCount(0);
  };

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-300 dark:from-gray-900 dark:to-gray-800 flex flex-col items-center justify-center px-4 py-12"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <motion.div
        className="w-full max-w-xl bg-white dark:bg-gray-900 rounded-xl shadow-2xl p-8 sm:p-10"
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <h1 className="text-4xl font-extrabold text-center text-blue-700 dark:text-blue-400 mb-8 select-none">
          📩 Contact Us
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block mb-2 font-semibold text-gray-700 dark:text-gray-300">
              Your Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full rounded-md border-2 px-4 py-3 outline-none transition-colors ${
                formData.name ? 'border-green-500' : 'border-red-500'
              } focus:border-blue-500 dark:bg-gray-800 dark:text-white`}
            />
          </div>

          <div>
            <label htmlFor="email" className="block mb-2 font-semibold text-gray-700 dark:text-gray-300">
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full rounded-md border-2 px-4 py-3 outline-none transition-colors ${
                formData.email ? 'border-green-500' : 'border-red-500'
              } focus:border-blue-500 dark:bg-gray-800 dark:text-white`}
            />
          </div>

          <div>
            <label htmlFor="message" className="block mb-2 font-semibold text-gray-700 dark:text-gray-300">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows="5"
              placeholder="Write your message..."
              value={formData.message}
              onChange={handleChange}
              maxLength={300}
              className={`w-full rounded-md border-2 px-4 py-3 resize-y outline-none transition-colors ${
                formData.message ? 'border-green-500' : 'border-red-500'
              } focus:border-blue-500 dark:bg-gray-800 dark:text-white`}
            ></textarea>
            <p className="text-right text-sm text-gray-600 dark:text-gray-400 mt-1 select-none">
              {charCount}/300 characters
            </p>
          </div>

          {error && (
            <p className="text-center text-red-600 font-medium select-none" role="alert" aria-live="assertive">
              {error}
            </p>
          )}

          <motion.button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-md shadow-lg transition duration-300 select-none"
            whileTap={{ scale: 0.95 }}
            aria-label="Send your message"
          >
            Send Message
          </motion.button>

          {success && (
            <motion.p
              className="text-center text-green-600 font-bold mt-4 select-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              role="alert"
              aria-live="polite"
            >
              ✅ Message sent successfully!
            </motion.p>
          )}
        </form>
      </motion.div>
    </motion.div>
  );
}

export default Contact;
