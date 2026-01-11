import React from "react";

const Home = () => {

  return (
    <>
    <h1>Welcome to the Pokedex!</h1>
    <p>a Pokedex is a high-tech, portable encyclopedia used by trainers to record and learn about the various species of Pokemon they encounter</p>
    <img src="https://upload.wikimedia.org/wikipedia/en/thumb/a/af/Pok%C3%A9mon_Red_and_Blue_cover_art.webp/500px-Pok%C3%A9mon_Red_and_Blue_cover_art.webp.png" alt="pokemon cover" style={{width: "360px"}}/>
    <img src="public/pika.gif" alt="pikachu" style={{width: "400px"}} />
    <footer>Developed by <em><a href="https://www.linkedin.com/in/andres-santilli/">Andres Santilli</a></em></footer>
    </>
  );
};

export default Home;