import React, { useState, useEffect, useRef } from "react";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import Home from "./Home";
import Pokedex from "./Pokedex";
import "./App.css";
import Search from "./Search";
import Pokemon from "./Pokemon";

const NavigationBar = () => (
  <nav>
    <Link to="/">Home</Link>
    <Link to="/pokedex">Pokedex</Link>
    <Link to="/search">Search</Link>
  </nav>
);

const App = () => {
  const musicFiles = ["/oak.mp3", "/music1.mp3", "/music2.mp3", "/music3.mp3"];
  const [accepted, setAccepted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [trackIndex, setTrackIndex] = useState(() => Math.floor(Math.random() * musicFiles.length));
  const audioRef = useRef(null);
  const [savedSearch, setSavedSearch] = useState("");

  // Inicializa el objeto Audio solo una vez
  useEffect(() => {
    audioRef.current = new Audio(musicFiles[trackIndex]);
    audioRef.current.volume = 0.7;
    audioRef.current.onended = () => {
      setTrackIndex(prev => (prev + 1) % musicFiles.length);
    };
    // Si está aceptado y debe sonar, reproduce automáticamente
    if (isPlaying && accepted) {
      audioRef.current.play();
    }
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.onended = null;
        audioRef.current = null;
      }
    };
  }, [trackIndex, musicFiles.length, isPlaying, accepted]);

  // Controla la reproducción
  useEffect(() => {
    if (!accepted) return;
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying, accepted]);

  if (!accepted) {
    return (
      <div className="popup-overlay">
        <div className="popup">
          <h1>Welcome to the React Pokedex!</h1>
          <p>Click below to enter and enable music.</p>
          <button onClick={() => {
            setAccepted(true);
            setIsPlaying(true);
          }}>Enter</button>
        </div>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <NavigationBar />
      <div className="content">
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/pokedex" element={<Pokedex savedSearch={savedSearch} setSavedSearch={setSavedSearch} />}></Route>
          <Route path="/search" element={<Search savedSearch={savedSearch} setSavedSearch={setSavedSearch} />}></Route>
          <Route path="/pokemon" element={<Pokemon savedSearch={savedSearch} setSavedSearch={setSavedSearch} />}></Route>
        </Routes>
      </div>
      <footer>
        <div className="footer-container">
        {isPlaying ? <img src="/volume.png" alt="music" className="icon" onClick={() => setIsPlaying(false)}/> : <img src="/muted.png" alt="mute" className="icon" onClick={() => setIsPlaying(true)}/>}
        <p className="p-footer">Developed by <em><a href="https://www.linkedin.com/in/andres-santilli/">Andres Santilli</a></em></p>
        </div>
      </footer>
    </BrowserRouter>
  );
};

export default App;