import React from "react";
import { useState, useEffect } from "react";
import PokemonCard from "./PokemonCard";
import "./Search.css";


const Search = () => {

 const [pokemons, setPokemons] = useState([]);
 const [filteredPokemons, setFilteredPokemons] = useState([]);
 const [input, setInput] = useState("");

 const fetchPokemons = async() => {
   const query = await fetch("https://pokedex.mimo.dev/api/pokemon");
   const data = await query.json();
   setPokemons(data);
 };

 const inputHandler = (event) => {
   setInput(event.target.value);
 };

 useEffect(() => {
  fetchPokemons();
 }, []);

 useEffect(() => {
  if(input === ""){
    setFilteredPokemons([]);
  } else {
    const filtered = pokemons.filter(pokemon =>
     pokemon.name.toLowerCase().startsWith(input.toLowerCase())
    );
    setFilteredPokemons(filtered);
  }
 }, [input, pokemons]);

  return (
    <>
    <h1 className="top-title">Search a Pokemon</h1>
    <input className="top-input" onChange={inputHandler} value={input} placeholder="Search Pokemon..." />
    <div className="containerSearch">
    {filteredPokemons.map((pokemon, index) => (
      <li key="index">
       <PokemonCard pokemon={pokemon} />
      </li>
    ))}
    </div>
    </>
  );
};

export default Search;