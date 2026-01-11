import React from "react";
import { useState, useEffect } from "react";
import PokemonCard from "./PokemonCard";

export let soundFlag = false;

const Pokedex = () => {
 
 const [pokemons, setPokemons] = useState([]);
 

 const fetchPokemons = async () => {
   const query = await fetch("https://pokedex.mimo.dev/api/pokemon");
   const data = await query.json();
   setPokemons(data);
 };

 useEffect(() => {
  fetchPokemons();
 }, []);

 const legacySounds = () => {
  soundFlag = false;
 };
 
 const latestSounds = () => {
  soundFlag = true;
 };

  return (
    <>
    <h1>Pokedex</h1>
    <button className="soundButton" onClick={legacySounds}>Legacy Sounds</button>
    <button className="soundButton" onClick={latestSounds}>Latest Sounds</button>
    <div className="containerPokedex">
     {pokemons.map((pokemon, index) => (
       <li key={index}>
        <PokemonCard pokemon={pokemon} />
       </li>
     ))}
    </div>
    </>
  );
};

export default Pokedex;
