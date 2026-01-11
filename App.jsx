import React, { useState, useEffect } from "react";
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
  const oak = new Audio("/oak.mp3");
  const music1 = new Audio("/music1.mp3");
  const music2 = new Audio("/music2.mp3");
  const music3 = new Audio("/music3.mp3");
  const music = [oak, music1, music2, music3];

  const [flag, setFlag] = useState(false);
  const [accepted, setAccepted] = useState(false);

  useEffect(() => {
    if (!accepted) return;
    const randomMusic = music[Math.floor(Math.random() * music.length)];
    randomMusic.play();
    randomMusic.loop = true;
    randomMusic.volume = 0.7;
    setTimeout(() => {
      setFlag((prev) => !prev);
      randomMusic.pause();
    }, 60000);
    // Optional: cleanup
    return () => randomMusic.pause();
  }, [flag, accepted]);

  if (!accepted) {
    return (
      <div className="accept-screen" style={{display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100vh"}}>
        <h1>Welcome to the React Pokedex!</h1>
        <p>Click below to enter and enable music.</p>
        <button onClick={() => setAccepted(true)} style={{fontSize: "1.2em", padding: "1em 2em"}}>Enter</button>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <NavigationBar />
      <div className="content">
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/pokedex" element={<Pokedex />}></Route>
          <Route path="/search" element={<Search />}></Route>
          <Route path="/pokemon" element={<Pokemon />}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;