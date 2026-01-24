import React from "react";
import { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import "./Pokemon.css";
import { soundFlag } from "./Pokedex";


const Pokemon = ({ savedSearch, setSavedSearch }) => {
  
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

const capitalize = (word) => {
  return word.charAt(0).toUpperCase() + word.slice(1);
};

const handleBack = () => {
  window.history.back();
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
      <div className="pokemon-container">
        { savedSearch === "" ? 
        <Link to={`/pokedex`}>
          <img src="/back.png" alt="go back" className="back-button" />
        </Link>
        :
        <Link to={`/search?prev=${savedSearch}`}>
          <img src="/back.png" alt="go back" className="back-button" />
        </Link>
        }
        <h4 className="pokeNumber">#{pokemon.id}</h4>
        <h1 className="pokeName">{capitalize(pokemon.name)}</h1>
        <img src={pokemon.sprites.front_default} alt={pokemon.name} className="pokemon-sprite" />
        <p className="pokeText">Height: {pokemon.height/10} m</p>
        <p className="pokeText">Weight: {pokemon.weight/10} kg</p>
        <p className="pokeText">Abilities: {pokemon.abilities.map((ability) => capitalize(ability.ability.name)).join(", ")}</p>
        <p className="pokeText">Types: {pokemon.types.map((type) => capitalize(type.type.name)).join(", ")}</p>
      </div>
     )}
    </>
  );
};

export default Pokemon;