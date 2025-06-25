import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaPlay, FaSearch } from "react-icons/fa";

const podcasts = [
  {
    id: 1,
    title: "Empowerment Talks",
    description: "Real stories from people overcoming disability challenges.",
    category: "Inspiration",
    audioUrl: "https://youtu.be/4WIP1VgPnco?si=0rSF1QLhJkI_L_ZK",
    thumbnail: "https://plus.unsplash.com/premium_photo-1661421852812-0f4d4f1c5571?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8RW1wb3dlcm1lbnQlMjBUYWxrcyUyMGRpc2FiaWxpdHl8ZW58MHx8MHx8fDA%3D",
  },
  {
    id: 2,
    title: "Tech for All",
    description: "Latest in assistive technology and accessibility innovation.",
    category: "Technology",
    audioUrl: "https://youtu.be/gK9m30bTqao?si=L_-lTa6ntY7h3iAm",
    thumbnail: "https://plus.unsplash.com/premium_photo-1683141045551-f3d1d8e48f72?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dGVjaCUyMGZvciUyMGFsbCUyMGRpc2FiaWxpdHl8ZW58MHx8MHx8fDA%3D",
  },
  {
    id: 3,
    title: "Wellness Voices",
    description: "Mental and physical wellness tips for all abilities.",
    category: "Health",
    audioUrl: "https://youtu.be/A3RBtUUSoI4?si=yyiXYfJeoH18nDPK",
    thumbnail: "https://images.unsplash.com/photo-1706700727880-595511a38fbf?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8V2VsbG5lc3MlMjBWb2ljZXMlMjBkaXNhYmlsaXR5fGVufDB8fDB8fHww",
  },
];

const categories = ["All", "Inspiration", "Technology", "Health"];

function PodcastSeries() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filtered = podcasts.filter((podcast) =>
    (selectedCategory === "All" || podcast.category === selectedCategory) &&
    podcast.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <motion.div
      className="min-h-screen px-6 py-12"
      style={{ backgroundColor: "#1A2331" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <motion.h1
        className="text-4xl font-bold text-center mb-10"
        style={{ color: "#BCD1FF" }}
      >
        🎙️ Podcast Series
      </motion.h1>

      {/* Search Bar */}
      <div className="max-w-xl mx-auto mb-10">
        <label htmlFor="search" className="sr-only">Search podcast</label>
        <div className="flex items-center bg-white rounded-md px-4 py-2">
          <FaSearch className="text-gray-500 mr-2" />
          <input
            id="search"
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search podcast..."
            className="w-full text-black focus:outline-none"
            aria-label="Search podcast by title"
          />
        </div>
      </div>

      {/* Category Filters */}
      <div className="flex flex-wrap justify-center gap-3 mb-10">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-full font-medium focus:outline-none focus-visible:ring-2 ring-offset-2 ring-[#BCD1FF] ${
              selectedCategory === cat
                ? "bg-[#BCD1FF] text-[#1A2331]"
                : "bg-[#273447] text-[#BCD1FF] hover:bg-[#2e3a4e]"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Podcast Cards */}
      <div className="grid gap-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
        {filtered.map(({ id, title, description, audioUrl, thumbnail }) => (
          <motion.div
            key={id}
            className="rounded-xl bg-[#273447] shadow-lg overflow-hidden focus-within:ring-2 ring-[#BCD1FF]"
            whileHover={{ scale: 1.03 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            tabIndex={0}
            role="region"
            aria-label={`Podcast: ${title}`}
          >
            <img
              src={thumbnail}
              alt={`Cover for ${title}`}
              className="w-full h-48 object-cover"
              loading="lazy"
            />
            <div className="p-5">
              <h2 className="text-xl font-semibold mb-2" style={{ color: "#BCD1FF" }}>
                {title}
              </h2>
              <p className="text-gray-300 text-sm mb-4">{description}</p>
              <a
                href={audioUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#BCD1FF] text-[#1A2331] font-medium hover:bg-[#a8c6ff] focus:outline-none focus-visible:ring-2 ring-[#BCD1FF]"
                aria-label={`Play ${title} podcast`}
              >
                <FaPlay /> Play
              </a>
            </div>
          </motion.div>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="text-center text-gray-400 mt-16">No podcasts found for your search.</p>
      )}
    </motion.div>
  );
}

export default PodcastSeries;
