import React from "react";

const Home = () => {

  return (
    <>
    <h1 className="title">Welcome to the Pokedex!</h1>
    <p className="description">A Pokedex is a high-tech, portable encyclopedia used by trainers to record and learn about the various species of Pokemon they encounter</p>
    <img src="/cover.png" alt="pokemon cover" className="cover-home"/>
    <img src="/pika.gif" alt="pikachu" className="pikachu-home"/>
    </>
  );
};

export default Home;