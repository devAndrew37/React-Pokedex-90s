import React from "react";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import PokemonCard from "./PokemonCard";
import "./Search.css";

const Search = ({ savedSearch, setSavedSearch }) => {

 const [pokemons, setPokemons] = useState([]);
 const [filteredPokemons, setFilteredPokemons] = useState([]);
 const [input, setInput] = useState("");
 const location = useLocation();
 const query = new URLSearchParams(location.search);
 const prevSearch = query.get("prev");

 const fetchPokemons = async() => {
   const query = await fetch("https://pokedex.mimo.dev/api/pokemon");
   const data = await query.json();
   setPokemons(data);
 };

 const inputHandler = (event) => {
   setInput(event.target.value);
   setSavedSearch(event.target.value);
 };

 useEffect(() => {
  fetchPokemons();
  if(prevSearch) {
    setInput(prevSearch);
    setSavedSearch(prevSearch);
  }
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
    <h1 className="top-title">Pokedex Database</h1>
    {!input ? <h2 className="top-subtitle" style={{lineHeight: "1.6"}}>Type in the search box to find all sorts of Pokemon!</h2> : <h2 className="top-subtitle">Showing results for "{input}"</h2>}
    {!input ? null : <h2 className="top-subtitle">{filteredPokemons.length} Pokemon found</h2>}
    <input className="top-input" onChange={inputHandler} value={input} placeholder="Search Pokemon..." />
    {!input ? 
    <img src="/pokedex.gif" alt="pokedex" className="pokedex-gif" /> :
    <div className="containerSearch">
    {filteredPokemons
      .map((pokemon, index) => <PokemonCard key={index} pokemon={pokemon} />)
      .filter(card => card !== null)
    }
    </div>}
    </>
  );
};

export default Search;