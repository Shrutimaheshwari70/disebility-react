import React, { useState } from "react";
import { motion } from "framer-motion";
import "./ArtCollaborations.css";

const artworks = [
  { id: 1, title: "Modern Art", type: "Painting", img: "https://images.unsplash.com/photo-1611690132366-8f14646df397?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDJ8fHxlbnwwfHx8fHw%3D" },
  { id: 2, title: "Digital Vision", type: "Digital", img: "https://plus.unsplash.com/premium_photo-1678935942013-b41c012bf2dd?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8RGlnaXRhbCUyMHZpc2lvbnxlbnwwfHwwfHx8MA%3D%3D" },
  { id: 3, title: "Sketch Lines", type: "Sketch", img: "https://images.unsplash.com/photo-1734983358017-3f91bc716b0a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDQwfHx8ZW58MHx8fHx8" },
  { id: 4, title: "Street Vibes", type: "Graffiti", img: "https://images.unsplash.com/photo-1534162169564-158041fc3992?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fEdyYWZpdHRpfGVufDB8fDB8fHww"  },
  { id: 5, title: "Modern Art", type: "Painting", img: "https://images.unsplash.com/photo-1620305953872-26fabd888ede?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDMwfHx8ZW58MHx8fHx8" },
  { id: 6, title: "Modern Art", type: "Painting", img: "https://plus.unsplash.com/premium_photo-1674764005825-61fb5c523362?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDIwfHx8ZW58MHx8fHx8" },
  { id: 7, title: "Modern Art", type: "Painting", img: "https://images.unsplash.com/photo-1591788788684-c6ea468280c4?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDd8fHxlbnwwfHx8fHw%3D" },
  { id: 8, title: "Modern Art", type: "Painting", img: "https://images.unsplash.com/photo-1610041578702-9d4b8d7b8483?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDI2fHx8ZW58MHx8fHx8" },
  { id: 9, title: "Modern Art", type: "Painting", img: "https://images.unsplash.com/photo-1591788788660-5a345f363d7a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDc4fHx8ZW58MHx8fHx8" },
  { id: 10, title: "Modern Art", type: "Painting", img: "https://images.unsplash.com/photo-1583407733101-223204b57928?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDF8fHxlbnwwfHx8fHw%3D" },
  { id: 11, title: "Modern Art", type: "Painting", img: "https://images.unsplash.com/photo-1583407727557-c3cbea1bea54?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDd8fHxlbnwwfHx8fHw%3D" },
  { id: 12, title: "Modern Art", type: "Painting", img: "https://images.unsplash.com/photo-1597658917821-e3e00bd9eab0?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDF8fHxlbnwwfHx8fHw%3D" },
  { id: 13, title: "Street Vibes", type: "Graffiti", img: "https://images.unsplash.com/photo-1533319417894-6fbb331e5513?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fEdyYWZpdHRpfGVufDB8fDB8fHww" },
  { id: 14, title: "Street Vibes", type: "Graffiti", img: "https://images.unsplash.com/photo-1609718467560-32bf315ef838?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDF8fHxlbnwwfHx8fHw%3D" },
  { id: 15, title: "Street Vibes", type: "Graffiti", img: "https://plus.unsplash.com/premium_photo-1693265062807-9dd017396259?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDh8fHxlbnwwfHx8fHw%3D" },
  { id: 16, title: "Street Vibes", type: "Graffiti", img: "https://plus.unsplash.com/premium_photo-1692007202553-0d9a1cfda17a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDEyfHx8ZW58MHx8fHx8" },
  { id: 17, title: "Street Vibes", type: "Graffiti", img: "https://plus.unsplash.com/premium_photo-1693166014636-b820d8d5d1ef?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDM5fHx8ZW58MHx8fHx8" },
  { id: 19, title: "Street Vibes", type: "Graffiti", img: "https://plus.unsplash.com/premium_photo-1692110816600-321bd066874e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDR8fHxlbnwwfHx8fHw%3D" },
  { id: 20, title: "Street Vibes", type: "Graffiti", img: "https://images.unsplash.com/photo-1574459879257-472a8a196f09?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE4fHx8ZW58MHx8fHx8" },
  { id: 21, title: "Digital Vision", type: "Digital", img: "https://plus.unsplash.com/premium_photo-1678937611339-0dedf2114e8b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDR8fHxlbnwwfHx8fHw%3D" },
  { id: 22, title: "Digital Vision", type: "Digital", img: "https://plus.unsplash.com/premium_photo-1689606093808-3cb4393248d2?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDV8fHxlbnwwfHx8fHw%3D" },
  { id: 23, title: "Digital Vision", type: "Digital", img: "https://plus.unsplash.com/premium_photo-1746927715759-03f68bbd8c9a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE1fHx8ZW58MHx8fHx8" },
  { id: 24, title: "Digital Vision", type: "Digital", img: "https://plus.unsplash.com/premium_photo-1678937611141-303ea9d6f1a9?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE5fHx8ZW58MHx8fHx8" },
  { id: 25, title: "Digital Vision", type: "Digital", img: "https://plus.unsplash.com/premium_photo-1729708578912-15736b4ecaca?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDI2fHx8ZW58MHx8fHx8" },
  { id: 26, title: "Digital Vision", type: "Digital", img: "https://plus.unsplash.com/premium_photo-1671580361665-c03b19142064?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDI5fHx8ZW58MHx8fHx8" },
  { id: 27, title: "Digital Vision", type: "Digital", img: "https://plus.unsplash.com/premium_photo-1678937611279-a4763f7c7abf?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDMzfHx8ZW58MHx8fHx8" },
  { id: 28, title: "Digital Vision", type: "Digital", img: "https://plus.unsplash.com/premium_photo-1669916850011-1f7ee9bb00d1?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDExfHx8ZW58MHx8fHx8" },
  { id: 29, title: "Digital Vision", type: "Digital", img: "https://plus.unsplash.com/premium_photo-1678935939751-803a0f890d6e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE2fHx8ZW58MHx8fHx8 " },
  { id: 30, title: "Digital Vision", type: "Digital", img: "https://plus.unsplash.com/premium_photo-1678935941991-ef67f545f462?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
  { id: 31, title: "Sketch Lines", type: "Sketch", img: "https://images.unsplash.com/photo-1640894822819-0a94bec464bf?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8c2tldGNofGVufDB8fDB8fHww" },
  { id: 32, title: "Sketch Lines", type: "Sketch", img: "https://images.unsplash.com/photo-1701981652733-4c6ae82545ec?q=80&w=2158&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
  { id: 33, title: "Sketch Lines", type: "Sketch", img: "https://images.unsplash.com/photo-1734089915463-19d17aba71e7?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDl8fHxlbnwwfHx8fHw%3D" },
  { id: 34, title: "Sketch Lines", type: "Sketch", img: "https://images.unsplash.com/photo-1719862761386-16689ee24757?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE0fHx8ZW58MHx8fHx8" },
  { id: 35, title: "Sketch Lines", type: "Sketch", img: "https://images.unsplash.com/photo-1725384785247-d32f1e4b441b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDMwfHx8ZW58MHx8fHx8" },
  { id: 36, title: "Sketch Lines", type: "Sketch", img: "https://plus.unsplash.com/premium_photo-1676838436377-b1f643d0955b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDR8fHxlbnwwfHx8fHw%3D" },
  { id: 37, title: "Sketch Lines", type: "Sketch", img: "https://images.unsplash.com/photo-1725385888764-6721a332fd8f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDM3fHx8ZW58MHx8fHx8" },
  { id: 38, title: "Sketch Lines", type: "Sketch", img: "https://images.unsplash.com/photo-1693068606555-fc22eae4ba0e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDExfHx8ZW58MHx8fHx8" },

];
function ArtCollaborations() {
  const [filter, setFilter] = useState("All");

  const filteredArtworks = filter === "All" ? artworks : artworks.filter((art) => art.type === filter);

  const cardVariants = {
    initial: { opacity: 0, y: 40 },
    animate: { opacity: 1, y: 0 },
  };

  return (
    <div
      className="art-page"
      style={{
        backgroundColor: "#161E2A",
        color: "#BCD1FF",
        minHeight: "100vh",
        padding: "2rem",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div className="header" style={{ marginBottom: "1.5rem" }}>
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          style={{ marginBottom: "1rem" }}
        >
          🎨 Art Collaborations
        </motion.h1>
      </div>

      <motion.div className="filters" initial="initial" animate="animate" style={{ marginBottom: "2rem" }}>
        {["All", "Painting", "Digital", "Sketch", "Graffiti"].map((cat) => (
          <motion.button
            key={cat}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setFilter(cat)}
            style={{
              backgroundColor: "#BCD1FF",
              color: "#161E2A",
              border: "none",
              borderRadius: "5px",
              padding: "0.5rem 1rem",
              marginRight: "0.75rem",
              cursor: "pointer",
              fontWeight: filter === cat ? "700" : "500",
              boxShadow: filter === cat ? "0 0 8px #BCD1FF" : "none",
            }}
          >
            {cat}
          </motion.button>
        ))}
      </motion.div>

      <div className="gallery" style={{ display: "flex", flexWrap: "wrap", gap: "1.5rem" }}>
        {filteredArtworks.map((art, i) => (
          <motion.div
            className="card"
            key={art.id}
            variants={cardVariants}
            initial="initial"
            animate="animate"
            transition={{ delay: i * 0.2, duration: 0.5 }}
            whileHover={{ scale: 1.05 }}
            style={{
              backgroundColor: "#22304D",
              borderRadius: "10px",
              padding: "1rem",
              width: "200px",
              boxShadow: "0 4px 8px rgba(0,0,0,0.3)",
              color: "#BCD1FF",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
            }}
          >
            <img
              src={art.img}
              alt={art.title}
              style={{ width: "100%", height: "150px", objectFit: "cover", borderRadius: "8px", marginBottom: "0.8rem" }}
            />
            <h3 style={{ marginBottom: "0.3rem" }}>{art.title}</h3>
            <p style={{ fontSize: "0.9rem", opacity: 0.8 }}>{art.type}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default ArtCollaborations;
