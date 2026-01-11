import React from "react";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./Pokemon.css";
import { soundFlag } from "./Pokedex";


const Pokemon = () => {
  
 const [pokemon, setPokemon] = useState(null);
 const [loading, setLoading] = useState(true);
 const [error, setError] = useState(null);
 const location = useLocation();
 const query = new URLSearchParams(location.search);
 const pokemonName = query.get("name");
 
 const fetchPokemon = async () => {
  try {
   const fetchData = await fetch(`https://pokedex.mimo.dev/api/pokemon/${pokemonName}`);
    if(!fetchData.ok) {
      throw new Error("Pokemon not found");
    }
   const queryData = await fetchData.json();
   setPokemon(queryData);
   if(!soundFlag) {
   const cryUrl = queryData.cries.legacy;
   const audio = new Audio(cryUrl);
   audio.play();
  } else if(soundFlag) {
    const cryUrl = queryData.cries.latest;
    const audio = new Audio(cryUrl);
   audio.play();
  }
   setLoading(false);
 } catch (err) {
   setError(err.message);
   setLoading(false);
  }
 };

 useEffect(() => {
  if(pokemonName) {
    fetchPokemon();
  }
 }, [pokemonName]);

  return (
    <>
     {loading && <h1>Loading data...</h1>}
     {error && <h1>Error: {error}</h1>}
     {pokemon && (
      <div>
        <h1 className="pokeName">{pokemon.name}</h1>
        <img src={pokemon.sprites.front_default} alt={pokemon.name} />
        <p className="pokeText">height: {pokemon.height/10} m</p>
        <p className="pokeText">weight: {pokemon.weight/10} kg</p>
        <p className="pokeText">abilities: {pokemon.abilities.map((ability) => ability.ability.name).join(", ")}</p>
        <p className="pokeText">types: {pokemon.types.map((type) => type.type.name).join(", ")}</p>
      </div>
     )}
    </>
  );
};

export default Pokemon;